import "./profile-stats.css";

function ProfileStatsRoot({ children }: { children: React.ReactNode }) {
    return (
        <div className="profile-stats">
            {children}
        </div>
    )
}

function ProfileStatsItem({ value, label }: { value: number, label: string }) {
    return (
        <div className="profile-stats-item">
            <span className="profile-stats-value">{value}</span>
            <span className="profile-stats-label">{label}</span>
        </div>
    )
}

export function ProfileStats({ favoritesCount }: { favoritesCount: number }) {
    return (
        <ProfileStatsRoot>
            <ProfileStatsItem value={12} label="Просмотрено" />
            <ProfileStatsItem value={favoritesCount} label="В избранном" />
            <ProfileStatsItem value={9} label="Оценок" />
        </ProfileStatsRoot>
    )
}
