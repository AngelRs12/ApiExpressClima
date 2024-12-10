const app = require('./app');

const PORT = 3000;

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en: http://localhost:${PORT}`);
});
