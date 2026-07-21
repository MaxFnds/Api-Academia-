# FitWeb


FitWeb é um sistema web de gestão de academia/CrossFit, onde instrutores cadastram treinos e exercícios e acompanham a evolução dos alunos. Alunos podem visualizar seus treinos, marcar exercícios como concluídos e acompanhar seu progresso, tudo direto pelo navegador.


> ⚠️ Ajuste esta descrição se o tema do projeto for diferente de Academia/CrossFit.


---


## 📌 Diagrama de Caso de Uso


 https://ibb.co/JWTdcwq6




## 👥 Equipe


| Integrante | Papel |
|---|---|
| Lucas Gabriel Aráujo de Morais | Líder técnico |
| Layla Marcela Bezerra Santana | Back-end |
| Heytor Andrade de Medeiros | Front-end |
| Max Antonio Carlos Fernandes Filho | QA / Testes |
| Weyd Leanny Lima Neumann | Back-end |




---


## 🛠️ Tecnologias utilizadas


| Tecnologia | Uso no projeto |
|---|---|
| Node.js + TypeScript | Linguagem e runtime |
| Express | Framework web |
| EJS | Templates HTML |
| OOP (Classes) | `private`, `get/set`, `validar`, `fromJSON`, `toJSON` |
| Repository Pattern | Camada de dados separada |
| MVC | Models / Views / Routes |
| JSON | Persistência em arquivos `.json` |
| bcrypt + session | Autenticação (registro, login, logout) |
| Middleware auth | Proteção de rotas |
| Multer | Upload de imagens |
| fetch API + FormData | Front-end dinâmico |
| Jest | Testes automatizados (mínimo 10) |
| Git/GitHub | Versionamento com commits individuais |


---


## ▶️ Como executar


```bash
# Clonar o repositório
git clone <URL_DO_REPOSITORIO>
cd fitweb


# Instalar dependências
npm install


# Rodar em modo desenvolvimento
npm run dev
```


O servidor sobe em `http://localhost:3000`.


## 🧪 Como rodar os testes


```bash
npm test
```


---


## 📸 Screenshots


> Adicionar no mínimo 3 imagens: tela de login, tela de listagem e tela de formulário.


| Tela | Imagem |
|---|---|
| Login | `screenshots/login.png` |
| Listagem | `screenshots/listagem.png` |
| Formulário | `screenshots/formulario.png` |


---


## 📁 Estrutura de pastas


```
projeto/
  src/
    entities/       -> Classes OOP
      __tests__/    -> Testes unitarios
    models/         -> Repositories
      __tests__/    -> Testes unitarios
    routes/         -> Rotas Express
      __tests__/    -> Testes integracao
    middlewares/    -> Auth guard, upload Multer
    views/          -> Templates EJS
    app.ts          -> Config Express (export default)
    server.ts       -> Listen porta 3000
  public/
    css/            -> Estilos
    js/             -> JS do navegador
  uploads/          -> Imagens enviadas
  dados/            -> Arquivos JSON
  jest.config.js    -> Config Jest
  tsconfig.json     -> Config TypeScript
  package.json      -> Dependencias
  README.md         -> Documentacao
```


---


## 🌐 Tabela de rotas da API


### Autenticação


| Método | Rota | Descrição | Auth? | Status |
|---|---|---|---|---|
| POST | `/auth/registro` | Registrar novo usuário | Não | 201/400 |
| POST | `/auth/login` | Login | Não | 200/401 |
| POST | `/auth/logout` | Logout | Sim | 200 |


### Alunos


| Método | Rota | Descrição | Auth? | Status |
|---|---|---|---|---|
| GET | `/api/alunos` | Listar todos os alunos | Sim | 200 |
| GET | `/api/alunos/:id` | Detalhar aluno | Sim | 200/404 |
| POST | `/api/alunos` | Cadastrar aluno | Instrutor | 201/400 |
| PUT | `/api/alunos/:id` | Atualizar aluno | Instrutor | 200/404 |
| DELETE | `/api/alunos/:id` | Remover aluno | Instrutor | 200/404 |
| POST | `/api/alunos/:id/foto` | Upload de foto de perfil (Multer) | Sim | 200/400 |


### Treinos


| Método | Rota | Descrição | Auth? | Status |
|---|---|---|---|---|
| GET | `/api/treinos` | Listar treinos | Sim | 200 |
| GET | `/api/treinos/:id` | Detalhar treino | Sim | 200/404 |
| POST | `/api/treinos` | Criar treino | Instrutor | 201/400 |
| PUT | `/api/treinos/:id` | Atualizar treino | Instrutor | 200/404 |
| DELETE | `/api/treinos/:id` | Remover treino | Instrutor | 200/404 |


### Exercícios


| Método | Rota | Descrição | Auth? | Status |
|---|---|---|---|---|
| GET | `/api/exercicios` | Listar exercícios | Sim | 200 |
| POST | `/api/exercicios` | Criar exercício | Instrutor | 201/400 |
| PUT | `/api/exercicios/:id` | Atualizar exercício | Instrutor | 200/404 |
| DELETE | `/api/exercicios/:id` | Remover exercício | Instrutor | 200/404 |
| PATCH | `/api/exercicios/:id/concluir` | Marcar exercício como concluído (fetch, sem reload) | Sim | 200/404 |


> ⚠️ Esta tabela é um rascunho baseado nas entidades sugeridas para o tema Academia/CrossFit. Substituam pelas rotas reais conforme forem implementando (Aula 50 em diante).

