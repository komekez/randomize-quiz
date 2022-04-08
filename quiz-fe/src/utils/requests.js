import axios from "axios";
import { toast } from 'react-toastify';

// require('dotenv').config()

const API_CONFIG_URL = process.env.API_CONFIG_URL || "http://localhost:3001/"

function getRequest(endpoint, success,error){
    let headers;
    axios.get(API_CONFIG_URL + endpoint, {headers, validateStatus: () => true})
      .then(function (response) {
        success(response)
      })
      .catch(function (error) {
        console.log(error)
        showErrorToast(error)
      });
}


function postRequest (endpoint, body, success,error, extraHeader){
    let headers ;
    axios.post(API_CONFIG_URL + endpoint,body, {headers, validateStatus: () => true})
      .then(function (response) {
        success(response)
        if(response.status!==200){
          showErrorToast(response.data?.data[0]?.message)
        }
      })
      .catch(function (error) {
        showErrorToast(error)
      });
  }

const showSuccessToast  = (msg) => {
    toast.success(msg)
}
  
const showErrorToast = (msg) => {
    toast.error(msg)
}
  

export { 
    getRequest,
    postRequest,
    showSuccessToast,
    showErrorToast
 }
