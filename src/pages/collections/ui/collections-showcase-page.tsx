import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { AppBar, AppBarBackArrow } from "@/shared/ui/app-bar/app-bar";
import { COLLECTIONS_META, isCollectionType } from "@/entities/collections/model/collections.types";
import { collectionsQO } from "@/entities/collections/api/collections.options";
import { CollectionsHeader } from "@/entities/collections/ui/header/collections-header";
import { MovieCollectionList } from "@/widgets/movie/ui/collection/movie-collection-list";
import "./collections-showcase-page.css";

export async function CollectionsShowcasePage({ id }: { id: string }) {
    const cleanId = id.trim();

    if (!isCollectionType(cleanId)) {
        notFound();
    }

    const queryClient = new QueryClient();
    const meta = COLLECTIONS_META[cleanId];

    await queryClient.infiniteQuery(collectionsQO.discover(cleanId));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="collections-showcase-page">
                <AppBar>
                    <AppBarBackArrow />
                </AppBar>
                <CollectionsHeader title={meta.title} subtitle={meta.subtitle} />
                <MovieCollectionList type={cleanId} />
            </div>
        </HydrationBoundary>
    )
}
