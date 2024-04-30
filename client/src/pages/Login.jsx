import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("email", email);
    data.append("password", password);

    axios({
      method: "post",
      url: "http://[::]:1323/login",
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        navigate("/verify/" + res.data);
      })
      .catch((err) => {
        if (err.response.status === 409) {
          alert("user doesnt exist");
          return;
        }
        console.log(err);
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
