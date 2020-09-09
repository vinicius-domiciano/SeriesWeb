const {check, validationResult} = require('express-validator')
const usuarioDAO = new (require("../models/Usuarios"))();
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')
const bcrypt = require('bcryptjs')

gerarToken = (params) => {
    return jwt.sign( params, authConfig.secret, {
        expiresIn : 6300,
    });
}

module.exports = {
      
    async registra(req, res){
        const erros = validationResult(req)

            if(!erros.isEmpty())
                return res.status(400).send(erros);

        let usuario = req.body
        try{
            usuario.senha = await bcrypt.hash(usuario.senha, 10)
            
            const resultado = await usuarioDAO.inserir(usuario)
            usuario = {id: resultado.insertId, ...usuario}

            res.status(201).send({
                usuario,
                token: gerarToken({id: usuario.id})
            })
        }catch(erro){
            res.status(500).send({erro: erro})
        }
    },

    async autentica(req, res){
        const { email, senha } = req.body;
        try{
            let usuario = await usuarioDAO.buscarPorEmail(email);
            usuario = usuario[0];
            if(!usuario)
                return res.status(400).send({ erro: 'Usuario não cadastrado' })

            if(!await bcrypt.compare(senha, usuario.senha))
                return res.status(400).send({erro: 'senha invalida'})
            
                delete usuario.senha
            res.send({
                usuario, 
                token : gerarToken({id : usuario.id})
            })
            
        }catch(erro){
            res.status(500).send(erro)
        }
    }

}