

const express = require ('express');
const db = require ('../../db.js');
const cors = require ('cors');

const app = express();
app.use(cors());
  


const router = express.Router();

router.post('/', (req, res) => {
  const id = req.body.id;
  const status = req.body.status
  
  const sqlUpdate = `UPDATE horarios
                       SET status = ?
                       WHERE id = ?`;
  
  db.query(sqlUpdate, [status, id], (error, result) => {
    if (error) {
      console.error("Erro ao modificar status do horário:", error);
      return res.status(500).json({ error: "Erro ao modificar status do horário" });
    }
  
    res.json(result);
  });
});

module.exports = router;