import { Routes, Route } from "react-router-dom";

import { LoginPage } from "./pages/Login";
import { RegisterPage } from "./pages/Register";
import { VerifyPage } from "./pages/Verify";
import { HomePage } from "./pages/Home";

import "./App.css";

import { AuthProvider } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/protectedRoute";

function App() {
  return (
    <AuthProvider>
      {" "}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify/:token" element={<VerifyPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
