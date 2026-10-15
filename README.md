# Ayurtech Average API

A REST API built with Node.js and Express that calculates the running average of numbers submitted through a single `POST /average` endpoint.

## Features

- Maintains a running total and count of submitted numbers.
- Returns the updated average after each valid request.
- Validates input and rejects invalid numbers and malformed JSON.
- Includes automated tests using Node.js's built-in test runner and Supertest.
- Uses Husky Git hooks to run tests before commits and validate commit messages with Commitlint.
- Follows the Conventional Commits standard.

## Requirements

- Node.js
- npm

## Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/Sakethm13/ayurtech-average-api.git
cd ayurtech-average-api
npm install
```

## Run the API

Start the server:

```bash
npm start
```

The API runs at `http://localhost:3000` by default.

## API Usage

**Endpoint:** `POST /average`

**Content-Type:** `application/json`

### Example request

```json
{
  "number": 10
}
```

### Example response

```json
{
  "number": 10,
  "count": 1,
  "average": 10
}
```

Each successful request adds its number to the running total and updates the average. The state is held in memory and resets when the server restarts.

### Test with cURL

```bash
curl -X POST http://localhost:3000/average \
  -H "Content-Type: application/json" \
  -d "{\"number\":10}"
```

On Windows PowerShell, you can alternatively use:

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/average" -Method Post -ContentType "application/json" -Body '{"number":10}'
```

## Run Tests

Execute the automated test suite:

```bash
npm test
```

The tests cover the initial average, multiple requests, invalid input, zero and negative numbers, and malformed JSON.

## Git Hooks

- **Pre-commit hook:** Runs the automated test suite before a commit.
- **Commit message hook:** Uses Commitlint to enforce Conventional Commit messages.

Example commit:

```bash
git commit -m "feat: implement running average API"
```

## Repository

[View the Ayurtech Average API on GitHub](https://github.com/Sakethm13/ayurtech-average-api)
