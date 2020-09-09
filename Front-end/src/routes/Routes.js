import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { isSignedIn } from '../services/auth-service'
import React, { Component } from 'react';
import Autores from '../components/Autores'
import BoxSeries from '../components/series/BoxSeries'
import Home from '../components/Home'
import Login from '../components/Login'
import Navbar from '../components/Navbar'

const NotFound = () =>{
    return(
      <div>
        <h1>Página não encontrada!!!</h1>
      </div>
    )
}

const PrivateRoutes = ({component: Component, ... rest}) => {
  return (
    <Route {...rest}
      render={props => 
        isSignedIn() ? (
          <div>
            <Navbar />
            <Component />
          </div>
        ) : (
          <Redirect to={{ pathname: '/login',
            state: { from: props.location } } } 
            />
        )
      } 
      />
  )
}

const Routes = () => (
    <Router>
        <Switch>
            <Route path='/login' component={Login} />
            <PrivateRoutes path='/series' component={BoxSeries}/>
            <PrivateRoutes path='/autores' component={Autores}/>
            <PrivateRoutes exact path='/' component={Home}/>
            <Route component={NotFound}/>
        </Switch>
    </Router>
)

export default Routes