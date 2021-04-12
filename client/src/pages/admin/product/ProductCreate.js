import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {Link} from 'react-router-dom'
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct} from "../../../functions/product";
import ProductCreateForm from '../../../components/forms/ProductCreateForm'
import {
    getCategories,
    getCategorySubs 
    
  } from "../../../functions/category";
  import FileUpload from '../../../components/forms/FileUpload'
  import {LoadingOutlined} from '@ant-design/icons'
const initialState={
    title:'',
    description:"",
    details:"",
    price:'',
    categories:[],
    category:'',
    subs:[],
    shipping:'Yes',
    quantity:'50',
    images:[],
    colors:["Black","Brown","Silver","White","Blue",'Red'],
    brands:["HP","Asus","Samsung","Lenovo","Microsoft",'Apple'],
    color:'White',
    brand:'Apple',
}

const ProductCreate=()=>{

const [values,setValues]=useState(initialState);
const [subOption,setSubOption]=useState([]);
const [showSub,setShowSub]=useState(false);
const [loading,setLoading]=useState(false);


//redux
const {user}=useSelector((state)=>({...state}))
//destructure 
const {title,description,price,categories,category,subs,shipping,quantity,images,colors,brands,color,brand,details}=values


useEffect(()=>{

  loadCategories();

  },[])


 const loadCategories=()=>getCategories().then(c=>setValues({...values,categories:c.data}));

const handleSubmit=(e)=>{
    e.preventDefault();
    createProduct(values,user.token).then(res=>{
        console.log(res.data);
        window.alert(`"${res.data.title}" is created`);
        window.location.reload();
    }).catch(err=>{
        console.log(err);
        // if(err.response.status===400) toast.error(err.response.data);
        toast.error(err.response.data.err)

    })
}


const handleChange=(e)=>{
//
setValues({...values,[e.target.name]:e.target.value})
console.log(e.target.name,"------",e.target.value);

}

//get all categories
const handleCategoryChange=(e)=>{
    e.preventDefault();
    console.log('CLICKED CATEGORY',e.target.value)
    setValues({...values,subs:[],category:e.target.value});
    
    //get sub category based on category selected
    getCategorySubs(e.target.value)
    .then(res=>{
        console.log('SUB OPTION ON CATEGORY CLICK',res)
       setSubOption(res.data);

    });
    setShowSub(true);

}

return(
    <div className="container-fluid">
            <div className="row">
                       <div className="col-md-2">
                           <AdminNav />
                       </div>
                       <div className="col-md-10">
                        {loading?
                        <LoadingOutlined className="h1 text-danger"/>
                        :(<h4>Product create</h4>)}
                        {/* {JSON.stringify(values.images)} */}
                        {/* {JSON.stringify(values)} */}
                        {/* {JSON.stringify(values.categories)} */}
                       <div className="p-3">
                       <FileUpload 
                       values={values}
                       setValues={setValues}
                       setLoading={setLoading}
                       />
                       </div>
                        <hr/>
                        {<ProductCreateForm 
                         values={values} 
                         handleChange={handleChange} 
                         handleSubmit={handleSubmit}
                         handleCategoryChange={handleCategoryChange}
                        subOption={subOption}
                         showSub={showSub}
                         setValues={setValues}
                         />}
                       </div>
            </div>
    </div>
)

}


export default ProductCreate