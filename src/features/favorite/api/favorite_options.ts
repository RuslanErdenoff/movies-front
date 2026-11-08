import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { favoriteApi } from "./favorite.api";

export const favoritesQO = {
    all: (serverUserId?: string) => queryOptions({
        queryKey: ['favorite'],
        queryFn: () => favoriteApi.getAllMovies(serverUserId),
    })
}

export const toggleFavoriteMO = {
    toggle: () => mutationOptions({
        mutationKey: ["toggle-favorite"],
        mutationFn: favoriteApi.toggle,
    }),
    sync: () => mutationOptions({
        mutationKey: ["sync-favorite"],
        mutationFn: () => favoriteApi.syncLocalToDb(),
    }),
}
