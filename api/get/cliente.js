// clientes.js

const express = require ('express');
const db = require ('../../db.js');

const router = express.Router();

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM clientes WHERE id = ?`;
    
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    });
});
module.exports = router;
