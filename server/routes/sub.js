
const express=require('express');
const router=express.Router();

//import controller function
const {create,
    read,
    update,
    remove,
    list}=require('../controllers/sub');

//middleware
const {authCheck,adminCheck}=require('../middlewares/auth');

//routes
router.post('/sub',authCheck,adminCheck,create);
router.get('/sub',list);
router.get('/sub/:slug',read);
router.put('/sub/:slug',authCheck,adminCheck,update);
router.delete('/sub/:slug',authCheck,adminCheck,remove);


module.exports=router;