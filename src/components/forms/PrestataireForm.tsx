import { useState, type SyntheticEvent } from "react";
import { useApi } from "../../utils/hooks/useApi";
import type { FormPrestataire } from "../../utils/types";

export function PrestataireForm({ onCreated }: { onCreated: () => void }) {
    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [adresse, setAdresse] = useState("");
    const [specialite, setSpecialite] = useState("");
    const [actif, setActif] = useState(true);
    const { createPrestataire } = useApi();

    async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();

        const formPrestataire: FormPrestataire = {
            nom: nom.trim(),
            email: email.trim(),
            telephone: telephone.trim(),
            adresse: adresse.trim(),
            specialite: specialite.trim(),
            actif,
        };

        await createPrestataire(formPrestataire);
        setNom("");
        setEmail("");
        setTelephone("");
        setAdresse("");
        setSpecialite("");
        setActif(true);
        onCreated();

    }

    return (
        <form id="nouveau-prestataire" className="incident-form" onSubmit={handleSubmit}>
            <div className="incident-field">
                <label htmlFor="prestataire-nom">Nom</label>
                <input
                    id="prestataire-nom"
                    name="nom"
                    type="text"
                    placeholder="Nom"
                    value={nom}
                    onChange={(event) => setNom(event.target.value)}
                    required
                />
            </div>

            <div className="incident-field">
                <label htmlFor="prestataire-specialite">Spécialité</label>
                <input
                    id="prestataire-specialite"
                    name="specialite"
                    type="text"
                    placeholder="Ex : Électricité, Plomberie…"
                    value={specialite}
                    onChange={(event) => setSpecialite(event.target.value)}
                    required
                />
            </div>

            <div className="incident-field">
                <label htmlFor="prestataire-email">Email</label>
                <input
                    id="prestataire-email"
                    name="email"
                    type="email"
                    placeholder="contact@exemple.fr"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />
            </div>

            <div className="incident-field">
                <label htmlFor="prestataire-telephone">Téléphone</label>
                <input
                    id="prestataire-telephone"
                    name="telephone"
                    type="text"
                    placeholder="01 23 45 67 89"
                    value={telephone}
                    onChange={(event) => setTelephone(event.target.value)}
                    required
                />
            </div>

            <div className="incident-field">
                <label htmlFor="prestataire-adresse">Adresse</label>
                <input
                    id="prestataire-adresse"
                    name="adresse"
                    type="text"
                    placeholder="Adresse"
                    value={adresse}
                    onChange={(event) => setAdresse(event.target.value)}
                    required
                />
            </div>

            <div className="incident-field">
                <div className="incident-radio">
                    <input
                        id="prestataire-actif"
                        name="actif"
                        type="checkbox"
                        checked={actif}
                        onChange={(event) => setActif(event.target.checked)}
                    />
                    <label htmlFor="prestataire-actif">Prestataire actif</label>
                </div>
            </div>

            <button className="incident-submit" type="submit">
                {"Ajouter le prestataire"}
            </button>
        </form>
    );
}
