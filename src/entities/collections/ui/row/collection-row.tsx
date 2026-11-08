'use client'

import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { MovieCard } from '@/entities/movie/ui/card/movie-card'
import { MovieSnippetEntity } from '@/entities/movie/model/movie.types'
import { COLLECTIONS_META, CollectionType } from '../../model/collections.types'
import { collectionsQO } from '../../api/collections.options'
import './collection-row.css'

function CollectionRowRoot({ children }: { children: React.ReactNode }) {
    return (
        <div className="collection-row">
            {children}
        </div>
    )
}

function CollectionRowHeader({ title, type }: { title: string, type: CollectionType }) {
    return (
        <div className="collection-row-header">
            <span className="collection-row-title">{title}</span>
            <Link href={`/collections/${type}`} className="collection-row-header-all">
                Все
            </Link>
        </div>
    )
}

function CollectionRowSeeAll({ type }: { type: CollectionType }) {
    return (
        <Link href={`/collections/${type}`} className="collection-row-see-all">
            <div className="collection-row-see-all-button">
                <span>→</span>
            </div>
            <span className="collection-row-see-all-text">Все</span>
        </Link>
    )
}

function CollectionRowScroll({ movies, type }: { movies: MovieSnippetEntity[], type: CollectionType }) {
    return (
        <div className="collection-row-scroll">
            {movies.map((movie) => (
                <div key={movie.id} className="collection-row-card">
                    <MovieCard movie={movie} />
                </div>
            ))}
            <CollectionRowSeeAll type={type} />
        </div>
    )
}

export function CollectionRow({ type }: { type: CollectionType }) {
    const { data: movies, isLoading, isError } = useQuery(collectionsQO.preview(type))
    const meta = COLLECTIONS_META[type]

    if (isLoading) {
        return <div className="collection-row-status">Загрузка подборки...</div>
    }

    if (isError || !movies || movies.length === 0) {
        return null
    }

    return (
        <CollectionRowRoot>
            <CollectionRowHeader title={meta.title} type={type} />
            <CollectionRowScroll movies={movies.slice(0, 10)} type={type} />
        </CollectionRowRoot>
    )
}
