import React, { useState, useEffect } from "react";
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../functions/product";

import { useSelector, useDispatch, createSelectorHook } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { Menu, Slider ,Checkbox,Radio} from "antd";
import { DollarOutlined, DownSquareOutlined ,StarOutlined} from "@ant-design/icons";
import { getCategories } from "../functions/category";
import { getSubs } from "../functions/sub";

import Star from '../components/forms/Star';

const { SubMenu, ItemGroup } = Menu;
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds,setCategoryIds]=useState([]);
  const [star,setStar]=useState(0);
  const [subs,setSubs]=useState([]);
  const [sub,setSub]=useState('');
  const [brands,setBrands]=useState(["HP",
  "Asus",
  "Samsung",
  "Lenovo",
  "Microsoft",
  'Apple']);
  const[brand,setBrand]=useState('');
  const[colors,setColors]=useState(["Black",
  "Brown",
  "Silver",
  "White",
  "Blue",
  'Red']);

  const [color,setColor]=useState('');
  const[shipping,setShipping]=useState(''); 

  let dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  //fetch product
  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
      
    });
  };

  useEffect(() => {
    loadAllProducts();
    //fetch categories
    getCategories().then((res) => setCategories(res.data));

    //fetch sub categories
  getSubs().then(res=>{
    setSubs(res.data);
  })

  }, []);

  //1. load products by default on page load..
  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  //2. load products on user search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
     
    }, 500);

    //cleanup code
    return () => clearTimeout(delayed);
  }, [text]);

  //3 load product based on price range
  useEffect(() => {
    console.log("ok to request");
    fetchProducts({ price });
  }, [ok]);

  //handle slider
  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    setCategoryIds([]);

    setPrice(value);
    setBrand("");
    setColor("")
    setShipping("")

    setSub('')
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  //4 Load category based on category
  //show categories in a list of checkbox
  const showCategories = () =>
    categories.map((c) => 
      <div key={c._id}>
        <Checkbox className="pb-2 pl-4 pr-4" 
          value={c._id}
           name="category"
           onChange={handleCheck}
           checked={categoryIds.includes(c._id)}
           >
             {c.name}</Checkbox>
      </div>
    );


    //handle check for categories
    const handleCheck=(e)=>{
      dispatch({
        type: "SEARCH_QUERY",
        payload: { text: "" },
      });

      setPrice([0,0]);
      setStar("");
      setSub('');
      setBrand("");
      setColor("")
      setShipping("")


      console.log(e.target.value);
      let inTheState=[...categoryIds];
      let justChecked=e.target.value
      let foundInTheState=inTheState.indexOf(justChecked); //index or -1

      //indexOf method ?? if found return -1 else return index
      if(foundInTheState===-1){
        inTheState.push(justChecked);
      }else{
        //if found pull out one item from index
        inTheState.splice(foundInTheState,1)
      }

      setCategoryIds(inTheState)

      fetchProducts({category:inTheState})
    }


    //5. show products by star rating

    const handleStarClick=(num)=>{
      console.log(num);
      dispatch({
        type: "SEARCH_QUERY",
        payload: { text: "" },
      });

      setPrice([0,0]);
      setCategoryIds([]);
      setBrand("");
      setColor("")
      setShipping("")

      setSub("")
      setStar(num);
      fetchProducts({stars:num})
    }


    const showStars=()=>
      <div className="pr-4 pl-4 pb-2">
              <Star  starClick={handleStarClick} numberOfStars={5} />
              <Star  starClick={handleStarClick} numberOfStars={4} />
              <Star  starClick={handleStarClick} numberOfStars={3} />
              <Star  starClick={handleStarClick} numberOfStars={2} />
              <Star  starClick={handleStarClick} numberOfStars={1} />
                       
      </div>
    

    //6 show product by sub category
    const showSubs=()=> subs.map((s)=><div 
        key={s._id}
        className="p-1 m-1 badge badge-secondary"
         onClick={()=>handleSub(s)}
         style={{cursor:"pointer"}}
         >  
          {s.name}
        </div>)
      
    


    const handleSub=(s)=>{
      console.log("SUB",s);
      setSub(s)
      dispatch({
        type: "SEARCH_QUERY",
        payload: { text: "" },
      });
      setShipping("")

      setPrice([0,0]);
      setCategoryIds([]);
      setStar('')
      setBrand("");
      setColor("")


      fetchProducts({sub:s})
    }
    

    //show product based on brand name
  const showBrands=()=>brands.map((b)=><>
  <Radio 
  value={b} nam
   checked={b===brand}
    onChange={handleBrand}
     className="pb-1 pl-1 pr-4"
      >
        {b}
        </Radio>
        <br/>
  </>
        )


      const handleBrand=(e)=>{
        setSub("")
        dispatch({
          type: "SEARCH_QUERY",
          payload: { text: "" },
        });
  
        setPrice([0,0]);
        setCategoryIds([]);
        setStar('');
        setColor("")
        setShipping("")

        setBrand(e.target.value)
        fetchProducts({brand:e.target.value})

      }

      //7 show product based on color
      const showColors=()=>colors.map((c)=><>
      <Radio 
      value={c} 
       checked={c===color}
        onChange={handleColor}
         className="pb-1 pl-1 pr-4"
          >
            {c}
            </Radio>
            <br/>
      </>)

const handleColor=(e)=>{
  setSub("")
  dispatch({
    type: "SEARCH_QUERY",
    payload: { text: "" },
  });

  setPrice([0,0]);
  setCategoryIds([]);
  setStar('');
  setBrand('');
  setShipping("")

  setColor(e.target.value)
  fetchProducts({color:e.target.value});

}   

//9. show product based on shippings yes/no

const showShipping=(e)=>(

<>
<Checkbox className="pb-2 pl-4 pr-4" 
onChange={handleShippingChange} 
value="Yes"
checked={shipping==="Yes"}
>
Yes
  </Checkbox>
  <br/>

<Checkbox className="pb-2 pl-4 pr-4"
onChange={handleShippingChange} 
value="No"
checked={shipping==="No"}
>
  NO
</Checkbox>

</>

)


const handleShippingChange=(e)=>{
  setSub("")
  dispatch({
    type: "SEARCH_QUERY",
    payload: { text: "" },
  });

  setPrice([0,0]);
  setCategoryIds([]);
  setStar('');
  setBrand('');
  setColor("");
  setShipping(e.target.value)
  fetchProducts({shipping:e.target.value});
}

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <h4>Search/Filter</h4>
          <hr />
          <Menu defaultOpenKeys={["1", "2","3","4","5","6","7"]} mode="inline">
            {/* price */}
            <SubMenu
              key="1"
              title={
                <span className="h6">
                  <DollarOutlined />
                  Price
                </span>
              }
            >
              <div>
                <Slider
                  className="ml-4 mr-4"
                  tipFormatter={(v) => `₹ ${v}`}
                  range
                  value={price}
                  onChange={handleSlider}
                  max="49996"
                />
              </div>
            </SubMenu>
            {/* category */}
            <SubMenu
              key="2"
              title={
                <span className="h6">
                  <DownSquareOutlined />
                  category
                </span>
              }
            >
              <div style={{marginTop:"-10px"}}>
                {showCategories()}
                </div>
            </SubMenu>

             {/* star */}

             <SubMenu
              key="3"
              title={
                <span className="h6">
                  <StarOutlined />
                  Rating
                </span>
              }
            >
              <div style={{marginTop:"-10px"}}>
                {showStars()};

                </div>
            </SubMenu>

{/* sub categories */}
            <SubMenu
              key="4"
              title={
                <span className="h6">
                  <StarOutlined />
                  Sub Categories
                </span>
              }
            >
              <div className="pl-4 pr-4" style={{marginTop:"-10px"}}>
                {showSubs()};

                </div>
            </SubMenu>

{/* brand */}
            <SubMenu
              key="5"
              title={
                <span className="h6">
                  <StarOutlined />
                  Brands
                </span>
              }
            >
              <div className="pl-4 pr-4" style={{marginTop:"-10px"}}>
                {showBrands()};

                </div>
            </SubMenu>

            {/* color */}
            <SubMenu
              key="6"
              title={
                <span className="h6">
                  <StarOutlined />
                  Colors
                </span>
              }
            >
              <div className="pl-4 pr-4" style={{marginTop:"-10px"}}>
                {showColors()};

                </div>
            </SubMenu>
{/* shipping */}
            <SubMenu
              key="7"
              title={
                <span className="h6">
                  <StarOutlined />
                  Shipping
                </span>
              }
            >
              <div className="pl-4 pr-4" style={{marginTop:"-10px"}}>
                {showShipping()};

                </div>
            </SubMenu>

          </Menu>
        </div>
        
        <div className="col-md-9 pt-2">
          {loading ? (
            <h4 className="text-danger">loading...</h4>
          ) : (
            <h4 className="text-danger">Products</h4>
          )}

          {products.length < 1 && <p className="pt-5">No products found</p>}

          <div className="row pt-4 pb-5">
            {products.map((p) => (
              <div key={p._id} className="col-md-4 mt-3">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
