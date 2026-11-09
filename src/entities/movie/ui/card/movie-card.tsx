import './movie-card.css'
import Link from 'next/link'
import { MovieRating } from '../rating/movie-rating'
import { MovieSnippetEntity } from '../../model/movie.types'


function MovieCardRoot({ movie, children }: { movie: MovieSnippetEntity, children: React.ReactNode }) {
    return (
        <Link href={`/movies/${movie.id}`} className="movie-card-root">
            {children}
        </Link>
    )
}

function MovieCardImage({
    movie,
    actionSlot,
}: {
    movie: MovieSnippetEntity
    actionSlot?: React.ReactNode
}) {
    return (
        <div className="movie-card-image">
            <img src={movie.posterUrl} alt={movie.title} />
            <MovieRating rate={movie.rating} variant='card' />
            {actionSlot && (
                <div className="movie-card-favorite">
                    {actionSlot}
                </div>
            )}
        </div>
    )
}


function MovieCardInfo({ movie }: { movie: MovieSnippetEntity }) {
    return (
        <div className="movie-card-info">
            <span className="movie-card-info-name">{movie.title}</span>
            <div style={
                {
                    display: 'flex',
                    flexDirection: 'row',
                    gap: "8px",
                    alignItems: 'center',
                    justifyContent: 'start',
                }
            }>
                <span className="movie-card-info-additional">{movie.year}</span>
                <span className="movie-card-info-additional">*</span>
                <span className="movie-card-info-additional">{movie.genre}</span>
            </div>


        </div>
    )
}

export function MovieCard({
    movie,
    actionSlot,
}: {
    movie: MovieSnippetEntity
    actionSlot?: React.ReactNode
}) {
    return (
        <MovieCardRoot movie={movie}>
            <MovieCardImage movie={movie} actionSlot={actionSlot} />
            <MovieCardInfo movie={movie} />
        </MovieCardRoot>
    )
}