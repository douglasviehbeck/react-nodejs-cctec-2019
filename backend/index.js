const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const client = new Client({
    host: '127.0.0.1',
    port: '5432',
    user: 'postgres',
    password: 'postgres',
    database: 'minicurso',
});

client.connect();

let app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/produtos', async (req, res) => {
    res.json((await client.query('SELECT * FROM produtos')).rows);
});

app.post('/produtos', async (req, res) => {
    await client.query('INSERT INTO produtos(nome, descricao) VALUES($1, $2)', [
        req.body.nome,
        req.body.descricao
    ]);

    res.end();
});

app.delete('/produtos/:id', async (req, res) => {
    await client.query('DELETE FROM produtos WHERE id = $1', [
        req.params.id
    ]);

    res.end();
});

app.listen(8000);