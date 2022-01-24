import React, {useState, useEffect} from 'react'
import { useLocation } from "react-router-dom";
import  {useMain, useMainUpdate} from '../mainContext'
import axio from 'axios'
import {Redirect} from 'react-router-dom'

export const Transaction = () => {

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }
    let query = useQuery();
    const {setlogged} = useMainUpdate()
    const {logged , url, tkn} = useMain()
    const [tran, settran] = useState(query.get("id"));
    const [from, setfrom] = useState('');
    const [to, setto] = useState('');
    const [ammount, setammount] = useState('');
    const [date, setdate] = useState('');
    //console.log(tran)

    useEffect(() => {

        const tkn = localStorage.getItem("tkn")
        axio.post(url+'itran',{
            headers:{
                Authorization: 'Bearer '+tkn
            },
            tid: tran
        },{withCredentials: true}
        ).then(response=>{
            setfrom(response.data.from)
            setto(response.data.to)
            setammount(response.data.ammount)
            setdate(response.data.date)
            

        }).catch(error=>{
            console.log(error)
        })
       
    }, []);

    if(!logged){
        return <Redirect to={'/login'}/>;
    }

    return (
        <div>
           <div className="container my-4">
                <div className="row"></div>
                <div className="row">
                    <div className="col-sm"></div>
                    <div className="col-sm">
                       <form>   
                        <p className="h1 ">Transaction Details: </p>
                        {
                          ammount<0?
                          <p className="h3 ">To: {to}</p>
                          :
                          <p className="h3 ">From: {from}</p>
                        }
                       
                       
                        <p className="h3 ">Ammount: {ammount}</p>
                        <p className="h3 ">Date: {date}</p>
                        <p className="h3 "></p>
                       </form> 
                    </div>
                    <div className="col-sm"></div>
                </div>
           
        </div>
        </div>
    )
}
