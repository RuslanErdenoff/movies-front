import { AppBar, AppBarBackArrow } from "@/shared/ui/app-bar/app-bar";
import "./movie-detail-loading-page.css";

export function MovieDetailLoading() {
    return (
        <div className="movie-detail-loading">
            <AppBar>
                <AppBarBackArrow />
            </AppBar>

            {/* Скелетон большого постера (50dvh) */}
            <div className="movie-detail-loading-hero skeleton-pulse" />

            {/* Скелетон заголовка и подзаголовка */}
            <div className="movie-detail-loading-header">
                <div className="movie-detail-loading-title skeleton-pulse" />
                <div className="movie-detail-loading-meta skeleton-pulse" />
            </div>

            {/* Скелетон блока "О фильме" */}
            <div className="movie-detail-loading-card">
                <div className="movie-detail-loading-card-title skeleton-pulse" />
                <div className="movie-detail-loading-line skeleton-pulse" />
                <div className="movie-detail-loading-line skeleton-pulse" />
                <div className="movie-detail-loading-line short skeleton-pulse" />
            </div>
        </div>
    );
}