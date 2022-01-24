import React, {useState, useEffect} from 'react'
import  {useMain, useMainUpdate} from '../mainContext'
import axio from 'axios'
import {Redirect} from 'react-router-dom'

export const Trade = (props) => {

    const [cto, setcto] = useState(0)
    const [cfr, setcfr] = useState(0)
    //const [uto, setuto] = useState('')
    //const [ufr, setufr] = useState('')
    const [ammount, setammount] = useState(0)
    const [ammountO, setammountO] = useState(0)
    const [rel, setrel] = useState(0)
    //const [msg, setmsg] = useState('')
    const [fbals, setfbals] = useState([]);
    const [tbals, settbals] = useState([]);
    const [bals, setbals] = useState([]);
    const [max, setmax] = useState(0)
    const [tran, settran] = useState(false);

    const {logged,url,tkn} = useMain()
    const {setlogged} = useMainUpdate()

    const handleSubmit =  (e)=> {
        e.preventDefault()

        if((ammountO<=0)||(cto<1)||(cfr<1)||(cfr==cto)){
            alert("Unvalid transaction")
            return false
        }
        if((ammountO>max)){
            alert("The ammount to send is grater than the available balance ")
            return false
        }

        const tkn = localStorage.getItem("tkn")
        axio.post(url+'trade',{
            headers:{
                Authorization: 'Bearer '+tkn,
            },
            rate: {
                cto: cto,
                cfr: cfr,
                ammount: ammountO
            }
        },{withCredentials: true}
        ).then(response=>{
            if(response.data.tran){
                settran(response.data.tran)
            }
        }).catch(error=>{
            console.log(error)
        })


    }

    const handleChanchefbal = (e) =>{

        const etv=e.target.value
        setcfr( etv )
        let i = rfi(bals,etv)     
        if (i>=0 && typeof fbals[i][1] !== "undefined") setmax(fbals[i][1])
    }

    const handleChanchetbal = (e) =>{

        const etv=e.target.value
        setcto( etv )

    }

    const   handleAmmount = (e) => {

        
        const etv=e.target.value

        setammountO(etv)
         let c = rc(bals,cto) 
         let amm=(rel*etv)
        setammount(amm.toFixed(c))
    }

    const rfi = (array,val) => {
        let i=-1
        array.forEach((element, index) => {
            if(element[3]==val) i=index
         })
         return i
    }
    
    const rc = (bals,cto) => {
        let c=2
        let i = rfi(bals,cto)  
        if(i>-1 && (bals[i][4]=='1')){ 
            c=8
        }
        return c
    }


    useEffect(() => {  
        const tkn = localStorage.getItem("tkn")
        axio.post(url+'available',{
            headers:{
                Authorization: 'Bearer '+tkn,
            }
        },{withCredentials: true}
        ).then(response=>{
  
            const rdb= response.data.bals
      
            settbals(rdb)
            setfbals(rdb)
            setbals(rdb)
            
        }).catch(error=>{
            console.log(error)
        })

        if((cto>0) && (cfr>0 && (cto!=cfr))){

            axio.post(url+'rel',{
                headers:{
                    Authorization: 'Bearer '+tkn,
                },
                rate: {
                    cto: cto,
                    cfr: cfr
                }
            },{withCredentials: true}
            ).then(response=>{
                setrel(response.data.rel)
                let c = rc(bals,cto) 
                let amm=(response.data.rel*ammountO)
                setammount(amm.toFixed(c))
                
            }).catch(error=>{
                console.log(error)
            })

        }else{
            setrel(0)
        }

        
    },[cto,cfr,]);

    if(!logged){
        return <Redirect to={'/login'}/>;
    }

    if(tran){
        return <Redirect to={'/transaction?id='+tran}/>;
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
                                <p>Ammount to send</p>
                                <select className="form-select"  onChange={handleChanchefbal}>
                                    <option  value="-1">Source Balance</option>
                                    {fbals.map((fbal) =>  
                                        <option key={fbal[0]}  
                                            value={fbal[3]} > {fbal[2]}, {fbal[1]}
                                        </option>    )}
                                </select>
                            </div>
                            <div className="form-group my-2">
                                <input type="number" 
                                        min="0" 
                                        max={max}
                                        step={0.00000001} 
                                        precision={9}
                                        placeholder="Enter the ammount to send"
                                        onChange={handleAmmount}
                                        />
                            </div>
                            <div className="form-group my-2">
                               
                                <p>Currency to Receive</p>
                                <select className="form-select" onChange={handleChanchetbal}>
                                    <option value="-1">Destiny Balance</option>
                                    {tbals.map((tbal) =>  
                                        <option key={tbal[0]}  
                                            value={tbal[3]} > {tbal[2]}
                                        </option>    )}
                                </select>
                            </div>
                            <div className="form-group my-2">
                                    <p>Conversion Rate: {rel}</p>
                                <input type="text" value={ammount} placeholder="Ammount to receive" disabled/>
                            </div>
                            <div className="form-group my-2">
                                
                            </div>
                            <div className="form-group my-2">
                                
                            </div>
                            <div className="form-group my-2">
                                <button className="btn-dark" type="submit">Trade</button>
                            </div>
                        </form>
                    </div>
                <div className="col-sm"></div>
            </div>
           
        </div>
        </div>
    )
}
