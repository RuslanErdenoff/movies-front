'use client'

import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/features/auth/model/auth.hooks";
import { favoritesQO } from "@/features/favorite/api/favorite_options";
import { useSyncFavorites } from "@/features/favorite/model/favorite_hooks";
import { ProfileTitle } from "@/entities/profile/ui/title/profile-title";
import { ProfileUserCard } from "@/entities/profile/ui/card/profile-user-card";
import { ProfileStats } from "@/entities/profile/ui/stats/profile-stats";
import { MovieFavoriteList } from "@/widgets/movie/ui/favorite/movie-favorite-list";
import "./profile-page.css";

export function ProfilePage() {
    const { user } = useAuth();
    const { syncOnLogin, resetOnLogout } = useSyncFavorites();
    const { data: favoriteMovies = [] } = useQuery(favoritesQO.all());

    return (
        <div className="profile-page">
            <ProfileTitle />
            <ProfileUserCard
                user={user}
                onLoginSuccess={syncOnLogin}
                onLogoutSuccess={resetOnLogout}
            />
            <ProfileStats favoritesCount={favoriteMovies.length} />
            <MovieFavoriteList movies={favoriteMovies} />
        </div>
    );
}
