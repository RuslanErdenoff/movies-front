import { MainLayout } from "@/app/layouts/main-layouts"

export default function WithTabsLayout({ children }: { children: React.ReactNode }) {
    return (
        <MainLayout>
            {children}
        </MainLayout>
    )
}