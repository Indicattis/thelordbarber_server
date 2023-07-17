const express = require ('express');
const db = require ('../../db.js');
const cors = require ('cors');

const app = express();
app.use(cors());
  


const router = express.Router();

router.post('/', (req, res) => {
    const idBarbeiro = req.body.barber_id;
    const mesAtual = new Date().getMonth() + 1;
    const anoAtual = new Date().getFullYear();
    
    for (let dia = 1; dia <= 31; dia++) {
      const dataLoop = new Date(anoAtual, mesAtual - 1, dia);
    
      if (dataLoop.getMonth() === mesAtual - 1 && dataLoop.getDay() !== 0) {
        const dataFormatada = dataLoop.toISOString().split('T')[0];
        const horarios = [];
  
        if (dataLoop.getDay() === 6) {
          horarios.push('10:00:00', '10:40:00', '11:20:00', '12:00:00', '12:40:00', '13:20:00', '14:00:00', '14:40:00', '15:20:00', '16:00:00', '16:40:00', '17:20:00', '18:00:00', '18:40:00', '19:20:00', '20:00:00');
        } else {
          horarios.push('08:00:00', '08:40:00', '09:20:00', '10:00:00', '10:40:00', '11:20:00', '12:00:00', '12:40:00', '13:20:00', '14:00:00', '14:40:00', '15:20:00', '16:00:00', '16:40:00', '17:20:00', '18:00:00', '18:40:00');
        }
  
        const sqlCheckExisting = `SELECT COUNT(*) as count FROM horarios WHERE day = '${dataFormatada}' AND id_barbeiro = ${idBarbeiro}`;
  
        db.query(sqlCheckExisting, (error, result) => {
          if (error) {
            console.error(`Erro ao verificar horários existentes para o dia ${dataLoop.toISOString().split('T')[0]} e barbeiro ${idBarbeiro}:`, error);
          } else {
            const count = result[0].count;
            if (count === 0) {
              const sqlInsert = horarios.map((hora) => `('${dataFormatada}', '${hora}', true, ${idBarbeiro})`).join(',');
              const sqlInsertQuery = `INSERT INTO horarios (day, hour, status, id_barbeiro) VALUES ${sqlInsert}`;
  
              db.query(sqlInsertQuery, (error) => {
                if (error) {
                  console.error(`Erro ao inserir os horários para o dia ${dataLoop.toISOString().split('T')[0]} e barbeiro ${idBarbeiro}:`, error);
                } else {
                  console.log(`Horários inseridos para o dia ${dataLoop.toISOString().split('T')[0]} e barbeiro ${idBarbeiro}`);
                }
              });
            } else {
              console.log(`Horários já existentes para o dia ${dataLoop.toISOString().split('T')[0]} e barbeiro ${idBarbeiro}. Nenhuma inserção será feita.`);
            }
          }
        });
      }
    }
    
    return res.status(200).json({ message: 'Êxito!' });
  });
  
module.exports = router;