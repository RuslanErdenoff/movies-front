'use client'
import { useInfiniteQuery } from "@tanstack/react-query";
import { movieQO } from "@/entities/movie/api/movie.options";
import { useEffect, useRef } from "react";
import { MovieCard } from "@/entities/movie/ui/card/movie-card";
import { movieListClassName } from "../list/movie-list";

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
        return <div className={movieListClassName}>Загрузка фильмов...</div>;
    }

    if (isError || !data) {
        return null;
    }

    const similarMovies = data.pages.flat();

    return similarMovies.length === 0 ? null : (
        <div className="flex flex-col mx-6 bg-[#1B1C20] rounded-[20px]">
            <p className="text-[24px] font-medium text-white pl-6">Похожие</p>
            <div className="flex flex-col">
                <div className={movieListClassName} >
                    {similarMovies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
                <div ref={paginationTargetRef}></div>
            </div>
        </div>
    )
}