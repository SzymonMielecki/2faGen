import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import env from "react-dotenv";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

export const VerifyPage = () => {
    const [code, setCode] = useState("");
    const navigate = useNavigate();
    const params = useParams();
    const token = params.token;
    const { login } = useAuth();
    const backend = env.REACT_APP_BACKEND || "http://localhost:1323";
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (code.length !== 6) {
                throw new Error("Code must be 6 characters");
            }

            const formData = new FormData();
            formData.append("token", token);
            formData.append("code", code);

            const res = await axios.post(backend + "/verify", formData, {
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
        <div className="flex flex-row ">
            <div className="w-1/2 bg-gray-300 h-screen grid place-content-center ">
                <form
                    className="bg-white p-10 rounded-xl  shadow-xl flex flex-col items-center gap-3"
                    onSubmit={handleSubmit}
                >
                    <h1 className="text-xl">here exacly</h1>
                    <div>
                        <input
                            className="border-gray-300 border rounded-md mx-3"
                            maxLength="6"
                            id="code"
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </div>
                    <button
                        className="justify-center items-center text-xl font-bold"
                        type="submit"
                    >
                        login
                    </button>
                </form>
            </div>
            <div className="w-1/2 h-screen p-10 text-right justify-between flex flex-col">
                <div>
                    <h1 className="text-5xl  mt-16">hello again.</h1>
                    <h1 className="text-5xl"> time for the second step.</h1>
                    <h1 className="text-5xl">insert the code we sent you.</h1>
                </div>
                <span className="text-xl text-gray-400  mt-80">
                    madzia i szymon
                </span>
            </div>
        </div>
    );
};
