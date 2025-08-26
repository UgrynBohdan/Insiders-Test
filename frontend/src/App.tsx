import { Button } from "@/components/ui/button"
import AppRoutes from "./routes"

function App() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center">
            <Button>Click me</Button>
            <AppRoutes />
        </div>
    )
}

export default App