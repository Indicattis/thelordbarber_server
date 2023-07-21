const express = require ('express');
const db = require ('../../db.js');
const cors = require ('cors');

const app = express();

app.use(cors());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

const router = express.Router();

router.post('/', (req, res) => {
    const { phone, username } = req.body;
    
    const insertQuery = `INSERT INTO clientes (phone, name) VALUES ('${phone}', '${username}')`;
    db.query(insertQuery, (error) => {
        if (error) {
        res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
        } else {
        res.status(200).json({ message: 'Usuário cadastrado com sucesso.' });
        }
    });
    });

module.exports = router;