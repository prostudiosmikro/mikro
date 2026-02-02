const expreso = requerir('expreso');
const http = requerir('http');
const { Servidor } = requerir("socket.io");
const { Conexión WebcastPush } = requerir('conector en vivo de TikTok');

const app = expreso();
const servidor = http.crearServidor(app);
// Configuramos Socket.io para permitir conexiones desde cual sitio (CORS)
const io = nuevo Servidor(servidor, {
    cors: {
        origen: "*",
        métodos: [„CONSEGUIR", "POST"]
    }
});

const puerto = proceso.env.PUERTO || 3000;
dejar nombre de usuario de tiktok = "maiky.ramirez12"; 
dejar conexión = nuevo Conexión WebcastPush(nombre de usuario de tiktok);

// Conexión a TikTok
conexión.conectar().entonces(estado => {
    consola.información(`✅ Conectado al live de ${estado.ID de habitación}`);
}).atrapar(err => {
    consola.error('❌ Error al conectar:', err);
});

// EVENTO: Regalos (Se muerte en consola y se envi a la API/Socket)
conexión.en('regalo', (datos) => {
    consola.registro(`🎁 ¡${datos.Id único} mandó un ${datos.nombre del regalo}!`);
    // Emitimos el evento para que tu web lo reciba
    io.emitir('nuevo_regalo', {
        usuario: datos.Id único,
        regalo: datos.nombre del regalo,
        contar: datos.repetirConteo,
        imagen: datos.URL de imagen de regalo
    });
});

// EVENTO: Chat (Se muerte en consola y se enviaba al Socket)
conexión.en('chat', datos => {
    consola.registro(`💬 ${datos.Id único}: ${datos.comentario}`);
    io.emitir('nuevo_mensaje', {
        usuario: datos.Id único,
        mensaje: datos.comentario
    });
});

// Ruta principal para verificar que el servidor viva
app.get('/', (req, res) => {
    res.enviar('Servidor Mikro TikTok con API Socket Activo 🚀');
});

// Importante: Usamos server.listen en lugar de app.listen para Socket.io
servidor.escuchar(puerto, () => {
    consola.registro(`🚀 Servidor corriendo en puerto ${puerto}`);
});
