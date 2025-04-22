import {render} from '@testing-library/react'
import { LinkActive } from '.'
import { useRouter } from 'next/router'


jest.mock('next/router', () => {
    return {
        useRouter() {
            return {
                asPath: '/'
            }
        }
    }
})
// Aqui meio que cria uma categorização dos testes, separa em partes
describe("ActiveLink Component", () => {
    // cada it, significa isto, espero
    it('Renderizando da forma correta', ()=> {
        const {getByText} = render(
            <LinkActive href="/" activeClassName='active' >
                <p>Home</p>
            </LinkActive>
        )
    
        // Aqui basicamente e uma verificação do que é esperado desse componente, o que ele deve fazer ou redenrizar...
        expect(getByText('Home')).toBeInTheDocument()
    })
    
    it('espero receber um active na class, se o link atualmente esta ativo ', ()=> {
        const {getByText} = render(
            <LinkActive href="/" activeClassName='active' >
                <p>Home</p>
            </LinkActive>
        )
    
        // Aqui basicamente e uma verificação do que é esperado desse componente, o que ele deve fazer ou redenrizar...
        expect(getByText('Home')).toHaveClass('active')
    })
})

