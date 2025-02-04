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

export {user}