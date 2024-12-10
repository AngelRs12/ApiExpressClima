const app = require('./app');

const PORT = 3000;

// Define las rutas antes de iniciar el servidor
app.get('/', (req, res) => {
    res.redirect('/productos'); // Redirige a la ruta /productos
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en: http://localhost:${PORT}`);
});
