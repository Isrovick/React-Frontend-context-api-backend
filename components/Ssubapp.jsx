import React, {Component, useState} from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import  {useMain, useMainUpdate} from '../mainContext'

import { Home } from './Home.jsx';
import { Dashboard } from './Dashboard';
import { Transactions } from './Transactions';
import { Transaction } from './Transaction';
import { Trade } from './Trade';
import { Login } from './Login';
import { Register } from './Register';
import { Logout } from './Logout';



export const Subapp = () => {
  
    const {logged,name} = useMain()
    
    
    return (
        <>
          <Router>
   
            
             
              {logged ? ( 
                      <>
                      <ul className="list-group list-group-horizontal">
                        <li className="list-group-item">
                          <Link to="/Dashboard" className="btn btn-light">Dashboard</Link>
                        </li >
                        <li className="list-group-item"> 
                          <Link to="/Transactions" className="btn btn-light">Transactions</Link>
                        </li>
                  
                        <li className="list-group-item">
                          <Link to="/Trade" className="btn btn-light">Trade</Link>
                        </li>
                        <li className="list-group-item">
                          <Link to="/Logout" className="btn btn-light">Log Out</Link>
                        </li>
                        </ul>
                        
                        <p>Welcome {name}!</p>
                      </> )
                      : (
                      <>
                      <ul className="list-group list-group-horizontal">
                        <li className="list-group-item">
                          <Link to="/Login" className="btn btn-light">Login</Link>
                        </li>
                        <li className="list-group-item">
                          <Link to="/Register" className="btn btn-light">Register</Link>
                        </li>
                        </ul>
                      </>
                    )   
          }

            

           

              <Switch>

                  <Route  path={"/"}  exact >
                      <Home/>
                  </Route>
                  <Route  path={"/Dashboard"}>
                      <Dashboard></Dashboard>
                  </Route>
                  <Route  path={"/Transactions"}>
                      <Transactions></Transactions>
                  </Route>
                  <Route  path={"/Transaction"}>
                      <Transaction></Transaction>
                  </Route> 
                  <Route  path={"/Trade"}>
                      <Trade></Trade>
                  </Route>
                  <Route  path={"/Login"} >
                      <Login></Login>
                  </Route>
                  <Route  path={"/Register"}>
                    <Register></Register>
                  </Route>
                  <Route  path={"/Logout"}>
                    <Logout></Logout>
                  </Route>

              </Switch>
          </Router>
        </>
    )
}
