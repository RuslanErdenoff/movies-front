import z from "zod";

export const GenreSchema = z.object({
    id: z.number(),
    name: z.string().default("Жанр"),
});

const mapGenre = (dto: z.infer<typeof GenreSchema>) => ({
    id: String(dto.id),
    name: dto.name
        ? dto.name.charAt(0).toUpperCase() + dto.name.slice(1)
        : "Жанр",
});

export const GenreDto = GenreSchema.transform(mapGenre);

export const GenresResponseSchema = z.object({
    genres: z.array(GenreDto),
});

export type GenreEntity = z.infer<typeof GenreDto>;
