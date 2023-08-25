const express = require('express');
const db = require('../../db.js');
const cors = require('cors');

const app = express();

app.use(cors());

const router = express.Router();

router.post('/:id', (req, res) => {
  const id = req.params.id;

  // Consulta para excluir os horários relacionados ao barbeiro
  const deleteHorariosQuery = 'DELETE FROM horarios WHERE id_barbeiro = ?';

  // Consulta para excluir os agendamentos relacionados ao barbeiro
  const deleteAgendamentosQuery = 'DELETE FROM agendamentos WHERE id_barbeiro = ?';

  // Consulta para excluir o barbeiro
  const deleteBarbeiroQuery = 'DELETE FROM barbeiros WHERE id = ?';

  db.query(deleteHorariosQuery, [id], (deleteHorariosError) => {
    if (deleteHorariosError) {
      res.status(500).json({ error: 'Erro ao excluir os horários do barbeiro.' });
    } else {
      db.query(deleteAgendamentosQuery, [id], (deleteAgendamentoError) => {
        if (deleteAgendamentoError) {
          res.status(500).json({ error: 'Erro ao excluir os agendamentos do barbeiro.' });
        } else {
          db.query(deleteBarbeiroQuery, [id], (deleteBarbeiroError) => {
            if (deleteBarbeiroError) {
              res.status(500).json({ error: 'Erro ao deletar barbeiro.' });
            } else {
              res.status(200).json({ message: 'Barbeiro deletado com sucesso.' });
            }
          });
        }
      });
    }
  });
});

module.exports = router;

