const express=require('express');
const router=express.Router();

router.get('/user',(req,res)=>{
    res.json({
        data:"hey u hit the user api  end point"
    })
})





module.exports=router;