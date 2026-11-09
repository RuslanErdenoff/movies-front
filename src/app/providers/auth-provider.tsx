'use client'

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { useQueryClient } from "@tanstack/react-query";
import { auth } from "@/shared/api/firebase";
import { favoritesQO } from "@/features/favorite/api/favorite.options";
import { AuthContext } from "@/features/auth/model/auth-context";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const queryClient = useQueryClient();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setIsLoading(false);

            if (currentUser) {
                // Записываем uid в куку на 30 дней для всех страниц (path=/)
                document.cookie = `user_uid=${currentUser.uid}; path=/; max-age=2592000`;
            } else {
                // При выходе удаляем куку (max-age=0)
                document.cookie = "user_uid=; path=/; max-age=0";
            }
            queryClient.invalidateQueries({ queryKey: favoritesQO.all().queryKey });
        });

        return () => unsubscribe();
    }, [queryClient]);

    return (
        <AuthContext.Provider value={{ user, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}
