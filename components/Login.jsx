import React, {useState} from 'react'
import  {useMain, useMainUpdate} from '../mainContext'
import axio from 'axios'
import Cookies from 'js-cookie';

import {Redirect} from 'react-router-dom'

export const Login = () => {

    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const {logged,url} = useMain()
    const {setlogged,setname} = useMainUpdate()

    const handleSubmit =  (e)=> {
        e.preventDefault()

        
        axio.post(url+'login',{
            headers: {  },
            user: {
                email: email,
                password: password
            }
        },{withCredentials: true}
        ).then(response=>{
            //console.log(response.data)
            setlogged(response.data.logged_in)
            setname(response.data.name)
            localStorage.setItem("tkn", response.data.tkn)
            localStorage.setItem("name", response.data.name)

        }).catch(error=>{
            console.log(error)
        })
    }

    const HandleEmail = (e) =>{
        setemail(e.target.value)
    }

    const HandlePassword = (e) =>{
        setpassword(e.target.value)
    }

    if(logged){
        return <Redirect to={'/Dashboard'}/>;
    }

    return (
        <div>
            <div className="container my-4">
                <div className="row"></div>
                <div className="row">
                    <div className="col-sm"></div>
                    <div className="col-sm">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group my-2">
                                <input type="email" className="form-control" placeholder="Email"
                                onChange={HandleEmail}/>
                            </div>
                            <div className="form-group my-2">
                                <input type="password" className="form-control" placeholder="Password"
                                onChange={HandlePassword}/>
                            </div>
                            <div className="form-group my-2">
                                <button className="btn-dark" type="submit">Login</button>
                            </div>
                        </form>
                    </div>
                <div className="col-sm"></div>
            </div>
           
        </div>
        </div>
    )
}
