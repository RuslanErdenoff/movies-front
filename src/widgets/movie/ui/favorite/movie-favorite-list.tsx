'use client'

import { MovieCard } from "@/entities/movie/ui/card/movie-card";
import { MovieSnippetEntity } from "@/entities/movie/model/movie.types";
import { ProfileFavoriteEmpty } from "@/entities/profile/ui/empty/profile-favorite-empty";
import "../list/movie-list.css";
import "./movie-favorite-list.css";

export function MovieFavoriteList({ movies }: { movies: MovieSnippetEntity[] }) {
    return (
        <div className="movie-favorite-list">
            <p className="movie-favorite-list-title">Избранные фильмы</p>
            {movies.length === 0 ? (
                <ProfileFavoriteEmpty />
            ) : (
                <div className="movie-list-container">
                    <div className="movie-list">
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
