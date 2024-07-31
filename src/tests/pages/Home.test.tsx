

import {render, screen} from '@testing-library/react'
import Home, {getStaticProps} from '../../pages'
import { stripe } from '../../services/stripe';



jest.mock('../../services/stripe')

jest.mock('next/router', () => ({
    useRouter: jest.fn()
}))
jest.mock('next-auth/react', () => {
    return {
        useSession: () => [null, false]
    }
})

describe('Home page', () => {
    it('Renderização correta', () => {
        render(<Home product={{amount: 'R$10,00', priceId: 'R$10,00'}}/>)

        expect(screen.getByText("For R$10,00 month")).toBeInTheDocument()
    })

    it('carregando dados correto', async  () => {
        const retriveStripePricesMocked = stripe.prices.retrieve as any

        retriveStripePricesMocked.mockResolvedValueOnce({
            id: 'fake-price-id',
            unit_amount: 1000,
        } as any)

        const response = await getStaticProps({})

        

        expect(response).toEqual(
            expect.objectContaining({
            props: {
                product: {
                    priceId: 'fake-price-id', 
                    amount: '$10.00'
                },
            }
            }))
    })
    
})