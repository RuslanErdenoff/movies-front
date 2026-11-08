import { AppBar, AppBarBackArrow } from "@/shared/ui/app-bar/app-bar";
import { MovieDetailHero } from "@/entities/movie/ui/details/movie-detail-hero";
import { MovieDetails } from "@/entities/movie/ui/details/movie-details";
import { MovieWatchButton } from "@/entities/movie/ui/details/movie-watch-button";
import { FavoriteButton } from "@/features/favorite/ui/favorite_button";
import { mapMovieDetailsToSnippet } from "@/entities/movie/model/movie-detail.types";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { movieQO } from "@/entities/movie/api/movie.options";
import { MovieSimilarList } from "@/widgets/movie/ui/similar/movie-similar-list";
import { ApiError } from "@/shared/api/tmdb";
import { notFound } from "next/navigation";
import "./movie-detail-page.css";

export async function MovieDetailPage({ id }: { id: string }) {
    const queryClient = new QueryClient();
    let movie;

    try {
        const [movieResult] = await Promise.all([
            queryClient.query(movieQO.movieDetails(id)),
            queryClient.query(movieQO.movieTrailer(id)).catch(() => null),
        ]);
        movie = movieResult;
    } catch (error) {
        if (error instanceof ApiError && error.status === 404) {
            notFound();
        }
        // Если другая ошибка (например, отвалился интернет или 500) — пробрасываем в error.tsx
        throw error;
    }

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="movie-detail-page">
                <AppBar>
                    <AppBarBackArrow />
                    <FavoriteButton movie={mapMovieDetailsToSnippet(movie)} />
                </AppBar>
                <MovieDetailHero srcUrl={movie.posterUrl} />
                <MovieDetails movie={movie} />
                <MovieSimilarList movieId={id} />
                <MovieWatchButton movieId={id} />
            </div>
        </HydrationBoundary>
    );
}
