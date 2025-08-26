import Header from "./components/Header"
import AppRoutes from "./routes"

function App() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center">
            <Header />
            <AppRoutes />
        </div>
    )
}

export default App