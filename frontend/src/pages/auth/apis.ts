import api from "@/lib/api";

export async function postLogin(email: string, password: string): Promise<string> {
    const res: any = await api("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({ email, password }),
    });

    if (!res) throw new Error(res.data.message);
    
    const { token } = res.data;
    return token
}

export async function postRegister(name: string, email: string, password: string): Promise<boolean> {
    const res: any = await api("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({ name, email, password }),
    });

    if (!res) throw new Error(res.data.message || "Register failed");
    return true
}