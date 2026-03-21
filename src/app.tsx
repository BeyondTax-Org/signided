import { BrowserRouter, Routes, Route } from "react-router";
import Home from "@/pages/home";
import Verify from "@/pages/verify";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import Security from "@/pages/security";
import NotFound from "@/pages/not-found";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/verify/:uvc" element={<Verify />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/security" element={<Security />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
