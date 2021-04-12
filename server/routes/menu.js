const express=require('express');
const category = require('../models/category');
const route=express.Router();

const getSubCategory= (obj)=>{

return obj.map((s)=>{

return {
    name:s.name,
    _id:s._id,
    item:getItems(s.item)

}

})


}


const getItems= (obj)=>{

    return obj.map((i)=>{
    
    return {
        name:i.name,
        _id:i._id,
    
    }
    
    })
    
    
    }

route.get('/menu',async (req,res)=>{
    
    
category
.find({})
.select("name _id")
.populate({
    path:"subCategory",
    populate:{path:"item"}
})
.exec((err,categorys)=>{
    if(err) return console.log(err)
    console.log(categorys);
    const menu=categorys.map((c)=>{


        return {
            name:c.name,
            _id:c._id,
            subCategory:getSubCategory(c.subCategory)
        }
    })
    console.log(menu)
    res.json(menu);
});

})
module.exports=route