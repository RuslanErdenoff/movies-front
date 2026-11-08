'use client'

import './app-bar.css'
import arrowLeftIcon from "@/shared/assets/icons/arrow-back.svg";
import Image from 'next/image'
import { Children } from 'react';
import { useRouter } from 'next/navigation';
import { canGoBack } from '@/shared/lib/navigation/can-go-back';

export function AppBarBackArrow() {
    const router = useRouter();

    function handleBack() {
        if (canGoBack()) {
            router.back();
        } else {
            router.replace("/");
        }
    }
    return (
        <button
            type="button"
            onClick={() => handleBack()}
            className="app-bar-back-arrow-container"
        >
            <Image src={arrowLeftIcon} alt="Назад" width={20} height={20} />
        </button>
    );
}
export function AppBar({ children }: { children: React.ReactNode }) {
    return (
        <div className="app-bar">
            {Children.map(children, (child) => (
                <div className="app-bar-action-container">
                    {child}
                </div>
            ))}
        </div>
    )
}
