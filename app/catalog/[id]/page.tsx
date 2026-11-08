import { CatalogShowcasePage } from "@/pages/catalog/ui/catalog-showcase-page"

export default async function CatalogShowcase({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    return <CatalogShowcasePage id={id} />
}
