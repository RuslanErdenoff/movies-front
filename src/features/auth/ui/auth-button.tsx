'use client'

import { useAuth } from "../model/auth.hooks";
import "./auth-button.css";

type AuthButtonProps = {
    onLoginSuccess?: () => Promise<unknown> | void;
    onLogoutSuccess?: () => Promise<unknown> | void;
};

export function AuthButton({ onLoginSuccess, onLogoutSuccess }: AuthButtonProps) {
    const { user, isLoading, loginWithGoogle, logout } = useAuth();

    if (isLoading) {
        return (
            <button type="button" className="auth-button-loading" disabled>
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
            <button type="button" className="auth-button-logout" onClick={handleLogout}>
                Выйти из аккаунта
            </button>
        );
    }

    return (
        <button type="button" className="auth-button-login" onClick={handleLogin}>
            Войти через Google
        </button>
    );
}
