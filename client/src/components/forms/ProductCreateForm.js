import React from 'react'
import {Select} from 'antd'
const {Option}=Select
const ProductCreateForm=({setValues,handleChange,handleSubmit,values,handleCategoryChange,subOption,showSub})=>{
    const {title,
        description,
        price,
        categories,
        category,
        subs,
        details,
        shipping,
        quantity,
        images,
        colors,
        brands,
        color,
        brand}=values

  return (
    <form onSubmit={handleSubmit}>

    <div className="form-groups">
        <label>Title</label>
        <input type="text"
         name="title" 
         className="form-control" 
         value={title}
        onChange={handleChange}
        />

    </div>
    <div className="form-groups">
        <label>Description</label>
        <input type="text"
         name="description" 
         className="form-control" 
         value={description}
        onChange={handleChange}
        />

    </div>     
    <div className="form-groups">
        <label>Details</label>
        <input type="text"
         name="details" 
         className="form-control" 
         value={details}
        onChange={handleChange}
        />

    </div> 
    <div className="form-groups">
        <label>Price</label>
        <input type="number"
         name="price" 
         className="form-control" 
         value={price}
        onChange={handleChange}
        />
    </div>
    <div className="form-groups">
        <label>Shipping</label>
      <select name="shipping" 
      className="form-control"
      onChange={handleChange}
      >
          <option >Please Select</option>

          <option value="No">NO</option>
          <option value="Yes">Yes</option>
      </select>
    </div>
    <div className="form-groups">
        <label>Quantity</label>
        <input type="number"
         name="quantity" 
         className="form-control" 
         value={quantity}
        onChange={handleChange}
        />
    </div>

    <div className="form-groups">
        <label>Color</label>
      <select name="color" 
      className="form-control"
      onChange={handleChange}
      >
          <option >Please Select</option>
          {
              colors.map(c=><option key={c} value={c}>
                  {c}
              </option>)
          }
      </select>
    </div>

    <div className="form-groups">
        <label>Brand</label>
      <select name="brand" 
      className="form-control"
      onChange={handleChange}
      >
          <option >Please Select</option>
          {
              brands.map(c=><option key={c} value={c}>
                  {c}
              </option>)
          }
      </select>
    </div> 
    
    <div className="form-group">
               <label> Category</label>
               <select name="category" className='form-control' onChange={handleCategoryChange}>
                   <option value="">Please select</option>
                    {
                        categories.length >0 && categories.map((c)=>(<option
                         key={c._id} 
                         value={c._id} >
                         {c.name}
                        </option>))
                    }
               </select>
          </div>

          {showSub && (<div>
              <label>Sub Category</label>
              <Select
              mode="multiple"
              style={{width:'100%'}}
              placeholder="Please select"
              value={subs}
              onChange={(value)=>setValues({...values,subs:value})}
              >
                {
                    subOption.length&&subOption.map((s)=>
                    <Option 
                    key={s._id}
                    value={s._id}
                    > {s.name}</Option>)
                }

              </Select>
          </div>)}

    <br/>
   <button className="btn btn-outline-info">
Save
</button>            
</form>
  )


}


export default ProductCreateForm