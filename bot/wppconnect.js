
const express = require('express');
const fs = require('fs');
const app = express();
const wppconnect = require('@wppconnect-team/wppconnect');
const cors = require ('cors');

const SESSION_FILE_PATH = 'out.png';

app.use(express.json());
app.use(cors());

const router = express.Router();

router.get('/', async (req, res) => {
  if (fs.existsSync(SESSION_FILE_PATH)) {
    const qrCodeData = fs.readFileSync(SESSION_FILE_PATH, 'base64');
    return res.status(200).json({ type: 'image/png', data: qrCodeData });
  }

  try {
    const client = await wppconnect.create({
      session: 'sessionName',
      catchQR: (base64Qr, asciiQR) => {
        console.log(asciiQR);
        var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
          response = {};

        if (matches.length !== 3) {
          return res.status(500).json({ error: 'Invalid input string' });
        }

        response.type = matches[1];
        response.data = matches[2];

        fs.writeFileSync(SESSION_FILE_PATH, response.data, 'base64');

        res.status(200).json(response);
      },
      logQR: false,
    });

    start(client);
  } catch (error) {
    res.status(500).json({ error: 'Error initializing bot' });
  }
});

function start(client) {
  client.onMessage((message) => {
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

module.exports = router