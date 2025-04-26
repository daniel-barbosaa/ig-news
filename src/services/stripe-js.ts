import { loadStripe } from "@stripe/stripe-js";

export async function getStripeJs() {
  const stripeJs = await loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || ""
  );
  if (!stripeJs) {
    throw new Error("Stripe failed to load. Please check your API key.");
  }
  return stripeJs;
}
