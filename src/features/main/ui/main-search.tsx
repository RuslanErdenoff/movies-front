'use client'
import { ChangeEvent, useEffect, useRef, useState } from "react"
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
        // Передаем null: Next.js сам скопирует свой стейт через copyNextJsInternalHistoryState(null)
        // и обновит useSearchParams() (если передать window.history.state с __NA: true, Next.js проигнорирует обновление)
        window.history.replaceState(null, '', newUrl)
    }, [debouncedSearch, pathname, searchParams])

    function clearText() {
        setSearch('')
        inputRef.current?.focus()
    }

    function handleSearch(e: ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value);
    }

    return (
        <div className="relative inline-flex justify-center items-center gap-2 bg-[gray] rounded-[10px] py-2.5 px-3.5">
            <span className="flex justify-center items-center w-6 h-6 text-sm text-white">🔍</span>
            <input
                className="text-sm w-screen box-border border-none outline-none bg-transparent text-white placeholder:text-zinc-300"
                ref={inputRef}
                type="text"
                placeholder="Поиск фильмов..."
                value={search}
                onChange={(e) => handleSearch(e)}
            />
            {search.length > 0 && (
                <button type="button" className="cursor-pointer" onClick={clearText}>
                    ✕
                </button>
            )}
        </div>
    )
}
