const fs = require('fs');
const wppconnect = require('@wppconnect-team/wppconnect');
const express = require ('express');
const cors = require ('cors');


const app = express();
app.use(express.json());
app.use(cors());

const router = express.Router();
wppconnect.defaultLogger.level = 'debug';
wppconnect.defaultLogger.transports.forEach((t) => (t.silent = true));
resign = false
router.get('/', (req, res) => {
    wppconnect
      .create({
        session: 'Atendimento',
        statusFind: (statusSession, session) => {
          console.log('Status Session: ', statusSession);
          console.log('Session name: ', session);

          if (statusSession == 'inChat' || statusSession == 'isLogged' || statusSession == 'qrReadSuccess') {
            res.status(200).json({status: 'connected', session})
          }
          if (statusSession == 'qrReadError' || statusSession == 'browserClose' || statusSession == 'autocloseCalled') {
            res.status(200).json({status: 'disconnected', session})
          }
          if (statusSession == 'desconnectedMobile') {
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
            res.status(200).json({response, status: 'disconnected'});
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
        if (message.body === 'Olá') {
          client
            .sendText(message.from, 'Olá! Bem-vindo ao assistente virtual The Lord! Como posso lhe ajudar? \n\n 1 - Agendamento 🗓️ \n 2 - Cortes e Serviços ✂️ \n 3 - Suporte ao Usuário 👤')
            .then((result) => {
              console.log('Result: ', result); //return object success
            })
            .catch((erro) => {
              console.error('Error when sending: ', erro); //return object error
            });
        }
        if (message.body === '1') {
            await client
              .sendText(message.from, 'Você pode realizar seu agendamento de qualquer lugar! \n\n Basta acessar o link e verificar os horários disponíveis! \n The Lord Barber agradece seu contato!');
            await client
            .sendLinkPreview(
                message.from,
                'https://thelordbarber.devliners.com.br/',
                'TheLordBarber'
              )
            await client
              .sendText(message.from, 'Posso lhe ajudar com mais algo?')
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
)



module.exports = router