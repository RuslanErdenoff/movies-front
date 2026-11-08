'use client'

import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "@/shared/api/firebase";
import { useAuthContext } from "@/app/providers/auth-provider";

export function useAuth() {
    const { user, isLoading } = useAuthContext();

    const loginWithGoogle = async () => {
        await signInWithPopup(auth, googleProvider);
    };

    const logout = async () => {
        await signOut(auth);
    };

    return { user, isLoading, loginWithGoogle, logout };
}
