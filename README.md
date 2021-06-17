# Bot Server

By running a single command, you will get a production-ready Node.js app to get various crypto price change watching bots running.

## Manual Installation

Install the dependencies:

```bash
yarn install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

## Commands

Running locally:

```bash
yarn dev
```

Running in production:

```bash
yarn start
```

Testing:

```bash
# run all tests
yarn test

Docker:

```bash
# run docker container in development mode
yarn docker:dev

# run docker container in production mode
yarn docker:prod

# run all tests in a docker container
yarn docker:test
```

Linting:

```bash
# run ESLint
yarn lint

# fix ESLint errors
yarn lint:fix

# run prettier
yarn prettier

# fix prettier errors
yarn prettier:fix
```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# Port number
PORT=3000

# URL of the Mongo DB
MONGODB_URL=mongodb://127.0.0.1:27017/node-boilerplate
```


## API USAGE

Start Bot

```bash
http://localhost:3000/v1/bot/runBot


Request Body:
{
    "pairs":["BTC-USD", "ETH-USD"],
    "interval": 5000,
    "percentage": 0.01
}

```

Stop Bot

```bash
http://localhost:3000/v1/bot/stopBot

Request Body:
{
    "pairs":["BTC-USD", "ETH-USD"]
}

```

## License

[MIT](LICENSE)
