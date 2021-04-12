import React from 'react';
import {Link} from 'react-router-dom';

const ProductListItems =({product})=>{
let detail=[]
    const {price,category,subs,shipping,color,quantity,sold}=product

if(product.details){
       
    detail=product.details.split('/');
    console.log(detail)

}

    return (
        <ul className="list-group">
         <li  className="list-group-item">
             price{" "}
                 <span className="label label-default label-pill pull-xs-right">
                     ${price} 
                 </span>
         </li>
                 
         <li className="list-group-item">
                 Shipping{" "}
                 <span className="label label-default label-pill pull-xs-right">
                     {shipping}
                 </span>
         </li>
         <li className="list-group-item">
                 color{" "}
                 <span className="label label-default label-pill pull-xs-right">
                     {color}
                 </span>
         </li>
         <li className="list-group-item">
                 Availability{" "}
                 <span className="label label-default label-pill pull-xs-right">
                     {quantity}
                 </span>
         </li>
         <li className="list-group-item">
             <p>Details</p>
             <ul>
                 {
                     detail.length>0&&detail.map((d)=><li>{d}</li>)
                 }
             </ul>
         </li>
         {/* <li className="list-group-item">
                 Sold{" "}
                 <span className="label label-default label-pill pull-xs-right">
                     {sold}
                 </span>
         </li> */}
        </ul>
    )
}

export default ProductListItems