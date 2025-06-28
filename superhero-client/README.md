# Gerenciamento de Heróis - Frontend (Angular)

Este projeto é a interface de usuário (Frontend) para a aplicação de Gerenciamento de Super-Heróis. Ele foi desenvolvido com as versões mais recentes do Angular e se comunica com uma API de backend para realizar operações de CRUD (Criar, Ler, Atualizar, Deletar) de heróis.

A interface é simples, reativa e construída com foco em boas práticas e uma ótima experiência de usuário.

---

## ✨ Funcionalidades

- **Listagem de Heróis:** Exibição dos super-heróis em formato de cards.
- **CRUD Completo:**
    - **Criação** de novos heróis através de um formulário dinâmico.
    - **Edição** de informações de heróis existentes no mesmo formulário.
    - **Exclusão** de heróis com um diálogo de confirmação para segurança.
- **Validação de Formulário:** Validação em tempo real nos campos do formulário para guiar o usuário.
- **Comunicação com API:** Integração total com a API de backend para todas as operações de dados.
- **Notificações:** Sistema de notificações (toasts) para feedback de sucesso e erro.
- **Tratamento de Erros:** Erros de API são tratados de forma centralizada usando um `HttpInterceptor`, mostrando mensagens amigáveis ao usuário.

---

## 🛠️ Tecnologias Utilizadas

- **Angular (v17+)**
  - Componentes Standalone
  - Angular Signals para gerenciamento de estado reativo
  - Nova sintaxe de Controle de Fluxo (`@for`, `@if`)
- **TypeScript**
- **Formulários Reativos (Reactive Forms)**
- **Bootstrap 5** para estilização e layout responsivo
- **SCSS** para estilos customizados

---

## 🚀 Como Começar

Siga os passos abaixo para configurar e executar o projeto localmente.

### Pré-requisitos

Antes de começar, garanta que você tenha o seguinte instalado na sua máquina:
- [Node.js](https://nodejs.org/) (versão 18.x ou superior)
- npm (geralmente instalado com o Node.js)
- [Angular CLI](https://angular.io/cli) instalado globalmente:
  ```bash
  npm install -g @angular/cli
  ```

### Instalação

1.  **Clone o repositório** (se estiver no Git):
    ```bash
    git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
    ```

2.  **Navegue para o diretório do projeto:**
    ```bash
    cd heroes-frontend
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

### Executando a Aplicação

1.  **Inicie o servidor de desenvolvimento:**
    ```bash
    ng serve
    ```
2.  Abra seu navegador e acesse `http://localhost:4200/`. A aplicação será recarregada automaticamente se você fizer alterações nos arquivos.

---

## 🔗 Conexão com o Backend

**⚠️ Importante:** Esta aplicação frontend **requer** que a API de backend (o projeto Spring Boot) esteja em execução para funcionar corretamente.

- Por padrão, o frontend tentará se conectar à API no endereço `http://localhost:9090/api`.
- Se a sua API estiver rodando em um endereço ou porta diferente, altere o valor da variável `apiUrl` no arquivo:
  `src/app/core/services/hero.service.ts`

```typescript
// src/app/core/services/hero.service.ts

export class HeroService {
  private http = inject(HttpClient);
  // Altere a URL aqui se necessário
  private apiUrl = 'http://localhost:9090/api'; 
  
  // ...
}
```

---

## 📁 Estrutura de Pastas

O projeto utiliza uma arquitetura organizada para separar responsabilidades:

- **`src/app/core`**: Contém a lógica central e compartilhada da aplicação.
  - `models/`: As interfaces TypeScript que definem a estrutura dos dados (Hero, Superpower).
  - `services/`: Os serviços responsáveis pela comunicação com a API e outras lógicas de negócio.
  - `interceptors/`: Interceptadores de requisições HTTP para tratamento global de erros.
- **`src/app/features`**: Contém os componentes visuais agrupados por funcionalidade.
  - `heroes/`: Contém todos os componentes relacionados à funcionalidade de heróis (`hero-list`, `hero-form`).