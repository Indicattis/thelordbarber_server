
const fs = require('fs');
const wppconnect = require('@wppconnect-team/wppconnect');
const express = require ('express');
const db = require ('../db.js');
const cors = require ('cors');


const app = express();
app.use(express.json());
app.use(cors());

const router = express.Router();

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
          response.data = matches[2];
  
          // Send the QR code as a response to the frontend
          // Note: You should handle the response type and status appropriately based on your API setup.
          res.json(response);
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
      });
}
}



function enviarMensagem(numero, mensagem) {
  wppconnect
      .create({
          session: 'sessionName',
          logQR: false,
      })
      .then((client) => {
          return client
              .isLogged()
              .then((isLogged) => {
                  if (isLogged) {
                      return client.sendText(numero, mensagem);
                  } else {
                      throw new Error('Cliente não está logado');
                  }
              })
              .catch((error) => {
                  console.error('Erro ao verificar status de login:', error);
                  throw error;
              })
              .finally(() => {
                  client.destroy();
              });
      })
      .catch((error) => {
          console.error('Erro ao criar cliente:', error);
          throw error;
      });
}

module.exports = {
  enviarMensagem,
};



// initBot()