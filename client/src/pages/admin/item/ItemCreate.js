import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {Link} from 'react-router-dom'
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'
import LocalSearch from "../../../components/forms/LocalSearch";
import {getSubs} from '../../../functions/sub';
import {createItem,getItems} from '../../../functions/item'

import CateforyForms from "../../../components/forms/CateforyForms";


const ItemCreate=()=>{

    const[subs,setSubs]=useState([]);
    const [sub,setSub]=useState('');
    const[name,setName]=useState('');
    const [items,setItems]=useState([]);
    const[loading,setLoading]=useState(false);


    const {user}=useSelector((state)=>({...state}))

useEffect(()=>{

    loadSubs();
    loadItems();
},[])

const loadSubs=()=>getSubs().then(c=>{
    console.log(c.data)
    setSubs(c.data)})


    //load items 
    const loadItems=()=>getItems().then(i=>{
        console.log(i.data)
        setItems(i.data)}).catch((error)=>{
            console.log(error.response.data)
        })


    //create item 

    const handleSubmit = (e) => {
        e.preventDefault();
         console.log(name)
        setLoading(true);
        createItem({name,parent:sub},user.token)
        .then((res)=>{
            setLoading(false);
            setName('');
            toast.success(`"${res.data.name}" is created`);
            loadItems();
        })
        .catch((err)=>{
    
            console.log(err);
            setLoading(false);
            if(err.response.status===400) toast.error(err.response.data);
    
        })
      };


      //HANDLE REMOVE ITEM 
      const handleRemove=async (slug)=>{
        let answer=window.confirm("Do you want to delete ?");
        // console.log(answer,slug)
        // if(answer){
        //     setLoading(true)
        //     removeSub(slug,user.token)
        //     .then((res)=>{
        //         setLoading(false);
        //         toast.success(`${res.data.name} deleted`);
        //         loadSubs();
        //     }
        //     )
        //     .catch(err=>{
        //         if(err.response.status===400) {
        //             setLoading(false)
        //             toast.error(err.response.data)
        //         }
        //     })
        // }
    }
      

return(
    <div className="container-fluid">
    <div className="row">
      <div className="col-md-2">
        <AdminNav />
      </div>
      <div className="col">
      <div className="form-group">
               <label>Parent Sub Category</label>
               <select name="sub" className='form-control' onChange={e=>setSub(e.target.value)}>
                   <option value="">Please select</option>
                    {
                        subs.length >0 && subs.map((c)=>(<option
                         key={c._id} 
                         value={c._id} >
                         {c.name}
                        </option>))
                    }
               </select>
          </div>
          <CateforyForms
          name={name}
          setName={setName}
          handleSubmit={handleSubmit}
          
          />


             {items.map((i)=>(
              <div className="alert alert-secondary" key={i._id}>{i.name}
                 <span className="btn btn-sm float-right" 
                    onClick={()=>handleRemove(i.slug)}>
                  <DeleteOutlined className='text-danger' />
                  </span>
                   <Link 
                   className="btn btn-sm float-right"
                    to={`/admin/item/${i.slug}`} >
                        <EditOutlined className='text-warning' />
                  </Link>
                  </div>
          ))}






      </div>
    </div>
  </div>
   

)

}


export default ItemCreate