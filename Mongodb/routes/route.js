import { Router } from "express";
import { sample } from "../Model/sample.js";

const user=Router();

user.post('/create',async(req,res)=>{

    try{
        const data=req.body;
        const result=await sample.create(data);
        res.status(201).send(result);
    }
    
    catch(error){
        console.log(error);
        res.status(500).send("Internal Server error");
        
    }

})

user.get('/read',async(req,res)=>{

    try{

        const result=await sample.find();
        res.status(200).send(result)

        const result1=await sample.findById('67a31f1bae916433c5ecf8ea')
        res.status(200).send(result1)

    }

    catch{

        res.status(500).send("Internal Server error")
    }


})



export {user}