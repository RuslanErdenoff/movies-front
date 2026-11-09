'use client'

import { useEffect } from "react";
import { createPortal } from "react-dom";

type BottomSheetProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
};

export function BottomSheet({ isOpen, onClose, title, children }: BottomSheetProps) {
    useEffect(() => {
        if (!isOpen) return;

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen || typeof document === "undefined") {
        return null;
    }

    return createPortal(
        <div
            className="fixed inset-0 bg-black/75 flex items-end justify-center z-100 md:items-center md:p-6"
            onClick={onClose}
        >
            <div
                className="w-full max-w-[640px] bg-[#18181B] border-t border-[#27272A] rounded-t-[24px] pt-3 px-5 pb-8 flex flex-col gap-4 box-border md:max-w-[800px] md:rounded-[24px] md:border md:border-[#27272A] md:pt-5 md:px-6 md:pb-6"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-10 h-1 rounded-xs bg-[#3F3F46] self-center mb-1 md:hidden" />
                {title && (
                    <div className="flex flex-row items-center justify-between gap-3">
                        <span className="text-[18px] font-bold text-white overflow-hidden text-ellipsis whitespace-nowrap">
                            {title}
                        </span>
                        <button
                            type="button"
                            className="w-8 h-8 rounded-full border-none bg-[#27272A] text-[#A1A1AA] text-sm cursor-pointer shrink-0 flex items-center justify-center"
                            onClick={onClose}
                        >
                            ✕
                        </button>
                    </div>
                )}
                {children}
            </div>
        </div>,
        document.body
    );
}
