import { GetStaticProps } from 'next';

import Head from 'next/head'
import sytles from './home.module.scss'
import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';

interface HomeProps {
  product: {
    priceId: string,
    amount: number,
  }
}
export default function Home({product}: HomeProps) {

  return (
    <>
      <Head>
        <title>Home | ignews</title>
      </Head>
      <main className={sytles.contentContainer}>
        <section className={sytles.hero}>
          <span>👏 Hey, welcome </span>
          <h1>News about the <span>React</span> world.</h1>
          <p>Get access to all the publications</p>
          <span>For {product.amount} month</span>
          <SubscribeButton priceId={product.priceId}/>
        </section>

        <img src="/avatar.svg" alt="girl coding" />
      </main>
    </>
  );
}

// 3 formas principais de fazer uma chamada a API, com next

// Client-side
// Server-side
// Static Site Generation 



export const getStaticProps: GetStaticProps = async () => {

  const price = await stripe.prices.retrieve('price_1P47zhAuruhV4Wv0zBKyDIMv')

  let priceAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(( price.unit_amount ?? 0) / 100)

  const product = {
    priceId: price.id,
    amount: priceAmount 
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24, // 24 horas
  }
}
