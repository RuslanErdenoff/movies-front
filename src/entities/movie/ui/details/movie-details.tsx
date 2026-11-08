import { MovieDetailsEntity } from '../../model/movie-detail.types'
import { MovieRating } from '../rating/movie-rating'
import './movie-details.css'

function MovieDetailsHeader({ title, rating, year, genres, duration }: { title: string, rating: number, year: string | null, genres: string[], duration: string | null }) {
    return (
        <div className="movie-details-header">
            <div className="movie-details-header-title">
                <span>{title}</span>
                {rating > 0 && <MovieRating rate={rating} variant='detail' />}
            </div>
            <span>{year ?? ''} | {genres.join(', ')} | {duration ?? ''}</span>
        </div>
    )
}
function MovieDetailsAboutDescription({ description }: { description: string }) {
    return (
        <span className="movie-details-about-description">
            {description}
        </span>
    )
}

function MovieDetailsAboutAttributes({ movie }: { movie: MovieDetailsEntity }) {
    return (
        <div className="movie-details-about-attributes">
            <MovieDetailsAboutAttributeItem attribute='Слоган' value={movie.tagline} />
            {movie.productionCountries && <MovieDetailsAboutAttributeItem attribute='Страна' value={movie.productionCountries} />}
            {movie.budget && <MovieDetailsAboutAttributeItem attribute='Бюджет' value={movie.budget} />}
            {movie.revenue && <MovieDetailsAboutAttributeItem attribute='Сборы' value={movie.revenue} />}
        </div>
    )
}
function MovieDetailsAboutAttributeItem({ attribute, value }: { attribute: string, value: string }) {
    return (
        <div className="movie-details-about-attribute-item">
            <span>{attribute}</span>
            <span>{value}</span>
        </div>
    )
}
function MovieDetailsAboutContainer({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div className="movie-details-about-container">
                <span style={{
                    fontSize: "24px",
                    fontWeight: "500"
                }}>О фильме</span>
                {children}
            </div>
        </div>
    )
}

function MovieDetailsRoot({ children }: { children: React.ReactNode }) {
    return (
        <div className="movie-details">
            {children}
        </div>
    )
}
function MovieDetailsBottomSection({ children }: { children: React.ReactNode }) {
    return (
        <div className="movie-details-bottom-section">
            {children}
        </div>
    )
}



export function MovieDetails({ movie }: { movie: MovieDetailsEntity }) {
    return (
        <MovieDetailsRoot>
            <MovieDetailsHeader title={movie.title} rating={movie.rating} year={movie.year} genres={movie.genres} duration={movie.duration} />
            <MovieDetailsBottomSection>
                <MovieDetailsAboutContainer>
                    <MovieDetailsAboutDescription description={movie.description} />
                    <MovieDetailsAboutAttributes movie={movie} />
                </MovieDetailsAboutContainer>
            </MovieDetailsBottomSection>
        </MovieDetailsRoot>
    )
}