const fs = require('fs');
const wppconnect = require('@wppconnect-team/wppconnect');
const express = require('express');
const cors = require('cors');
const db = require('../db.js')
const dayjs = require('dayjs');

const app = express();
app.use(express.json());
app.use(cors());

const router = express.Router();
// wppconnect.defaultLogger.level = 'debug';
// wppconnect.defaultLogger.transports.forEach((t) => (t.silent = true));
resign = false
router.get('/', (req, res) => {
  wppconnect
    .create({
      session: 'Atendimento',
      statusFind: (statusSession, session) => {
        console.log('Status Session: ', statusSession);
        console.log('Session name: ', session);

        if (statusSession == 'inChat' || statusSession == 'isLogged' || statusSession == 'qrReadSuccess') {
          res.status(200).json({ status: 'connected', session })
        }
        if (statusSession == 'qrReadError' || statusSession == 'browserClose' || statusSession == 'autocloseCalled') {
          res.status(200).json({ status: 'disconnected', session })
        }
        if (statusSession == 'desconnectedMobile' || statusSession == 'notLogged') {
          resign = true
        }
      },
      catchQR: (base64Qr, asciiQR) => {
        console.log(asciiQR); // Optional to log the QR in the terminal
        var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
          response = {};

        if (matches.length !== 3) {
          return new Error('Invalid input string');
        }

        response.type = matches[1];
        response.data = matches[2];

        pngQR = new Buffer.from(matches[2], 'base64');

        // Send the QR code as a response to the frontend
        // Note: You should handle the response type and status appropriately based on your API setup.
        if (resign) {
          res.status(200).json({ response, status: 'disconnected' });
        }

        var imageBuffer = pngQR;
        require('fs').writeFile(
          'out.png',
          imageBuffer['data'],
          'binary',
          function (err) {
            if (err != null) {
              console.log(err);
            }
          }
        );
      },
      logQR: false,
      folderNameToken: './bot/tokens',
      autoClose: false,
      disableWelcome: false,
      updatesLog: false
    })
    .then((client) => start(client))
    .catch((error) => console.log(error));

  async function start(client) {
    client.onMessage(async (message) => {
      if (message.body == 'Olá' || message.body == 'Oi') {
        client
          .sendText(message.from, 'Olá! Bem-vindo ao assistente virtual The Lord!\n\nComo posso lhe ajudar? \n\n 1 - 🗓️ Agendamento \n 2 - ✂️ Cortes e Preços \n 3 - 📍 Localização \n 4 - 👤 Suporte ao Usuário \n 5 - 🕒 Horário de atendimento')
          .then((result) => {
            console.log('Result: ', result); //return object success
          })
          .catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
          });
      }
      if (message.body === '1') {
        await client
          .sendText(message.from, 'Você pode realizar seu agendamento de qualquer lugar! \n Basta acessar o link abaixo e verificar os horários disponíveis!');
        await client
          .sendLinkPreview(
            message.from,
            'https://thelordbarber.devliners.com.br/',
            'The Lord Barber Espaço Masculino'
          )
        await client
          .sendText(message.from, 'The Lord Barber agradece seu contato!')
          .then((result) => {
            console.log('Result: ', result); //return object success
          })
          .catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
          });
      }
      if (message.body === '2') {
        await client
          .sendText(
            message.from,
            '*CORTES E PREÇOS:*'
          );
        await client
          .sendText(
            message.from,
            'Cabelo - R$35,00 \n Barba - R$30,00 \n Sobrancelha - R$10,00 \n Combo triplo - R$60,00'
          );
        await client
          .sendText(
            message.from,
            'Além disso, consulte nosso plano mensal, com direito a 4 cortes de cabelo e 1 de sobrancelha pelo preço mais justo que você já viu!'
          );
        await client
          .sendText(message.from, 'The Lord Barber agradece seu contato!')
          .then((result) => {
            console.log('Result: ', result); //return object success
          })
          .catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
          });
      }
      if (message.body === '3') {
        await client
          .sendText(
            message.from,
            '*LOCALIZAÇÃO*'
          );
        await client
          .sendLinkPreview(
            message.from,
            'https://goo.gl/maps/pTMQPJ3xHJ8TEeQcA',
            'Av. Canopus, 406 - Cruzeiro, Caxias do Sul - RS, 95074-130'
          )
        await client
          .sendText(message.from, 'The Lord Barber agradece seu contato!')
          .then((result) => {
            console.log('Result: ', result); //return object success
          })
          .catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
          });
      }
      if (message.body === '4') {
        await client
          .sendText(
            message.from,
            '*SUPORTE*'
          );
        await client
          .sendText(
            message.from,
            'SENHA - Esqueci minha senha \n AGENDAMENTO - Verificar seu agendamento'
          );
        await client
          .sendText(
            message.from, 
            '_Você também pode verificar e edicar informações no nosso site!_'
            )
          .catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
          });
      }
      if (message.body === '5') {
        await client
          .sendText(
            message.from,
            '*HORÁRIOS DE ATENDIMENTO:*'
          );
        await client
          .sendText(
            message.from,
            'Segunda - 13:20 às 20:00 \nTerça - 08:00 às 20:00 \nQuarta - 08:00 às 20:00 \nQuinta - 08:00 às 20:00 \nSexta - 08:00 às 20:00 \nSábado - 08:00 às 18:00 \n'
          );
        await client
          .sendText(
            message.from,
            '_Consulte os horário na agenda de cada barbeiro_'
          );
        await client
          .sendText(message.from, 'The Lord Barber agradece seu contato!')
          .then((result) => {
            console.log('Result: ', result); //return object success
          })
          .catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
          });
      }
      if (message.body == 'SENHA') {
        await client
          .sendText(
            message.from,
            '*Consultando...*'
          );
        
        const phoneNumber = message.from.replace('5554', '549').replace('@c.us', '');
        const checkQuery = `SELECT senha FROM clientes WHERE phone = ${phoneNumber}`;
        
        db.query(checkQuery, (error, results) => {
          if (error) {
            client
            .sendText(
              message.from,
              `Erro ao realizar a consulta ${phoneNumber}`
            );
          } else {
            if (results.length > 0) {
              const senha = results[0].senha;

              client
              .sendText(
                message.from,
                `Sua senha é: ${senha}`
              );
            } else {
              client
              .sendText(
                message.from,
                `Não foi possível encontrar a senha para ${phoneNumber}`
              );
            }
          }
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
      }
      if (message.body == 'AGENDAMENTO') {
        await client
          .sendText(
            message.from,
            '*Consultando...*'
          );
        
        const phoneNumber = message.from.replace('5554', '549').replace('@c.us', '');
        const checkQuery = `SELECT * FROM agendamentos WHERE cliente = ${phoneNumber}`;
        
        db.query(checkQuery, (error, results) => {
          if (error) {
            client
            .sendText(
              message.from,
              `Erro ao realizar a consulta ${phoneNumber}`
            );
          console.error('Error when sending: ', erro); //return object error
        } else {
            if (results.length > 0) {
              let response = 'Seus agendamentos são:\n';
        
              for (const agendamento of results) {
                response += `Data: ${dayjs(agendamento.day).format('DD [de] MMMM, YYYY')}, Hora: ${agendamento.hour}\n`;
              }

              client.sendText(
                message.from,
                response
              );
            } else {
              client
              .sendText(
                message.from,
                `Não foi possível encontrar os agendamentos para ${phoneNumber}`
              );
            }
          }
        })
      }
      if (message.body === 'Ribeiro') {
        await client
          .sendText(message.from, 'O ribeiro está pronto para beijar a sua boca!');
        await client
          .sendLinkPreview(
            message.from,
            'https://www.youtube.com/watch?v=Jr6LyMe5BJo&ab_channel=Jo%C3%A3oVictorAmaralFerreira',
            'Assista'
          )
          .catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
          });
      }
      if (message.body === 'Bianca' || message.body === 'bianca') {
        await client
          .sendText(message.from, 'Acabou de dizer o nome da mais quenga de caxias, parabéns!\n\nVocê pode encontra-la abaixo:');
        await client
          .sendLinkPreview(
            message.from,
            'http://www.susinight.com.br/institucional',
            'Bem vindo!'
          )
          .catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
          });
      }
    });
  }
}
)



module.exports = router