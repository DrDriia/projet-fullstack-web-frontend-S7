import { useState, type SyntheticEvent } from "react";
import { useApi } from "../../utils/hooks/useApi";
import { useUser } from "../../utils/context/useUser";
import type { Incident, FormEvaluation } from "../../utils/types";

const NOTES = [1, 2, 3, 4, 5] as const;

export function FormEvaluation({ incident, onCreated }: { incident: Incident; onCreated: () => void }) {
    const [note, setNote] = useState<number | null>(null);
    const [hover, setHover] = useState<number | null>(null);
    const [commentaire, setCommentaire] = useState("");
    const { createEvaluation } = useApi();
    const { user } = useUser();

    const active = hover ?? note ?? 0;

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
        <form id="nouvelle-evaluation" className="incident-form incident-form--card" onSubmit={handleSubmit}>
            <div className="incident-field">
                <div id="evaluation-note-label" className="incident-field-title">
                    Note (1 à 5)
                </div>
                <div
                    className="evaluation-stars"
                    role="radiogroup"
                    aria-labelledby="evaluation-note-label"
                    onMouseLeave={() => setHover(null)}
                >
                    {NOTES.map((n) => (
                        <div key={n} className="evaluation-star" onMouseEnter={() => setHover(n)}>
                            <input
                                id={`evaluation-note-${n}`}
                                name="note"
                                type="radio"
                                value={n}
                                checked={note === n}
                                onChange={() => setNote(n)}
                                aria-label={`${n} sur 5`}
                                required
                            />
                            <label
                                htmlFor={`evaluation-note-${n}`}
                                className={n <= active ? "is-filled" : undefined}
                            >
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z" />
                                </svg>
                            </label>
                        </div>
                    ))}
                    {note !== null && <span className="evaluation-stars-value">{note}/5</span>}
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
