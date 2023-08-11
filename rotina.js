const db = require('./db.js');


async function InsertSchedules() {
  try {
    const barbeiros = await getBarbeiros();
    const mesAtual = new Date().getMonth() + 1;
    const anoAtual = new Date().getFullYear();
    const proximoMes = mesAtual + 1;

    for (let dia = 1; dia <= 31; dia++) {
      const dataLoop = new Date(anoAtual, proximoMes - 1, dia);

      if (dataLoop.getMonth() === proximoMes - 1 && dataLoop.getDay() !== 0) {
        const dataFormatada = dataLoop.toISOString().split('T')[0];
        const horarios = getHorarios(dataLoop.getDay());

        for (const idBarbeiro of barbeiros) {
          const count = await checkExistingHorarios(dataFormatada, idBarbeiro);

          if (count === 0) {
            await insertHorarios(dataFormatada, horarios, idBarbeiro);
          }
        }
      }
    }

    console.log('Agendamentos inseridos com sucesso.');
  } catch (error) {
    console.error('Erro:', error);
  }
}

async function getBarbeiros() {
  return new Promise((resolve, reject) => {
    db.query('SELECT id FROM barbeiros', (error, results) => {
      if (error) {
        reject(error);
      } else {
        const idBarbeiros = results.map((row) => row.id);
        resolve(idBarbeiros);
      }
    });
  });
}

function getHorarios(diaDaSemana) {
  if (diaDaSemana === 6) {
    return ['08:00:00', '08:40:00', '09:20:00', '10:00:00', '10:40:00', '11:20:00', '12:00:00', '12:40:00', '13:20:00', '14:00:00', '14:40:00', '15:20:00', '16:00:00', '16:40:00', '17:20:00', '18:00:00'];
  } else if (diaDaSemana === 1) {
    return ['13:20:00', '14:00:00', '14:40:00', '15:20:00', '16:00:00', '16:40:00', '17:20:00', '18:00:00', '18:40:00', '19:20:00', '20:00:00'];
  } else {
    return ['08:00:00', '08:40:00', '09:20:00', '10:00:00', '10:40:00', '11:20:00', '13:20:00', '14:00:00', '14:40:00', '15:20:00', '16:00:00', '16:40:00', '17:20:00', '18:00:00', '18:40:00', '19:20:00', '20:00:00'];
  }
}

async function checkExistingHorarios(dataFormatada, idBarbeiro) {
  return new Promise((resolve, reject) => {
    const sqlCheckExisting = `SELECT COUNT(*) as count FROM horarios WHERE day = '${dataFormatada}' AND id_barbeiro = ${idBarbeiro}`;
    db.query(sqlCheckExisting, (error, result) => {
      if (error) {
        reject(error);
      } else {
        const count = result[0].count;
        resolve(count);
      }
    });
  });
}
async function insertHorarios(dataFormatada, horarios, idBarbeiro) {
  return new Promise((resolve, reject) => {
    const sqlInsert = horarios.map((hora) => `('${dataFormatada}', '${hora}', true, ${idBarbeiro})`).join(',');
    const sqlInsertQuery = `INSERT INTO horarios (day, hour, status, id_barbeiro) VALUES ${sqlInsert}`;
    db.query(sqlInsertQuery, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

  module.exports = InsertSchedules;