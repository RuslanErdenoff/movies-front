import { getTmdbBackdropUrl, getTmdbPosterUrl } from "@/shared/api/tmdb";
import z from "zod";
import { MovieSnippetEntity } from "./movie.types";

export const GenreSchema = z.object({
    id: z.number(),
    name: z.string(),
});
export type Genre = z.infer<typeof GenreSchema>;

export const ProductionCompanySchema = z.object({
    id: z.number(),
    logo_path: z.string().nullable().optional(), // <-- У половины студий нет логотипа (приходит null)
    name: z.string(),
    origin_country: z.string().optional().default(""),
});
export type ProductionCompany = z.infer<typeof ProductionCompanySchema>;

export const ProductionCountrySchema = z.object({
    iso_3166_1: z.string(),
    name: z.string(),
});
export type ProductionCountry = z.infer<typeof ProductionCountrySchema>;

export const SpokenLanguageSchema = z.object({
    english_name: z.string().optional().default(""),
    iso_639_1: z.string(),
    name: z.string(),
});
export type SpokenLanguage = z.infer<typeof SpokenLanguageSchema>;

export const MovieDetailsSchema = z.object({
    adult: z.boolean().default(false),
    backdrop_path: z.string().nullable().optional(),
    budget: z.number().default(0),
    genres: z.array(GenreSchema).default([]),
    homepage: z.string().nullable().optional(),
    id: z.number(),
    imdb_id: z.string().nullable().optional(),
    origin_country: z.array(z.string()).default([]),
    original_language: z.string().default(""),
    original_title: z.string().default(""),
    overview: z.string().nullable().optional(),
    popularity: z.number().default(0),
    poster_path: z.string().nullable().optional(),
    production_companies: z.array(ProductionCompanySchema).default([]),
    production_countries: z.array(ProductionCountrySchema).default([]),
    release_date: z.string().nullable().optional(),
    revenue: z.number().default(0),
    runtime: z.number().nullable().optional(),
    spoken_languages: z.array(SpokenLanguageSchema).default([]),
    status: z.string().default(""),
    tagline: z.string().nullable().optional(),
    title: z.string().default("Без названия"),
    video: z.boolean().default(false),
    vote_average: z.number().default(0),
    vote_count: z.number().default(0),
});

const mapMovieDetailsSchema = (dto: z.infer<typeof MovieDetailsSchema>) => {
    return {
        adult: dto.adult,
        posterUrl: getTmdbPosterUrl(dto.poster_path),
        backdropUrl: getTmdbBackdropUrl(dto.backdrop_path),
        budget: dto.budget ? `${dto.budget.toLocaleString("ru-RU")} $` : null,
        genres: dto.genres.map((genre) => genre.name),
        homepage: dto.homepage ?? "",
        id: dto.id,
        imdbId: dto.imdb_id ?? "",
        originalLanguage: dto.original_language,
        originalTitle: dto.original_title,
        description: dto.overview || "Описание отсутствует",
        popularity: dto.popularity,
        productionCompanies: dto.production_companies.map((company) => company.name).join(", ") || null,
        productionCountries: dto.production_countries.map((country) => country.name).join(", ") || null,
        rating: Number(dto.vote_average.toFixed(1)),
        year: dto.release_date ? dto.release_date.slice(0, 4) : null,
        revenue: dto.revenue ? `${dto.revenue.toLocaleString("ru-RU")} $` : null,
        duration: dto.runtime ? `${dto.runtime} мин.` : null,
        spokenLanguages: dto.spoken_languages.map((language) => language.name).join(", ") || null,
        status: dto.status,
        tagline: dto.tagline ?? "",
        title: dto.title,
        video: dto.video,
        voteCount: dto.vote_count,
    };
};

export const MovieDetailsDtoSchema = MovieDetailsSchema.transform(mapMovieDetailsSchema);
export type MovieDetailsEntity = z.infer<typeof MovieDetailsDtoSchema>;

export const mapMovieDetailsToSnippet = (movie: MovieDetailsEntity): MovieSnippetEntity => {
    const firstGenre = movie.genres[0];
    return {
        id: String(movie.id),
        title: movie.title,
        posterUrl: movie.posterUrl,
        rating: movie.rating,
        year: movie.year ?? "—",
        genre: firstGenre
            ? firstGenre.charAt(0).toUpperCase() + firstGenre.slice(1)
            : "Кино",
    };
};