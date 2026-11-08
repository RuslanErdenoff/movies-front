'use client'
import './bottom-nav.css'
import Link from "next/link";
import { usePathname } from 'next/navigation';

type BottomNavItemProps = {
    name: string,
    icon: string,
    href: string,
}

function BottomNavBarItem({ item, isActive = false }: { item: BottomNavItemProps, isActive?: boolean }) {
    return (
        <Link href={item.href} className={`bottom-nav-item ${isActive ? 'active' : ''}`}>
            <span>{item.icon}</span>
            <span>{item.name}</span>
        </Link>
    )
}
export function BottomNav({ items }: { items: BottomNavItemProps[] }) {
    const pathname = usePathname()

    return (
        <div className="bottom-nav">
            {items.map((i) => <BottomNavBarItem key={i.name} item={i} isActive={pathname === i.href} />)}
        </div>
    )
}
