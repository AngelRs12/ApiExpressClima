const app = require('./app');
const PORT = process.env.PORT || 3000;

// Define la redirección en la ruta raíz antes de iniciar el servidor
app.get('/', (req, res) => {
    res.redirect('/ciudad'); // Redirige a la ruta /ciudad
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en: http://localhost:${PORT}`);
});
