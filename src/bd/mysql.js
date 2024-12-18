const mysql = require('mysql');
const config = require('../config');
const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
};
let conexion;

function conMysql() {
    conexion = mysql.createConnection(dbconfig);
    conexion.connect((err) => {
        if (err) {
            console.log('Error de conexión:', err);
            setTimeout(conMysql, 200); // Intentar reconectar después de 200ms
        } else {
            console.log('Conexión a la base de datos exitosa');
        }
    });

    conexion.on('error', err => {
        console.log('[Error de conexión]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('Conexión perdida. Intentando reconectar...');
            conMysql();
        } else {
            throw err;
        }
    });
}
conMysql();

function todos(tabla) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ??`, [tabla], (error, result) => {
            if (error) return reject(error);
            resolve(result);
        });
    });
}

function uno(tabla, id) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ?? WHERE id = ?`, [tabla, id], (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

function agregar(tabla, data) {
    if (data && !data.id) {
        return insertar(tabla, data);
    } else { 
        return actualizar(tabla, data);
    }
}

function eliminar(tabla, data) {
    return new Promise((resolve, reject) => {
        console.log(data);
        conexion.query(
            `DELETE FROM ${tabla} WHERE id = ?`, 
            data.id, 
            (error, result) => {
                return error ? reject(error) : resolve(result);
            }
        );
    });
}

function insertar(tabla, data) {
    return new Promise((resolve, reject) => {
        conexion.query(
            `INSERT INTO ${tabla} SET ?`, 
            data, 
            (error, result) => {
                console.log(error);
                return error ? reject(error) : resolve(result);
            }
        );
    });
}

function actualizar(tabla, data) {
    return new Promise((resolve, reject) => {
        conexion.query(
            `UPDATE ${tabla} SET ? WHERE id = ?`, 
            [data, data.id], 
            (error, result) => {
                return error ? reject(error) : resolve(result);
            }
        );
    });
}

module.exports = { todos, uno, agregar, eliminar, actualizar };
