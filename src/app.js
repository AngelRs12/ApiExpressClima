const express = require('express');
const morgan = require('morgan');
const config = require('./config');

const ciudades = require('./modulos/ciudades/rutas')
const alertas = require('./modulos/alertas/rutas')
const condicion = require('./modulos/condicion/rutas')
const historial = require('./modulos/historial/rutas')
const prediccion = require('./modulos/prediccion/rutas')

const error = require('./red/error');
const app = express();

// Establece el puerto desde la configuración
//app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.set('port', config.app.port);




app.use('/ciudad',ciudades);
app.use('/alertas',alertas);
app.use('/condicion',condicion);
app.use('/historial;',historial);
app.use('/prediccion',prediccion);
app.use(error);
module.exports = app;
