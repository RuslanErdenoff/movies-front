
import { FavoriteIcon } from '@/shared/ui/favorite/favorite'
import Link from 'next/link'
import { MovieRating } from '../rating/movie-rating'
import { FavoriteButton } from '@/features/favorite/ui/favorite_button'
import { MovieSnippetEntity } from '../../model/movie.types'


function MovieCardRoot({ movie, children }: { movie: MovieSnippetEntity, children: React.ReactNode }) {
    return (
        <Link href={`/movies/${movie.id}`} className="w-full flex flex-col gap-2 cursor-pointer overflow-hidden min-w-0 transition duration-150 ease-in-out hover:-translate-y-1 active:scale-96 active:opacity-75">
            {children}
        </Link>
    )
}

function MovieCardImage({ movie }: { movie: MovieSnippetEntity }) {
    return (
        <div className="relative w-full aspect-3/4 rounded-xl overflow-hidden">
            <img className="w-full h-full object-cover" src={movie.posterUrl} alt={movie.title} />
            <MovieRating rate={movie.rating} variant='card' />
            <MovieCardFavorite movie={movie} />
        </div>
    )
}


function MovieCardFavorite({ movie }: { movie: MovieSnippetEntity }) {
    return (
        <div className="absolute top-2 right-2">
            <FavoriteButton movie={movie} />
        </div>
    )
}


function MovieCardInfo({ movie }: { movie: MovieSnippetEntity }) {
    return (
        <div className="flex flex-col gap-1">
            <span className="text-[24px]/[1] wrap-break-word">{movie.title}</span>
            <div className="flex flex-row gap-2 items-center justify-start text-[gray]">
                <span>{movie.year}</span>
                <span>*</span>
                <span>{movie.genre}</span>
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