import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { collectionsApi } from "./collections.api";
import { CollectionType } from "../model/collections.types";

export const collectionsQO = {
    preview: (type: CollectionType) =>
        queryOptions({
            queryKey: ["collections", "preview", type],
            queryFn: () => collectionsApi.getCategoryPreview(type),
        }),

    discover: (type: CollectionType) =>
        infiniteQueryOptions({
            queryKey: ["collections", "discover", type],
            initialPageParam: 1,
            getNextPageParam: (lastPage, _all, lastPageParam) => {
                if (lastPage.length === 0) return undefined;
                return lastPageParam + 1;
            },
            queryFn: ({ pageParam }: { pageParam: number }) =>
                collectionsApi.getCollectionDiscover(type, pageParam),
        }),
};
