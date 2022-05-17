# ília - Code Challenge NodeJS

## Setup

- Install docker
- Configure .env - Ref.: .ENV
- Run the following commands:

```
$ git clone https://github.com/martinmoraes/wallet-node
$ cd wallet-node
$ chmod +x docker/entrypoint.sh
$ docker-compose up
```

## APIs

All APIs are under port 3001

#### POST /transactions

Add transactions to a given user_id
To register a transaction the user must be registered in 'users'
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

## .ENV

#Servidor back-end
PORT=3333

#MongoDB
MONGOCONNECT=mongodb://wallet:wallet@host.docker.internal:27017/admin
DATABASE=wallet

#JWT
PRIVATEKEY=ILIACHALLENGE
EXPIRES_IN=90h

#Docker user
DOCKER_USER_URL=http://host.docker.internal:3002/users/
