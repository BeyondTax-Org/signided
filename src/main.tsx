import { createRoot } from "react-dom/client";
import App from "./app";
import "./styles/index.css";

// StrictMode removed — React 19 double-mount breaks motion v11 animations
createRoot(document.getElementById("root")!).render(<App />);
