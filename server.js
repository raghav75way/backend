const express  = require('express');
const mongoose  = require('mongoose');
const bodyParser =  require('body-parser');
const app =  express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


const url = 'mongodb+srv://raghav75way:random1234@cluster0.nzvommb.mongodb.net/beginner?retryWrites=true&w=majority'

mongoose.connect(url).then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.get('/',(req,res)=>{
    res.send("server is working")
})

app.use('/auth',require("./routes/index"))
app.listen(8000,()=>{
    console.log("server is live")
})