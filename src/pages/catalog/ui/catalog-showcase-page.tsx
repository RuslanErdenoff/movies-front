import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { AppBar, AppBarBackArrow } from "@/shared/ui/app-bar/app-bar";
import { catalogQO } from "@/entities/catalog/api/catalog.options";
import { CatalogHeader } from "@/entities/catalog/ui/header/catalog-header";
import { MovieCatalogList } from "@/widgets/movie/ui/catalog/movie-catalog-list";
import "./catalog-showcase-page.css";

export async function CatalogShowcasePage({ id }: { id: string }) {
    const cleanId = id.trim();
    const queryClient = new QueryClient();

    const [genresResult] = await Promise.allSettled([
        queryClient.query(catalogQO.genres()),
        queryClient.infiniteQuery(catalogQO.moviesByGenre(cleanId)),
    ]);

    const genres = genresResult.status === 'fulfilled' ? genresResult.value : []
    const currentGenre = genres.find((g) => g.id === cleanId)

    const title = currentGenre?.name ?? "Жанр";

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="catalog-showcase-page">
                <AppBar>
                    <AppBarBackArrow />
                </AppBar>
                <CatalogHeader title={title} />
                <MovieCatalogList genreId={cleanId} />
            </div>
        </HydrationBoundary>
    )
}
