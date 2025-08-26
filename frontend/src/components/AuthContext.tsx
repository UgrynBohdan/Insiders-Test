import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

type User = {
    id: number;
    name: string;
    email: string;
    role: string;
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
            const res = jwtDecode(token) as any
            setUser({id: res.id, name: res.name, email: res.email, role: res.role})
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
