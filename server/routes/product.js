
const express=require('express');
const router=express.Router();

//import controller function::::::::
const {  create,
    listAll,
    remove,
    read 
    ,update
    ,list,
    productsCount,
    productStar,
    listRelated,
    searchFilters
}=require('../controllers/product');

//middleware::::
const {authCheck,adminCheck}=require('../middlewares/auth');

//routes
router.post('/product',authCheck,adminCheck,create);
router.get('/products/total',productsCount)
router.get('/products/:count',listAll);
router.delete('/product/remove/:slug',authCheck,adminCheck,remove);
router.get('/product/:slug',read);
router.put('/product/:slug',authCheck,adminCheck,update)
router.post('/products',list)

//rating
router.put('/product/star/:productId',authCheck,productStar);

//related product
router.get('/product/related/:productId',listRelated);

//search
router.post('/search/filters',searchFilters)


module.exports=router;  