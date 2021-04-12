import axios from 'axios'

export const loadMenu=async ()=>{

return await axios.get(`${process.env.REACT_APP_API}/menu`)

}