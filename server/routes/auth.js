const express=require('express');
const router=express.Router();

//import controller function
const {createOrUpdateUser,currentUser}=require('../controllers/auth')

//middleware
const {authCheck,adminCheck}=require('../middlewares/auth')

router.post('/create-or-update-user',authCheck,createOrUpdateUser);
router.post('/current-user',authCheck,currentUser);
router.post('/current-admin',authCheck,adminCheck,currentUser);



module.exports=router;