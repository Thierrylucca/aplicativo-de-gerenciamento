
# Aplicativo

Projeto de um aplicativo mobile que simula o gerenciamento de uma instituição educacional.
Desenvolvido em React Native, com backend em Node.js, o projeto é voltado para o aprendizado e aplicação de
conceitos como navegação, consumo de APIs, e criação de componentes reutilizáveis.


## Funcionalidades
### Para Alunos
- Login e cadastro.
- Visualização de cursos disponíveis para matrícula.
### Para Professores
- Login e cadastro.
- Gerenciamento de cursos (criação, visualização e exclusão).
### Gerais
- Navegação dinâmica baseada no tipo de usuário (aluno ou professor).
- Consumo de dados de uma API com autenticação JWT.



## Stack utilizada

**Front-end:**  React Native, Expo

**Back-end:** Node, Express



## Instalação

### Pré-requisitos
- Node.js
- Expo CLI

### Backend
1. Navegue até a pasta da API:
 ```bash
 cd API_Project-College
 ```
2. Instale as dependências:
 ```bash
 npm install
 ```
3. Configure as variáveis de ambiente no arquivo `.env`:
 ```plaintext
 PORT=3000
 JWT_SECRET=sua_chave_secreta
 ```
4. Inicie o servidor:
```bash
 npm start
 ```
### Frontend
1. Navegue até a pasta do aplicativo:
 ```bash
 cd Project_React-College
 ```
2. Instale as dependências:
 ```bash
 npm install
 ```
3. Inicie o Expo:
 ```bash
 npx expo start
 ```
4. Use o aplicativo **Expo Go** para escanear o QR Code ou execute em um emulador.
## Estrutura de Pastas 

### Backend (`API_Project-College/`)
- `src/routes`: Define as rotas (ex.: `/auth`, `/courses`).
- `src/controllers`: Contém a lógica de cada rota.
- `src/models`: Gerencia a estrutura de dados e o banco.
### Frontend (`Project_React-College/`)
- `src/components`: Componentes reutilizáveis como botões e campos de entrada.
- `src/screens`: Telas principais, como login e gerenciamento de cursos.
- `src/navigation`: Configurações de navegação entre telas## Endpoints da API  

| Método | Endpoint       | Descrição                                   |
|--------|----------------|---------------------------------------------|
| POST   | `/auth/register` | Cadastro de alunos e professores.          |
| POST   | `/auth/login`    | Login e geração de token JWT.              |
| GET    | `/courses`       | Listagem de cursos com base no tipo do usuário. |
| POST   | `/courses/add`   | Adiciona um novo curso (professor).        |
| DELETE | `/courses/:id`   | Remove um curso existente (professor).     |

## Componentes

### Componentes Reutilizáveis

#### 1. **Botão (`Button.js`)**
   - **Descrição**: Componente de botão reutilizável utilizado em várias partes do aplicativo.
   - **Props**:
     - `title`: Texto que aparece no botão.
     - `onPress`: Função chamada quando o botão é pressionado.
   - **Exemplo**:
     ```jsx
     <Button title="Entrar" onPress={handleLogin} />
     ```

#### 2. **Campo de Entrada (`InputField.js`)**
   - **Descrição**: Componente de campo de entrada, utilizado em formulários de login, cadastro e outros.
   - **Props**:
     - `placeholder`: Texto exibido quando o campo está vazio.
     - `value`: Valor atual do campo.
     - `onChangeText`: Função que atualiza o valor do campo.
   - **Exemplo**:
     ```jsx
     <InputField 
       placeholder="Digite seu email" 
       value={email} 
       onChangeText={setEmail} 
     />
     ```

#### 3. **Loader (`Loader.js`)**
   - **Descrição**: Componente que exibe um indicador de carregamento, utilizado durante requisições à API.
   - **Exemplo**:
     ```jsx
     {isLoading && <Loader />}
     ```

### Componentes de Tela

#### 1. **Tela de Login (`LoginScreen.js`)**
   - **Descrição**: Tela de login do aplicativo, onde o usuário insere suas credenciais.
   - **Componentes Usados**:
     - `InputField`: Para os campos de email e senha.
     - `Button`: Para o botão de login.
   - **Fluxo**:
     - O usuário insere o email e a senha, e ao pressionar o botão, o aplicativo valida as credenciais e navega para a tela de cursos.

#### 2. **Tela de Cadastro (`RegisterScreen.js`)**
   - **Descrição**: Tela onde o usuário se cadastra fornecendo seus dados.
   - **Componentes Usados**:
     - `InputField`: Para os campos de nome, email, senha, etc.
     - `Button`: Para o botão de envio.
   - **Fluxo**:
     - O usuário preenche os dados, e ao pressionar o botão, os dados são enviados para o backend para criação de uma nova conta.

#### 3. **Tela de Cursos para Alunos (`AlunoCoursesScreen.js`)**
   - **Descrição**: Tela onde o aluno pode visualizar os cursos disponíveis para matrícula.
   - **Componentes Usados**:
     - `CourseCard`: Exibe informações sobre cada curso.
     - `Button`: Para matrícula em cursos.
   - **Fluxo**:
     - O aluno visualiza a lista de cursos e pode se matricular ao pressionar o botão correspondente.

#### 4. **Tela de Gestão de Cursos para Professores (`ProfessorCoursesScreen.js`)**
   - **Descrição**: Tela onde o professor pode gerenciar os cursos (criar, editar e excluir).
   - **Componentes Usados**:
     - `CourseCard`: Exibe os cursos já existentes.
     - `Button`: Para adicionar ou excluir cursos.
   - **Fluxo**:
     - O professor pode adicionar um novo curso, visualizar cursos existentes ou deletá-los.

### Outros Componentes

#### 1. **Modal (`Modal.js`)**
   - **Descrição**: Componente de modal para exibir mensagens ou informações extras de forma interativa.
   - **Props**:
     - `isVisible`: Define se o modal está visível ou não.
     - `content`: O conteúdo que será exibido dentro do modal.
   - **Exemplo**:
     ```jsx
     <Modal isVisible={isModalVisible} content="Curso criado com sucesso!" />
     ```

#### 2. **Navbar (`Navbar.js`)**
   - **Descrição**: Barra de navegação usada para alternar entre as páginas principais do aplicativo.
   - **Exemplo**:
     ```jsx
     <Navbar />
     ```

### Como Usar os Componentes

Para usar os componentes no seu projeto, basta importá-los e passar as propriedades necessárias. Por exemplo, ao usar o `Button`, você pode fazer:

```jsx
import Button from './components/Button';

<Button title="Login" onPress={handleLogin} />

