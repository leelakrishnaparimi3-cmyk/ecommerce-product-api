# E-Commerce Product API

A RESTful Product API built with Node.js and Express, containerized using Docker.

## Technology Stack

- Node.js
- Express.js
- Docker
- REST API

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Check application health |
| GET | `/products` | Get all products |
| GET | `/products/:id` | Get product by ID |
| POST | `/products` | Add a new product |
| PUT | `/products/:id` | Update a product |
| DELETE | `/products/:id` | Delete a product |

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `APP_ENV` | Application environment | `development` |
| `DB_HOST` | Database host | `localhost` |
| `APP_PORT` | Application port | `8080` |

## Run Locally

Install dependencies:

```bash
npm install