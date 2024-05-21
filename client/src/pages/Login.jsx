import axios from "axios";
import env from "react-dotenv";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const backend = env.REACT_APP_BACKEND || "http://localhost:1323";
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        let data = new FormData();
        data.append("email", email);
        data.append("password", password);

        axios
            .post(backend + "/login", data, {
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

    return (
        <div class=" ">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="flex flex-row  ">
                    <div className="w-1/2 h-screen p-10  justify-between flex flex-col">
                        <div>
                            <h1 className="text-5xl  mt-16">hi.</h1>
                            <h1 className="text-5xl"> project.</h1>
                            <h1 className="text-5xl">2 step authentication.</h1>
                        </div>
                        <span className="text-xl text-gray-400  mt-80">
                            madzia i szymon
                        </span>
                    </div>
                    <div className="w-1/2 bg-gray-300 h-screen grid place-content-center ">
                        <form
                            className="flex bg-white flex-col m-28 p-10 gap-5 rounded-xl shadow-xl "
                            onSubmit={handleSubmit}
                        >
                            <div className="flex justify-between">
                                <h3>email:</h3>
                                <input
                                    className="border-gray-300 border rounded-md mx-3"
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-between">
                                <h3>password:</h3>
                                <input
                                    className="border-gray-300 border rounded-md mx-3"
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <button type="submit">
                                    <b>login</b>
                                </button>
                            </div>
                            <div>
                                <Link className="text-sm" to="/register">
                                    ur not with us? <b>register here.</b>
                                </Link>
                            </div>
                        </form>
                         
                    </div>
                </div>
            )}
        </div>
    );
};
