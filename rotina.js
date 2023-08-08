const db = require('./db.js');


  
  export function inserirHorarios(idBarbeiros) {
    const mesAtual = new Date().getMonth() + 1;
    const anoAtual = new Date().getFullYear();
  
    if (new Date().getDate() === 15) {
      const proximoMes = mesAtual + 1;
  
      for (let dia = 1; dia <= 31; dia++) {
        const dataLoop = new Date(anoAtual, proximoMes - 1, dia);
  
        if (dataLoop.getMonth() === proximoMes - 1) {
          const dataFormatada = dataLoop.toISOString().split('T')[0];
  
          idBarbeiros.forEach((idBarbeiro) => {
            const sqlCheckExisting = `SELECT COUNT(*) as count FROM horarios WHERE day = '${dataFormatada}' AND id_barbeiro = ${idBarbeiro}`;

            db.query(sqlCheckExisting, (error, result) => {
            if (error) {
                console.error(`Erro ao verificar horários existentes para o dia ${dataLoop.toISOString().split('T')[0]} e barbeiro ${idBarbeiro}:`, error);
            } else {
                const count = result[0].count;
                if (count === 0) {
            if (dataLoop.getDay() === 6) {
                const sqlSaturday = `INSERT INTO horarios (day, hour, status, id_barbeiro)
                  VALUES
                    ('${dataLoop.toISOString().split('T')[0]}', '10:00:00', true, ${idBarbeiro}),
                    ('${dataLoop.toISOString().split('T')[0]}', '10:40:00', true, ${idBarbeiro}),
                    ('${dataLoop.toISOString().split('T')[0]}', '11:20:00', true, ${idBarbeiro}),
                    ('${dataLoop.toISOString().split('T')[0]}', '12:00:00', true, ${idBarbeiro}),
                    ('${dataLoop.toISOString().split('T')[0]}', '12:40:00', true, ${idBarbeiro}),
                    ('${dataLoop.toISOString().split('T')[0]}', '13:20:00', true, ${idBarbeiro}),
                    ('${dataLoop.toISOString().split('T')[0]}', '14:00:00', true, ${idBarbeiro}),
                    ('${dataLoop.toISOString().split('T')[0]}', '14:40:00', true, ${idBarbeiro}),
                    ('${dataLoop.toISOString().split('T')[0]}', '15:20:00', true, ${idBarbeiro}),
                    ('${dataLoop.toISOString().split('T')[0]}', '16:00:00', true, ${idBarbeiro}),
                    ('${dataLoop.toISOString().split('T')[0]}', '16:40:00', true, ${idBarbeiro}),
                    ('${dataLoop.toISOString().split('T')[0]}', '17:20:00', true, ${idBarbeiro}),
                    ('${dataLoop.toISOString().split('T')[0]}', '18:00:00', true, ${idBarbeiro}),
                    ('${dataLoop.toISOString().split('T')[0]}', '18:40:00', true, ${idBarbeiro}),
                    ('${dataLoop.toISOString().split('T')[0]}', '19:20:00', true, ${idBarbeiro}),
                    ('${dataLoop.toISOString().split('T')[0]}', '20:00:00', true, ${idBarbeiro})`;
            
                db.query(sqlSaturday, (error) => {
                  if (error) {
                    console.error(`Erro ao inserir os horários para o dia ${dataLoop.toISOString().split('T')[0]} e barbeiro ${idBarbeiro}:`, error);
                  } else {
                    console.log(`Horários inseridos para o dia ${dataLoop.toISOString().split('T')[0]} e barbeiro ${idBarbeiro}`);
                  }
                });
              }else {
                const sqlDefault = `INSERT INTO horarios (day, hour, status, id_barbeiro)
                  VALUES
                    ('${dataLoop.toISOString().split('T')[0]}', '08:00:00', true, ${idBarbeiro}),
                    ('${dataLoop.toISOString().split('T')[0]}', '08:40:00', true, ${idBarbeiro}),
                    ('${dataLoop.toISOString().split('T')[0]}', '09:20:00', true, ${idBarbeiro}),
                    ('${dataLoop.toISOString().split('T')[0]}', '10:00:00', true, ${idBarbeiro}),
                    ('${dataLoop.toISOString().split('T')[0]}', '10:40:00', true, ${idBarbeiro}),
                    ('${dataLoop.toISOString().split('T')[0]}', '11:20:00', true, ${idBarbeiro}),
                    ('${dataLoop.toISOString().split('T')[0]}', '12:00:00', true, ${idBarbeiro}),
                    ('${dataLoop.toISOString().split('T')[0]}', '12:40:00', true, ${idBarbeiro}),
                    ('${dataLoop.toISOString().split('T')[0]}', '13:20:00', true, ${idBarbeiro}),
                    ('${dataLoop.toISOString().split('T')[0]}', '14:00:00', true, ${idBarbeiro}),
                    ('${dataLoop.toISOString().split('T')[0]}', '14:40:00', true, ${idBarbeiro}),
                    ('${dataLoop.toISOString().split('T')[0]}', '15:20:00', true, ${idBarbeiro}),
                    ('${dataLoop.toISOString().split('T')[0]}', '16:00:00', true, ${idBarbeiro}),
                    ('${dataLoop.toISOString().split('T')[0]}', '16:40:00', true, ${idBarbeiro}),
                    ('${dataLoop.toISOString().split('T')[0]}', '17:20:00', true, ${idBarbeiro}),
                    ('${dataLoop.toISOString().split('T')[0]}', '18:00:00', true, ${idBarbeiro}),
                    ('${dataLoop.toISOString().split('T')[0]}', '18:40:00', true, ${idBarbeiro})`;
            
                db.query(sqlDefault, (error) => {
                  if (error) {
                    console.error(`Erro ao inserir os horários para o dia ${dataLoop.toISOString().split('T')[0]} e barbeiro ${idBarbeiro}:`, error);
                  } else {
                    console.log(`Horários inseridos para o dia ${dataLoop.toISOString().split('T')[0]} e barbeiro ${idBarbeiro}`);
                  }
                });
              }
                } else {
                console.log(`Horários já existentes para o dia ${dataLoop.toISOString().split('T')[0]} e barbeiro ${idBarbeiro}. Nenhuma inserção será feita.`);
                }
            }
            });
            
          });
        }
      }
    }
  }