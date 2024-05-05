import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (password !== confirmpassword) {
      alert("Passwords do not match");
      return;
    }
    let data = new FormData();
    data.append("fullname", fullname);
    data.append("email", email);
    data.append("password", password);

    axios
      .post("http://[::]:1323/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setLoading(false);
        navigate("/verify/" + res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const testSubmit = async (e) => {
    setLoading(true);
    // remove before production
    e.preventDefault();
    let data = new FormData();
    data.append("fullname", "test");
    data.append("email", "test@test.com");
    data.append("password", "test");
    axios
      .post("http://[::]:1323/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setLoading(false);
        navigate("/verify/" + res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fullname">Full Name:</label>
              <input
                id="fullname"
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
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
            <div>
              <label htmlFor="confirmpassword">Password:</label>
              <input
                id="confirmpassword"
                type="password"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type="submit">Login</button>
          </form>
          <button onClick={testSubmit}>Test</button>
        </div>
      )}
    </div>
  );
};
