const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const config = require('../config/config')

const User = require('../models/User')

function register(req, res){
    
    const body = req.body;

    const user = new User();

    user.name = body.name;
    user.email = body.email;
    user.password = bcrypt.hashSync(body.password);
    user.role = 'ROL_USER';

    user.save((error, userCreate) => {
        if(error)
        {
            res.status(500).json({
                ok: false,
                error
            })
        }

        res.status(201).json({
            ok: true,
            user: userCreate
        })
    })
}

function login(req, res){

    let body = req.body

    User.findOne({email: body.email }, (error, userDB) => {

        if(error){
            res.status(500).json({
                ok: false,
                error
            })
        }

        if ( !userDB ) {
            res.status(400).json({
                ok: false,
                message: 'El usuario no existe'
            })
        }
        
        if ( !bcrypt.compareSync( body.password, userDB.password ) ) {
            res.status(400).json({
                ok: false,
                message: 'Email y/o password incorrectos'
            })
        }

        let token = jwt.sign({
            usuario: userDB
        }, config.secret, { expiresIn: config.expiredToken } )
        
        res.status(200).json({
            ok: true,
            usuario: userDB,
            token
        })
    
    })

}

module.exports = {
    register,
    login
}