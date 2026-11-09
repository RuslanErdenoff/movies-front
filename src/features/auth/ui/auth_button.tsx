'use client'

import { useAuth } from "../model/auth.hooks";

type AuthButtonProps = {
    onLoginSuccess?: () => Promise<unknown> | void;
    onLogoutSuccess?: () => Promise<unknown> | void;
};

export function AuthButton({ onLoginSuccess, onLogoutSuccess }: AuthButtonProps) {
    const { user, isLoading, loginWithGoogle, logout } = useAuth();

    if (isLoading) {
        return (
            <button
                type="button"
                className="w-full h-12 rounded-xl border border-[#27272A] bg-[#18181B] text-[#A1A1AA] text-sm"
                disabled
            >
                Загрузка...
            </button>
        );
    }

    const handleLogin = async () => {
        await loginWithGoogle();
        await onLoginSuccess?.();
    };

    const handleLogout = async () => {
        await logout();
        await onLogoutSuccess?.();
    };

    if (user) {
        return (
            <button
                type="button"
                className="mt-1 py-2 px-4 rounded-[10px] border border-[#27272A] bg-transparent text-[#A1A1AA] text-[13px] font-medium cursor-pointer"
                onClick={handleLogout}
            >
                Выйти из аккаунта
            </button>
        );
    }

    return (
        <button
            type="button"
            className="w-full h-12 rounded-xl border-none bg-[#F59E0B] text-[#09090B] text-base font-bold cursor-pointer flex items-center justify-center"
            onClick={handleLogin}
        >
            Войти через Google
        </button>
    );
}
