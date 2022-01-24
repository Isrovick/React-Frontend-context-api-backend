import React, {useState} from 'react'
import  {useMain, useMainUpdate} from '../mainContext'
import axio from 'axios'
import Cookies from 'js-cookie';

import {Redirect} from 'react-router-dom'

export const Register = () => {
    
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [password_confirmaton, setpassword_confirmaton]= useState('')
    const [firstname, setfirstname] = useState('')
    const [lastname, setlastname] = useState('')

    const {logged,url} = useMain()
    const {setlogged} = useMainUpdate()
    
    const handleSubmit =  (e)=> {
        e.preventDefault()

        axio.post(url+'signup',{ 
        
            user:{
                email: email,
                password: password,
                password_confirmation: password_confirmaton,
                firstname: firstname,
                lastname: lastname
            }


        },{withCredentials: true}
        ).then(response=>{
            console.log(response.data)
            setlogged(response.data.logged_in)
            localStorage.setItem("tkn", response.data.tkn)

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
    const HandlePasswordC = (e) =>{
        setpassword_confirmaton(e.target.value)
    }
    const HandleFN = (e) => {
        setfirstname(e.target.value)
    }
    const HandleLN = (e) => {
        setlastname(e.target.value)
    }

    return (
        <div className="container my-4">
            <div className="row"></div>
            <div className="row">
                <div className="col-sm"></div>
                <div className="col-sm">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group my-2">
                            <input type="email" className="form-control" placeholder="Email" onChange={HandleEmail}/>
                        </div>
                        <div className="form-group my-2">
                            <input type="password" className="form-control" placeholder="Password" onChange={HandlePassword}/>
                        </div>
                        <div className="form-group my-2">
                            <input type="password" className="form-control" placeholder="Password confirmation" onChange={HandlePasswordC}/>
                        </div>
                        <div className="form-group my-2">
                            <input type="text" className="form-control" placeholder="First name" onChange={HandleFN}/>
                        </div>
                        <div className="form-group my-2">
                            <input type="text" className="form-control" placeholder="Last name" onChange={HandleLN}/>
                        </div>
                        <div className="form-group my-2">
                            <button className="btn-dark" type="submit">Register</button>
                        </div>
                    </form>
                </div>
                <div className="col-sm"></div>
            </div>
           
        </div>
    )
}
