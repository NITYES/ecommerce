const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const {readdirSync}=require('fs');
const util=require('util')

//import routes
const authRoute=require('./routes/auth')

//app
const app = express();

//db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => console.log(`DB CONNECTION ERR ${err.message}`));


  //middlewares
  app.use(morgan('dev'));
  app.use(bodyparser.json({limit:"2mb"}));
  app.use(cors());


  //route
  // app.use('/api',authRoute)
  //routes autoloading
  readdirSync('./routes').map((r)=> app.use('/api',require('./routes/'+r)));

app.use((req,res,next)=>{
  res.send("error occurred")
})

process.on('uncaughtException',(error)=>{
  console.log(error)
})

  //port
  const PORT=process.env.PORT||8000;

  

  app.listen(PORT,()=>{
      console.log("APP LISTENING ON PORT 8000")
  })
