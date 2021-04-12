import React, { useEffect, useState } from 'react';
import {loadMenu} from '../../functions/menu'
import "./menu.css"
import tv from '../../images/tv.jpg'
const Menubar=()=>{

const[menu,setMenu]=useState([]);

useEffect(()=>{

loadMenu().then(res=>{
    console.log(res.data)
    setMenu(res.data)
})

},[])


    return (
        <div className="menu">
            <ul className="menu-container">
            {menu.map((menuitem)=>{
                return <li className="menu-item"><h6>{menuitem.name}</h6>
                         <ul className="menu-item-block"> <div className="sub-container">

                         {menuitem.subCategory.length >0&&
                                  menuitem.subCategory.map((submenu)=>{
                                     return <ul className="sub"><a href={`/product?${submenu.name}`} className="sub-heading">{submenu.name}</a>
                                                {submenu.item.length>0&&
                                                  submenu.item.map(item=>{
                                                      return <li className="item"><a href={`/product?${item.name}`}>{item.name}</a></li>
                                                  })

                                                }    
                                     
                                     </ul>
                                  })
                                  
                          }
                         </div>
                          
                          <div className="image-container">
                              <img className="img" src={tv}></img>
                          </div>
                          </ul>
                         
                     
                </li>
            })}
            </ul>
        </div>
    )
}


export default Menubar