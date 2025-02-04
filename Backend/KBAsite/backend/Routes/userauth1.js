import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import authenticate from "../Middleware/auth.js";

dotenv.config();
const userauth1=Router();
const user=new Map()

// const course=new Map(); // for addcourse


userauth1.post('/signup',async(req,res)=>{
    try{
 
    // console.log("hi");
    
    // const userdata=req.body;
    // console.log("request data",userdata)

    // console.log(req.body);
    
    const {firstName,lastName,userName,password,userrole}=req.body
    // console.log(firstName)

    // user.set(userName,{firstName,lastName,userName,password,userrole}) 
    // console.log(user.get(userName))
    // password is written as string so we use hash in password to encrypt it

    // if(user.has(userName)){
    //     console.log(`The username ${userName} is already taken.`)
    //     return res.status(409).json({message:`The username ${userName} is already taken. `})

    // }
    

    const newpassword= await bcrypt.hash(password,10) 
    console.log(newpassword);

    
    // user.set(userName,{
    //     firstName,
    //     lastName,
    //     userName,
    //     newpassword,
    //     userrole})
    // console.log(user.get(userName))
    
    if(user.get(userName)){
        console.log(`The username ${userName} is already taken.`)
        res.status(400).send("Username already exist")

    }
    else{
        user.set(userName,{
            firstName,
            lastName,
            newpassword,
            userrole})
          
        res.status(201).send("Signup Successfully")  
        
        console.log(user.get(userName));
        
    }
    }
    catch{
        res.status(500).send("Internal Server error")
    }

    
})

userauth1.post('/login',async(req,res)=>{
    try{
        const {userName,password}=req.body;
        const result=user.get(userName)

        console.log(result);
        

        if (!result){
            res.status(401).send("Enter a username")
        }

        else{
            console.log(result.newpassword);
            const valid=await bcrypt.compare(password,result.newpassword);
            console.log(valid);

            if(valid){
                const Token =jwt.sign({UserName:userName,UserRole:result.userrole},process.env.SECRET_KEY,{expiresIn:'1hr'}) //Token generation {payload,secretkey,expiryin}
                console.log(Token);

                res.cookie("authToken",Token,
                    {
                        httpOnly:true
                    });
                
                res.status(201).json({message:"logged in successfully"})
            }
            else{
                res.status(401).send('unauthorized access')
            }

        }
        
    }

    catch{
        res.status(500).send("Internal server error")
    }


})

// userauth1.post('/addcourse',authenticate,(req,res)=>{

//   try{  

//         if(req.userrole=="admin"){
//             const {courseName,courseId,courseType,description,price}=req.body ;

            

                 

//             if(course.get(courseName)){
//                 console.log(`The coursename ${courseName} is already opted.`)
//                 res.status(400).send("Course already opted")

//             }

//             else{
//                 course.set(courseName,{
//                     courseId,
//                     courseType,
//                     description,
//                     price})

                    
          
//                 res.status(201).send("Course added Successfully")    
//             }
//         }
//         else{
//             res.status(403).json({msg:"You are not allowed to do this"})
//         }
//     }

//     catch{
//         res.status(500).send("Internal Server error")
//     }



// })



export {userauth1};