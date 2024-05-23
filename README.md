# Ig news

Uma aplicação web desenvolvida na ideia de um blog de noticias sobre o mundo da tecnologia, com opção de login via github para facilitar o acesso, assinatura de valor único que da acesso a todos os posts em tempo real.

##  Índice

1. [Descrição](#descrição)
2. [Tecnologias Utilizadas](#tecnologias-utilizadas)
3. [Instalação](#instalação)
4. [Uso](#uso)
5. [Configuração](#configuração)
6. [Contato](#contato)
7. [Agradecimentos](#agradecimentos)


## Descrição 

Um aplicação com base na ideia de um blog, um blog por assinatura, já no inicio você tem opção de login com github e opção para assinar o produto, porém só é permitido ter uma assinatrura depois de logado. Na aba posts para os não assinantes tem uma breve parte de cada post e só é liberado o acesso total do post a partir de assinado. Para quem curte noticias sobre a área da tecnologia ficou algo muito prático e de facíl acesso, sem muita firula.

## Tecnologias utilizadas 

- [Typescript](https://www.typescriptlang.org/docs/)
- NextJs
- ReactJs
- NodeJs
- FaunaDB 
- Stripe
- Primic
- Chakra UI


## Instalação

```sh
# Instalar o CLI na maquina. É importante que faça essa etapa para o funcionamento correto da aplicação
https://learn.microsoft.com/pt-br/dotnet/machine-learning/how-to-guides/install-ml-net-cli?tabs=windows


# Clone o repositório
git clone https://github.com/daniel-barbosaa/ig-news.git

# Entre no diretório do projeto
cd ig-news

# Instale as dependências
npm install

```

## Uso

```sh

# Iniciar

npm dev
ou
yarn dev

```
## Configuração

```sh
# Antes de usar a aplicação faça isso, essa é a etapa para ouvir o webhooks da aplicação para que funcione conforme o esperado
# Execute na linha de comando do seu pc:

stripe login

stripe listen --forward-to localhost:3000/api/webhooks

# Acesse
http://localhost:3000

# Na raiz do projeto crie um arquivo .env.local e cole o seguinte

require('dotenv').config({ path: '.env.local' });
#Stripe
STRIPE_WEBHOOKS_SECRET=whsec_293081bf91fa31a34964200ee41d033d09bcf2448df5bbe1ef3b1480153fccc8
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_51P47skAuruhV4Wv0au1oZBChZYGb23BZb30gPTWL3poARWUiUHhleEDlmXWcdeAyyWxFdNJbL4fj69uxraUVaLPn000UgOM0LI
STRIPE_API_KEY=sk_test_51P47skAuruhV4Wv0mQJgTS7LQgkuHjaa6zCyGnwImhmoisTKz5t08anRhOBShhu9fVSs2Ts6E5LC5zZkucPZ1OqZ00welrzgRb
STRIPE_SUCCESS_URL=http://localhost:3000/posts
STRIPE_CANCEL_URL=http://localhost:3000/
# Github

GITHUB_CLIENT_ID=b3a3195fe8574bdbc2fc
GITHUB_CLIENT_SECRET=33b3b14750cc65caaefad86521c065bb283ac2b0 

#FaunaDB

FAUNADB_KEY=fnAFe1Y5mGAAQBDoN-uEqnjD6r-Rw-bel2ckfj4R

#PRISMIC CMS

PRISMIC_ACCESS_TOKEN=MC5aakFVOEJFQUFDWUFfZk1I.77-9L0fvv73vv70777-977-9B--_ve-_vQJM77-977-977-9Dz_vv70JVHJ3FX7vv70rO1zvv71P77-9

#NEXT 

NEXTAUTH_SECRET=evZ/4L1O3J+AuB0TUrhP2WqFgGGdE0c1UO1BbgEUDvw

NEXTAUTH_URL=http://localhost:3000

```

## Contato

• Email: danielmendess.dev@gmail.com
• LinkedIn: https://www.linkedin.com/in/daniel-barbos/




