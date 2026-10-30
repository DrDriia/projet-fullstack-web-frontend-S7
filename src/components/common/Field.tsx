import type { ReactNode } from 'react'

function Field({ title, children, wide = false }: { title: string, children: ReactNode, wide?: boolean }) {
    return (
        <div className={`details-field${wide ? ' details-field--wide' : ''}`}>
            <div className="details-field-label">{title}</div>
            <div className="details-field-value">
                {children}
            </div>
        </div>
    )
}

export default Field
