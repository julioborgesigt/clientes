const express = require('express');
const router = express.Router();
const pool = require('./server');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

// Cadastro de usuário
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
        res.status(201).send('Usuário registrado com sucesso!');
    } catch (error) {
        res.status(500).send('Erro ao registrar usuário.');
    }
});

// Login de usuário
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (user.rows.length > 0 && await bcrypt.compare(password, user.rows[0].password)) {
            const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).send('Credenciais inválidas.');
        }
    } catch (error) {
        res.status(500).send('Erro ao fazer login.');
    }
});

module.exports = router;
