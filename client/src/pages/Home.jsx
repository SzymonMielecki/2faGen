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
    <div class="flex ">
      <h1>hii!!</h1>
      <h2>we have finished.</h2>
      <span>mati pls bądz miły bo nam będzie smutno</span>
      <button onClick={logout}>Sign Out</button>
      <button onClick={handleFlush}>Flush</button>
    </div>
  );
};
