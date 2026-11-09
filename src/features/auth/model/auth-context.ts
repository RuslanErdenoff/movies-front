'use client'

import { createContext, useContext } from "react";
import { User } from "firebase/auth";

export type AuthContextValue = {
    user: User | null;
    isLoading: boolean;
};

export const AuthContext = createContext<AuthContextValue>({
    user: null,
    isLoading: true,
});

export function useAuthContext() {
    return useContext(AuthContext);
}
