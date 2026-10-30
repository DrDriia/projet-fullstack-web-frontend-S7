import type { ReactNode } from 'react'

interface PopoverProps {
  id: string
  title: string
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export function Popover({ id, title, isOpen, onClose, children }: PopoverProps) {
  return (
    <>
        {!isOpen ? null
            : <div className="popover-backdrop" onClick={onClose}>
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
                            onClick={onClose}
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