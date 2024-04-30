import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
export const VerifyPage = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const token = params.token;
  const signIn = useSignIn();
  const isAuthenticated = useIsAuthenticated();
  const handleSubmit = async (e) => {
    if (code.length !== 6) {
      alert("code must be 6 characters");
      return;
    }

    e.preventDefault();
    let data = new FormData();
    data.append("token", token);
    data.append("code", code);

    try {
      const res = await axios.post("http://[::]:1323/verify", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      signIn({
        auth: {
          token: res.data.Token,
        },
        userState: { email: res.data.Email },
      });
      console.log(isAuthenticated);
      console.log(res.data);
      if (isAuthenticated) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
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
