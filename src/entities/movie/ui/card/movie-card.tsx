
import { FavoriteIcon } from '@/shared/ui/favorite/favorite'
import './movie-card.css'
import Link from 'next/link'
import { MovieRating } from '../rating/movie-rating'
import { FavoriteButton } from '@/features/favorite/ui/favorite_button'
import { MovieSnippetEntity } from '../../model/movie.types'


function MovieCardRoot({ movie, children }: { movie: MovieSnippetEntity, children: React.ReactNode }) {
    return (
        <Link href={`/movies/${movie.id}`} className="movie-card-root">
            {children}
        </Link>
    )
}

function MovieCardImage({ movie }: { movie: MovieSnippetEntity }) {
    return (
        <div className="movie-card-image">
            <img src={movie.posterUrl} alt={movie.title} />
            <MovieRating rate={movie.rating} variant='card' />
            <MovieCardFavorite movie={movie} />
        </div>
    )
}


function MovieCardFavorite({ movie }: { movie: MovieSnippetEntity }) {
    return (
        <div className="movie-card-favorite">
            <FavoriteButton movie={movie} />
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

export function MovieCard({ movie }: { movie: MovieSnippetEntity }) {
    return (
        <MovieCardRoot movie={movie}>
            <MovieCardImage movie={movie} />
            <MovieCardInfo movie={movie} />
        </MovieCardRoot>
    )
}