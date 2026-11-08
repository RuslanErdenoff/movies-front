import Link from "next/link";
import { GenreEntity } from "../../model/catalog.types";
import "./genre-card.css";

function GenreCardRoot({ genre, children }: { genre: GenreEntity, children: React.ReactNode }) {
    return (
        <Link href={`/catalog/${genre.id}`} className="genre-card-root">
            {children}
        </Link>
    )
}

function GenreCardName({ name }: { name: string }) {
    return (
        <span className="genre-card-name">{name}</span>
    )
}

function GenreCardArrow() {
    return (
        <span className="genre-card-arrow">→</span>
    )
}

export function GenreCard({ genre }: { genre: GenreEntity }) {
    return (
        <GenreCardRoot genre={genre}>
            <GenreCardName name={genre.name} />
            <GenreCardArrow />
        </GenreCardRoot>
    )
}
