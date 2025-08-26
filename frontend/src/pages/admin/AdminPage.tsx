import { useEffect, useState } from "react";
import axios from "axios";
import AdminUserTable from "./AdminUserTable";
import AdminUserForm from "./AdminUserForm";
import { useAuth } from "@/components/AuthContext";
import { useNavigate } from "react-router-dom";

export interface User {
    id: number;
    name: string;
    email: string;
    role: "User" | "Admin";
}

function AdminPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const { user } = useAuth();
    const navigate = useNavigate()

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:3000/api/admin/users", {
                withCredentials: true,
            });
            setUsers(res.data);
        } catch (err) {
            console.error("Error fetching users:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (!user) {
        navigate('/', { replace: true })
        return
    }
    if (user.role !== "Admin") {
        navigate('/', { replace: true })
        return
    }

    const handleDelete = async (id: number) => {
        if (!window.confirm("Delete this user?")) return;
        try {
            await axios.delete(`http://localhost:3000/api/admin/users/${id}`, {
                withCredentials: true,
            });
            setUsers(users.filter((u) => u.id !== id));
            fetchUsers();
        } catch (err) {
            console.error("Error deleting user:", err);
        }
    };

    const handleSave = async (user: User) => {
        try {
        const res = await axios.put(
            `http://localhost:3000/api/admin/users/${user.id}`,
            user,
            {withCredentials: true,}
        );
        setUsers(users.map((u) => (u.id === user.id ? res.data : u)));
        setEditingUser(null);
        fetchUsers();
        } catch (err) {
        console.error("Error updating user:", err);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

        {loading ? (
            <p>Loading...</p>
        ) : (
            <AdminUserTable
            users={users}
            onEdit={(u) => setEditingUser(u)}
            onDelete={handleDelete}
            />
        )}

        {editingUser && (
            <AdminUserForm
            user={editingUser}
            onSave={handleSave}
            onCancel={() => setEditingUser(null)}
            />
        )}
        </div>
    );
}

export default AdminPage;
