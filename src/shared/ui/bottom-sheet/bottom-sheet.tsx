'use client'

import { useEffect } from "react";
import { createPortal } from "react-dom";
import "./bottom-sheet.css";

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
        <div className="bottom-sheet-overlay" onClick={onClose}>
            <div className="bottom-sheet-content" onClick={(e) => e.stopPropagation()}>
                <div className="bottom-sheet-handle" />
                {title && (
                    <div className="bottom-sheet-header">
                        <span className="bottom-sheet-title">{title}</span>
                        <button type="button" className="bottom-sheet-close" onClick={onClose}>
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
