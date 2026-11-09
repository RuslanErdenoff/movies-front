'use client'

import heartIconOutlined from '@/shared/assets/icons/heart_outlined.svg';
import heartIconFilled from '@/shared/assets/icons/heart_filled.svg';
import Image from 'next/image';

export function FavoriteIcon({ isActive }: { isActive: boolean }) {
    return (
        <Image
            className="text-sm select-none brightness-0 invert"
            src={isActive ? heartIconFilled : heartIconOutlined}
            alt="Избранное"
            width={24}
            height={24}
        />
    );
}
