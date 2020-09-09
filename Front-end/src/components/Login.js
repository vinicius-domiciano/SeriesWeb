import React, { Component } from 'react'
import { signIn} from '../services/auth-service'
import './Login.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { deletar } from '../services/series-services'

const MsgError = (props) => {
    return props.msg ? (
        <div className='alert alert-danger'>
            {props.msg}
        </div>
    ) : ('')
}

class Login extends Component{

    constructor(){
        super()
        this.state = {
            email: '',
            senha: '',
            msgErro: ''
        }
    }

    inputHandler = (e) => {
        const {name, value} = e.target
        this.setState({ [name]: value})
    }

    signIn = async (e) => {
        e.preventDefault()
        const usuario = this.state
        delete usuario.msgErro
        const retorno = await signIn(usuario)
        if(retorno.status === 400){
            const error = await retorno.json()
            this.setState({msgErro : error.erro })
        }

        if(retorno.ok){
            //procedimento de auteutenticação
            this.props.history.push('/')
        }

    }

    render(){

        return(
            <div className="body">
                <form className="form-signin" onSubmit={this.signIn}>
                    <MsgError msg={this.state.msgErro}/>
                    <img 
                        className="mb-4 " 
                        src="logo192.png" 
                        alt="" 
                        width="80" 
                        height="80"/>
                    <h1 className="h3 text-center mb-3 font-weight-normal">Please sign in</h1>
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input 
                        type="email" 
                        id="inputEmail"
                        name="email"
                        className="form-control" 
                        placeholder="Email address" 
                        required
                        onChange={this.inputHandler}></input>
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input 
                        type="password" 
                        name="senha"
                        id="inputPassword" 
                        className="form-control" 
                        placeholder="Password" 
                        required
                        onChange={this.inputHandler}></input>           
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                </form>
            </div>
        )

    }

}

export default Login