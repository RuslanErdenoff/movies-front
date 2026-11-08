export const COLLECTION_TYPES = [
    "now_playing",
    "best_2026",
    "top_rated",
    "upcoming",
] as const;

export type CollectionType = (typeof COLLECTION_TYPES)[number];

export const COLLECTIONS_META: Record<
    CollectionType,
    { title: string; subtitle: string }
> = {
    now_playing: {
        title: "Сейчас в кино",
        subtitle: "Фильмы в текущем прокате",
    },
    best_2026: {
        title: "Лучшие 2026",
        subtitle: "Главные фильмы 2026 года с высоким рейтингом",
    },
    top_rated: {
        title: "Высокий рейтинг",
        subtitle: "Лучшие фильмы по оценкам зрителей",
    },
    upcoming: {
        title: "Скоро в кино",
        subtitle: "Ближайшие премьеры",
    },
};

export function isCollectionType(value: string): value is CollectionType {
    return (COLLECTION_TYPES as readonly string[]).includes(value);
}
