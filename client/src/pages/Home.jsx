import useSignOut from "react-auth-kit/hooks/useSignOut";

import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

export const HomePage = () => {
  const signOut = useSignOut();
  const isAuthenticated = useIsAuthenticated();
  return (
    <div>
      <h1>This is the Home Page</h1>
      <button onClick={signOut}>Sign Out</button>
      <button
        onClick={() => {
          console.log(isAuthenticated);
        }}
      >
        check
      </button>
    </div>
  );
};
