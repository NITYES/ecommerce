const Item=require('../models/item')
const slugify=require('slugify');
//const Product=require('../models/product')


exports.create=async (req,res)=>{

try {
    const {name,parent}=req.body;
    const sub=await new Item({name,parent,slug:slugify(name)}).save();
    res.json(sub);

} catch (error) {
    console.log(error.message)
    res.status(400).send('Item not created ');
}


};


exports.list=async (req,res)=>{

    res.json(await Item.find({}).sort({createdAt:-1}).exec())
    
};