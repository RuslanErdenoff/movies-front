'use client'

import { Chip } from "@/shared/ui/chip/chip";
import { useState } from "react";

type FilterType = 'all' | 'fantastic' | 'drama' | 'action';
const allFilter: FilterType[] = ['all', 'fantastic', 'drama', 'action'];

export function MainFilter() {
    const [currentFilter, setFilter] = useState<FilterType>('all');

    return (
        <div className="flex flex-row gap-2">
            {allFilter.map((f) => <Chip key={f} text={f} onClick={() => { setFilter(f) }} isSelected={currentFilter === f} />)}
        </div>
    )
}