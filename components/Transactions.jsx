import React,{useState, useEffect} from 'react'
import  {useMain, useMainUpdate} from '../mainContext'
import axio from  "axios"
import { Link} from 'react-router-dom'
import {Redirect} from 'react-router-dom'

export const Transactions = (props) => {

    const {logged,url} = useMain()
    const [trans, settrans] = useState([])
   

    useEffect(() => {

        const tkn = localStorage.getItem("tkn")
        axio.post(url+'itrans',{
            headers:{
                Authorization: 'Bearer '+tkn
            },
        },{withCredentials: true}
        ).then(response=>{
         
            settrans(response.data.trans)
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
                        <h1>Transactions:</h1>
                    {   trans.map((tran)=>
                        
                            <div className="card"  key={tran[0]}>
                                 <Link to={'/transaction?id='+tran[0]} className="btn btn-light">
                                <div  className="card-body">
                                    <h5 className="card-title">{tran[1]} {tran[3]}</h5>
                                    <p  className="card-text"> {tran[2]}</p>
                                </div>
                                </Link>
                            </div>
                         
                        )
                    }
                    </div>
                <div className="col-sm"></div>
            </div>
           
          </div>
         
        </div>
    )
}
