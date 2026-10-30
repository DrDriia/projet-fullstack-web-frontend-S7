import type { ReactNode } from 'react'

interface PopoverProps {
    id: string
    title: string
    triggerLabel: string
    showPopover: boolean
    setShowPopover: (value: boolean) => void
    children: ReactNode
}

export function Popover({ id, title, triggerLabel, showPopover, setShowPopover, children }: PopoverProps) {
    return (
        <>
                <button
                    type="button"
                    className="button-primary"
                    aria-haspopup="dialog"
                    aria-expanded={showPopover}
                    aria-controls={id}
                    onClick={() => setShowPopover(true)}
                >
                    {triggerLabel}
                </button>
            {!showPopover ? null
                : <div className="popover-backdrop" onClick={() => setShowPopover(false)}>
                    <div
                        id={id}
                        className="popover-panel"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={`${id}-title`}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="popover-header">
                            <div id={`${id}-title`} className="popover-title">{title}</div>
                            <button
                                type="button"
                                className="popover-close"
                                onClick={() => setShowPopover(false)}
                                aria-label="Fermer"
                            >
                                x
                            </button>
                        </div>
                        {children}
                    </div>
                </div>
            }
        </>
    )
}