
import axios from 'axios'

   export const createItem=async (sub,authtoken)=>{

    return await axios.post(`${process.env.REACT_APP_API}/item`,sub,{
        headers:{
            authtoken:authtoken
        }
    })
   
   }



   export const getItems=async ( )=>{

    return await axios.get(`${process.env.REACT_APP_API}/items`);
   
   }