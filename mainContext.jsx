import React, {useContext, useState, useEffect} from 'react'
import axio from 'axios'
import Cookies from 'js-cookie';

const MainContext = React.createContext()
const MainUpdateContext = React.createContext()

export function useMain() {
    return useContext(MainContext)
}

export function useMainUpdate() {
    return useContext(MainUpdateContext)
}

export function MainProvider({children}) {

    const [logged, setlogged] = useState(false)
    const [userid, setuserid] = useState(null)
    const [id, setid] = useState(0);
    const [Rc, setRc] = useState(false);
    const [url, seturl] = useState("https://cryptic-castle-94570.herokuapp.com/api/")
    const [tkn, settkn] = useState( localStorage.getItem("tkn"))
    const [name, setname] = useState( localStorage.getItem("name"))

    const HandleRc = () => {
        setRc(!Rc)
    }

    useEffect(() => {  
        
        axio.post(url+'logged_in',{
            headers:{
                Authorization: 'Bearer '+tkn
            }
        },
        {withCredentials: true}
        ).then(response=>{
            setlogged(response.data.logged_in)

        }).catch(error=>{
            console.log(error)
        })
        
    });

    return (
        <MainContext.Provider value={{logged: logged, id: id, url: url, tkn:tkn,name: name}}>
            <MainUpdateContext.Provider value={{setlogged: setlogged, HandleRc: HandleRc,settkn: settkn, setname: setname}}>
                {children}
            </MainUpdateContext.Provider > 
        </MainContext.Provider>
    )
}
