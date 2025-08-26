import { Button } from "@/components/ui/button";
import { useAuth } from "./AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="w-full flex justify-between items-center p-4 shadow-md bg-white">
      <h1 className="text-xl font-bold">📚 Book Exchange</h1>
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <span className="font-medium">Hi, {user.name} 👋</span>
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <span className="text-gray-600">Not logged in</span>
        )}
      </div>
    </header>
  );
}
