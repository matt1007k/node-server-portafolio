const jwt = require('jsonwebtoken')
const config = require('../config/config')

let mdverifyToken = ( req, res, next) => {

    let token = req.get('token')

    jwt.verify(token, config.secret, (error, decoded) => {

        if ( error ) {

            return res.status(401).json({
                ok: false,
                error
            })
        }        

        req.usuario = decoded.usuario;

        next();
    })

}

module.exports = {
    mdverifyToken
}