import z from "zod";

export const TMDB_BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
export const TMDB_BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";

// Удобные хелперы для сборки URL картинок, чтобы не дублировать тернарники в сущностях
export const getTmdbPosterUrl = (path?: string | null) =>
    path ? `${TMDB_IMAGE_BASE_URL}${path}` : "https://placehold.co/600x900?text=No+Poster";

export const getTmdbBackdropUrl = (path?: string | null) =>
    path ? `${TMDB_BACKDROP_BASE_URL}${path}` : "https://placehold.co/1200x800?text=No+Image";

export class ApiError extends Error {
    constructor(
        public status: number,
        message: string
    ) {
        super(message);
        this.name = "ApiError";
    }
}


export async function tmdbFetch<T>(endpoint: string, dtoSchema: z.ZodType<T>, options?: RequestInit, signal?: AbortSignal): Promise<T> {
    const token = process.env.NEXT_PUBLIC_TMDB_TOKEN;

    const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
    if (!url.searchParams.has("language")) {
        url.searchParams.set("language", "ru-RU");
    }

    const response = await fetch(url.toString(), {
        ...options,
        headers: {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
            ...options?.headers,
        },
        signal,
    });

    if (!response.ok) {
        throw new ApiError(
            response.status,
            `TMDB API Error: ${response.status} ${response.statusText}`
        );
    }

    const json = await response.json();
    return dtoSchema.parse(json);
}