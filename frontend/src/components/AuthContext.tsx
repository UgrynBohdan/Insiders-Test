import { createContext, useContext, useEffect, useState } from "react";

type User = {
    name: string;
    email: string;
};

type AuthContextType = {
    user: User | null;
    login: (token: string) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    // при завантаженні пробуємо відновити юзера з токена
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetchUser(token);
        }
    }, []);

    const fetchUser = async (token: string) => {
        try {
            const res = await fetch("http://localhost:3000/api/auth/me", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (res.ok) setUser(data.user);
        } catch (e) {
            console.error("Fetch user failed:", e);
        }
    };

    const login = async (token: string) => {
        localStorage.setItem("token", token);
        await fetchUser(token);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be inside AuthProvider");
        return ctx;
};
