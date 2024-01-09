import axios from 'axios'
import {config} from '../config'
const token = window.localStorage.getItem(process.env.REACT_APP_TOKEN_SECRET)

export function addOneUser(datas){
   return axios.post(`${config.api_url}/api/rsv1/user/save`, datas) 
   .then((res)=>{
       return res.data
   })
   .catch((err)=>{
       return err
   })
    
}

export function loginUser(datas){
    return axios.post(`${config.api_url}/api/rsv1/user/login`, datas)
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
    
}

export function updateProfil(datas, user_id){
    return axios.put(`${config.api_url}/api/rsv1/user/update/${user_id}`, datas, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

export function checkMyToken(){
    return axios.get(`${config.api_url}/api/rsv1/user/checkToken`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
    
    
    
}