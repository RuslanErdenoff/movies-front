import { getTmdbBackdropUrl, getTmdbPosterUrl } from "@/shared/api/tmdb";
import z from "zod";

const GENRES_MAP: Record<number, string> = {
    28: "Боевик",
    12: "Приключения",
    16: "Мультфильм",
    35: "Комедия",
    80: "Криминал",
    99: "Документальный",
    18: "Драма",
    10751: "Семейный",
    14: "Фэнтези",
    36: "История",
    27: "Ужасы",
    10402: "Музыка",
    9648: "Детектив",
    10749: "Мелодрама",
    878: "Фантастика",
    10770: "ТВ-фильм",
    53: "Триллер",
    10752: "Военный",
    37: "Вестерн",
};



export const MovieSnippetSchema = z.object({
    id: z.number(),
    title: z.string().default("Без названия"),
    poster_path: z.string().nullable().optional(),
    vote_average: z.number().default(0),
    release_date: z.string().optional().default(""),
    genre_ids: z.array(z.number()).optional().default([]),
})
const mapMovieSnippet = (dto: z.infer<typeof MovieSnippetSchema>) => ({
    id: String(dto.id),
    title: dto.title || "Без названия",
    posterUrl: getTmdbPosterUrl(dto.poster_path),
    rating: Number(dto.vote_average.toFixed(1)),
    year: dto.release_date ? dto.release_date.slice(0, 4) : "—",
    genre: (dto.genre_ids[0] && GENRES_MAP[dto.genre_ids[0]]) || "Кино",
});
export const MovieSnippetDto = MovieSnippetSchema.transform(mapMovieSnippet)


// export const MovieDetailsSchema = MovieSnippetSchema.extend({
//     backdrop_path: z.string().nullable().optional(),
//     overview: z.string().default(""),
//     runtime: z.number().nullable().optional(),
//     genres: z.array(z.object({ id: z.number(), name: z.string() })).default([]),
// })

// export const MovieDetailProductionCompaniesDto = z.object({
//     id: z.number().default(0),
//     logo_path: z.string().nullable().optional(),
//     name: z.string().default("-"),
//     origin_country: z.string().default("-"),
// })

// export const MovieDetialDto = MovieDetailsSchema.transform((dto) => {
//     return {
//         ...mapMovieSnippet(dto),
//         genre: dto.genres[0]?.name || "Кино",
//         genres: dto.genres.map((g) => g.name),
//         backdropUrl: getTmdbBackdropUrl(dto.backdrop_path),
//         description: dto.overview || "Описание отсутствует",
//         duration: dto.runtime ? `${dto.runtime} мин.` : "—",
//     }
// })

export const PopularMoviesResponseSchema = z.object({
    page: z.number(),
    results: z.array(MovieSnippetDto),
});


// Автоматически выводим TypeScript-тип для дженерика
export type MovieSnippetEntity = z.infer<typeof MovieSnippetDto>;
// export type MovieDetailsEntity = z.infer<typeof MovieDetialDto>;
