import z from "zod";

export const MovieVideoItemSchema = z.object({
    id: z.string(),
    key: z.string(),
    name: z.string().default("Трейлер"),
    site: z.string(),
    type: z.string(),
    official: z.boolean().default(false),
});

export const MovieVideosResponseSchema = z.object({
    id: z.number(),
    results: z.array(MovieVideoItemSchema).default([]),
});

export type MovieVideoEntity = z.infer<typeof MovieVideoItemSchema>;

export function pickBestYoutubeTrailer(videos: MovieVideoEntity[]): MovieVideoEntity | null {
    const youtubeVideos = videos.filter((v) => v.site === "YouTube" && v.key);
    if (youtubeVideos.length === 0) return null;

    return (
        youtubeVideos.find((v) => v.type === "Trailer" && v.official) ??
        youtubeVideos.find((v) => v.type === "Trailer") ??
        youtubeVideos[0]
    );
}
