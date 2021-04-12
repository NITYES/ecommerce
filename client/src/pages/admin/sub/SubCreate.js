import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {Link} from 'react-router-dom'
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createSub,
  getSubs,
  getSub,
  removeSub,
} from "../../../functions/sub";
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'
import CategoryForm from '../../../components/forms/CateforyForms'
import LocalSearch from "../../../components/forms/LocalSearch";
import { getCategories } from "../../../functions/category";




const SubCreate = () => {
    const {user}=useSelector((state)=>({...state}));
    
const [name,setName]=useState('')
const [loading,setLoading]=useState(false);
const [categories,setCategories]=useState([]);
const [category,setCategory]=useState('');
const [subs,setSubs]=useState([])

//step 1
const [keyword,setKeyword]=useState('');

useEffect(()=>{

loadCategories();
loadSubs();
},[])

const loadCategories=()=>getCategories().then(c=>setCategories(c.data))

const loadSubs=()=>getSubs().then(c=>setSubs(c.data))

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name)
    setLoading(true);
    createSub({name,parent:category},user.token)
    .then((res)=>{
        setLoading(false);
        setName('');
        toast.success(`"${res.data.name}" is created`);
        loadSubs();
    })
    .catch((err)=>{

        console.log(err);
        setLoading(false);
        if(err.response.status===400) toast.error(err.response.data);

    })
  };

//handle remove
const handleRemove=async (slug)=>{
    let answer=window.confirm("Do you want to delete ?");
    // console.log(answer,slug)
    if(answer){
        setLoading(true)
        removeSub(slug,user.token)
        .then((res)=>{
            setLoading(false);
            toast.success(`${res.data.name} deleted`);
            loadSubs();
        }
        )
        .catch(err=>{
            if(err.response.status===400) {
                setLoading(false)
                toast.error(err.response.data)
            }
        })
    }
}

//step 3
//handle search


//step 4
//advanced concept....
const searched=(keyword)=>{
  return (c)=>{
      return c.name.toLowerCase().includes(keyword);
  }
}


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading?
          ( <h4 className="text-danger">loading...</h4>)
          :
          (<h4>create Sub category</h4>)
          }


          <div className="form-group">
               <label>Parent Category</label>
               <select name="category" className='form-control' onChange={e=>setCategory(e.target.value)}>
                   <option value="">Please select</option>
                    {
                        categories.length >0 && categories.map((c)=>(<option
                         key={c._id} 
                         value={c._id} >
                         {c.name}
                        </option>))
                    }
               </select>
          </div>
          <CategoryForm 
          handleSubmit={handleSubmit} 
          name={name}
           setName={setName}
           />
           {/* step 2 AND STEP 3 REMOVED TO THIS COMPONENT*/}
          <LocalSearch keyword={keyword} setKeyword={setKeyword}/>
          <hr/>
          {/* step 5 */}
          {subs.filter(searched(keyword)).map((s)=>(
              <div className="alert alert-secondary" key={s._id}>{s.name}
                 <span className="btn btn-sm float-right" 
                    onClick={()=>handleRemove(s.slug)}>
                  <DeleteOutlined className='text-danger' />
                  </span>
                   <Link 
                   className="btn btn-sm float-right"
                    to={`/admin/sub/${s.slug}`} >
                        <EditOutlined className='text-warning' />
                  </Link>
                  </div>
          ))}

          
        </div>
      </div>
    </div>
  );
};

export default SubCreate;
