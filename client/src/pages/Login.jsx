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
    
    return (
   

        <div class=" ">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="flex flex-row  ">
                    <div className="w-1/2 h-screen p-10">
                        <h1 className="text-5xl flex mt-16">hi.</h1>
                        <h1 className="text-5xl"> project.</h1>
                        <h1 className="text-5xl">2 step authentication.</h1>
                        <span className="text-xl text-gray-400 flex mt-80">madzia i szymon</span>
                    </div>
                    <div className="w-1/2 bg-gray-300 h-screen grid place-content-center ">
                    
                
                    <form  className="flex bg-white flex-col m-28 p-10 gap-5 rounded-xl shadow-xl "onSubmit={handleSubmit}>
                        <div >
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
                        <button  type="submit"><b>login</b></button>
                        </div>
                        <div>
                        
                        <Link className="text-sm" to="/register">ur not with us? <b>register here.</b></Link> 
                        </div>
                    </form> 
                    

                    </div>
                </div>
            )}
        </div>
    
    );
};
