import axios from "axios";
import env from "react-dotenv";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        let data = new FormData();
        data.append("email", email);
        data.append("password", password);

        axios
            .post(env.REACT_APP_BACKEND + "/login", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                setLoading(false);
                navigate("/verify/" + res.data);
            })
            .catch((err) => {
                if (err.response.status === 409) {
                    setLoading(false);
                    alert("user doesnt exist");
                }
                if (err.response.status === 401) {
                    setLoading(false);
                    alert("wrong password");
                }
                console.log(err);
            });
    };
    const testSubmit = async (e) => {
        setLoading(true);
        // remove before production
        e.preventDefault();
        let data = new FormData();
        data.append("email", "test@test.com");
        data.append("password", "test");
        axios
            .post(env.REACT_APP_BACKEND + "/login", data, {
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
        <div class="">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <div>
                        <h1>hi.</h1>
                        <h1>project.</h1>
                        <h1>2 step authentication.</h1>
                        <span>madzia i szymon</span>
                    </div>
                    <div>
                    
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email">email :</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password">password :</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                        <button type="submit">login</button>
                        </div>
                        <div>
                        
                        <Link to="/register">ur not with us? <b>register here.</b></Link> 
                        </div>
                    </form>
                    <button onClick={testSubmit}>test login</button>
                    
                    </div>
                </div>
            )}
        </div>
    );
};
