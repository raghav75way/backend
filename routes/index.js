const express = require('express');
const router = express.Router();
const User =  require('../model/schema')

router.get('/', ()=>{

});

router.post('/register', (req,res)=>{

    const {name,email,password} = req.body;
    const user =  new User({
        name,email,password
    }) 

    user.save().then(()=>{
           console.log("user is registered")
    }).catch((err)=>{
        console.log(`the error is ${err}`)
    });
});

router.post('/signin',(req,res)=>{


});


module.exports = router;