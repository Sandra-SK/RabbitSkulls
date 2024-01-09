import React, {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux' 
import {Navigate} from 'react-router-dom'
import {logoutUser} from '../../slices/userSlice'

const Logout = (props)=>{
    
    const dispatch = useDispatch()
    const [redirect, setRedirect] = useState(false)
    
    
    useEffect(()=>{
        dispatch(logoutUser())
        window.localStorage.removeItem(process.env.REACT_APP_TOKEN_SECRET)
        setRedirect(true)
    },[])
    
    
    if(redirect){
        return <Navigate to="/login" />
    }
    return (
        <div>
        </div>
    )
    
}


export default Logout