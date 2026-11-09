'use client'
import Link from "next/link";
import { usePathname } from 'next/navigation';

type BottomNavItemProps = {
    name: string,
    icon: string,
    href: string,
}

function BottomNavBarItem({ item, isActive = false }: { item: BottomNavItemProps, isActive?: boolean }) {
    return (
        <Link
            href={item.href}
            className={`flex flex-col items-center ${isActive ? 'text-[#f59e0b]' : 'text-[grey]'}`}
        >
            <span>{item.icon}</span>
            <span>{item.name}</span>
        </Link>
    )
}

export function BottomNav({ items }: { items: BottomNavItemProps[] }) {
    const pathname = usePathname()

    return (
        <div className="fixed bottom-0 left-0 right-0 z-20 flex flex-row justify-around bg-[#18181b] border-t border-[#27272a] h-16 items-center md:max-w-[420px] md:mx-auto md:bottom-5 md:rounded-full md:border md:border-[#27272a] md:bg-[#18181b]/90 md:backdrop-blur-md md:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            {items.map((i) => <BottomNavBarItem key={i.name} item={i} isActive={pathname === i.href} />)}
        </div>
    )
}
