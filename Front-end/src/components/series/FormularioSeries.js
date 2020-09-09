import PubSub from 'pubsub-js';
import React, { Component } from 'react';

class FormulaioSeries extends Component{

    constructor(){
        super()
        this.stateInicial = {
            nome:'',
            ano_lancamento:'',
            temporadas: '',
            sinopse:''
        }

        this.state = this.stateInicial

        PubSub.subscribe('editing',(msg, serie) =>{
            this.setState(serie)
        })
    }

    inputHandler = (e) => {
        const { name, value } = e.target;
        this.setState({[name] : value})
    }

    enviaDados = (e) => {
        e.preventDefault()
        this.props.enviaDados(this.state)
        if(this.state.id)
            delete this.state.id

        this.setState(this.stateInicial);
    }

    render(){
        return(
            <div className='card'>
                <div className="card-header text-center">
                        Cadastro de Series
                </div>
                <div className="card-body">
                     
                    <form method="post" onSubmit={this.enviaDados} >
                        <div className="form-group">
                            <label htmlFor="name">Nome</label>
                            <input className="form-control" type="text" id="nome" name="nome"
                            value={this.state.nome}
                            onChange={this.inputHandler}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="lancamento">Ano de Lançamento</label>
                            <input className="form-control" type="text" id="ano_lancamento" name="ano_lancamento"
                            value={this.state.ano_lancamento}
                            onChange={this.inputHandler}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="temporadas">Temporadas</label>
                            <input className="form-control" type="number" id="temporada" name="temporadas"
                            value={this.state.temporadas}
                            onChange={this.inputHandler}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="sinopse">Sinopse</label>
                            <textarea className="form-control" id="sinopse" name="sinopse"
                            value={this.state.sinopse}
                            onChange={this.inputHandler}></textarea>

                            <button className="btn btn-success form-control mt-3" type="submit" >Salvar</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}

export default FormulaioSeries