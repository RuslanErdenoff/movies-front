'use client'

import { MovieCard } from "@/entities/movie/ui/card/movie-card";
import { MovieSnippetEntity } from "@/entities/movie/model/movie.types";
import { ProfileFavoriteEmpty } from "@/entities/profile/ui/empty/profile-favorite-empty";
import { movieListClassName } from "../list/movie-list";

export function MovieFavoriteList({ movies }: { movies: MovieSnippetEntity[] }) {
    return (
        <div className="flex flex-col gap-3">
            <p className="text-[18px] font-bold text-[#FFFFFF] m-0">Избранные фильмы</p>
            {movies.length === 0 ? (
                <ProfileFavoriteEmpty />
            ) : (
                <div className="flex flex-col">
                    <div className={`${movieListClassName} !p-0`}>
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
