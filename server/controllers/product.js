const Product = require("../models/product");
const slugify = require("slugify");
const User = require("../models/user");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    //add slug to req.body
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    console.log(newProduct);
    res.json(newProduct);
  } catch (error) {
    console.log(error);
    // res.status(400).send('Create product failed');
    res.status(400).json({
      err: error.message,
    });
  }
};

exports.listAll = async (req, res) => {
  let products = await Product.find({})
    .limit(parseInt(req.params.count))
    .populate("category")
    .populate("subs")
    .sort([["createdAt", "desc"]])
    .exec();
  res.status(200).json(products);
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    console.log(deleted);
    res.json(deleted);
  } catch (error) {
    console.log(error);
    return res.status(400).send("Product delete Failed");
  }
};

exports.read = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug })
    .populate("category")
    .populate("subs")
    .exec();
  res.json(product);
};

exports.update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }

    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    console.log(error);
    // res.status(400).send('Create product failed');
    res.status(400).json({
      err: error.message,
    });
  }
};

//Without pagination
// exports.list=async (req,res)=>{

//     try {

//         //createdAt/updatedAt, desc/asc, 3
//         const {sort,order,limit}=req.body
//         const products=await Product.find({})
//         .populate('category')
//         .populate('subs')
//         .sort([[sort,order]])
//         .limit(limit)
//         .exec();

//         res.json(products)

//     } catch (error) {
//         console.log(error)
//     }
// }

//with page
exports.list = async (req, res) => {
  console.table(req.body);
  try {
    //createdAt/updatedAt, desc/asc, 3
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const perPage = 3;
    const products = await Product.find({})
      .skip((currentPage - 1) * 3)
      .populate("category")
      .populate("subs")
      .sort([[sort, order]])
      .limit(perPage)
      .exec();

    res.json(products);
  } catch (error) {
    console.log(error);
  }
};

exports.productsCount = async (req, res) => {
  let total = await Product.find({}).estimatedDocumentCount().exec();
  console.log(total);
  res.json(total);
};

exports.productStar = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();
  const user = await User.findOne({ email: req.user.email }).exec();
  const { star } = req.body;

  //who is updating?
  //check if currently logged in user have already added rating to this product?
  //

  console.log("product", product);
  let existingRatingObject = product.ratings.find(
    (ele) => ele.postedBy.toString() === user._id.toString()
  );

  //if user havent left rating yet, push it
  console.log(existingRatingObject);

  if (existingRatingObject === undefined) {
    console.log("push");
    let ratingAdded = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { ratings: { star: star, postedBy: user._id } },
      },
      { new: true }
    ).exec();
    console.log("ratingAdded", ratingAdded);
    res.json(ratingAdded);
  } else {
    //if user have already left rating ,update it
    //user have already rated the product
    console.log("set");
    const ratingUpdated = await Product.updateOne(
      {
        ratings: { $elemMatch: existingRatingObject },
      },
      { $set: { "ratings.$.star": star } },
      { new: true }
    ).exec();

    console.log("ratingupdated", ratingUpdated);
    res.json(ratingUpdated);
  }
};

//list the realted product excluding the product in the view
exports.listRelated = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();
  console.log(product.category);
  const related = await Product.find({
    _id: { $ne: product._id }, //exclude the product in search with _id
    category: product.category,
  })
    .limit(6)
    .populate("category")
    .populate("subs")
    .populate("postedBy")
    .exec();

  res.json(related);
};

//search/filter products

//1. if searched using query
const handleQuery = async (req, res, query) => {
  const products = await Product.find({ $text: { $search: query } })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("postedBy", "_id name")
    .exec();

  res.json(products);
};

//if price range is selected
const handlePrice = async (req, res, price) => {
  try {
    let products = await Product.find({
      price: {
        $gte: price[0],
        $lte: price[1],
      },
    })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate("postedBy", "_id name")
      .exec();

    res.json(products);
  } catch (error) {
    console.log(error);
  }
};


//handle category
const handleCategory=async (req,res,category)=>{
    try {
        let products=await Product.find({category:{$in:category}})
        .populate("category", "_id name")
        .populate("subs", "_id name")
        .populate("postedBy", "_id name")
        .exec();

        res.json(products);
    } catch (error) {
        console.log(error);
    }
}


//handle star
const handleStar=async (req,res,stars)=>{
//
Product.aggregate([
  {
    $project:{
      document:'$$ROOT',
      //title:"$title",
      floorAverage:{
        $floor:{$avg:'$ratings.star'}
      }
    }
  },
  {
    $match:{floorAverage:stars}
  }
])
.limit(12)
.exec((err,aggregate)=>{
if(err) console.log('AGGREGATES----->',err)
Product.find({_id:aggregate})
.populate("category", "_id name")
        .populate("subs", "_id name")
        .populate("postedBy", "_id name")
        .exec((err,products)=>{
          if(err) console.log('PRODUCT AGGREGATE ERROR',err)
          res.json(products)
        });

})
}

//handle sub 
const handleSub=async (req,res,sub)=>{

  const products=await Product.find({subs:sub})
  .populate("category", "_id name")
        .populate("subs", "_id name")
        .populate("postedBy", "_id name")
        .exec();

        res.json(products);

}

//handle shipping
const handleShipping=async (req,res,shipping)=>{
  const products=await Product.find({shipping})
  .populate("category", "_id name")
        .populate("subs", "_id name")
        .populate("postedBy", "_id name")
        .exec();

        res.json(products);


}

//handle color
const handleColor=async (req,res,color)=>{
  const products=await Product.find({color})
  .populate("category", "_id name")
        .populate("subs", "_id name")
        .populate("postedBy", "_id name")
        .exec();

        res.json(products);
}

//handle brand
const handleBrand=async (req,res,brand)=>{
  const products=await Product.find({brand})
  .populate("category", "_id name")
        .populate("subs", "_id name")
        .populate("postedBy", "_id name")
        .exec();

        res.json(products);
}



exports.searchFilters = async (req, res) => {
  const { query, price,category ,stars,sub,shipping,color,brand} = req.body;
  if (query) {
    console.log("query", query);
    await handleQuery(req, res, query);
  }
  //price [20,200]
  if (price !== undefined) {
    console.log("price---->", price);
    await handlePrice(req, res, price);
  }

if(category){
    console.log('category--->',category);
    await handleCategory(req,res,category)
}

if(stars){
  console.log('star--->',stars);
  await handleStar(req,res,stars)
}

if(sub){
  console.log('sun----->',sub);
  await handleSub(req,res,sub)
}

if(shipping){
  console.log('SHIPPINH----->',shipping);
   await handleShipping(req,res,shipping)
}

if(color){
  console.log('COLOR----->',color);
 await  handleColor(req, res, color)
}

if(brand){
  console.log('BRAND----->',brand);
  await handleBrand(req,res,brand)
}

};
