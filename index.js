const expreso = requerir('expreso');
const { Conexión TikTok en vivo } = requerir('conector en vivo de TikTok'); // La libertad clave
const app = expreso();
const puerto = proceso.env.PUERTO || 3000;

// Reemplaza con tu usuario de TikTok (ej. "@cibergol")
dejar nombre de usuario de tiktok = „@losjuegosdelprofe"; 
dejar conexión = nuevo Conexión TikTok en vivo(nombre de usuario de tiktok);

conexión.conectar().entonces(estado => {
    consola.información(`Conectado al live de ${estado.ID de habitación}`);
}).atrapar(err => {
    consola.error('Error al conectar:', err);
});

// EVENTO: Cuando alguien te enviaba un regalo
conexión.en('regalo', (datos) => {
    consola.registro(`¡${datos.Id único} mandó un ${datos.nombre del regalo}!`);
    // Aquí puedes meter lógica: si es Rosa, dispara un sonido
});

// EVENTO: Chat
conexión.en('chat', datos => {
    consola.registro(`${datos.Id único} dijo: ${datos.comentario}`);
});

// Servidor básico para que Heroku no dé error R10
app.get('/', (req, res) => res.enviar('API de TikTok de Cibergol Funcionando 🚀'));
app.escuchar(puerto, () => consola.registro(`Puerto: ${puerto}`));
