import React, { useState, useEffect } from "react";
import { getProducts,getProductsCount } from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import LoadingCard from '../cards/LoadingCard';
import {Pagination} from 'antd';



function NewArrival() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page,setPage]=useState(1);
  const [productCount,setProductCount]=useState(0);

  useEffect(() => {

    loadAllProduct(); 

  }, [page]);

  useEffect(()=>{
getProductsCount().then((res)=>{
setProductCount(res.data)    
})
.catch(err=>{
    console.log(err)
})

  },[]);


  const loadAllProduct = () => {

    setLoading(true);
    //sort, order, limit
    getProducts('createdAt','desc',page)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error occured");
      });

  };

  return (
    <>

<div className='container'>

{ loading ?(<LoadingCard count={3}/>): (  <div className="row">
       {products.map((product)=>(
     <div key={product._id} className="col-md-4">
           <ProductCard product={product}/>
      </div>
      
      ))}
   </div>) }

</div>

<div className="row">
<nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
<Pagination  
current={page} 
total={(productCount/3)*10}
onChange={(value)=>setPage(value)}
pageSize={10}
/>
</nav>
</div>

</>

  );
}

export default NewArrival;
