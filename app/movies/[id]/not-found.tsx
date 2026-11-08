import Link from "next/link";

export default function MovieNotFound() {
    return (
        <div style={{ color: "white", padding: 24, textAlign: "center" }}>
            <h2>Фильм не найден (404)</h2>
            <p>Такого фильма не существует или он был удален из базы TMDB.</p>
            <Link href="/" style={{ color: "#e50914" }}>
                Вернуться на главную
            </Link>
        </div>
    );
}