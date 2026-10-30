function Field({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="details-field">
            <div className="details-field-label">{title}</div>
            <div className="details-field-value">
                {children}
            </div>
        </div>
    )
}

export default Field
