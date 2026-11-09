'use client'
import { MovieCard } from "@/entities/movie/ui/card/movie-card"
import { useInfiniteQuery } from "@tanstack/react-query"
import { movieQO } from "@/entities/movie/api/movie.options"
import { Fragment, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { searchQueryName } from "@/features/main/ui/main-search"
import { COLLECTION_TYPES } from "@/entities/collections/model/collections.types"
import { CollectionRow } from "@/entities/collections/ui/row/collection-row"

export const movieListClassName = "grid grid-cols-2 gap-4 p-4 box-border w-full sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5"


export function MovieCardList() {
    const searchParams = useSearchParams()
    const cleanQuery = (searchParams?.get(searchQueryName) ?? '').trim()
    const isSearching = cleanQuery.length > 0

    // Если строка поиска пустая — грузим popular, иначе — search
    const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useInfiniteQuery(isSearching
            ? movieQO.search({ query: cleanQuery })
            : movieQO.popular());
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
        })

        listObserver.observe(currentTarget)

        return () => {
            listObserver.disconnect()
        }
    }, [isFetchingNextPage, hasNextPage, cleanQuery, isLoading])


    if (isLoading) {
        return <div className={movieListClassName}>Загрузка фильмов...</div>;
    }

    if (isError || !data) {
        return <div className={movieListClassName}>Ошибка загрузки фильмов</div>;
    }

    const movies = data.pages.flat();

    return (
        <div className="flex flex-col">
            <div className={movieListClassName} >
                {movies.map((movie, index) => {
                    const isTenthMovie = !isSearching && (index + 1) % 10 === 0;
                    const collectionIndex = (Math.floor((index + 1) / 10) - 1) % COLLECTION_TYPES.length;
                    const collectionType = COLLECTION_TYPES[collectionIndex];

                    return (
                        <Fragment key={`${movie.id}-${index}`}>
                            <MovieCard movie={movie} />
                            {isTenthMovie && (
                                <CollectionRow type={collectionType} />
                            )}
                        </Fragment>
                    );
                })}
            </div>
            <div ref={paginationTargetRef}></div>
        </div>
    )
}
