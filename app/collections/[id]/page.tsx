import { CollectionsShowcasePage } from "@/pages/collections/ui/collections-showcase-page"

export default async function CollectionsShowcase({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    return <CollectionsShowcasePage id={id} />
}