'use client'
import {fireEvent, render, screen} from '@testing-library/react'
import { SubscribeButton } from '.'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

// Terminar teste do Subscribe Button parei no minuto 2:00
jest.mock('next-auth/react')

jest.mock('next/router', () => ({
    useRouter: jest.fn()
}))

describe("SubscribeButtons component", () => {

    it('Renderização correta', () => {
        const useSessionMocked = useSession

        useSessionMocked.mockReturnValueOnce([null, false])

        render(
            <SubscribeButton/>
        )
        expect(screen.getByText('Subscribe now')).toBeInTheDocument()
    })

    it('Redirecionamento de usuário para tela de login quando não estiver autenticado', () => {
        const signInMocked = signIn
        const useSessionMocked = useSession
        useSessionMocked.mockReturnValueOnce([null, false])

        render(<SubscribeButton/>)

        const subscribeButton = screen.getByText('Subscribe now')

        fireEvent.click(subscribeButton)

        // Espera que após o clique no botão a função signIn tenha sido chamada
        expect(signInMocked).toHaveBeenCalled()
    })

    it('Redirecionar usuário se tiver assinatura ativa e inscrito', () => {
       const useRouterMocked = useRouter
       const pushMock = jest.fn()
       const useSessionMocked = useSession
  
       useSessionMocked.mockReturnValueOnce({
        data: {
          user: { name: 'John Doe', email: 'john@example.com' },
          expires: 'fake-expires',
          activeSubscription: 'fake-active-subscription'
        },
        status: 'authenticated',
        
    })

       useRouterMocked.mockReturnValueOnce({
        push: pushMock
       })

       render(<SubscribeButton/>)

       const subscribeButton = screen.getByText('Subscribe now')
       fireEvent.click(subscribeButton)
       // Aqui espera que a função push. seja chamada
       expect(pushMock).toHaveBeenCalledWith('/posts')
    })
})

