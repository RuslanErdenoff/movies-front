'use client'

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
            className="bg-transparent border-none p-0 cursor-pointer flex items-center justify-center w-full h-full"
        >
            <Image className="invert" src={arrowLeftIcon} alt="Назад" width={20} height={20} />
        </button>
    );
}

export function AppBar({ children }: { children: React.ReactNode }) {
    return (
        <div className="fixed top-0 right-0 left-0 flex flex-row justify-between items-center p-4 bg-transparent z-20 text-white box-border max-w-[1024px] mx-auto">
            {Children.map(children, (child) => (
                <div className="cursor-pointer rounded-full w-12 h-12 bg-black flex items-center justify-center leading-none border-none">
                    {child}
                </div>
            ))}
        </div>
    )
}
