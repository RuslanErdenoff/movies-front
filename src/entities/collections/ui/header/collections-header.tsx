import "./collections-header.css";

export function CollectionsHeader({ title, subtitle }: { title: string, subtitle: string }) {
    return (
        <div className="collections-header">
            <h1 className="collections-header-title">{title}</h1>
            <span className="collections-header-subtitle">{subtitle}</span>
        </div>
    )
}
