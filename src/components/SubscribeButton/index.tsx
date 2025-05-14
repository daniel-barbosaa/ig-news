import { signIn, useSession } from "next-auth/react";
import styles from "./styles.module.scss";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";
import { useRouter } from "next/router";
import { Spinner } from "@chakra-ui/react";
import { useState } from "react";

export function SubscribeButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();

  const router = useRouter();

  async function handleSubscribe() {
    setIsLoading(true);
    if (status !== "authenticated") {
      signIn("github");
      return;
    }

    if (session && (session as any).activeSubscription) {
      router.push("/posts");
      return;
    }

    try {
      const response = await api.post("/subscribe");
      // Pegando o session id do Stripe
      const { sessionId } = response.data;

      // Passando o id utilizando a lib stripe-js e redirecionando o checkout
      const stripe = await getStripeJs();

      await stripe?.redirectToCheckout({ sessionId });
      setIsLoading(false);
    } catch (err) {
      alert(err);
    }
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      {isLoading && <Spinner mr="1rem" color="var(--cyan-500)" />}
      Subscribe now
    </button>
  );
}

export default SubscribeButton;
