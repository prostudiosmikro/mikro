const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const { WebcastPushConnection } = require('tiktok-live-connector');

const app = express();
const server = http.createServer(app);
// Configuramos Socket.io para permitir conexiones desde cualquier sitio (CORS)
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const port = process.env.PORT || 3000;
let tiktokUsername = "losjuegosdelprofe"; 
let connection = new WebcastPushConnection(tiktokUsername);

// Conexión a TikTok
connection.connect().then(state => {
    console.info(`✅ Conectado al live de ${state.roomId}`);
}).catch(err => {
    console.error('❌ Error al conectar:', err);
});

// EVENTO: Regalos (Se muestra en consola y se envía a la API/Socket)
connection.on('gift', (data) => {
    console.log(`🎁 ¡${data.uniqueId} mandó un ${data.giftName}!`);
    // Emitimos el evento para que tu web lo reciba
    io.emit('nuevo_regalo', {
        user: data.uniqueId,
        gift: data.giftName,
        count: data.repeatCount,
        image: data.giftPictureUrl
    });
});

// EVENTO: Chat (Se muestra en consola y se envía al Socket)
connection.on('chat', data => {
    console.log(`💬 ${data.uniqueId}: ${data.comment}`);
    io.emit('nuevo_mensaje', {
        user: data.uniqueId,
        msg: data.comment
    });
});

// Ruta principal para verificar que el servidor vive
app.get('/', (req, res) => {
    res.send('Servidor Mikro TikTok con API Socket Activo 🚀');
});

// Importante: Usamos server.listen en lugar de app.listen para Socket.io
server.listen(port, () => {
    console.log(`🚀 Servidor corriendo en puerto ${port}`);
});
