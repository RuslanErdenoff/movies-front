import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { catalogQO } from "@/entities/catalog/api/catalog.options";
import { CatalogTitle } from "@/entities/catalog/ui/title/catalog-title";
import { GenreList } from "@/widgets/movie/ui/catalog/genre-list";
import "./catalog-page.css";

export async function CatalogPage() {
    const queryClient = new QueryClient();

    await queryClient.query(catalogQO.genres());

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="catalog-page">
                <CatalogTitle />
                <GenreList />
            </div>
        </HydrationBoundary>
    )
}
