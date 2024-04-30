import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";
export const VerifyPage = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const token = params.token;
  const signIn = useSignIn();
  const handleSubmit = async (e) => {
    if (code.length !== 6) {
      alert("code must be 6 characters");
      return;
    }

    e.preventDefault();
    let data = new FormData();
    data.append("token", token);
    data.append("code", code);

    axios
      .post("http://[::]:1323/verify", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (
          signIn({
            auth: {
              token: res.data.token,
              type: "Bearer",
              userState: { email: res.data.email },
            },
          })
        ) {
          navigate("/");
        }
      })
      .catch((err) => {
        alert("the code is invalid");
        console.log(err);
      });
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
