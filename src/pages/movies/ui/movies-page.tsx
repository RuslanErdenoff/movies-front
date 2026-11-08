import { MainTitle } from "@/entities/main/ui/main-title"
import { MainInput } from "@/features/main/ui/main-search"
import { MainFilter } from "@/widgets/main/ui/main-filter"
import './movies-page.css'
import { MovieCardList } from "@/widgets/movie/ui/list/movie-list"
import { movieQO } from "@/entities/movie/api/movie.options"
import { collectionsQO } from "@/entities/collections/api/collections.options"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { cookies } from "next/headers"
import { favoritesQO } from "@/features/favorite/api/favorite_options"

export async function MoviesPage({ query = "" }: { query?: string }) {
    const cookieStore = await cookies()
    const uid = cookieStore.get("user_uid")?.value;

    const queryClient = new QueryClient();
    const cleanQuery = query.trim();

    // Префетчим 1-ю страницу на сервере: если есть ?search= — ищем, если нет — popular + превью первых коллекций
    if (cleanQuery.length > 0) {
        await Promise.allSettled([
            queryClient.infiniteQuery(movieQO.search({ query: cleanQuery })),
            queryClient.query(favoritesQO.all(uid))
        ])
    } else {
        await Promise.allSettled([
            queryClient.infiniteQuery(movieQO.popular()),
            queryClient.query(collectionsQO.preview("now_playing")),
            queryClient.query(collectionsQO.preview("best_2026")),
            queryClient.query(favoritesQO.all(uid))
        ]);
    }


    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="movies-page">
                <MainTitle />
                <MainInput />
                {/* <MainFilter /> */}
                <MovieCardList />
            </div>
        </HydrationBoundary>
    )
}
