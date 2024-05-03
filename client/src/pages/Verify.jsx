import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

export const VerifyPage = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const token = params.token;
  const { login } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (code.length !== 6) {
        throw new Error("Code must be 6 characters");
      }

      const formData = new FormData();
      formData.append("token", token);
      formData.append("code", code);

      const res = await axios.post("http://[::]:1323/verify", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status !== 200) {
        throw new Error("Invalid code");
      }

      await login(res.data.Email);

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            maxLength="6"
            id="code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
