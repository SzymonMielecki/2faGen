import useSignOut from "react-auth-kit/hooks/useSignOut";

export const HomePage = () => {
  const signOut = useSignOut();
  return (
    <div>
      <h1>This is the Home Page</h1>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};
