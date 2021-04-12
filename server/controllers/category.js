const Category=require('../models/category')
const slugify=require('slugify');
const Product =require('../models/product')
const Sub=require('../models/sub')



exports.create=async (req,res)=>{

try {
    const {name}=req.body;
    const category=await new Category({name,slug:slugify(name)}).save();
    res.json(category);

} catch (error) {
    console.log(error.message)
    res.status(400).send('Create category failed');
}


};


exports.list=async (req,res)=>{

    res.json(await Category.find({}).sort({createdAt:-1}).exec())
    
};


exports.read=async (req,res)=>{
    let category=await Category.findOne({slug:req.params.slug}).exec();
    // res.json(category);

    //find th eproduct based on category
    const products=await Product.find({category})
    .populate('category')
    .populate('postedBy','_id name')
    .exec();
    
    res.json({
        category,
        products
    });
};


exports.update=async (req,res)=>{
    const {name}=req.body;
    try {
        const update=await Category.findOneAndUpdate({slug:req.params.slug},{name:name,slug:slugify(name)},{new:true})
           res.json(update)
    } catch (error) {
        res.status(400).send("update failed")
    }
};

exports.remove=async (req,res)=>{
    try {
        const deleted=await Category.findOneAndDelete({slug:req.params.slug})
        res.json(deleted)
    } catch (error) {
        res.status(400).send('delete failed')
    }
};

exports.getSubs=async (req,res)=>{

Sub.find({parent:req.params._id}).exec((err,subs)=>{
    if(err) console.log(err);
    res.json(subs);
});
}