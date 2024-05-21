import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import env from "react-dotenv";
export const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const navigate = useNavigate();
    const backend = env.REACT_APP_BACKEND || "http://localhost:1323";
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
            .post(backend + "/register", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                setLoading(false);
                navigate("/verify/" + res.data);
            })
            .catch((err) => {
                setLoading(false);
                if (err.response && err.response.status === 400) {
                    alert("this user already exists");
                }
                console.log(err);
            });
    };

    return (
        <div>
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
                                <label htmlFor="fullname">full name:</label>
                                <input
                                    className="border-gray-300 border rounded-md mx-3"
                                    id="fullname"
                                    type="text"
                                    value={fullname}
                                    onChange={(e) =>
                                        setFullname(e.target.value)
                                    }
                                />
                            </div>
                            <div className="flex justify-between">
                                <label htmlFor="email">email:</label>
                                <input
                                    className="border-gray-300 border rounded-md mx-3"
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-between">
                                <label htmlFor="password">password:</label>
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
                            <div className="flex justify-between">
                                <label htmlFor="confirmpassword">
                                    confirm password:
                                </label>
                                <input
                                    className="border-gray-300 border rounded-md mx-3"
                                    id="confirmpassword"
                                    type="password"
                                    value={confirmpassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />
                            </div>
                            <button
                                className="flex justify-start"
                                type="submit"
                            >
                                <b>register</b>
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
