
import Image from 'next/image'
import starIcon from '@/shared/assets/icons/star.svg'


type MovieRatingProps = {
    rate: number,
    variant?: 'card' | 'detail'
}
const variantClasses = {
    card: 'absolute text-[16px]',
    detail: 'static text-[14px]'
}
export function MovieRating({ rate, variant = 'card' }: MovieRatingProps) {
    return (
        // <div className={`movie-rating movie-rating--${variant}`}>
        <div className={`flex flex-row gap-1 top-2 left-2 rounded-[4px] py-1 px-2 text-[#F3B11F] bg-[#2F250D] items-center justify-center font-bold italic ${variantClasses[variant]}`}>
            <Image src={starIcon} alt="Star" width={16} height={16} />
            <span>{rate}</span>
        </div>
    )
}