# 📦 Atividade avaliativa de backend

Este projeto é uma atividade desenvolvida durante meu curso técnico em desenvolvimento de sistemas. A ativividade é avaliativa e ela consiste em desenvolver uma aplicação utilizando principalmente protocolos http e banco de dados mysql para fazer um sistema que cadastre o usuário e faça login dele, armazenando os dados obtidos do cadastro em um banco de dados mysql. A minha aplicação foi um site de cadastro de eventos, onde o usuário pode escolher entre se cadastrar ou fazer login se já cadastrado. Após o cadastro ou login, o usuário é direcionado para a tela principal onde ele pode cadastrar os eventos que ele quiser clicando em adicionar evento.

## 🛠️ Tecnologias Utilizadas

- [Node.js]
- [TypeScript]
- [Express.js]
- [TypeORM]
- [bcrypt.js]
- [@types/express*]
- [mysql2]


## 📁 Estrutura do Projeto

├── src/
│ ├── controller/ # Lógica das rotas e funções CRUD
│ ├── model/ # Modelos TypeORM para as tabelas (usuarios e eventos)
│ ├── view/ # Arquivos relacionados à visualização (integração com HTML)
│ ├── public/ # Telas HTML e arquivos estáticos (CSS, JS, imagens)
│ ├── routes.ts # Definição das rotas
│ └── server.ts # Inicialização do servidor
├── tsconfig.json # Configuração do TypeScript
├── package.json # Dependências e scripts
└── README.md # Documentação do projeto


🧪 Funcionalidades

✅ Cadastro, visualização, edição e atualização de usuários

✅ Criação e gerenciamento de eventos e de usuários

✅ Visualização de dados

✅ Criptografia e hash de senhas com bcrypt

✅ Banco de dados (mysql)


📌 Observações

- O nome do banco de dados deve ser eventos_db;
- Devido a necessidade de confidencialidade, os dados do banco são colocados em um arquivo .env que não enviará os dados do banco que são confidenciais, então os dados ficam á sua escolha e necessidade;
- Mantenha o syncronyze, emitDecoratorMetadata e experimentalDecorator como true para que não ocorra nenhum erro indesejado na aplicação
- Para que a aplicação funcione, todas as dependências tem que estar instaladas; 

✍️ Dev:
**Vinicius do curso Técnico em desenvolvimento de sistemas do Senac**

