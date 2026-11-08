'use client'

import { useQuery } from "@tanstack/react-query"
import { catalogQO } from "@/entities/catalog/api/catalog.options"
import { GenreCard } from "@/entities/catalog/ui/card/genre-card"
import "./genre-list.css"

export function GenreList() {
    const { data: genres, isLoading, isError } = useQuery(catalogQO.genres());

    if (isLoading) {
        return <div className="genre-list">Загрузка жанров...</div>;
    }

    if (isError || !genres) {
        return <div className="genre-list">Ошибка загрузки жанров</div>;
    }

    return (
        <div className="genre-list">
            {genres.map((genre) => (
                <GenreCard key={genre.id} genre={genre} />
            ))}
        </div>
    )
}
