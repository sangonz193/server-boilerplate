# Server boilerplate

## Setting the development environment

### Tools required

-   [Node.js](https://nodejs.org/en/): **v15**
    -   It is recommended that you install Node.js with [nvm](https://github.com/nvm-sh/nvm), as it allows you to change between versions easily.
-   [npm](https://www.npmjs.com/): **v6**
    -   It is important to match the npm version as a different one may cause changes to the _package-lock.json_ file. You can install this npm version by running `npm i -g npm@6`
-   [Docker](https://www.docker.com/): **with docker-compose**

### Setup steps

-   Clone this repository and open a terminal inside of it.
-   Run `npm i` to install dependencies.
-   You must create a _.env_ file at the root of the project that contains the same environment variables listed in _.env.example_. You may start with copying the entire content of the _.env.example_ file and modifying the entries values as you find it necessary. `cp .env.example .env`.

### Running the server

Before running the code itself, the database and Keycloak must be up and running. To do that, run `npm run docker-compose`.

After that, run the command `npm run dev` (or `node cli dev`) to run the server. Depending on the value of the `PORT` environment variable in the `.env` file, the server will be listening at _http<span></span>://localhost:$PORT`_.
The GraphQL playground is accessible from the _http<span></span>://localhost:$PORT/graphql_.

### Database seeds

In order to populate the database with some dummy values, run the command `node cli seed`. Be aware that this command will **DELETE** all previous data in the database the _.env_ file entries point to.

## Included command line utility

Apart from the app itself, this project contains a cli utility that you may find useful while developing. To invoke it, you will run `node cli <command>` at the root of the project. For information about it, you can run `node cli --help` which will list all available commands. For more information about a specific command, you may run `node cli <command> --help` where _[command]_ is the name of a command from the previous list.

## License

[MIT](https://choosealicense.com/licenses/mit/)
