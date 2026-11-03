import { useState } from "react";
import { Popover } from "../common/Popover";
import { PrestataireForm } from "../forms/PrestataireForm";
import { PrestataireTable } from "../tables/PrestataireTable";

export function PrestatairePage() {
    const [showPopover, setShowPopover] = useState(false);
    const [refreshPrestataires, setRefreshPrestataires] = useState(false);

    return (
        <section className="details-page">
            <div className="incidents-header">
                <h2>Prestataires</h2>
                <Popover
                    id="nouveau-prestataire-popover"
                    title="Nouveau prestataire"
                    triggerLabel="Ajouter un prestataire"
                    showPopover={showPopover}
                    setShowPopover={setShowPopover}
                >
                    <PrestataireForm
                        onCreated={() => {
                            setRefreshPrestataires((v) => !v);
                            setShowPopover(false);
                        }}
                    />
                </Popover>
            </div>
            <PrestataireTable refreshPrestataires={refreshPrestataires} />
        </section>
    );
}
