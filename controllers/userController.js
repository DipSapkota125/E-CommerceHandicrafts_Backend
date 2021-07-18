
const userRegister = require('../models/userRegister');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userController = {
    userRegister: async(req,res)=>{
        let image = (req.file) ? req.file.filename:null;
        const {fullname, email, phone, password, confirmpassword}= req.body;

        if(!fullname || !email || !password || !confirmpassword)
            return res.status(422).json({ error: "Please filled all the field!"});
    
        try{
            const userExist = await userRegister.findOne({email: email});
    
            if(userExist)
                return res.status(422).json({error: "Email already Exist!"});

              if(password !== confirmpassword)
                return res.status(422).json({error : "password are not matching!"});
    
                const user = new userRegister({fullname, email, phone, password, confirmpassword,image});
                // console.log(user);
    
                await user.save();

                const myToken = await user.getAuthToken();
    
                 res.status(201).json({message:"User registered successfully!", token:myToken});
    
        } catch(err){
            console.log(err)
        }

    },
    userlogin: async(req,res)=>{
        try {
            let myToken;
            const {email,password} = req.body;

            if(!email || !password)
            return res.status(301).json({message:'Please select email/password'});
            
            const loginuser = await userRegister.findOne({email})
            if(!loginuser) 
            return res.status(400).json({message:"User does not exist!"})

            const userLogin = await userRegister.findOne({email:email});
            if(userLogin){
                const isMatch = await bcryptjs.compare(password, userLogin.password);
                myToken = await userLogin.getAuthToken();
                console.log(myToken);

                res.cookie('jwtoken',myToken,{
                    expires:new Date(Date.now() + 25892000000),
                    httpOnly:true
                })
                if(!isMatch) {
                 res.status(400).json({message:"Incorrect password!"})
                } else{
                 res.status(400).json({message:"User login succssfully",token:myToken});
                }
                
            }
            
        }catch(err){
            console.log(err);
        }
    }

}

module.exports = userController;


