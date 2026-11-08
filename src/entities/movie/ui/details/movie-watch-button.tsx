'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { movieQO } from '@/entities/movie/api/movie.options'
import { BottomSheet } from '@/shared/ui/bottom-sheet/bottom-sheet'
import { YoutubePlayer } from '@/shared/ui/youtube-player/youtube-player'
import './movie-watch-button.css'

export function MovieWatchButton({ movieId }: { movieId: string }) {
    const [isOpen, setIsOpen] = useState(false)
    const { data: trailer } = useQuery(movieQO.movieTrailer(movieId))

    if (!trailer) {
        return null
    }

    return (
        <>
            <div className="movie-watch-button-container">
                <button
                    type="button"
                    className="movie-watch-button"
                    onClick={() => setIsOpen(true)}
                >
                    <span>Смотреть трейлер</span>
                </button>
            </div>

            <BottomSheet
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title={trailer.name}
            >
                <YoutubePlayer videoKey={trailer.key} title={trailer.name} />
            </BottomSheet>
        </>
    )
}
