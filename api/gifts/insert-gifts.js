const express = require ('express');
const db = require ('../../db.js');
const cors = require ('cors');

const app = express();

app.use(express.json());
app.use(cors());

const router = express.Router();

router.post('/', (req, res) => {
    const gifts = [];
  
    // Gera 100 presentes com 'rewards' como 'Corte' e 'cliente' vazio
    for (let i = 0; i < 100; i++) {
      gifts.push(['Corte', '', '0']);
    }
  
    const query = 'INSERT INTO gifts (rewards, cliente, status) VALUES ?';
  
    db.query(query, [gifts], (error, results) => {
      if (error) {
        console.error('Erro ao inserir presentes:', error);
        res.status(500).json({ error: 'Erro ao inserir presentes' });
      } else {
        console.log('Presentes inseridos com sucesso!');
        res.status(200).json({ message: 'Presentes inseridos com sucesso!' });
      }
    });
  });

module.exports = router;