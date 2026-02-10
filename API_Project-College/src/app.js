require('dotenv').config();

const express = require('express');

const app = express();

const database = require('./config/database');

const router = require('./routes/router');

app.use(express.json());

app.use("/", router);

const port = process.env.PORT || 3100;

app.listen(port, '0.0.0.0', async () => {
    try {
        await database();
    } catch (error) {
        console.error(error);
        console.error("Conexão com o banco de dados falhou!");
    }

    console.log("-------------------------------------------");
    console.log("Server no ar!");
    console.log("-------------------------------------------");

});