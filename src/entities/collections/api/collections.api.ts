import { tmdbFetch } from "@/shared/api/tmdb";
import {
    MovieSnippetEntity,
    PopularMoviesResponseSchema,
} from "@/entities/movie/model/movie.types";
import { CollectionType } from "../model/collections.types";

function getFormattedDate(offsetDays = 0): string {
    const date = new Date();
    date.setDate(date.getDate() + offsetDays);
    return date.toISOString().split("T")[0];
}

function buildDiscoverEndpoint(type: CollectionType, page: number): string {
    const params = new URLSearchParams({
        include_adult: "false",
        include_video: "false",
        page: String(page),
    });

    switch (type) {
        case "now_playing": {
            const minDate = getFormattedDate(-42);
            const maxDate = getFormattedDate(2);
            params.set("sort_by", "popularity.desc");
            params.set("with_release_type", "2|3");
            params.set("release_date.gte", minDate);
            params.set("release_date.lte", maxDate);
            break;
        }
        case "best_2026": {
            params.set("primary_release_year", "2026");
            params.set("sort_by", "vote_average.desc");
            params.set("without_genres", "99,10755");
            params.set("vote_count.gte", "100");
            break;
        }
        case "top_rated": {
            params.set("sort_by", "vote_average.desc");
            params.set("without_genres", "99,10755");
            params.set("vote_count.gte", "200");
            break;
        }
        case "upcoming": {
            const minDate = getFormattedDate(2);
            const maxDate = getFormattedDate(30);
            params.set("sort_by", "popularity.desc");
            params.set("with_release_type", "2|3");
            params.set("release_date.gte", minDate);
            params.set("release_date.lte", maxDate);
            break;
        }
    }

    return `/discover/movie?${params.toString()}`;
}

export const collectionsApi = {
    getCategoryPreview: async (type: CollectionType): Promise<MovieSnippetEntity[]> => {
        const endpoint = type === "best_2026"
            ? buildDiscoverEndpoint("best_2026", 1)
            : `/movie/${type}?page=1`;

        const data = await tmdbFetch(
            endpoint,
            PopularMoviesResponseSchema
        );
        return data.results;
    },

    getCollectionDiscover: async (
        type: CollectionType,
        page: number
    ): Promise<MovieSnippetEntity[]> => {
        const endpoint = buildDiscoverEndpoint(type, page);
        const data = await tmdbFetch(
            endpoint,
            PopularMoviesResponseSchema
        );
        return data.results;
    },
};
