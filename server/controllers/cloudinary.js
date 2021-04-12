const cloudinary=require('cloudinary');




cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})


exports.upload= async (req,res,next)=>{

    let result =await cloudinary.uploader.upload(req.body.image,{
        public_id:`${Date.now()}`,
        resource_type:'auto'  //jpeg ,png
    });
    res.json({
        public_id:result.public_id,
        url:result.secure_url,
    })
}

exports.remove=  (req,res,next)=>{
    
let image_id=req.body.public_id

cloudinary.uploader.destroy(image_id).then(result=>{
    res.send('ok')
}).catch(err=>{
    res.status(400).json({
        msg:err.message
    })
})
}