import axios from 'axios'
import {config} from '../config'
const token = window.localStorage.getItem(process.env.REACT_APP_TOKEN_SECRET)


export function displayProducts(){
    return axios.get(`${config.api_url}/api/rsv1/product/all`)
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}


export function takeOneProduct(product_id){
    return axios.get(`${config.api_url}/api/rsv1/product/one/${product_id}`)
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

export function addOneProduct(datas){
    return axios.post(`${config.api_url}/api/rsv1/product/save`, datas, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

export function updateOneProduct(datas, product_id){
    return axios.put(`${config.api_url}/api/rsv1/product/update/${product_id}`, datas, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

export function deleteOneProduct(product_id){
    return axios.delete(`${config.api_url}/api/rsv1/product/delete/${product_id}`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}