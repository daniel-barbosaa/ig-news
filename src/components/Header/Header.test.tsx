import {render, screen} from '@testing-library/react'
import { Header } from '.'

// Sempre que um componente depende de uma lib ou de uma função externa precisamos "mockar" essa função botando um retorno fictício, exemplos abaixo

jest.mock('next/router', () => {
    return {
        useRouter() {
            return {
                asPath: '/'
            }
        }
    }
})
jest.mock('next-auth/react', () => {
    return {
        useSession(){
            return {
                data: {}
            }
        }
    }
})
jest.mock('next/image')

// Aqui meio que cria uma categorização dos testes, separa em partes
describe("Header component", () => {
    // cada it, significa isto, espero
    it('Esperamos um link Home e outro Post', ()=> {
        render(
            <Header/>
        )
        expect(screen.getByText('Home')).toBeInTheDocument()
        expect(screen.getByText('Post')).toBeInTheDocument()
    })
   
})

