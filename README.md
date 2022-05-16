# ília - Code Challenge NodeJS

## Setup

- Install docker
- Run the following commands:

```
$ git clone https://github.com/martinmoraes/wallet-node
$ cd wallet-node
$ docker-compose up
```

## APIs

All APIs are under port 3001

#### POST /transactions

Add transactions to a given user_id
**Payload**

```
{
  "user_id": "123",
  "type":"CREDIT",
  "amount":100
}
```

#### GET /transactions/<user_id>

Returns transactions for a given user_id

#### GET /balance/<user_id>

Returns the total balance for a given user_id
