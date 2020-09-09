const express = require('express');
const app = express();
const consign = require('consign');
const bodyParser = require('body-parser');

const customExpress = () =>{

    //
    // app.use(bodyParser.urlencoded());
    app.use(bodyParser.json())

    app.use( ( req, res, next ) => {
        const authHeader = req.headers.authorization;

        if(!authHeader)
            return res.status(401).send({erro: 'token não encontrado'})

        const parts = authHeader.split(' ')

        if(!parts.length === 2)
            return res.status(401).send({erro: 'token mal formatado'})

        const [ bearer, token] = parts;
        
        jwt.verify(token, authConfig.secret, (erro, user) => {
            if(erro)
                return res.status(401).send({erro: 'token inválido'});

            req.userId = user.id;
            return next();
        })

    })

    //injeção de denpedencia de controller
    consign()
    .include('controllers')
    .include('models')
    .into(app)

    return app;
}

module.exports = customExpress();