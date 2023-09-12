// gifts.js

const express = require ('express');
const db = require ('../../db.js');

const router = express.Router();

router.get('/', (req, res) => {
    const sql = `SELECT * FROM gifts`; // Usando o valor de day na consulta SQL
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    });
});

module.exports = router;
