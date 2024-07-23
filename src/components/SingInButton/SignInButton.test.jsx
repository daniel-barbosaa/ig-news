import {render, screen} from '@testing-library/react'
import { SignButton } from '.'
import { useSession} from 'next-auth/react';

// Sempre que um componente depende de uma lib ou de uma função externa precisamos "mockar" essa função botando um retorno fictício, exemplos abaixo

jest.mock('next-auth/react')


// Aqui meio que cria uma categorização dos testes, separa em partes
describe("SignInButton component", () => {
    // cada it, significa isto, espero
    it('Renderização correta se usuário não esta logado', ()=> {
        const useSessionMocked = useSession
        useSessionMocked.mockReturnValueOnce([null, false])

        render(
            <SignButton/>
        )
        expect(screen.getByText('Sign in with Github')).toBeInTheDocument()
    })

    it('Renderização correta se usuário esta logado', ()=> {
        const useSessionMocked = useSession
        useSessionMocked.mockReturnValueOnce({
            data: {
              user: { name: 'John Doe', email: 'john@example.com' },
              expires: 'fake-expires'
            },
        })

        render(
            <SignButton/>
        )

        expect(screen.getByText('John Doe')).toBeInTheDocument()
    })
})

