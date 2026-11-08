
'use client'
import './movie-detail-hero.css'

export function MovieDetailHero({ srcUrl }: { srcUrl: string }) {
    return (
        <div className="movie-detail-hero">
            <img src={srcUrl} alt="" />
        </div>
    )
}