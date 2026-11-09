'use client'
import { useInfiniteQuery } from "@tanstack/react-query";
import { movieQO } from "@/entities/movie/api/movie.options";
import { useEffect, useRef } from "react";
import { MovieCard } from "@/entities/movie/ui/card/movie-card";
import { FavoriteButton } from "@/features/favorite/ui/favorite-button";
import "../list/movie-list.css";
import "./movie-similar-list.css"

export function MovieSimilarList({ movieId }: { movieId: string }) {

    const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useInfiniteQuery(movieQO.movieSimilar(movieId));
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
    }, [isFetchingNextPage, hasNextPage, isLoading])

    if (isLoading) {
        return <div className="movie-list">Загрузка фильмов...</div>;
    }

    if (isError || !data) {
        return null;
    }

    const similarMovies = data.pages.flat();

    return similarMovies.length === 0 ? null : (
        <div className="movie-similar-list">
            <p>Похожие</p>
            <div className="movie-list-container">
                <div className="movie-list" >
                    {similarMovies.map(movie => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            actionSlot={<FavoriteButton movie={movie} />}
                        />
                    ))}
                </div>
                <div ref={paginationTargetRef}></div>
            </div>
        </div>
    )
}