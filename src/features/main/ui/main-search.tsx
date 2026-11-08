'use client'
import { ChangeEvent, useEffect, useRef, useState } from "react"
import './main-search.css'
import { useDebounce } from "@/shared/lib/hooks/use-debounce";
import { usePathname, useSearchParams } from "next/navigation";


export const searchQueryName = 'search'

export function MainInput() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const inputRef = useRef<HTMLInputElement | null>(null)
    // Инициализируем стейт из URL (если страницу обновили с ?search=batman)
    const [search, setSearch] = useState<string>(searchParams?.get(searchQueryName) ?? '')
    const debouncedSearch = useDebounce<string>(search, 400)

    //листенер изменения значения поиска после дебаунса
    useEffect(() => {
        const currentSearch = (searchParams?.get(searchQueryName) ?? '').trim()
        const cleanQuery = debouncedSearch.trim()

        // Не трогаем history на первом рендере, если значение в URL не изменилось
        if (currentSearch === cleanQuery) return

        const params = new URLSearchParams(searchParams?.toString())

        if (cleanQuery) {
            params.set(searchQueryName, cleanQuery)
        } else {
            params.delete(searchQueryName)
        }

        const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname
        // Передаем window.history.state (а не null!), чтобы не затереть служебный стейт Next.js (__NA)
        window.history.replaceState(window.history.state, '', newUrl)
    }, [debouncedSearch, pathname, searchParams])

    function clearText() {
        setSearch('')
        inputRef.current?.focus()
    }

    function handleSearch(e: ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value);
    }

    return (
        <div className="main-search-container">
            <span className="search-icon">🔍</span>
            <input
                className="main-input"
                ref={inputRef}
                type="text"
                placeholder="Поиск фильмов..."
                value={search}
                onChange={(e) => handleSearch(e)} />
            {search.length > 0 && (
                <button type="button" onClick={clearText}>
                    ✕
                </button>
            )}
        </div>

    )
}
