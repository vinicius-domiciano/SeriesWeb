import PubSub from 'pubsub-js'
import React, { Component } from 'react';
import "./TabelaSeries.css"

const ListaSeries = (props) => {

    if(props.series.erro){
        return <h1>{props.series.erro}</h1>
    }

    return(
        <div className="card-body card-body-flex">
            {props.series.map(serie => {
            return (
                <div key={serie.id} className='card card-serie'>
                    <div className="card-header ">
                        <h5 className="card-title">
                            {serie.nome}
                        </h5>
                        <h6 
                            className="card-title text-muted mb-0">
                            {serie.ano_lancamento}
                        </h6>
                    </div>
                    <div className="card-body">
                        <img src="/logo192.png" className="card-img"/>
                    </div>
                    <div className='card-footer'>
                        {serie.temporadas} 
                        {serie.temporadas > 1 ? ' - temporadas' : " - temporada"}
                        <br/>
                        <a href="#"
                            data-toggle="modal"
                            data-target="#exampleModalCenter"
                            onClick={() => {
                                PubSub.publish('detail', serie)
                            }}>Ver mais...</a>
                        <br/>
                        <button className="btn btn-outline-danger btn-sm mt-2" onClick={() =>{
                            if(window.confirm("Confirma a exclusão?"))
                            props.deleta(serie.id)
                        }}>Delete</button>
                        <button 
                            className="btn btn-outline-info btn-sm float-right mt-2" 
                            onClick={() => {
                                PubSub.publish('editing',serie)
                            }}>
                                Editar
                        </button>
                    </div>
                </div>
            )
        })}
        </div>
    )
}

class TabelaSeries extends Component{

    constructor(){
        super()
        this.state = {
            serieDetalhes : ''
        }
        PubSub.subscribe('detail', (msg,serie) => {
            this.setState({serieDetalhes: serie})
        })
    }

    render(){
        const serieDetalhes = this.state.serieDetalhes
        const { series, deleta } = this.props;
        return(
                <div 
                    className='card'>
                    <div 
                        className="modal fade" 
                        id="exampleModalCenter" 
                        tabindex="-1" 
                        role="dialog" 
                        aria-labelledby="exampleModalCenterTitle" 
                        aria-hidden="true">
                    <div 
                        className="modal-dialog modal-dialog-centered" 
                        role="document">
                        <div 
                            className="modal-content">
                        <div 
                            className="modal-header">
                            <h5 
                                className="modal-title" 
                                id="exampleModalCenterTitle">
                                    {serieDetalhes.nome}
                            </h5>
                            <button 
                                type="button" 
                                className="close" 
                                data-dismiss="modal" 
                                aria-label="Close">
                                <span 
                                    aria-hidden="true">
                                        &times;
                                </span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <img 
                                src="/logo192.png"
                                className="card-img"/>
                            {serieDetalhes.temporadas}
                            {serieDetalhes.temporadas > 1 ? ' - temporadas' : '- temporada'}
                            <br/>
                            <h6>Sinopse</h6>
                            <p>
                            {serieDetalhes.sinopse}
                            </p>
                            
                        </div>
                        <div 
                            className="modal-footer">
                            <button 
                                type="button" 
                                className="btn btn-secondary" 
                                data-dismiss="modal">
                                    Close
                            </button>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="card-header text-center">
                    Lista de Series
                </div>
                    <ListaSeries series={series} deleta={deleta}/>
            </div>
        )
    }

}

export default TabelaSeries