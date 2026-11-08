import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/shared/api/firebase";
import { MovieSnippetEntity } from "@/entities/movie/model/movie.types";

const LOCAL_STORAGE_KEY = "guest_favorites";

function parseStoredMovies(raw: string | null): MovieSnippetEntity[] {
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        // Защита от старого формата, где в массиве лежали просто строки ID
        return parsed.filter(
            (item): item is MovieSnippetEntity =>
                Boolean(item && typeof item === "object" && "id" in item && "title" in item)
        );
    } catch {
        return [];
    }
}

export const favoriteApi = {
    getAllLocalMovies: (): MovieSnippetEntity[] => {
        if (typeof window === "undefined") return [];
        return parseStoredMovies(localStorage.getItem(LOCAL_STORAGE_KEY));
    },

    setAllLocalMovies: (movies: MovieSnippetEntity[]) => {
        if (typeof window === "undefined") return;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(movies));
    },

    getAllMovies: async (serverUserId?: string): Promise<MovieSnippetEntity[]> => {
        if (typeof window !== "undefined" && !serverUserId) {
            await auth.authStateReady();
        }
        const userId = serverUserId ?? auth.currentUser?.uid;

        // Если не авторизован — берем сниппеты из localStorage
        if (!userId) {
            return favoriteApi.getAllLocalMovies();
        }

        const userDocRef = doc(db, "users", userId);
        const userDocSnapshot = await getDoc(userDocRef);
        if (!userDocSnapshot.exists()) return [];
        const data = userDocSnapshot.data();
        return Array.isArray(data.favoriteMovies) ? data.favoriteMovies : [];
    },

    toggle: async (params: { movie: MovieSnippetEntity; isFavorite: boolean }): Promise<void> => {
        const userId = auth.currentUser?.uid;

        if (!userId) {
            const current = favoriteApi.getAllLocalMovies();
            const next = params.isFavorite
                ? [...current.filter((m) => m.id !== params.movie.id), params.movie]
                : current.filter((m) => m.id !== params.movie.id);

            favoriteApi.setAllLocalMovies(next);
        } else {
            const current = await favoriteApi.getAllMovies();
            const next = params.isFavorite
                ? [...current.filter((m) => m.id !== params.movie.id), params.movie]
                : current.filter((m) => m.id !== params.movie.id);

            const userDocRef = doc(db, "users", userId);
            await setDoc(
                userDocRef,
                { favoriteMovies: next },
                { merge: true }
            );
        }
    },

    syncLocalToDb: async (): Promise<void> => {
        const userId = auth.currentUser?.uid;
        const localMovies = favoriteApi.getAllLocalMovies();

        if (!userId || localMovies.length === 0) return;

        const remoteMovies = await favoriteApi.getAllMovies();
        const mergedMap = new Map<string, MovieSnippetEntity>();

        for (const movie of remoteMovies) {
            mergedMap.set(movie.id, movie);
        }
        for (const movie of localMovies) {
            mergedMap.set(movie.id, movie);
        }

        const userDocRef = doc(db, "users", userId);
        await setDoc(
            userDocRef,
            { favoriteMovies: Array.from(mergedMap.values()) },
            { merge: true }
        );

        localStorage.removeItem(LOCAL_STORAGE_KEY);
    },
};
