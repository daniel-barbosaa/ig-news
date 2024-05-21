import Stripe from 'stripe'
import {version} from '../../package.json'

const StripeApiKey = process.env.STRIPE_API_KEY ?? ''

export const stripe = new Stripe(
    StripeApiKey,
    {
        apiVersion: '2023-10-16',
        appInfo: {
            name: 'Ignews',
            version
        }
    }
)