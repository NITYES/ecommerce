import React,{useEffect, useState} from 'react'
import {getProduct} from '../functions/product'
import SingleProduct from '../components/cards/SingleProduct'
import {useSelector} from 'react-redux';
import {productStar,getRelated} from '../functions/product'
import ProductCard from '../components/cards/ProductCard'


const Product=({match})=>{

const [product,setProduct]=useState([]);
const [star,setStar]=useState(0);
const[relatedproduct,setRelatedProduct]=useState()

//redux
const {user}=useSelector((state)=>({...state}))

const {slug}=match.params

useEffect(()=>{
    console.log(match)
    loadSingleProduct();

},[slug]);

useEffect(()=>{
    if(product.ratings&& user){
        let existingRatingObject=product.ratings.find((ele)=>ele.postedBy.toString()===user._id.toString() )
        console.log('my current rating',existingRatingObject)
        existingRatingObject && setStar(existingRatingObject.star); //current user star
    }
})



const onStarClick = (newRating,name) => {
    console.log(newRating,name);   
    setStar(newRating);
    console.log(star)

    productStar(name,newRating,user.token).then(res=>{

        console.log("rating clicked",res.data);
   loadSingleProduct();//if you want to show rating in real time

    }).catch(err=>{
        console.log(err)
    })
};

const loadSingleProduct=()=>{

    getProduct(slug).then(res=>{

setProduct(res.data);
console.log(res.data)
//load related as well
getRelated(res.data._id).then(res=>setRelatedProduct(res.data));

    }).catch(err=>{
        console.log(err)
    })
}


  return(
      <div className="container-fluid">
              <div className="row pt-4">
                 <SingleProduct  
                 product={product}
                  onStarClick={onStarClick} 
                  star={star}
                  />
              </div>

              <div className="row ">
                 <div className="col text-center pt-5 pb-5">
                 <hr/>
                 Related products
                 <hr/>
                 </div>
                  
               </div>
               <div className="row pb-5 ">
               {relatedproduct&&relatedproduct.length ?
               relatedproduct.map((product)=>(
               <div className="col-md-4 m-3" key={product._id}>
                 <ProductCard product={product} />
                   </div>)):(<div className="text-center">No product Found</div>)}       
               </div>
      </div>



  )

}


export default Product 