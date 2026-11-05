import {useCallback, useEffect, useMemo, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useUser} from '../../utils/context/useUser';
import {getDashboard} from '../../utils/api/dashboard';
import type {Dashboard, DashboardIncident} from '../../utils/types';
import '../../styles/dashboard.css';

type FiltreStatut = 'TOUS' | 'OUVERT' | 'AFFECTE';
type FiltrePriorite = 'TOUTES' | DashboardIncident['priorite'];
type Tri = 'DATE' | 'DUREE' | 'PRIORITE';

const ordrePriorite: Record<DashboardIncident['priorite'], number> = {
    CRITIQUE: 4,
    HAUTE: 3,
    NORMALE: 2,
    BASSE: 1,
};

function formaterDuree(minutes: number): string {
    const jours = Math.floor(minutes / 1440);
    const heures = Math.floor((minutes % 1440) / 60);
    const restantes = minutes % 60;

    if (jours > 0) return `${jours} j ${heures} h`;
    if (heures > 0) return `${heures} h ${restantes} min`;
    return `${restantes} min`;
}

function formaterDate(date: string): string {
    return new Intl.DateTimeFormat('fr-FR', {
        dateStyle: 'short',
        timeStyle: 'short',
    }).format(new Date(date));
}

export function DashboardPage() {
    const navigate = useNavigate();
    useUser();
    const [dashboard, setDashboard] = useState<Dashboard | null>(null);
    const [chargement, setChargement] = useState(true);
    const [erreur, setErreur] = useState('');
    const [statut, setStatut] = useState<FiltreStatut>('TOUS');
    const [priorite, setPriorite] = useState<FiltrePriorite>('TOUTES');
    const [tri, setTri] = useState<Tri>('DATE');

    const chargerDashboard = useCallback(async () => {
        setChargement(true);
        setErreur('');
        try {
            setDashboard(await getDashboard());
        } catch (e) {
            setErreur(e instanceof Error ? e.message : 'Impossible de charger le tableau de bord.');
        } finally {
            setChargement(false);
        }
    }, []);

    useEffect(() => {
        void chargerDashboard();
    }, [chargerDashboard]);

    const incidentsFiltres = useMemo(() => {
        const incidents = (dashboard?.incidents ?? []).filter((incident) => {
            const statutOk = statut === 'TOUS' || incident.statut === statut;
            const prioriteOk = priorite === 'TOUTES' || incident.priorite === priorite;
            return statutOk && prioriteOk;
        });

        return incidents.sort((a, b) => {
            if (tri === 'DUREE') return b.dureeMinutes - a.dureeMinutes;
            if (tri === 'PRIORITE') {
                return ordrePriorite[b.priorite] - ordrePriorite[a.priorite];
            }
            return new Date(a.dateOuverture).getTime() - new Date(b.dateOuverture).getTime();
        });
    }, [dashboard, statut, priorite, tri]);

    if (chargement) {
        return <section className="dashboard-page"><p>Chargement du tableau de bord…</p></section>;
    }

    if (erreur) {
        return (
            <section className="dashboard-page">
                <h1>Tableau de bord</h1>
                <p className="dashboard-error" role="alert">{erreur}</p>
                <button type="button" onClick={() => void chargerDashboard()}>Réessayer</button>
            </section>
        );
    }

    if (!dashboard) return null;

    return (
        <section className="dashboard-page">
            <div className="dashboard-heading">
                <div>
                    <h1>Tableau de bord</h1>
                    <p>Supervision des incidents non résolus</p>
                </div>
                <button type="button" className="dashboard-refresh" onClick={() => void chargerDashboard()}>
                    Actualiser
                </button>
            </div>

            <div className="dashboard-indicators">
                <article className="dashboard-card dashboard-card-total">
                    <span>Incidents actifs</span>
                    <strong>{dashboard.totalActifs}</strong>
                </article>
                <article className="dashboard-card dashboard-card-pending">
                    <span>En attente d'affectation</span>
                    <strong>{dashboard.enAttenteAffectation}</strong>
                </article>
                <article className="dashboard-card dashboard-card-assigned">
                    <span>Affectés</span>
                    <strong>{dashboard.affectes}</strong>
                </article>
                <article className="dashboard-card dashboard-card-urgent">
                    <span>En retard (72 h et +)</span>
                    <strong>{dashboard.urgents}</strong>
                </article>
                <article className="dashboard-card dashboard-card-critical">
                    <span>Priorité critique</span>
                    <strong>{dashboard.prioriteCritique}</strong>
                </article>
            </div>

            <div className="dashboard-toolbar">
                <label>
                    Statut
                    <select value={statut} onChange={(e) => setStatut(e.target.value as FiltreStatut)}>
                        <option value="TOUS">Tous</option>
                        <option value="OUVERT">En attente d'affectation</option>
                        <option value="AFFECTE">Affectés</option>
                    </select>
                </label>
                <label>
                    Priorité
                    <select value={priorite} onChange={(e) => setPriorite(e.target.value as FiltrePriorite)}>
                        <option value="TOUTES">Toutes</option>
                        <option value="BASSE">Basse</option>
                        <option value="NORMALE">Normale</option>
                        <option value="HAUTE">Haute</option>
                        <option value="CRITIQUE">Critique</option>
                    </select>
                </label>
                <label>
                    Trier par
                    <select value={tri} onChange={(e) => setTri(e.target.value as Tri)}>
                        <option value="DATE">Date d'ouverture (plus ancien)</option>
                        <option value="DUREE">Durée (plus longue)</option>
                        <option value="PRIORITE">Priorité (plus élevée)</option>
                    </select>
                </label>
            </div>

            <div className="dashboard-list-heading">
                <h2>Incidents actifs</h2>
                <span>{incidentsFiltres.length} résultat(s)</span>
            </div>

            {incidentsFiltres.length === 0 ? (
                <p className="dashboard-empty">Aucun incident ne correspond à ces filtres.</p>
            ) : (
                <div className="dashboard-table-wrapper">
                    <table className="dashboard-table">
                        <thead>
                        <tr>
                            <th>Incident</th>
                            <th>Priorité</th>
                            <th>Station / équipement</th>
                            <th>Ouverture</th>
                            <th>Durée</th>
                            <th>Prise en charge</th>
                            <th>Attention</th>
                            <th><span className="sr-only">Détail</span></th>
                        </tr>
                        </thead>
                        <tbody>
                        {incidentsFiltres.map((incident) => (
                            <tr key={incident.id}>
                                <td>
                                    <strong>{incident.titre || `Incident #${incident.id}`}</strong>
                                    <small>{incident.description}</small>
                                </td>
                                <td><span className={`dashboard-priority priority-${incident.priorite.toLowerCase()}`}>
                                        {incident.priorite}
                                    </span></td>
                                <td>
                                    <strong>{incident.stationNom}</strong>
                                    <small>{incident.equipementReference} · {incident.equipementLibelle}</small>
                                    <small>{incident.typeEquipement}{incident.stationVille ? ` · ${incident.stationVille}` : ''}</small>
                                    {incident.equipementFragile && (
                                        <span className="fragile-badge">
            Équipement fragile
        </span>
                                    )}
                                </td>
                                <td>{formaterDate(incident.dateOuverture)}</td>
                                <td>{formaterDuree(incident.dureeMinutes)}</td>
                                <td>
                                    {incident.statut === 'AFFECTE'
                                        ? incident.prestataireNom ?? 'Prestataire non renseigné'
                                        : 'En attente'}
                                </td>
                                <td>
                                        <span
                                            className={`dashboard-attention attention-${incident.niveauAttention.toLowerCase()}`}>
                                            {incident.niveauAttention === 'AFFECTE'
                                                ? 'Affecté'
                                                : incident.niveauAttention}
                                        </span>
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        className="dashboard-detail-button"
                                        onClick={() => navigate(`/incident/${incident.id}`)}
                                    >
                                        Voir
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
            <p className="dashboard-footnote">
                Les niveaux vert, orange et rouge concernent uniquement les incidents non affectés.
                Les durées sont calculées à partir de l'heure de la dernière actualisation.
            </p>
        </section>
    );
}
