import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { RegisterPage } from "./pages/Register";
import { VerifyPage } from "./pages/Verify";
import { HomePage } from "./pages/Home";
import RequireAuth from "@auth-kit/react-router/RequireAuth";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth fallbackPath="/login">
            <HomePage />
          </RequireAuth>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/verify/:token" element={<VerifyPage />} />
    </Routes>
  );
}

export default App;
