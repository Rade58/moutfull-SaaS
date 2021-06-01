/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import { FunctionComponent } from "react";
import { useAuth } from "../lib/auth";

const IndexPage: FunctionComponent = () => {
  const { user, signInWithGitHub, signOut, isLoading } = useAuth();

  return user ? (
    <div>
      <p>Email: {user.email}</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  ) : (
    <button onClick={() => signInWithGitHub()}>Sign In</button>
  );
};

export default IndexPage;
