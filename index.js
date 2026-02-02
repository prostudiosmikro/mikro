const express = require('express');
const { WebcastPushConnection } = require('tiktok-live-connector');
const app = express();
const port = process.env.PORT || 3000;

// Tu usuario de TikTok (asegúrate de que esté bien escrito)
let tiktokUsername = "losjuegosdelprofe"; 
let connection = new WebcastPushConnection(tiktokUsername);

connection.connect().then(state => {
    console.info(`Conectado al live de ${state.roomId}`);
}).catch(err => {
    console.error('Error al conectar:', err);
});

// EVENTO: Regalos
connection.on('gift', (data) => {
    console.log(`¡${data.uniqueId} mandó un ${data.giftName}!`);
});

// EVENTO: Chat
connection.on('chat', data => {
    console.log(`${data.uniqueId} dijo: ${data.comment}`);
});

// Servidor para Heroku
app.get('/', (req, res) => res.send('API de TikTok de Cibergol Funcionando 🚀'));
app.listen(port, () => console.log(`Servidor activo en puerto: ${port}`));
