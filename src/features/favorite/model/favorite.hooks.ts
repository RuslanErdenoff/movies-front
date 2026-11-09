'use client'

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { favoritesQO, toggleFavoriteMO } from "../api/favorite.options";
import { MovieSnippetEntity } from "@/entities/movie/model/movie.types";

export type ToggleFavoriteProps = {
    movie: MovieSnippetEntity;
    isFavorite: boolean;
}

export function useIsFavorite(movieId: string) {
    return useQuery({
        ...favoritesQO.all(),
        select: (data) => {
            return data?.some((item) => item.id === movieId) ?? false;
        },
    })
}

export function useToggleFavorite() {
    const queryClient = useQueryClient()
    const queryKey = favoritesQO.all().queryKey;
    return useMutation({
        ...toggleFavoriteMO.toggle(),
        onMutate: async ({ movie, isFavorite }) => {
            await queryClient.cancelQueries({ queryKey });
            const previousMovies = queryClient.getQueryData<MovieSnippetEntity[]>(queryKey) ?? [];

            queryClient.setQueryData<MovieSnippetEntity[]>(queryKey, (prev = []) => {
                if (isFavorite) {
                    return [...prev.filter((item) => item.id !== movie.id), movie];
                } else {
                    return prev.filter((item) => item.id !== movie.id);
                }
            });

            return { previousMovies };
        },
        onError(_error, _variables, context) {
            if (context?.previousMovies) {
                queryClient.setQueryData(queryKey, context.previousMovies);
            }
        },
        onSettled() {
            queryClient.invalidateQueries({ queryKey });
        },
    })
}

export function useSyncFavorites() {
    const queryClient = useQueryClient()
    const queryKey = favoritesQO.all().queryKey;

    const syncMutation = useMutation({
        ...toggleFavoriteMO.sync(),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey });
        },
    })

    const resetFavoritesCache = () => {
        queryClient.invalidateQueries({ queryKey });
    };

    return {
        syncOnLogin: syncMutation.mutateAsync,
        resetOnLogout: resetFavoritesCache,
    };
}
