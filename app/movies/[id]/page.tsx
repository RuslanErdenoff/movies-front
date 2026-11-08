import { MovieDetailPage } from "@/pages/movie-detail/ui/movie-detail-page";


export default async function Movie({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    return <MovieDetailPage id={id} />
}