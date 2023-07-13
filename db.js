import mysql from "mysql"

// Configuração da conexão com o banco de dados
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'rayan_barber',
//   });

//   db.connect((error) => {
//     if (error) {
//         console.error('Erro na conexão com o banco de dados:', error);
//         return;
//     }
//     console.log('Conexão bem-sucedida!');
// });

const db = mysql.createConnection({
    host: 'thelordbarber.ctcphfoauwaz.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'd3vl1n3w3b',
    database: 'thelordbarber',
  });

  db.connect((error) => {
    if (error) {
        console.error('Erro na conexão com o banco de dados:', error);
        return;
    }
    console.log('Conexão bem-sucedida!');
});
export default db