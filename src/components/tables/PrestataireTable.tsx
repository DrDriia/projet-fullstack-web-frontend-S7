import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../utils/hooks/useApi";
import type { Prestataire } from "../../utils/types";

export function PrestataireTable({ refreshPrestataires }: { refreshPrestataires: boolean }) {
    const navigate = useNavigate();
    const { getAllPrestataires } = useApi();
    const [prestataires, setPrestataires] = useState<Prestataire[]>([]);

    useEffect(() => {
        async function fetchPrestataires() {
        const prestataires = await getAllPrestataires();
        setPrestataires(prestataires);
        }
        fetchPrestataires();
    }, [getAllPrestataires, refreshPrestataires]);

    return (
        <>
            {prestataires.length === 0 ? (
                <p>Aucun prestataire enregistré.</p>
            ) : (
                <div className="data-table-scroll" role="region" aria-label="Liste des prestataires" tabIndex={0}>
                <table className="data-table">
                    <caption>{prestataires.length} prestataire(s)</caption>
                    <thead>
                    <tr>
                        <th scope="col">Nom</th>
                        <th scope="col">Spécialité</th>
                        <th scope="col">Email</th>
                        <th scope="col">Téléphone</th>
                        <th scope="col">Statut</th>
                    </tr>
                    </thead>
                    <tbody>
                        {prestataires.map((prestataire) => (
                            <tr
                                key={prestataire.id}
                                onClick={() => navigate(`/prestataire/${prestataire.id}`)}
                            >
                                <td>{prestataire.nom}</td>
                                <td>{prestataire.specialite}</td>
                                <td>{prestataire.email}</td>
                                <td>{prestataire.telephone}</td>
                                <td>{prestataire.actif ? "Actif" : "Inactif"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            )}
        </>
    );
}
