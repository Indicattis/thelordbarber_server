const express = require ('express');
const db = require ('../../db.js');
const cors = require ('cors');

const app = express();

app.use(express.json());
app.use(cors());

const router = express.Router();

router.get("/:id_cliente", (req, res) => {
    const { id_cliente } = req.params;

    const sqlQuery = `
    SELECT COUNT(*) AS totalAppointments
    FROM agendamentos
    WHERE id_cliente = ? AND DATE(day) <= DATE_SUB(CURDATE(), INTERVAL 60 DAY);    
    `;

    db.query(sqlQuery, [id_cliente], (error, results) => {
      if (error) {
        console.error("Erro ao consultar o banco de dados:", error);
        return res.status(500).json({ error: "Erro interno do servidor" });
      }

      const totalAppointments = results[0]?.totalAppointments || 0;
      res.json({ totalAppointments });
    });
});

module.exports = router;
