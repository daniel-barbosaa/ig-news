import Head from "next/head"
import styles from './styles.module.scss'
import { useSession } from "next-auth/react"
import { Badge } from '@chakra-ui/react'
import { CancelSubscriptionModal } from "../../components/CancelSubscriptionModal/inde.x"
import {
    useDisclosure
} from '@chakra-ui/react'
import { api } from "../../services/api"
import { useRouter } from 'next/router'
import { useEffect } from "react"

interface ActiveSubscribe  {
    ref: { '@ref': any },
    ts: number,
    data: {
      id: string,
      userId: any,
      status: string,
      priceId: string
    }
  }

interface Session  {
    user: {
      name: string,
      email: string,
      image: string
    },
    expires: string,
    activeSubscription?: ActiveSubscribe
}

export default function Account () {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {data: session} = useSession() as {data: Session}
    const router = useRouter()

    const isSubscription = session?.activeSubscription


    useEffect(() => {
        
    }, [isSubscription])

    const handleCancelSubscription  = async () => {
        const subscriptionId = session.activeSubscription?.data.id
        const response = await api.post('/cancel-subscription', {
            subscriptionId
        })
        router.push('/')
        console.log(response)
    }

    // Apresentar algo na tela quando csncelar assinatura e mudar as opcao se tiver assinatura ativa ou cancelada

    return (
        <>
        <Head>
           Account | Ignews 
        </Head>
        <main className={styles.container}>
            <CancelSubscriptionModal isOpen={isOpen} onClose={onClose} onCancelSubscription={handleCancelSubscription}/>
            <section className={styles.accountInfosSection}>
                <h1>Signatures</h1>
                <div className={styles.subscriptionStatus}>
                    <h3>News about the React world</h3>
                    {isSubscription ? <Badge colorScheme='green'>ACTIVE</Badge> : <Badge colorScheme='red'>CANCELED</Badge> }
                </div>
               <div className={styles.containerCancelButton}>
                {isSubscription && <button className={styles.cancelaButton} onClick={onOpen} type="button">Cancel Subscription</button> }
                
               </div>
            </section>
        </main>
        </>
    )
}