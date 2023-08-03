
const fs = require('fs');
const wppconnect = require('@wppconnect-team/wppconnect');
const express = require ('express');
const db = require ('../db.js');
const cors = require ('cors');


const app = express();
app.use(express.json());
app.use(cors());

function initBot() {
    wppconnect
  .create({
    session: 'sessionName',
    catchQR: (base64Qr, asciiQR) => {
      console.log(asciiQR); // Optional to log the QR in the terminal
      var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

      if (matches.length !== 3) {
        return new Error('Invalid input string');
      }
      response.type = matches[1];
      response.data = new Buffer.from(matches[2], 'base64');

      var imageBuffer = response;
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
  })
  .then((client) => start(client))
  .catch((error) => console.log(error));

    function start(client) {
  client.onMessage((message) => {
    if (message.body === 'Olá') {
      client
        .sendText(message.from, 'Bem vindo ao assistente virtual The Lord! Como posso lhe ajudar? \n\n 1 - Agendamento \n 2 - Cortes e Serviços ✂️ \n 3 - Suporte ao Usuário 👤')
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    }
    if (message.body === '1') {
        client
          .sendText(message.from, 'Você pode realizar seu agendamento de qualquer lugar acessando: \n\n https://the-lord-barber-git-master-indicattis.vercel.app/agendamento \n\n Basta acessar o link e verificar os horários disponíveis! \n The Lord Barber agradece seu contato!')
          .then((result) => {
            console.log('Result: ', result); //return object success
          })
          .catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
          });
      }
    if (message.body == 'caramba') {
        client
          .sendText(message.from, 'que pinto enorme')
          .then((result) => {
            console.log('Result: ', result); //return object success
          })
          .catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
          });
      }
      if (message.body == 'Stefani') {
        client
          .sendText(message.from, 'Você acabou de falar o nome do amor da vida do João')
          .then((result) => {
            console.log('Result: ', result); //return object success
          })
          .catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
          });
      }
  });
}
}

initBot()
module.exports = initBot;