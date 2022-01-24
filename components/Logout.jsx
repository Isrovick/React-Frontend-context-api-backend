import React, { useState, useEffect } from 'react'
import {Redirect} from 'react-router-dom'
import  {useMain, useMainUpdate} from '../mainContext'

export const Logout = () => {

    const [act, setact] = useState(0)
    const {logged,url,tkn} = useMain()
    const {setlogged, settkn } = useMainUpdate()

    const handleSubmit = (e) => {
        e.preventDefault()
    }
    const handleYes = () => {

       
             setact(1)

    }

    const handleNo = () => {
            setact(2)
    }

    useEffect(() => {  
        if(act==1){
            localStorage.setItem("tkn", null)

            setlogged(false)
            settkn(null)
        }
       

    },[act,logged,tkn]);
  

    if(!logged||act==1){
        return <Redirect to={'/login'}/>;
    }

    if(logged && act==2){
        return <Redirect to={'/Dashboard'}/>;
    }

    return (
        <div>
             <div className="container my-4">
                <div className="row"></div>
                <div className="row">
                    <div className="col-sm"></div>
                    <div className="col-sm">
                        <form action="" onSubmit={handleSubmit}>
                        <div className="form-group my-2 row">
                            <p>Are you Sure you want to logout?</p>
                            <div className="form-group my-2">
                                <input className="btn btn-danger mx-4" type="submit" value="yes" onClick={handleYes}/>
                          
                                <input className="btn btn-light  mx-4" type="submit" value="no"  onClick={handleNo}/>
                            </div>
                        </div>
                        </form>
                    </div>
                        <div className="col-sm"></div>
                    </div>
                
                </div>
            </div>
    )
}
