const respuestas = require('./respuestas');

function errors(err,req,res,next){
    console.error('[Error',err);
    const message = err.messagge || 'Error inerno';
    const status   = err.statusCode || 500;

    respuestas.error(req, res, message, status);
}

module.exports = errors;