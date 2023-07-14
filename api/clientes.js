const express = require('express');
const db = require('../db.js');

const router = express.Router();

router.get('/', (req, res) => {
    const sql = `SELECT * FROM clientes`;
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    });
});

module.exports = router;
