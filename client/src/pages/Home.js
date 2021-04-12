import React, { useState, useEffect } from "react";
import Jumbotrons from '../components/cards/Jumbotrons'
import NewArrival from "../components/home/NewArrival";
import BestSellers from "../components/home/BestSellers";
import CategoryList from '../components/category/CategoryList'
import SubList from '../components/sub/SubList'
import Carousel from '../components/home/Carousel'




function Home() {

  return (
    <>
    
{/* <div className="jumbotron text-danger h1 font-weight-bold text-center">
  <Jumbotrons text={['Latest Product','New Arrivals','Best Sellers']}/>
</div> */}
<Carousel />

<h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
  New Arrivals
</h4>
<NewArrival />
<br/>
<h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
  Best Seller
</h4>
<BestSellers />
<br/>
{/* <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
  Category List
</h4>
<CategoryList />
<br/>
<h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
  Sub List
</h4>
<SubList /> */}

</>


  );
}

export default Home;
