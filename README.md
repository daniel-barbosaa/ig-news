# Ig news

Uma aplicação web desenvolvida na ideia de um blog de noticias sobre o mundo da tecnologia, com opção de login via github para facilitar o acesso, assinatura de valor único que da acesso a todos os posts em tempo real.

##  Índice

1. [Descrição](#descrição)
2. [Instalação](#instalação)
3. [Uso](#uso)
4. [Configuração](#configuração)
5. [Contribuição](#contribuição)
6. [Licença](#licença)
7. [Contato](#contato)
8. [Agradecimentos](#agradecimentos)


## Descrição 

Um aplicação com base na ideia de um blog, um blog por assinatura, já no inicio você tem opção de login com github e opção para assinar o produto, porém só é permitido ter uma assinatrura depois de logado. Na aba posts para os não assinantes tem uma breve parte de cada post e só é liberado o acesso total do post a partir de assinado. Para quem curte noticias sobre a área da tecnologia ficou algo muito prático e de facíl acesso, sem muita firula.

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

# Iniciar

npm dev

# Antes de usar a aplicação faça isso, essa é a etapa para ouvir o webhooks da aplicação

# Execute na linha de comando do seu pc:

stripe login

stripe listen --forward-to localhost:3000/api/webhooks

# Acesse
http://localhost:3000

