'use client'
import { useInfiniteQuery } from "@tanstack/react-query"
import { useEffect, useRef } from "react"
import { MovieCard } from "@/entities/movie/ui/card/movie-card"
import { CollectionType } from "@/entities/collections/model/collections.types"
import { collectionsQO } from "@/entities/collections/api/collections.options"
import { movieListClassName } from "../list/movie-list"

export function MovieCollectionList({ type }: { type: CollectionType }) {
    const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useInfiniteQuery(collectionsQO.discover(type));
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
        return <div className={movieListClassName}>Загрузка фильмов...</div>;
    }

    if (isError || !data) {
        return <div className={movieListClassName}>Ошибка загрузки фильмов</div>;
    }

    const movies = data.pages.flat();

    return (
        <div className="flex flex-col">
            <div className={movieListClassName}>
                {movies.map((movie, index) => (
                    <MovieCard key={`${movie.id}-${index}`} movie={movie} />
                ))}
            </div>
            <div ref={paginationTargetRef} style={{ height: 20 }}></div>
        </div>
    )
}
