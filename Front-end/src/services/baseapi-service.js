import { getToken } from './auth-service'

const URL = 'http://localhost:3000/'

export const doRequest = async (resource, method, dados = "", urlParam  = "") => {
    const params = {
        method: method,
        headers:{
            Accept: 'application/json',
            'Content-Type' : 'application/json',
            Authorization : 'bearer ' + getToken()
        },
        
    }

    if(!['GET','DELETE'].includes(method))
        params.body = JSON.stringify(dados)

    return await fetch(URL + resource + urlParam, params)
}

export const doPublicRequest = async (resource, method, dados = "", urlParam  = "") => {
    const params = {
        method: method,
        headers:{
            Accept: 'application/json',
            'Content-Type' : 'application/json',
        },
        
    }

    if(!['GET','DELETE'].includes(method))
        params.body = JSON.stringify(dados)

    return await fetch(URL + resource + urlParam, params)
}