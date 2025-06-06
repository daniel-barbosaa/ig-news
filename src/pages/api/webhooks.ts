import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";
import Stripe from "stripe";
import { stripe } from "../../services/stripe";
import { saveSubscription } from "./_lib/manageSubscription";

async function buffer(readable: Readable) {
  const chunks = [];

  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }

  return Buffer.concat(chunks);
}

export const config = {
  api: {
    bodyParser: false,
  },
};

const relevantsEvents = new Set([
  "checkout.session.completed",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

export const webHooks = async (req: NextApiRequest, resp: NextApiResponse) => {
  if (req.method === "POST") {
    const buf = await buffer(req);

    const secret = req.headers["stripe-signature"] ?? "";

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        buf,
        secret,
        process.env.STRIPE_WEBHOOKS_SECRET ?? ""
      );
    } catch (err) {
      return resp.status(400).send(`Webhook errors ${err}`);
    }

    const { type } = event;

    if (relevantsEvents.has(type)) {
      try {
        switch (type) {
          case "customer.subscription.updated":
          case "customer.subscription.deleted":
            const subscription = event.data.object as Stripe.Subscription;
            await saveSubscription(
              subscription.id,
              subscription.customer.toString(),
              false
            );
            break;

          case "checkout.session.completed":
            const checkoutSession = event.data
              .object as Stripe.Checkout.Session;
            await saveSubscription(
              checkoutSession.subscription?.toString() ?? "",
              checkoutSession.customer?.toString() ?? "",
              true
            );
            break;
          default:
            throw new Error("Unhandled event.");
        }
      } catch (err) {
        return resp.json({
          error: "Webhook handler failed.",
        });
      }
    }

    resp.json({ received: true });
  } else {
    resp.setHeader("Allow", "POST");
    resp.status(405).end("Method not allowed");
  }
};

export default webHooks;
