import './movie-rating.css'
import Image from 'next/image'
import starIcon from '@/shared/assets/icons/star.svg'


type MovieRatingProps = {
    rate: number,
    variant?: 'card' | 'detail'
}
export function MovieRating({ rate, variant = 'card' }: MovieRatingProps) {
    return (
        <div className={`movie-rating movie-rating--${variant}`}>
            <Image src={starIcon} alt="Star" width={16} height={16} />
            <span>{rate}</span>
        </div>
    )
}