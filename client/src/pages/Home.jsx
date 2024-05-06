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
    <div>
      <h1>This is the Home Page</h1>
      <button onClick={logout}>Sign Out</button>
      <button onClick={handleFlush}>Flush</button>
    </div>
  );
};
