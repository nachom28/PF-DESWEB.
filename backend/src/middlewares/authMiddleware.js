const jwtDecode = require('jwt-decode');
const Usuario = require('../models/Usuario');
const asyncHandler = require('express-async-handler')



// ==========
// VERIFICAR TOKEN
// ==========

let verificaToken = asyncHandler(async (req, res, next) => {


    let token = req.get('token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Token vacio'
        });
    }

    const payload = jwtDecode(token);

    const user = await Usuario.findById(payload.usuario._id);

    if (user.token == token) {
        // Authorized

        console.log('---------\nAcción realizada por: ' + user.persona.dni.toString()+ '\n---------');

        next();
    } else {
        // Unauthorized
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }
})




module.exports = {
    verificaToken
}