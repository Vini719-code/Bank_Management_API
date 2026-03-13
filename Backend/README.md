# Bank Management System API

A REST API for managing bank accounts using Node.js, Express.js, and MongoDB.

## Features

- Create new bank accounts
- View all accounts
- Get account by ID
- Update account details
- Delete accounts
- Deposit money
- Withdraw money with balance validation

## API Endpoints

### Account Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/accounts` | Create a new account |
| GET | `/api/accounts` | Get all accounts |
| GET | `/api/accounts/:id` | Get account by ID |
| PUT | `/api/accounts/:id` | Update account details |
| DELETE | `/api/accounts/:id` | Delete account |

### Transactions

| Method | Endpoint | Description |
|--------|----------|-------------|
| PUT | `/api/accounts/deposit/:id?amount=2000` | Deposit money |
| PUT | `/api/accounts/withdraw/:id?amount=1000` | Withdraw money |

## Database Schema

**Collection:** `bank_accounts`

```javascript
{
  "_id": ObjectId,
  "accountHolderName": String,
  "accountNumber": String (unique),
  "accountType": String ("Savings" | "Current"),
  "balance": Number,
  "branch": String,
  "createdAt": Date,
  "updatedAt": Date
}
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bank_management
```

3. Start the server:
```bash
npm run dev
```

## Error Handling

- Proper HTTP status codes
- Validation for required fields
- Unique account number validation
- Insufficient balance validation for withdrawals

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
