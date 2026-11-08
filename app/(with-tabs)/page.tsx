import { MoviesPage } from "@/pages/movies/ui/movies-page";

export default async function WithTabsPage(
    { searchParams }: {
        searchParams: Promise<{ search?: string }>;
    }
) {
    const { search = "" } = await searchParams;
    return <MoviesPage query={search} />
}