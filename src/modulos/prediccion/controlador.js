const db = require('../../bd/mysql');
const tabla = 'prediccion';

function todos(){
    return db.todos(tabla);
}
function uno(id){
    return db.uno(tabla,id);
}
function eliminar(body){
    return db.eliminar(tabla,body);
}
function agregar(body){
    return db.agregar(tabla,body);
}

module.exports = {
    todos,
    uno,
    eliminar,
    agregar
}