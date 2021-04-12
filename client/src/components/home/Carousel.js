import React, { useState } from 'react'
import {Carousel} from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import dishwasher from '../../images/slider-image-3.jpg'
import tv from '../../images/lg-dish-1.jpg'
import washing from '../../images/lg-washing-1.png'

import './carousel.css'


const Carousels=()=>{
const [image,setImages]=useState([dishwasher,tv,washing])


    return (
        <Carousel width="100%"  showArrows={true} autoPlay infiniteLoop   >
               {
                   image&&image.length > 0 ?image.map((img)=><div className="image-carousel">
                       <img className="img" src={img}/>
                   </div>):""
               }   
 
        </Carousel>
    )
}

export default Carousels