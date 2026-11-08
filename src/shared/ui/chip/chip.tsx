'use client'

import './chip.css'
type ChipProps = {
    text: string,
    isSelected: boolean,
    onClick?: () => void
}

export function Chip({ text, isSelected, onClick }: ChipProps) {
    return (
        <div className={`chip ${isSelected ? 'chip-selected' : ''
            }`}
            onClick={onClick}>
            {text}
        </div>
    );
}