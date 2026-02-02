const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const { WebcastPushConnection } = require('tiktok-live-connector');

const app = express();
const server = http.createServer(app);

// Configuración de Socket.io
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const port = process.env.PORT || 3000;
let tiktokUsername = "maiky.ramirez12"; 
let connection = new WebcastPushConnection(tiktokUsername);

// Conexión a TikTok
connection.connect().then(state => {
    console.log(`✅ Conectado al live de ${tiktokUsername}`);
}).catch(err => {
    console.error('❌ Error al conectar:', err);
});

// EVENTO: Regalos
connection.on('gift', (data) => {
    console.log(`🎁 ¡${data.uniqueId} mandó un ${data.giftName}!`);
    io.emit('nuevo_regalo', {
        user: data.uniqueId,
        gift: data.giftName,
        count: data.repeatCount,
        image: data.giftPictureUrl
    });
});

// EVENTO: Chat
connection.on('chat', data => {
    console.log(`💬 ${data.uniqueId}: ${data.comment}`);
    io.emit('nuevo_mensaje', {
        user: data.uniqueId,
        msg: data.comment
    });
});

app.get('/', (req, res) => {
    res.send('Servidor Mikro TikTok Activo 🚀');
});

server.listen(port, () => {
    console.log(`🚀 Servidor corriendo en puerto ${port}`);
});
