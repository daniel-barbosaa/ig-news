import {render, screen} from '@testing-library/react'
import Home from '../../pages'


jest.mock('stripe')
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
    
})