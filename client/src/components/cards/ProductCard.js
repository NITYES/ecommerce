import React, { useState } from 'react'
import {Card,Tooltip} from'antd'
import {EyeOutlined,ShoppingCartOutlined} from '@ant-design/icons'
import laptop from '../../images/laptop.png'
import {Link} from 'react-router-dom'
import {showAverage} from '../../functions/rating';
import _ from 'lodash';
import {useSelector,useDispatch} from 'react-redux'

const {Meta}=Card;

const ProductCard=({product})=>{
//destructure
const {images,title,price,description,slug}=product

const[tooltip,setTooltip]=useState('Click to Add');

//redux
const{user,cart}=useSelector((state)=>({...state}));
const dispatch=useDispatch();



const handleAddToCart=()=>{
  //show tooltip

  //create cart array
console.log('add to cart')
let cart=[];
if(typeof window!=="undefined"){
  //if cart is in localstorage GET it
   if(localStorage.getItem('cart')){
     cart=JSON.parse(localStorage.getItem('cart'));
   }
   //push new product to cart
   cart.push({...product,
      count:1, 
    })
  //remove duplicate
let unique=_.uniqWith(cart,_.isEqual);
    //save to localstorage
console.log(unique);
console.log(cart)
localStorage.setItem('cart',JSON.stringify(unique));

setTooltip('Added');
//add to redux stsate
dispatch({
  type:"ADD_TO_CART",
  payload:unique
})

}

}

    return (
    <>
        {product && product.ratings && product.ratings.length > 0 ? showAverage(product):
     (<div className="text-center pt-1 pb-3">No rating Yet</div>)}
        <Card 
        cover={<img 
            src={images && images.length ?images[0].url:laptop}
            style={{height:'150px',objectFit:'cover'}}
            className='p-1'
         
            />}

            actions={[
            <Link to={`/product/${slug}`}>
            <EyeOutlined  className='text-warning'/><br/>View Product
            </Link>,
        <Tooltip title={tooltip}>
            <a onClick={handleAddToCart}>
            <ShoppingCartOutlined   className='text-warning'/><br/>Add to Cart
          </a>
        </Tooltip>
        ]}
        >
          
<Meta 
    title={`${title}-₹ ${price}`}
   description={`${description && description.substring(0,20)}...`}
          />
        </Card>
    </>

    )
}


export default ProductCard