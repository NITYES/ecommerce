const admin=require('../firebase/index');
const User=require('../models/user')

exports.authCheck=async (req,res,next)=>{
    // console.log(req.headers) //token

    try {
        const firebaseUser=await admin.auth().verifyIdToken(req.headers.authtoken)
           req.user=firebaseUser
           next()
    } catch (error) {
        console.log(error.message)
        res.status(401).json({
            msg:"Invalid or expired Token"
        })
    }
}


exports.adminCheck=async (req,res,next)=>{

const {email} =req.user

const adminUser=await User.findOne({email}).exec();

if(adminUser.role !=='admin'){
    res.status(403).json({
        msg:"Admin resources. Access Denied"
    })
}else{
    next()
}

}