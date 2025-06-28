# Projeto de Gerenciamento de Heróis (Full Stack)

[cite_start]Este repositório contém o código-fonte de uma aplicação Full Stack para o gerenciamento de Super-Heróis, desenvolvida como parte do desafio da Viceri para Desenvolvedor Full Stack[cite: 1, 2, 4].

[cite_start]A aplicação é composta por uma **API RESTful** robusta desenvolvida em **Java com Spring Boot** e uma interface de usuário moderna e reativa (SPA - Single Page Application) desenvolvida em **Angular**[cite: 3, 5].

## ✨ Funcionalidades Principais

[cite_start]A aplicação implementa todas as funcionalidades de um CRUD (Create, Read, Update, Delete) para gerenciar heróis[cite: 6, 10].

* **Backend (API):**
    * Endpoints para criar, listar, buscar por ID, atualizar e deletar heróis.
    * Listagem paginada para lidar com grandes volumes de dados.
    * Validação de dados de entrada e tratamento de erros robusto com respostas JSON claras.
    * [cite_start]Regra de negócio para impedir a criação de heróis com nomes duplicados[cite: 15].
    * [cite_start]Acesso a dados utilizando Spring JDBC[cite: 35].
    * [cite_start]Gerenciamento de schema do banco de dados com Flyway[cite: 36].
    * [cite_start]Documentação completa da API gerada automaticamente com Swagger/OpenAPI[cite: 31].

* **Frontend (Interface):**
    * [cite_start]Interface limpa e reativa para listar, criar, editar e excluir heróis[cite: 40].
    * Exibição dos heróis em formato de cards.
    * Formulário reativo com validações em tempo real.
    * [cite_start]Comunicação com a API de backend de forma segura e eficiente[cite: 38].
    * Notificações de sucesso e erro para uma melhor experiência do usuário.

---

## 🛠️ Tecnologias Utilizadas

| Camada  | Tecnologia/Framework/Biblioteca                  |
| :------ | :----------------------------------------------- |
| **Backend** | [cite_start]Java 17, Spring Boot, Spring JDBC, Maven, PostgreSQL, Flyway, Lombok, SpringDoc (Swagger) [cite: 33, 34, 35, 36] |
| **Frontend**| [cite_start]Angular 17+, TypeScript, Componentes Standalone, Signals, Formulários Reativos, Bootstrap 5, SCSS [cite: 39] |

---

## 🚀 Como Executar o Projeto Completo

Siga os passos abaixo para configurar e executar toda a aplicação localmente.

### Pré-requisitos

Garanta que você tenha o seguinte instalado na sua máquina:
* **Java (JDK)** - Versão 17 ou superior
* **Maven** - Versão 3.8 ou superior
* **Node.js** - Versão 18.x ou superior
* **Angular CLI** - `npm install -g @angular/cli`
* **PostgreSQL** (ou outro banco de dados relacional)

### Passo 1: Configurar o Banco de Dados

1.  Garanta que seu serviço do PostgreSQL esteja em execução.
2.  Crie um novo banco de dados para a aplicação.
    ```sql
    CREATE DATABASE heroes_db;
    ```
3.  As tabelas e os dados iniciais serão criados automaticamente pelo **Flyway** na primeira vez que o backend for iniciado[cite: 36].

### Passo 2: Executar o Backend (API)

1.  Navegue até a pasta do projeto backend (ex: `superhero-api`).
2.  Configure as credenciais do seu banco de dados no arquivo `src/main/resources/application.yml` (ou use um arquivo `.env` se preferir).
3.  Compile e execute a aplicação com o Maven:
    ```bash
    mvn spring-boot:run
    ```
4.  O backend estará rodando. A API estará disponível em `http://localhost:9090/api`.

### Passo 3: Executar o Frontend

1.  Abra um **novo terminal**.
2.  Navegue até a pasta do projeto frontend (ex: `superhero-client`).
3.  Instale as dependências do Node.js:
    ```bash
    npm install
    ```
4.  Inicie o servidor de desenvolvimento do Angular:
    ```bash
    ng serve
    ```
5.  Acesse a aplicação no seu navegador em **`http://localhost:4200`**.

---

## 📄 Documentação da API (Swagger)

Com o backend em execução, a documentação interativa da API, gerada pelo Swagger, pode ser acessada em:

[cite_start][**http://localhost:9090/api/swagger-ui.html**](http://localhost:9090/api/swagger-ui.html) [cite: 31]

---
