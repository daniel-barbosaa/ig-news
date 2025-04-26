import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../services/stripe";
import { getSession } from "next-auth/react";
import { fauna } from "../../services/fauna";
import { query as q } from "faunadb";

type User = {
  ref: {
    id: string;
  };
  data: {
    stripe_customer_id: string;
  };
};

const Subscribe = async (req: NextApiRequest, resp: NextApiResponse) => {
  if (req.method === "POST") {
    let session = await getSession({ req });

    // Aguardando até encontrar o user.email e reatribuindo seu valor quando encontrar
    while (!session || !session.user || !session.user.email) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      session = await getSession({ req });
    }

    const email = session.user.email;

    //Buscando usuário no banco com esse email
    const user = await fauna.query<User>(
      q.Get(q.Match(q.Index("user_by_email"), q.Casefold(email)))
    );

    // Pegando o customerId no banco do usuário
    let customerId = user.data.stripe_customer_id;

    // Se não existe um usuário com este customerId, então cria um no Stripe e atualiza o customerId do banco com o customerId do stripe
    if (!customerId) {
      const stripeCustomer = await stripe.customers.create({
        email: email,
      });

      await fauna.query(
        q.Update(q.Ref(q.Collection("users"), user.ref.id), {
          data: {
            stripe_customer_id: stripeCustomer.id,
          },
        })
      );

      customerId = stripeCustomer.id;
    }

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      billing_address_collection: "required",
      line_items: [
        {
          price: "price_1P47zhAuruhV4Wv0zBKyDIMv",
          quantity: 1,
        },
      ],
      mode: "subscription",
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    });

    return resp.status(200).json({ sessionId: stripeCheckoutSession.id });
  } else {
    resp.setHeader("Allow", "POST");
    resp.status(405).end("Method not allowed");
  }
};

export default Subscribe;
