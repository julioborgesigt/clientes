const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do PostgreSQL
const pool = new Pool({
    user: 'qrkfrn_bancocc', // Substituir pelo seu usuário PostgreSQL
    host: 'postgres-ag-br1-3.conteige.cloud',
    database: 'qrkfrn_bancocc', // Nome do banco de dados
    password: '1qVxsxu1UV', // Substituir pela sua senha
    port: 54124,
});



// Middlewares
app.use(cors());
app.use(express.json());

// Testar conexão com o banco
pool.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao PostgreSQL:', err);
    } else {
        console.log('Conectado ao PostgreSQL com sucesso!');
    }
});

require('dotenv').config();

const bodyParser = require('body-parser');




// Middlewares
app.use(cors());
app.use(bodyParser.json());


// Serve o arquivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rotas de usuários
app.use('/api/users', require('./users'));

// Rotas de clientes
app.use('/api/clients', require('./clients'));

// Inicialização do servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

module.exports = pool;







// Rotas

// 1. Obter todos os clientes
app.get('/clientes', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM clientes ORDER BY data_vencimento ASC');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro ao buscar clientes.');
    }
});

// 2. Adicionar um cliente
app.post('/clientes', async (req, res) => {
    const { nome, data_vencimento, servico, whatsapp } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO clientes (nome, data_vencimento, servico, whatsapp, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [nome, data_vencimento, servico, whatsapp, 'pendente']
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro ao adicionar cliente.');
    }
});

// 3. Atualizar um cliente
app.put('/clientes/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, data_vencimento, servico, whatsapp, status } = req.body;

    try {
        const result = await pool.query(
            'UPDATE clientes SET nome = $1, data_vencimento = $2, servico = $3, whatsapp = $4, status = $5 WHERE id = $6 RETURNING *',
            [nome, data_vencimento, servico, whatsapp, status, id]
        );
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro ao atualizar cliente.');
    }
});

// 4. Excluir um cliente
app.delete('/clientes/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query('DELETE FROM clientes WHERE id = $1', [id]);
        res.status(204).send();
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro ao excluir cliente.');
    }
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
