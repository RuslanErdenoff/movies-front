'use client'

import { FavoriteIcon } from "@/shared/ui/favorite/favorite";
import { MovieSnippetEntity } from "@/entities/movie/model/movie.types";
import { useIsFavorite, useToggleFavorite } from "../model/favorite_hooks";

export function FavoriteButton({ movie }: { movie: MovieSnippetEntity }) {
    const { data: isFavorite = false } = useIsFavorite(movie.id)
    const { mutate } = useToggleFavorite()

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        mutate({ movie, isFavorite: !isFavorite })
    };

    return (
        <div
            onClick={handleClick}
            className="flex items-center justify-center rounded-full box-content w-4 h-4 p-2 bg-black cursor-pointer select-none"
        >
            <FavoriteIcon isActive={isFavorite} />
        </div>
    )
}
