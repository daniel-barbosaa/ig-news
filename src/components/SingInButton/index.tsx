import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import styles from "./styles.module.scss";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { Spinner } from "@chakra-ui/react";

export function SignButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  function handleSignIn() {
    setIsLoading(true);
    signIn("github");
  }
  function handleSignOut() {
    setIsLoading(true);
    signOut();
  }

  return session ? (
    <button type="button" className={styles.signInButton}>
      {isLoading ? (
        <Spinner mr="1rem" color="var(--cyan-500)" />
      ) : (
        <FaGithub color="#04d361" />
      )}
      {session.user?.name}
      <FiX
        color="#737380"
        className={styles.closeIcons}
        onClick={handleSignOut}
      />
    </button>
  ) : (
    <button
      type="button"
      className={styles.signInButton}
      onClick={handleSignIn}
    >
      {isLoading ? (
        <Spinner mr="1rem" color="var(--cyan-500)" />
      ) : (
        <FaGithub color="#eba417" />
      )}
      Sign in with Github
    </button>
  );
}

export default SignButton;
