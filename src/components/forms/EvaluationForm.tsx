import { useState, type SyntheticEvent } from "react";
import { useApi } from "../../utils/hooks/useApi";
import { useUser } from "../../utils/context/useUser";
import type { Incident, FormEvaluation } from "../../utils/types";

const NOTES = [1, 2, 3, 4, 5] as const;

export function FormEvaluation({ incident, onCreated }: { incident: Incident; onCreated: () => void }) {
    const [note, setNote] = useState<number | null>(null);
    const [commentaire, setCommentaire] = useState("");
    const { createEvaluation } = useApi();
    const { user } = useUser();

    async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        if (note === null || !Number.isInteger(note) || note < 1 || note > 5) return;

        const evaluation: FormEvaluation = {
            note,
            commentaire: commentaire.trim() || undefined,
            evalueParId: user?.id,
        };

        await createEvaluation(evaluation, incident.id);
        
        onCreated();
        setNote(null);
        setCommentaire("");
    }

    return (
        <form id="nouvelle-evaluation" className="incident-form" onSubmit={handleSubmit}>
            <div className="incident-field">
                <div id="evaluation-note-label" className="incident-field-title">
                    Note (1 à 5)
                </div>
                <div className="incident-radios" role="radiogroup" aria-labelledby="evaluation-note-label">
                    {NOTES.map((n) => (
                        <div key={n} className="incident-radio">
                            <input
                                id={`evaluation-note-${n}`}
                                name="note"
                                type="radio"
                                value={n}
                                checked={note === n}
                                onChange={() => setNote(n)}
                                required
                            />
                            <label htmlFor={`evaluation-note-${n}`}>{n}</label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="incident-field">
                <label htmlFor="evaluation-commentaire">Commentaire (facultatif)</label>
                <textarea
                    id="evaluation-commentaire"
                    name="commentaire"
                    placeholder="Commentaire"
                    rows={3}
                    value={commentaire}
                    onChange={(event) => setCommentaire(event.target.value)}
                />
            </div>

            <button className="incident-submit" type="submit">
                Envoyer l'évaluation
            </button>
        </form>
    );
}
