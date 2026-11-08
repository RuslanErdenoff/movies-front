import { tmdbFetch } from "@/shared/api/tmdb";
import { MovieSnippetEntity, PopularMoviesResponseSchema } from "../model/movie.types";
import { MovieDetailsDtoSchema, MovieDetailsEntity } from "../model/movie-detail.types";
import {
    MovieVideoEntity,
    MovieVideosResponseSchema,
    pickBestYoutubeTrailer,
} from "../model/movie-video.types";


type SearchMoviesParams = {
    query: string
    page: number
    signal?: AbortSignal;
}


export const movieApi = {
    getPopularList: async (page: number): Promise<MovieSnippetEntity[]> => {
        const data = await tmdbFetch(
            `/movie/popular?page=${page}`,
            PopularMoviesResponseSchema
        )
        return data.results;
    },
    getMovieDetails: async (id: string): Promise<MovieDetailsEntity> => {
        const data = await tmdbFetch(
            `/movie/${id}`,
            MovieDetailsDtoSchema
        )

        return data;
    },
    searchMovies: async ({ query, page, signal }: SearchMoviesParams): Promise<MovieSnippetEntity[]> => {
        const data = await tmdbFetch(
            `/search/movie?query=${encodeURIComponent(query)}&page=${page}`,
            PopularMoviesResponseSchema,
            {
                signal
            }
        );
        return data.results;
    },
    getSimilarMovies: async (id: string, page: number): Promise<MovieSnippetEntity[]> => {
        const data = await tmdbFetch(
            `/movie/${id}/similar?page=${page}`,
            PopularMoviesResponseSchema
        )
        return data.results;
    },
    getMovieTrailer: async (id: string): Promise<MovieVideoEntity | null> => {
        const ruData = await tmdbFetch(
            `/movie/${id}/videos`,
            MovieVideosResponseSchema
        );
        const ruTrailer = pickBestYoutubeTrailer(ruData.results);
        if (ruTrailer) return ruTrailer;

        const enData = await tmdbFetch(
            `/movie/${id}/videos?language=en-US`,
            MovieVideosResponseSchema
        );
        return pickBestYoutubeTrailer(enData.results);
    },
}
