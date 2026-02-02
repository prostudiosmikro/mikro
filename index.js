const express = require('express');
const { WebcastPushConnection } = require('tiktok-live-connector');
const app = express();
const port = process.env.PORT || 3000;

// Tu usuario de TikTok sin el @
let tiktokUsername = "losjuegosdelprofe"; 
let connection = new WebcastPushConnection(tiktokUsername);

connection.connect().then(state => {
    console.info(`✅ Conectado al live de ${state.roomId}`);
}).catch(err => {
    console.error('❌ Error al conectar:', err);
});

// EVENTO: Regalos
connection.on('gift', (data) => {
    console.log(`🎁 ¡${data.uniqueId} mandó un ${data.giftName}!`);
});

// EVENTO: Chat
connection.on('chat', data => {
    console.log(`💬 ${data.uniqueId}: ${data.comment}`);
});

app.get('/', (req, res) => res.send('Servidor Mikro TikTok Activo 🚀'));
app.listen(port, () => console.log(`Servidor en puerto ${port}`));
