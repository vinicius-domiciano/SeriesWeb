let serieDAO = new (require("../models/Series"))();

module.exports = {

    async listar(req, res){
            const lista = await serieDAO.lista()

            if(lista)
                return res.send(lista);

            return res.status(404).send({erro : 'Lista vazia'})
        
    },

    async insere(req, res){
        let serie = req.body;

        try{
            const resultado = await serieDAO.insere(serie);
            const insertId = resultado.insertId;
            serie = {id:insertId, ...serie}
            return res.status(201).send(serie);
        }catch(erro){
            return res.status(500).send(erro)
        }

    },

    async buscaPorId (req, res) {
        const id = req.params.id;

        let serie = await serieDAO.buscaPorId(id)
        serie = serie[0]

        if(!serie)
            res.status(404).send({erro: "Serie não encontrada"})

        res.send(serie)

    },

    async atualiza ( req, res ){
        const id = req.params.id
        var serie = req.body
        serie.id = id

        const retorno = await serieDAO.atualiza(serie)
        if(!retorno.affectedRows)
            return res.status(404).send({erro: 'Serie não encontrada'})

        res.send(serie)

    },

    async delete ( req, res){
        const id =  req.params.id
        const retorno = await serieDAO.delete(id)

        if(!retorno.affectedRows)
            return res.status(404).send({erro: 'Serie não encontrada'})

        res.status(204).send({Secesso: 'Serie deletada com sucesso!!'});

    }

}