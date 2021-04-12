const mongoose=require('mongoose');
const Sub=require('./sub')
const {ObjectId}=mongoose.Schema
//

const itemSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:"Name is required",
        minlength:[2,'Too short '],
        maxlength:[32,"Too long"]
    },
   slug:{
       type:String,
       unique:true,
       lowercase:true,
       index:true,
   },
   parent:{
       type:ObjectId,
       ref:"Category",
       required:true 
   }


},{timestamps:true})


itemSchema.post('save',async(docs)=>{
    const data=await Sub.findByIdAndUpdate({_id:docs.parent},{
        $push:{
            item:docs._id
        }
    })
})

module.exports=mongoose.model('Item',itemSchema)