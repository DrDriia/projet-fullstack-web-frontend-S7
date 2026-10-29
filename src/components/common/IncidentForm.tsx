import { useState, type SyntheticEvent } from "react";
import { useApi } from "../../utils/hooks/useApi";
import { useUser } from "../../utils/context/useUser";
import type { Equipement, FormIncident, Priority } from "../../utils/types";

const PRIORITES: { value: Priority; label: string }[] = [
  { value: "BASSE", label: "Basse" },
  { value: "MOYENNE", label: "Moyenne" },
  { value: "HAUTE", label: "Haute" },
];

export function IncidentForm({ equipement }: {
  equipement: Equipement;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("BASSE");
  const { createIncident } = useApi();
  const { user } = useUser();

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const formIncident: FormIncident = {
      equipement,
      titre: title.trim(),
      description: description.trim(),
      priorite: priority,
      declareParId: user?.id,
    };

    await createIncident(formIncident);

    setTitle("");
    setDescription("");
    setPriority("BASSE");
  }

  return (
    <form id="nouvel-incident" className="incident-form" onSubmit={handleSubmit}>
      <div className="incident-field">
        <label htmlFor="incident-titre">Titre</label>
        <input
          id="incident-titre"
          name="titre"
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </div>

      <div className="incident-field">
        <label htmlFor="incident-description">Description</label>
        <input
          id="incident-description"
          name="description"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />
      </div>

      <div className="incident-field">
        <div id="incident-priorite-label" className="incident-field-title">Priorité</div>
        <div className="incident-radios" role="radiogroup" aria-labelledby="incident-priorite-label">
          {PRIORITES.map((p) => (
            <div key={p.value} className="incident-radio">
              <input
                id={`incident-priorite-${p.value}`}
                name="priorite"
                type="radio"
                value={p.value}
                checked={priority === p.value}
                onChange={() => setPriority(p.value)}
              />
              <label htmlFor={`incident-priorite-${p.value}`}>{p.label}</label>
            </div>
          ))}
        </div>
      </div>

      <button className="incident-submit" type="submit">
        {"Déclarer l'incident"}
      </button>
    </form>
  );
}
