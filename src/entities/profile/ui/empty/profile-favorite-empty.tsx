import Link from "next/link";
import "./profile-favorite-empty.css";

export function ProfileFavoriteEmpty() {
    return (
        <div className="profile-favorite-empty">
            <span className="profile-favorite-empty-title">Пока нет избранных</span>
            <span className="profile-favorite-empty-subtitle">
                Добавляйте фильмы в избранное нажатием на сердечко
            </span>
            <Link href="/catalog" className="profile-favorite-empty-link">
                Перейти в каталог
            </Link>
        </div>
    )
}
