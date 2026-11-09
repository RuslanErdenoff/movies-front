'use client'

import { User } from "firebase/auth";
import "./profile-user-card.css";

function ProfileUserCardRoot({ children }: { children: React.ReactNode }) {
    return (
        <div className="profile-user-card">
            {children}
        </div>
    )
}

function ProfileUserAvatar({ user }: { user: User | null }) {
    if (user?.photoURL) {
        return (
            <div className="profile-user-avatar">
                <img src={user.photoURL} alt={user.displayName || "Аватар"} />
            </div>
        )
    }

    const initial = user
        ? (user.displayName || user.email || "Р").charAt(0).toUpperCase()
        : "👤";

    return (
        <div className="profile-user-avatar">
            <span className="profile-user-avatar-letter">{initial}</span>
        </div>
    )
}

function ProfileUserInfo({ title, subtitle }: { title: string, subtitle: string }) {
    return (
        <div className="profile-user-info">
            <span className="profile-user-name">{title}</span>
            <span className="profile-user-status">{subtitle}</span>
        </div>
    )
}

export function ProfileUserCard({
    user,
    actionSlot,
}: {
    user: User | null;
    actionSlot?: React.ReactNode;
}) {
    const title = user ? (user.displayName || user.email || "Руслан") : "Гость";
    const subtitle = user
        ? "Подписка активна"
        : "Войдите, чтобы сохранять избранные фильмы в облаке";

    return (
        <ProfileUserCardRoot>
            <ProfileUserAvatar user={user} />
            <ProfileUserInfo title={title} subtitle={subtitle} />
            {actionSlot}
        </ProfileUserCardRoot>
    )
}
