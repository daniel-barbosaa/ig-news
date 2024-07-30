import { signIn, useSession } from 'next-auth/react'
import styles from './styles.module.scss'
import { api } from '../../services/api'
import { getStipeJs } from '../../services/stripe-js'
import { useRouter } from 'next/router'


export function SubscribeButton () { 
    const { data: session, status } = useSession();    

    const router = useRouter()

    async function handleSubscribe () {
        if(status !== 'authenticated' ) {
            signIn('github')
            return
        }   

        if(session && (session as any).activeSubscription){
            router.push('/posts')
            return
        }

        try {
            const response = await api.post('/subscribe')
            // Pegando o session id do Stripe
            const {sessionId} = response.data

            // Passando o id utilizando a lib stripe-js e redirecionando o checkout
            const stripe = await getStipeJs()

            await stripe?.redirectToCheckout({sessionId})
        }catch(err){
            alert(err)
        }
    }
    return (
        <button type="button" className={styles.subscribeButton} onClick={handleSubscribe}>Subscribe now</button>
    )
}

export default SubscribeButton
