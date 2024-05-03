import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("email", email);
    data.append("password", password);

    axios
      .post("http://[::]:1323/login", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        navigate("/verify/" + res.data);
      })
      .catch((err) => {
        if (err.response.status === 409) {
          alert("user doesnt exist");
        }
        console.log(err);
      });
  };
  const testSubmit = async (e) => {
    // remove before production
    e.preventDefault();
    let data = new FormData();
    data.append("email", "test@test.com");
    data.append("password", "test");
    axios
      .post("http://[::]:1323/login", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        navigate("/verify/" + res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Link to="/register">Go to Register</Link>
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
      <button onClick={testSubmit}>Test Login</button>
      {/*remove before production*/}
    </div>
  );
};
