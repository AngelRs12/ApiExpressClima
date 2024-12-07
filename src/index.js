const app = require('./app');

// Inicia el servidor en el puerto definido
app.listen(app.get('port'), () => {
    console.log("Servidor escuchando en:", app.get("port"));
});
