'use client'

type ChipProps = {
    text: string,
    isSelected: boolean,
    onClick?: () => void
}

export function Chip({ text, isSelected, onClick }: ChipProps) {
    return (
        <div
            className={`cursor-pointer items-center justify-center py-2 px-4 rounded-[24px] ${
                isSelected ? 'bg-[gold]' : 'bg-[grey]'
            }`}
            onClick={onClick}
        >
            {text}
        </div>
    );
}
