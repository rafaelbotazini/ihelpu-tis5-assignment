# iHelpU

<h1 align="center">
    <a href="#">🔗 React & Node.js </a>
</h1>
<img src="https://img.shields.io/static/v1?label=ChatRoom&message=iHelpU&color=7159c1&style=for-the-badge&logo=ghost"/>

![Node Version][node-image]
![Yarn Version][yarn-image]


# 📝 Tabela de conteúdos

<!--ts-->

- [Sobre](#Sobre)
- [Tabela de Conteudo](#tabela-de-conteudo)
- [Instalação](#instalacao)
- [Como usar](#como-usar)
  - [Pré Requisitos](#pré-requisitos)
- [Tecnologias](#tecnologias)

<!--te-->

### ✋🏻 Pré-requisitos

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/pt-BR/docs/install)
- [MongoDB](https://docs.mongodb.com/manual/installation/)

### Como executar a aplicação

Abra um terminal e clone este repositório usando o `git`, ou [faça o download do repositório como um arquivo zip](https://github.com/icei-pucminas/plf-es-2020-2-tiv-6702100-ihelpu/archive/master.zip):

```bash
git clone https://github.com/icei-pucminas/plf-es-2020-2-tiv-6702100-ihelpu.git
```

#### 🎲 Rodando o Back end (servidor da API)

Dentro do diretório [`Codigo/back/`](back), crie um arquivo `.env` com o seguinte conteúdo:

```
WEBTOKEN_SECRET_KEY=<chave para encriptar os tokens>
DB_URL=<url de acesso ao banco de dados mongodb>
```

Se tiver dúvidas, consulte o arquivo de exemplo [`.env.example`](back/.env.example)

```bash
# A partir da raiz do repositório, abra o diretório do projeto backend
$ cd Codigo/back/

# Instale as dependências
$ yarn install

# Inicie o servidor da api em modo de desenvolvimento
$ yarn start:dev
```

O servidor inciará na porta 9000. Acesse <http://localhost:9000/api/docs> para ver a documentação da API.

#### :zap: Rodando o Front end

```bash
# A partir da raiz do repositório, abra o diretório do projeto frontend
$ cd Codigo/front/

# Instale as dependências
$ yarn install

# Inicie o servidor da aplicação web em modo de desenvolvimento
$ yarn start
```

O servidor inciará na porta 3000. Acesse <http://localhost:3000>.

### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [React](https://pt-br.reactjs.org/)
- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [NestJS](https://nestjs.com/)
- [MongoDB](https://www.mongodb.com/)

<h4 align="center"> 
	🚧  Projeto 🚀 Em construção...  🚧
</h4>

<!-- Markdown link & img dfn's -->
[node-image]: https://img.shields.io/badge/node.js-12.16.1%2B-informational
[yarn-image]: https://img.shields.io/badge/yarn-1.22.4%2B-blue
