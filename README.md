# Ayurtech Average API

A REST API built with Node.js and Express that calculates the running average of numbers submitted through a single `POST /average` endpoint.

## Features

- Maintains a running total and count of submitted numbers.
- Returns the average after each valid request.
- Validates numeric input and rejects malformed JSON.
- Includes automated tests using Node.js's built-in test runner and Supertest.
- Uses Husky Git hooks and Commitlint to enforce tests and Conventional Commits.

## Requirements

- Node.js
- npm

## Installation

```bash
git clone https://github.com/Sakethm13/ayurtech-average-api.git
cd ayurtech-average-api
npm install
```

## Run the API

```bash
npm start
```

The server runs at `http://localhost:3000`.

## API Usage

**Endpoint:** `POST /average`

**Content-Type:** `application/json`

Example request body:

```json
{
  "number": 10
}
```

Example response:

```json
{
  "number": 10,
  "count": 1,
  "average": 10
}
```

Submit another number to update the running average. The average state is held in memory and resets when the server restarts.

### Test with cURL

```bash
curl -X POST http://localhost:3000/average -H "Content-Type: application/json" -d "{\"number\":10}"
```

## Run Tests

```bash
npm test
```

The tests cover initial averages, multiple requests, invalid input, zero and negative values, and malformed JSON.

## Git Hooks

- **Pre-commit:** Runs the test suite.
- **Commit message:** Commitlint validates Conventional Commit messages.

Example:

```bash
git commit -m "feat: implement running average API"
```