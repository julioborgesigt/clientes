const express = require('express');
const router = express.Router();
const pool = require('./server');

// Listar todos os clientes
router.get('/', async (req, res) => {
    try {
        const clients = await pool.query('SELECT * FROM clients ORDER BY chosen_date');
        res.json(clients.rows);
    } catch (error) {
        res.status(500).send('Erro ao buscar clientes.');
    }
});

// Cadastrar cliente
router.post('/', async (req, res) => {
    const { name, expiration_date, chosen_date, service, whatsapp } = req.body;
    try {
        await pool.query(
            'INSERT INTO clients (name, expiration_date, chosen_date, service, whatsapp) VALUES ($1, $2, $3, $4, $5)',
            [name, expiration_date, chosen_date, service, whatsapp]
        );
        res.status(201).send('Cliente cadastrado com sucesso!');
    } catch (error) {
        res.status(500).send('Erro ao cadastrar cliente.');
    }
});

// Atualizar cliente
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, expiration_date, chosen_date, service, whatsapp } = req.body;
    try {
        await pool.query(
            'UPDATE clients SET name = $1, expiration_date = $2, chosen_date = $3, service = $4, whatsapp = $5 WHERE id = $6',
            [name, expiration_date, chosen_date, service, whatsapp, id]
        );
        res.send('Cliente atualizado com sucesso!');
    } catch (error) {
        res.status(500).send('Erro ao atualizar cliente.');
    }
});

// Excluir cliente
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM clients WHERE id = $1', [id]);
        res.send('Cliente excluído com sucesso!');
    } catch (error) {
        res.status(500).send('Erro ao excluir cliente.');
    }
});

module.exports = router;
