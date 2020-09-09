import React, { Component } from 'react'
import { getToken } from '../../services/auth-service'
import { inserir, listar, atualizar, deletar } from '../../services/series-services'
import FormularioSeries from './FormularioSeries'
import TabelaSeries from './TabelaSeries'

class BoxSeries extends Component{

    constructor(){
        super()
        this.state ={
          series:[]
        }
    }
    
    async componentDidMount(){
        try{
            const retorno = await listar()
            const series = await retorno.json()
            this.setState({series: series})
        }catch(erro){
            console.log(erro)
        }
    }

    enviaDados = async(serie) => {
        try{
            let retorno = ''
            if(!serie.id) retorno = await inserir(serie);
            else retorno = await atualizar(serie)
            serie = await retorno.json()
            if(retorno.status === 201){
                return this.setState({
                    series: [...this.state.series, serie],
                    serie: this.novaSerie
                })
            }
            if(retorno.status === 200){
                return this.setState({
                    series:this.state.series.map(s => s.id == serie.id ? serie : s),
                    serie: this.novaSerie
                })
            }
        }catch(erro){
            console.log(erro)
        }
    }

    deleta = async (id) => {
        const seriesAtual = this.state.series;
        const retorno = await deletar(id)
        if(retorno.status === 204){
            this.setState({
                series : seriesAtual.filter((serie) => serie.id !== id)
            })
            alert("Deletado com Sucesso")
        }
    }

    render(){
        return(
            <div className="container">
                <div className='row'>
                    <div className='col-md-4'>
                        <FormularioSeries enviaDados={this.enviaDados}/>
                    </div>
                    <div className='col-md-8'>
                        <TabelaSeries deleta={this.deleta} series={this.state.series}/>
                    </div>
                </div>
            </div>            
        )
    }

}


export default BoxSeries;