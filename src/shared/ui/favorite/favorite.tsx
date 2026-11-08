'use client'

import './favorite.css';
import heartIconOutlined from '@/shared/assets/icons/heart_outlined.svg';
import heartIconFilled from '@/shared/assets/icons/heart_filled.svg';
import Image from 'next/image';

export function FavoriteIcon({ isActive }: { isActive: boolean }) {
    return (
        <Image className="favorite" src={isActive ? heartIconFilled : heartIconOutlined} alt="Избранное" width={24} height={24} style={{
            filter: 'brightness(0) invert(1)'
        }} />
    );

}