import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { catalogApi } from "./catalog.api";

export const catalogQO = {
    genres: () =>
        queryOptions({
            queryKey: ["catalog", "genres"],
            queryFn: () => catalogApi.getGenresList(),
        }),

    moviesByGenre: (genreId: string) =>
        infiniteQueryOptions({
            queryKey: ["catalog", "movies", genreId],
            initialPageParam: 1,
            getNextPageParam: (lastPage, _all, lastPageParam) => {
                if (lastPage.length === 0) return undefined;
                return lastPageParam + 1;
            },
            queryFn: ({ pageParam }: { pageParam: number }) =>
                catalogApi.getMoviesByGenre(genreId, pageParam),
        }),
};
