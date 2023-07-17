

const express = require ('express');
const db = require ('../db.js');

const router = express.Router();

router.get('/', (req, res) => {
    const day = req.query.day; // Obtém o valor do parâmetro day da query
    const barber = req.query.barber; // Obtém o valor do parâmetro day da query
    const sql = `SELECT * FROM horarios WHERE day = '${day}' AND status = 1 AND id_barbeiro = ${barber} ORDER BY hour ASC`; // Usando o valor de day na consulta SQL
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    });
});

module.exports = router;