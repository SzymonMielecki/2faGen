import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { RegisterPage } from "./pages/Register";
import { VerifyPage } from "./pages/Verify";
import { HomePage } from "./pages/Home";

import "./App.css";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";

function App() {
  return (
    <Routes>
      <Route element={<AuthOutlet fallbackPath="/login" />}>
        <Route path="/" element={<HomePage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/verify/:token" element={<VerifyPage />} />
    </Routes>
  );
}

export default App;
