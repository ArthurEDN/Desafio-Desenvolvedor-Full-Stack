# 🦸‍♂️ Superhero API

Uma API RESTful para gerenciamento de super-heróis e superpoderes, desenvolvida com Spring Boot 3.5.3 e Java 17.

## 📋 Sumário

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Funcionalidades](#-funcionalidades)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação e Execução](#-instalação-e-execução)
- [Documentação da API](#-documentação-da-api)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Endpoints da API](#-endpoints-da-api)
- [Banco de Dados](#️-banco-de-dados)

## 🎯 Sobre o Projeto

A Superhero API é uma aplicação que permite o gerenciamento completo de super-heróis e seus superpoderes. A API oferece operações CRUD completas com validação de dados, paginação e documentação automática via Swagger.

## 🚀 Tecnologias Utilizadas

### Backend
- **Java 17**
- **Spring Boot 3.5.3**
- **Spring Security**
- **Spring Data JDBC**
- **Spring Validation**

### Banco de Dados
- **PostgreSQL**
- **Flyway**

### Documentação
- **SpringDoc OpenAPI 3**

### Utilitários
- **Lombok**
- **Bucket4j**
- **Spring DotEnv**

## ✨ Funcionalidades

- ✅ CRUD de Heróis
- ✅ CRUD de Superpoderes
- ✅ Paginação
- ✅ Validação de Dados
- ✅ Documentação Automática
- ✅ Tratamento de Exceções
- ✅ Migrações de Banco
- ✅ CORS Configurado


## 📋 Pré-requisitos

- **Java 17**
- **Maven 3.6+**
- **PostgreSQL 12+**
- **Git**

## 🔧 Instalação e Execução

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/superhero-api.git
cd superhero-api
```

### 2. Configure o banco de dados

```bash
# .env na raiz do projeto
DB_URL=jdbc:postgresql://localhost:5432/heroes_db
DB_USERNAME=postgres
DB_PASSWORD=123456
SERVER_PORT=9090
```

### 3. Execute as migrações

```bash
mvn flyway:migrate
```

### 4. Compile e execute

```bash
mvn clean install
mvn spring-boot:run
```

Acesse: `http://localhost:9090`

## 📚 Documentação da API

- Swagger UI: `http://localhost:9090/swagger-ui/index.html`
- OpenAPI JSON: `http://localhost:9090/v3/api-docs`

## 📁 Estrutura do Projeto

```
src/main/java/com/viceri/herois/superhero_api/
├── controller/
├── dto/
├── exception/
├── model/
├── repository/
├── service/
└── config/
```

## 🔗 Endpoints da API

### Superpoderes

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET    | /superpoderes        | Lista todos os superpoderes         |
| POST   | /superpoderes        | Cria novo superpoder                |
| GET    | /superpoderes/{id}   | Busca superpoder por ID             |
| PUT    | /superpoderes/{id}   | Atualiza superpoder existente       |
| DELETE | /superpoderes/{id}   | Remove superpoder                   |

### Heróis

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET    | /herois             | Lista heróis com paginação         |
| POST   | /herois             | Cria novo herói                    |
| GET    | /herois/{id}        | Busca herói por ID                 |
| PUT    | /herois/{id}        | Atualiza herói existente           |
| DELETE | /herois/{id}        | Remove herói                       |

### Paginação

Parâmetros suportados por `GET /herois`:
- `page` (padrão: 0)
- `size` (padrão: 10)
- `sort` (ex: nomeHeroi,asc)

## 📝 Exemplos de Requisição

### Criar herói

```json
POST /herois
{
  "nome": "Clark Kent",
  "nomeHeroi": "Superman",
  "dataNascimento": "1978-06-18",
  "altura": 1.91,
  "peso": 102.0,
  "superpoderIds": [1, 2, 3]
}
```

### Criar superpoder

```json
POST /superpoderes
{
  "superpoder": "Super Força",
  "descricao": "Capacidade de exercer força física sobre-humana"
}
```

## 📋 Exemplos de Resposta

### Herói

```json
{
  "id": 1,
  "nome": "Clark Kent",
  "nomeHeroi": "Superman",
  "dataNascimento": "1978-06-18",
  "altura": 1.91,
  "peso": 102.0,
  "superpoderes": [
    { "id": 1, "superpoder": "Super Força", "descricao": "..." },
    { "id": 2, "superpoder": "Voo", "descricao": "..." }
  ]
}
```

### Lista paginada

```json
{
  "content": [...],
  "pageable": { "pageNumber": 0, "pageSize": 10 },
  "totalElements": 25,
  "totalPages": 3
}
```

## 🗄️ Banco de Dados

### Modelo

```sql
CREATE TABLE superpoderes (...);
CREATE TABLE herois (...);
CREATE TABLE herois_superpoderes (...);
CREATE INDEX idx_herois_nome_heroi ON herois(nome_heroi);
```

### Migrações (Flyway)

```
src/main/resources/db/migration/
├── V1__create_tables.sql
├── V2__create_indexes.sql
└── V3__insert_initial_data.sql
```
## ⚙️ Variáveis de Ambiente

Certifique-se de configurar as seguintes variáveis de ambiente no arquivo `.env`:

```env
DB_URL=jdbc:postgresql://localhost:5432/heroes_db
DB_USERNAME=postgres
DB_PASSWORD=123456
SERVER_PORT=9090
CORS_ALLOWED_ORIGINS=http://localhost:4200
```