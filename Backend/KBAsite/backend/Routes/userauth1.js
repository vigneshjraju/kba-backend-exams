import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import authenticate from "../Middleware/auth.js";
import { sample } from "../Models/sample.js";
import mongoose from "mongoose";

dotenv.config();
const userauth1=Router();
// const user=new Map()

// const course=new Map(); // for addcourse


userauth1.post('/signup',async(req,res)=>{
    try {
        const {firstName,lastName,userName,password,userrole} = req.body;

        // Check if the user already exists
        const existingUser = await sample.findOne({username:userName});

        if (existingUser) {
             res.status(400).send("User already exists.");
        }

        else{
            const newPassword= await bcrypt.hash(password, 10);

            // Create a new user
            const newUser = new sample({
                firstName: firstName, //sample:req.body
                lastName: lastName,
                username: userName,
                password: newPassword,
                userRole: userrole
            });

            // Save the user to the database
            await newUser.save();

            res.status(201).send("Signup Successful");
        }
    } 

    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
    // console.log(firstName)

    // user.set(userName,{firstName,lastName,userName,password,userrole}) 
    // console.log(user.get(userName))
    // password is written as string so we use hash in password to encrypt it

    // if(user.has(userName)){
    //     console.log(`The username ${userName} is already taken.`)
    //     return res.status(409).json({message:`The username ${userName} is already taken. `})

    // }
    

    // const newpassword= await bcrypt.hash(password,10) 
    // console.log(newpassword);
    

    
    // user.set(userName,{onst name=req.query.courseName;
    //     firstName,
    //     lastName,
    //     userName,
    //     newpassword,
    //     userrole})
    // console.log(user.get(userName))
    
//     if(user.get(userName)){
//         console.log(`The username ${userName} is already taken.`)
//         res.status(400).send("Username already exist")

//     }
//     else{
//         user.set(userName,{
//             firstName,
//             lastName,
//             newpassword,
//             userrole})
          
//         res.status(201).send("Signup Successfully")  
        
//         console.log(user.get(userName));
        
//     }
//     }
//     catch{
//         res.status(500).send("Internal Server error")
//     }

    
// })

userauth1.post('/login',async(req,res)=>{
    try{
        const {userName,password}=req.body;
        const result=await sample.findOne({username:userName});

        
        // const result=user.get(userName)

        // console.log(result);
        

        if (!result){
            res.status(401).send("Enter a valid username")
        }

        else{
            // console.log(result.newpassword);const course=new Map();
            // const valid=await bcrypt.compare(password,result.newpassword);
            const valid=await bcrypt.compare(password,result.password)
            
            //compare typed password with schema password
            // console.log(valid);

            if(valid){
                const Token =jwt.sign({UserName:userName,UserRole:result.userRole},process.env.SECRET_KEY,{expiresIn:'1hr'}) //Token generation {payload,secretkey,expiryin} UserName:userName(from postman) UserRole:result.userRole (from schema)
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