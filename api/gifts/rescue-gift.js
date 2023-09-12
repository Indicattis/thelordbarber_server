const express = require ('express');
const db = require ('../../db.js');
const cors = require ('cors');

const app = express();

app.use(express.json());
app.use(cors());

const router = express.Router();

router.post('/:client', (req, res) => {
    const client = req.params.client;
  
    // Consulta os presentes com 'cliente' vazio
    const query = 'SELECT * FROM gifts WHERE client = "" LIMIT 1';
  
    db.query(query, (error, results) => {
      if (error) {
        console.error('Erro ao consultar presentes:', error);
        res.status(500).json({ error: 'Erro ao consultar presentes' });
      } else {
        if (results.length === 0) {
          res.status(404).json({ message: 'Nenhum presente com cliente vazio encontrado' });
        } else {
          const presente = results[0];
          const updateQuery = 'UPDATE gifts SET client = ?, status = 1 WHERE id = ?';
  
          db.query(updateQuery, [client, presente.id], (updateError) => {
            if (updateError) {
              console.error('Erro ao atualizar o presente:', updateError);
              res.status(500).json({ error: 'Erro ao atualizar o presente' });
            } else {
              console.log('Presente atualizado com o nome do ganhador:', results[0].id);
              res.status(200).json(results[0].id);
            }
          });
        }
      }
    });
  });

  
module.exports = router;