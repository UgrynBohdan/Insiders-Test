import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white text-center px-4">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">
            📚 Book Exchange
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mb-8">
            Обмінюйся книгами з іншими користувачами, знаходь цікаві видання та 
            розвивай свою бібліотеку разом із нашим сервісом.
        </p>

        <div className="flex gap-4">
            <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => navigate("/login")}
            >
                Login
            </Button>
            <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => navigate("/register")}
            >
                Register
            </Button>
        </div>

        <div className="mt-6">
            <Button
                variant="outline"
                className="border-blue-500 text-blue-600"
                onClick={() => navigate("/books")}
            >
                Browse Books
            </Button>
        </div>
        </div>
    );
}
