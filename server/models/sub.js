const mongoose=require('mongoose');
const Category=require('./category')
const {ObjectId}=mongoose.Schema
//

const subSchema=new mongoose.Schema({
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
   },
   item:[{
       type:ObjectId,
       ref:'Item'
   }]

},{timestamps:true})


subSchema.post('save',async(docs)=>{
    
    const data=await Category.findByIdAndUpdate({_id:docs.parent},{
        $push:{
            subCategory:docs._id
        }
    })
})

module.exports=mongoose.model('Sub',subSchema)