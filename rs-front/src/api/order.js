import axios from 'axios'
import {config} from '../config'
const token = window.localStorage.getItem(process.env.REACT_APP_TOKEN_SECRET)


export function saveOneOrder(datas){
    return axios.post(`${config.api_url}/api/rsv1/order/save`, datas, {headers: {'x-access-token': token}})
        .then((response)=> {
            return response.data
        })
        .catch((err)=>{
            return err
        })
}


export function updateOrder(datas){
    return axios.put(`${config.api_url}/api/rsv1/order/validate`, datas, {headers: {'x-access-token': token}})
        .then((response)=> {
            return response.data
        })
        .catch((err)=>{
            return err
        })
}

export function getAllOrders(){
    return axios.get(`${config.api_url}/api/rsv1/order/all`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

export function getOneOrder(order_id){
    return axios.get(`${config.api_url}/api/rsv1/order/getOneOrder/${order_id}`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

export function sendOrderStatusMail(email, order_id, orderStatus) {
    return axios.post(
      `${config.api_url}/api/rsv1/sendOrderStatusMail`,
      { email, order_id, orderStatus },
      { headers: { 'x-access-token': token } }
    )
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  }

  
  