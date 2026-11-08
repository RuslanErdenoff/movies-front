import { infiniteQueryOptions, keepPreviousData, queryOptions } from "@tanstack/react-query";
import { movieApi } from "./movie.api";
import { MovieSnippetEntity } from "../model/movie.types";
import { mapMovieDetailsToSnippet } from "../model/movie-detail.types";

export type SearchPageParamsProps = {
    query: string;
};


export const movieQO = {
    popular: () => infiniteQueryOptions({
        queryKey: ["movies", "popular"],
        initialPageParam: 1,
        getNextPageParam: (_lastPage, _all, lastPageParam) => {
            return lastPageParam + 1;
        },
        queryFn: ({ pageParam }: { pageParam: number }) => movieApi.getPopularList(pageParam),
    }),
    search: ({ query }: SearchPageParamsProps) =>
        infiniteQueryOptions({
            // Когда меняется query после дебаунса — ключ меняется,
            // старый список сам очищается и качается 1-я страница нового поиска!
            queryKey: ["movies", "search", query],
            initialPageParam: 1,
            queryFn: ({ pageParam, signal }) =>
                movieApi.searchMovies({ query, page: pageParam, signal }),
            getNextPageParam: (lastPage, _all, lastPageParam) => {
                if (lastPage.length === 0) return undefined;
                return lastPageParam + 1;
            },
            // Не шлем запрос в сеть, если строка поиска пустая
            enabled: query.trim().length > 0,
        }),
    movieDetails: (id: string) => queryOptions({
        queryKey: ["movie", id],
        queryFn: () => movieApi.getMovieDetails(id),
    }),
    movieSnippetById: (id: string) => queryOptions({
        queryKey: ["movie", id],
        queryFn: () => movieApi.getMovieDetails(id),
        select: mapMovieDetailsToSnippet,
    }),
    movieSimilar: (id: string) => infiniteQueryOptions({
        queryKey: ["movie", id, "similar"],
        initialPageParam: 1,
        getNextPageParam: (_lastPage, _all, lastPageParam) => {
            return lastPageParam + 1;
        },
        queryFn: ({ pageParam }: { pageParam: number }) => movieApi.getSimilarMovies(id, pageParam),
    }),
    movieTrailer: (id: string) => queryOptions({
        queryKey: ["movie", id, "trailer"],
        queryFn: () => movieApi.getMovieTrailer(id),
    }),
}
