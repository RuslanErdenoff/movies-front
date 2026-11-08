import { tmdbFetch } from "@/shared/api/tmdb";
import {
    MovieSnippetEntity,
    PopularMoviesResponseSchema,
} from "@/entities/movie/model/movie.types";
import { GenreEntity, GenresResponseSchema } from "../model/catalog.types";

export const catalogApi = {
    getGenresList: async (): Promise<GenreEntity[]> => {
        const data = await tmdbFetch(
            `/genre/movie/list`,
            GenresResponseSchema
        );
        return data.genres;
    },

    getMoviesByGenre: async (
        genreId: string,
        page: number
    ): Promise<MovieSnippetEntity[]> => {
        const data = await tmdbFetch(
            `/discover/movie?include_adult=false&include_video=false&sort_by=popularity.desc&with_genres=${encodeURIComponent(genreId)}&page=${page}`,
            PopularMoviesResponseSchema
        );
        return data.results;
    },
};
