'use client'

import { useQuery } from "@tanstack/react-query"
import { catalogQO } from "@/entities/catalog/api/catalog.options"
import { GenreCard } from "@/entities/catalog/ui/card/genre-card"

export function GenreList() {
    const { data: genres, isLoading, isError } = useQuery(catalogQO.genres());

    const genreClassName = "grid grid-cols-2 gap-3 py-2 px-0 box-border w-full sm:grid-col-3 sm:gap-4 lg:grid-cols-4";

    if (isLoading) {
        return <div className={genreClassName}>Загрузка жанров...</div>;
    }

    if (isError || !genres) {
        return <div className={genreClassName}>Ошибка загрузки жанров</div>;
    }

    return (
        <div className={genreClassName}>
            {genres.map((genre) => (
                <GenreCard key={genre.id} genre={genre} />
            ))}
        </div>
    )
}
