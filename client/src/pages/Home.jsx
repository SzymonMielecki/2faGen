import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import env from "react-dotenv";
export const HomePage = () => {
  const { logout } = useAuth();
  const handleFlush = () => {
    axios.post(env.REACT_APP_BACKEND + "/flush").then((res) => {
      console.log(res);
      logout();
    });
  };
  return (
    <div className="h-screen grid place-content-center  bg-gray-300">
      <div className="flex flex-col items-center p-10 bg-white rounded-xl shadow-xl text-2xl ">
        <h1>hii!!</h1>
        <h2>we have finished.</h2>
        <span>mati pls bądz miły bo nam będzie smutno</span>
        <button
          className="mt-4 font-bold
        "
          onClick={logout}
        >
          sign out
        </button>
      </div>
    </div>
  );
};
