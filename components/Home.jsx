import React from 'react'
import {Redirect} from 'react-router-dom'
import  {useMain, useMainUpdate} from '../mainContext'

export const Home = () => {

    const {logged,url,tkn} = useMain()
    const {setlogged} = useMainUpdate()

    if(logged){
        return <Redirect to={'/Dashhoard'}/>;
    }
    else{
        return <Redirect to={'/login'}/>;
    }
  

}