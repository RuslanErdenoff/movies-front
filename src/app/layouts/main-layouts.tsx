import './main-layout.css'
import { BottomNav } from '@/shared/ui/bottom-nav/bottom-nav'

export function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='main-layout'>
            {children}
            <BottomNav items={[
                {
                    name: "Фильмы",
                    icon: "🏠",
                    href: "/",
                },
                {
                    name: "Каталог",
                    icon: "🎬",
                    href: "/catalog",
                },
                {
                    name: "Профиль",
                    icon: "👤",
                    href: "/profile",
                },
            ]} />
        </div>
    )
}
