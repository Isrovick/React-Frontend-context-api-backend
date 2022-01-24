import React, {useState, useEffect} from 'react'
import axio from 'axios'
import {Redirect} from 'react-router-dom'

import  {useMain, useMainUpdate} from '../mainContext'

export const Dashboard = () => {

    const {logged , url, tkn} = useMain()
    const [conv, setconv] = useState('-')
    const [convI, setconvI] = useState('-')

    useEffect(() => {  
        const tkn = localStorage.getItem("tkn")
        axio.get(url+'getrelresp',{
            headers:{
                Authorization: 'Bearer '+tkn
            }
        },{withCredentials: true}
        ).then(response=>{
            let aux1=response.data.replace(/,/g,'');
            let aux=parseFloat(aux1)
            setconv(response.data)
            setconvI((1000/aux).toFixed(8))

        }).catch(error=>{
            console.log(error)
        })
        
    },[]);

    if(!logged){
        return <Redirect to={'/login'}/>;
    }

    return (
        <div>
             <div className="container my-4">
                <div className="row"></div>
                <div className="row">
                    <div className="col-sm"></div>
                    <div className="col-sm row ">
                        <p className="h3 ">1 BTC = </p>
                        <p className="h1 ">{conv.toString()}</p>
                        <p className="h3 "> USD</p>
                    </div>
                <div className="col-sm"></div>
            </div>

            <div className="container my-4">
                <div className="row"></div>
                <div className="row">
                    <div className="col-sm"></div>
                    <div className="col-sm row ">
                        <p className="h3 ">1000 USD = </p>
                        <p className="h1 ">{convI.toString()}</p>
                        <p className="h3 "> BTC</p>
                    </div>
                <div className="col-sm"></div>
            </div>
           
        </div>
        </div>
        </div>
    )
}
