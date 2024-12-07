function error(message, code){
    let e = new Error(message);

    if(code){
        e.statusCodde = code;
    }
    return e;
}

module.exports = error;