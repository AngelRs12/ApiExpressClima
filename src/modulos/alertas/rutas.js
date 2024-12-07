const express = require('express');
const respuestas = require('../../red/respuestas');
const controlador = require('./controlador');
const router = express.Router();
router.get('/',todos)
router.get('/:id',uno)
router.post('/',agregar)
router.delete('/:id',eliminar)

async function todos (req, res) {

        const items = await controlador.todos();
        respuestas.success(req, res, items, 200); // Envía 'items' en lugar de 'todos'
    
};

async function uno (req, res) {
    try{
    const items = await controlador.uno(req.params.id);
    respuestas.success(req, res, items, 200); 
    }catch(err){
        respuestas.error(req, res, err,500);
    }
};

async function agregar(req, res, next) {
    try {
        console.log('Datos recibidos en req.body:', req.body); // Ver los datos recibidos
        const items = await controlador.agregar(req.body); // Usa el cuerpo completo para insertar o actualizar
        
        let mensaje;
        if (req.body.id == 0 || !req.body.id) { 
            mensaje = 'Item guardado con éxito';
        } else {
            mensaje = 'Item actualizado con éxito';
        }

        respuestas.success(req, res, mensaje, 201); 
    } catch (err) {
        console.log('Error en la función agregar:', err); 
        next(err); 
    }
}


async function eliminar (req, res,next) {
    try {
        const items = await controlador.eliminar(req.body);
        respuestas.success(req,res,'Item eliminado',200) 
    } catch (err) {
        next(err)
    }
}

module.exports = router;