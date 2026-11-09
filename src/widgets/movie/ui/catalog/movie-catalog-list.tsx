'use client'

import { useInfiniteQuery } from "@tanstack/react-query"
import { useEffect, useRef } from "react"
import { MovieCard } from "@/entities/movie/ui/card/movie-card"
import { catalogQO } from "@/entities/catalog/api/catalog.options"
import { FavoriteButton } from "@/features/favorite/ui/favorite-button"
import "../list/movie-list.css"

export function MovieCatalogList({ genreId }: { genreId: string }) {
    const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useInfiniteQuery(catalogQO.moviesByGenre(genreId));
    const paginationTargetRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const currentTarget = paginationTargetRef?.current
        if (!currentTarget) return

        const listObserver = new IntersectionObserver((entities) => {
            if (entities.length == 0) return
            const targetEntity = entities[0]
            if (targetEntity && targetEntity.isIntersecting && !isFetchingNextPage && hasNextPage) {
                fetchNextPage()
            }
        }, { rootMargin: "200px" })

        listObserver.observe(currentTarget)

        return () => {
            listObserver.disconnect()
        }
    }, [isFetchingNextPage, hasNextPage, isLoading, fetchNextPage])

    if (isLoading) {
        return <div className="movie-list">Загрузка фильмов...</div>;
    }

    if (isError || !data) {
        return <div className="movie-list">Ошибка загрузки фильмов</div>;
    }

    const movies = data.pages.flat();

    return (
        <div className="movie-list-container">
            <div className="movie-list">
                {movies.map((movie, index) => (
                    <MovieCard
                        key={`${movie.id}-${index}`}
                        movie={movie}
                        actionSlot={<FavoriteButton movie={movie} />}
                    />
                ))}
            </div>
            <div ref={paginationTargetRef} style={{ height: 20 }}></div>
        </div>
    )
}
