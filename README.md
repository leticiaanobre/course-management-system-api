# Sistema de Gerenciamento de Cursos

Este é um sistema de gerenciamento de cursos desenvolvido com Node.js, Express e PostgreSQL.

## Pré-requisitos

Para rodar este backend, você precisa ter:

1. **Node.js** instalado na máquina. [Download Node.js](https://nodejs.org/)
2. **PostgreSQL** configurado, incluindo uma ferramenta de gerenciamento como o **pgAdmin** (opcional, mas recomendável).
3. **npm** ou **yarn** como gerenciador de pacotes.

## Configuração

1. Clone o repositório e entre na pasta do projeto usando o comando 'cd nome-da-pasta'
2. Instale as dependências: `npm install`
3. Configure as variáveis de ambiente no arquivo `.env` com as seguintes variaveis:

   ```plaintext
      DB_USERNAME=seu_username
      DB_PASSWORD='sua_senha' 
      DB_DATABASE=course_management
      DB_HOST=localhost
      DB_DIALECT=postgres
      PORT=5000
4. Rode o comando para criar o bando de dados `npx sequelize-cli db:create`
5. Execute as migrações: `npm run migrate`
6. Inicie o servidor com `npm run dev`
7. Configure o postman para receber content-type JSON para começar a usar as rotas da API

## Execução

- Desenvolvimento: `npm run dev`
- Produção: `npm start`

## APIs
- Api base URL: http://localhost:5000/

### Usuários

- POST /users
  - Cria um novo usuário
  - Corpo (exemplo):
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "senha123"
    }
    ```
  - Resposta esperada (exemplo):
    ```json
    {
      "message": "User created successfully",
      "user": {
          "id": 2,
          "name": "Carlos Eduardo",
          "email": "eduardo@gmail.com",
          "created_at": "2025-01-15T18:04:53Z"
      }
    }
    ```

- GET /users/:id ou GET /users (getAllUsers)
  - Retorna informações do usuário pelo id ou todos os usuários do sistema
  - Query (opcional): `timezone`
  - Resposta esperada (exemplo):
    ```json
    {
    "id": 1,
    "name": "Leticia Nobre",
    "email": "leticia@gmail.com",
    "created_at": "2025-01-15, 02:49:21",
    "enrollments": [
            {
                "id": 2,
                "course": {
                    "id": 1,
                    "name": "Curso Frontend React"
                },
                "enrolled_at": "2025-01-15, 14:51:01"
            },
            {
                "id": 1,
                "course": {
                    "id": 1,
                    "name": "Curso Frontend React"
                },
                "enrolled_at": "2025-01-15, 14:47:20"
            },
            {
                "id": 3,
                "course": {
                    "id": 2,
                    "name": "Curso Desenvolvimento API com Node"
                },
                "enrolled_at": "2025-01-15, 15:14:43"
            }
        ],
        "message": "User data retrieved successfully."
    }
    ```

### Cursos

- POST /courses
  - Cria um novo curso
  - Corpo (exemplo):
    ```json
    {
      "title": "Introdução ao React",
      "description": "Curso básico de React",
      "hours": 40
    }
    ```
  - Resposta esperada (exemplo):
    ```json
    {
      "message": "Course created successfully.",
      "course": {
          "id": 2,
          "title": "Curso Desenvolvimento API com Node",
          "description": "Criação de APIS no backend com javascript.",
          "hours": 40,
          "created_at": "2025-01-15, 12:13:09"
      }
    }
    ```

- GET /courses
  - Lista todos os cursos
  - Query (opcional): `timezone`
  - Resposta esperada (exemplo):
    ```json
    [
      {
        "id": 1,
        "title": "Introdução ao React",
        "description": "Curso básico de React",
        "hours": 40,
        "created_at": "2025-01-15T12:00:00.000Z"
      },
      {
        "id": 2,
        "title": "Avançando com Node.js",
        "description": "Curso avançado sobre Node.js",
        "hours": 60,
        "created_at": "2025-01-15T12:00:00.000Z"
      }
    ]
    ```

### Matrículas

- POST /enrollments
  - Matricula um usuário em um curso
  - Corpo (exemplo):
    ```json
    {
      "user_id": 1,
      "course_id": 1
    }
    ```
  - Resposta esperada (exemplo):
    ```json
    {
      "message": "Enrollment created successfully.",
      "enrollment": {
          "id": 3,
          "user_id": 1,
          "course_id": 2,
          "enrolled_at": "2025-01-15, 12:14:43"
      }
    }
    ```

- GET /enrollments/:userId
  - Lista os cursos de um usuário
  - Query (opcional): `timezone`
  - Resposta esperada (exemplo):
    ```json
    [
      {
          "id": 7,
          "user_id": 3,
          "course": {
              "id": 1,
              "title": "Curso Frontend React",
              "created_at": "2025-01-15, 11:32:06"
          },
          "enrolled_at": "2025-01-15, 22:39:28"
      }
    ]
    ```

## Tecnologias Utilizadas

- Node.js
- Express
- PostgreSQL
- Sequelize (ORM)
- bcrypt (para hash de senhas)
- moment-timezone (para lidar com fusos horários)
