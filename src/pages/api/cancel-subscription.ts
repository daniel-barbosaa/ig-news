import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../services/stripe";
import { fauna } from "../../services/fauna";
import {query as q} from 'faunadb'



const CancelSubscribe = async (req: NextApiRequest, res: NextApiResponse ) => {
    if(req.method === 'POST'){
       const {subscriptionId} = req.body
       if(!subscriptionId){
        return res.status(400).json({error: 'subscriptionId é preciso!'})
       }

       try {
            const deletedSubscription = await stripe.subscriptions.cancel(subscriptionId)

            const subscriptionRef = await fauna.query(
                q.Select("ref", q.Get(q.Match(q.Index('subscription_by_id'), subscriptionId)))
              );

            await fauna.query(
                q.Delete(subscriptionRef)
            )
        
        return res.status(200).json(deletedSubscription)
       }catch{
        return res.status(400).json({error: 'Falha ao cancelar inscrição!'})
       }
    }else{
        return res.status(400).json({error: 'subscriptionId é preciso!'})
    }
}

export default CancelSubscribe