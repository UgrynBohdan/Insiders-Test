import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthContext";

export default function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login } = useAuth();
    
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
        const res = await fetch("http://localhost:3000/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Register failed");

        await login(data.token);
        navigate("/books");
        } catch (err: any) {
        setError(err.message);
        }
    };

  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <form
        onSubmit={handleRegister}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Register</h2>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
          Register
        </Button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
