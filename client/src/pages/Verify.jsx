import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const VerifyPage = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const token = params.token;
  const handleSubmit = async (e) => {
    if (code.length !== 6) {
      alert("code must be 6 characters");
      return;
    }

    e.preventDefault();
    let data = new FormData();
    data.append("token", token);
    data.append("code", code);

    axios({
      method: "post",
      url: "http://[::]:1323/verify",
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((_) => {
        navigate("/");
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
