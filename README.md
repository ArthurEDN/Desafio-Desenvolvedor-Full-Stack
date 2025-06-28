# Projeto de Gerenciamento de Heróis (Full Stack)

Este repositório contém o código-fonte de uma aplicação Full Stack para o gerenciamento de Super-Heróis, desenvolvida como parte do desafio da Viceri para Desenvolvedor Full Stack.

A aplicação é composta por uma **API RESTful** robusta desenvolvida em **Java com Spring Boot** e uma interface de usuário moderna e reativa (SPA - Single Page Application) desenvolvida em **Angular**.

## ✨ Funcionalidades Principais

A aplicação implementa todas as funcionalidades de um CRUD (Create, Read, Update, Delete) para gerenciar heróis.

* **Backend (API):**
    * Endpoints para criar, listar, buscar por ID, atualizar e deletar heróis.
    * Listagem paginada para lidar com grandes volumes de dados.
    * Validação de dados de entrada e tratamento de erros robusto com respostas JSON claras.
    * Regra de negócio para impedir a criação de heróis com nomes duplicados.
    * Acesso a dados utilizando Spring JDBC.
    * Gerenciamento de schema do banco de dados com Flyway.
    * Documentação completa da API gerada automaticamente com Swagger/OpenAPI.

* **Frontend (Interface):**
    * Interface limpa e reativa para listar, criar, editar e excluir heróis.
    * Exibição dos heróis em formato de cards.
    * Formulário reativo com validações em tempo real.
    * Comunicação com a API de backend de forma segura e eficiente.
    * Notificações de sucesso e erro para uma melhor experiência do usuário.

---

## 🛠️ Tecnologias Utilizadas

| Camada  | Tecnologia/Framework/Biblioteca                  |
| :------ | :----------------------------------------------- |
| **Backend** | Java 17, Spring Boot, Spring JDBC, Maven, PostgreSQL, Flyway, Lombok, SpringDoc (Swagger) |
| **Frontend**| Angular 17+, TypeScript, Componentes Standalone, Signals, Formulários Reativos, Bootstrap 5, SCSS |

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
3.  As tabelas e os dados iniciais serão criados automaticamente pelo **Flyway** na primeira vez que o backend for iniciado.

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

[**http://localhost:9090/api/swagger-ui.html**](http://localhost:9090/api/swagger-ui.html)

---
