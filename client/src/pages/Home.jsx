import { useAuth } from "../hooks/useAuth";
export const HomePage = () => {
  const { logout, user } = useAuth();
  return (
    <div>
      <h1>This is the Home Page</h1>
      <button onClick={logout}>Sign Out</button>
    </div>
  );
};
