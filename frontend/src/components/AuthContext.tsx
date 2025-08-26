import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

type User = {
    id: number;
    name: string;
    email: string;
    role: string;
};

type AuthContextType = {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    // при завантаженні пробуємо отримати юзера з бекенду
    useEffect(() => {
        fetchMe();
    }, []);

    const fetchMe = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/me", {
                withCredentials: true, // щоб відправляти куки
            });
            setUser(res.data);
        } catch (e) {
            setUser(null);
            console.error("Fetch user failed:", e);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            await axios.post(
                "http://localhost:3000/api/auth/login",
                { email, password },
                { withCredentials: true }
            );
            // після логіну кука вже є, просто тягнемо /me
            await fetchMe();
        } catch (e) {
            console.error("Login failed:", e);
            throw e;
        }
    };

    const logout = async () => {
        try {
            await axios.post("http://localhost:3000/api/auth/logout", {}, { withCredentials: true });
            setUser(null);
        } catch (e) {
            console.error("Logout failed:", e);
        }
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
