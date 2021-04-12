import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {Link} from 'react-router-dom'
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProduct,updateProduct} from "../../../functions/product";
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm'
import {
    getCategories,
    getCategorySubs 
    
  } from "../../../functions/category";
  import FileUpload from '../../../components/forms/FileUpload'
  import {LoadingOutlined} from '@ant-design/icons'
  import {useParams} from 'react-router-dom'

//props.match.params.slug
//let {slug} =useParams();

const initialState={
    title:'',
    description:"",
    price:'',
    category:'',
    subs:[],
    shipping:'',
    quantity:'',
    images:[],
    colors:["Black","Brown","Silver","White","Blue",'Red'],
    brands:["HP","Asus","Samsung","Lenovo","Microsoft",'Apple'],
    color:'',
    brand:'',
}

const ProductUpdate=({match,history})=>{

const [values,setValues]=useState(initialState);
const [categories,setCategories]=useState([]);
const [subOption,setSubOption]=useState([]);
const [showSub,setShowSub]=useState(false);
const [arrayOfSubIds,setArrayOfSubIds]=useState([]);
const [selectedCategory,setSelectedCategory]=useState('');
const [loading,setLoading]=useState(false)


//redux
const {user}=useSelector((state)=>({...state}))

const {slug}=match.params


useEffect(()=>{
loadProduct();
loadCategories();


},[])

const loadProduct=()=>{
    getProduct(slug).then(res=>{
//console.log("single product",p)
//1. load single product
setValues({...values,...res.data});
//2 load single product category subs
getCategorySubs(res.data.category._id)
.then(subres=>{
    setSubOption(subres.data) //on first load show default
});
//3 prepare array of sub ids to show as default sub values 
let arr=[];
res.data.subs.map(s=>{
    arr.push(s._id)
})
console.log(arr)
setArrayOfSubIds((prev)=>arr) //required for ant design 

})
.catch(err=>{
    console.log(err)
})
}


const loadCategories=()=>
getCategories().
then(c=>setCategories(c.data));


const handleSubmit=(e)=>{
    e.preventDefault();

setLoading(true)

values.subs=arrayOfSubIds;
values.category=selectedCategory?selectedCategory:values.category;

updateProduct(slug,values,user.token)
.then(res=>{
    setLoading(false)
    toast.success(`"${res.data.title}" is updated`);
    history.push('/admin/products')

})
.catch(err=>{
    console.log(err)
    toast.error(err.response.data)
})

}

//handleChange
const handleChange=(e)=>{

    setValues({...values,[e.target.name]:e.target.value});

}

  const handleCategoryChange=(e)=>{

    e.preventDefault();
    console.log('CLICKED CATEGORY',e.target.value)
    setValues({...values,subs:[]});
    
    //set selected category
    setSelectedCategory(e.target.value)

    //get sub category based on category selected
    getCategorySubs(e.target.value)
    .then(res=>{
        console.log('SUB OPTION ON CATEGORY CLICK',res)
       setSubOption(res.data);
       setShowSub(true)

    });

    setArrayOfSubIds([])


    //if user clicks back to the original category
    //show its sub categories\
if(values.category._id==e.target.value){
    console.log('same caegory selected')
    loadProduct();
}

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
                        :(<h4>Product Upload</h4>)}
                        <hr/>
                  {JSON.stringify(values)}
                  <div className="p-3">
                       <FileUpload 
                       values={values}
                       setValues={setValues}
                       setLoading={setLoading}
                       />
                       </div>
                       <br/>
                  <ProductUpdateForm
                  values={values}
                  setValues={setValues}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  categories={categories}
                  handleCategoryChange={handleCategoryChange}
                  subOption={subOption}
                  arrayOfSubIds={arrayOfSubIds}
                  setArrayOfSubIds={setArrayOfSubIds}
                  selectedCategory={selectedCategory}
                  

                  />
                       </div>
            </div>
    </div>
)

}


export default ProductUpdate