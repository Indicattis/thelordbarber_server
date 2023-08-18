const express = require ('express');
const db = require ('../../db.js');
const cors = require ('cors');

const app = express();

app.use(cors());

const router = express.Router();

router.post('/:id', (req, res) => {
    const id = req.params.id;
    const deleteQuery = 'DELETE FROM agendamentos WHERE id_cliente = ? AND DATE(day) <= CURDATE();';
    
   
    db.query(deleteQuery, [id], (deleteError) => {
        if (deleteError) {
            res.status(500).json({ error: 'Erro ao deletar agendamento.' });
        } else {
            res.status(200).json({ message: 'Agendamento deletado com sucesso.' });
        }
    });
});


module.exports = router;
