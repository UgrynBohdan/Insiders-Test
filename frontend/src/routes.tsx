import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "@/pages/profile/Profile";

export default function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/profile" element={<Profile />} />
        </Routes>
    </BrowserRouter>
  );
}
