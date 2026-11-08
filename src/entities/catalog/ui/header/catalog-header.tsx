import "./catalog-header.css";

export function CatalogHeader({ title }: { title: string }) {
    return (
        <div className="catalog-header">
            <h1 className="catalog-header-title">{title}</h1>
            <span className="catalog-header-subtitle">Фильмы выбранного жанра</span>
        </div>
    )
}
