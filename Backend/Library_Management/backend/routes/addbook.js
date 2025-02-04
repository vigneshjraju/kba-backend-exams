import { Router } from "express";
import authenticate from "../Middleware/authentication.js";
import admincheck from "../Middleware/adminauth.js";
 
const addbook=Router();
const book=new Map();

addbook.post('/addbook',authenticate,admincheck,(req,res)=>{

    const {book12,author,description}=req.body;

    try{

        if(book.get(book12)){
            console.log(`The Book ${book12} is already added.`)
            res.status(400).send("Book already added")

        }

        else{
            book.set(book12,{
                author,
                description
                })

                console.log(book.get(book12))
      
            res.status(201).send("Book added Successfully")    
        }

    }

    catch{

        res.status(500).send("Internal Server error")

    }



})

addbook.patch('/updatebook',authenticate,admincheck,(req,res)=>{
    
    try{
        console.log("kkkk");
        
        const {book12,author,description}=req.body
        const result=book.get(book12)
    
        if(result){
            console.log("vfffk");
            book.set(book12,{
                author,
                description,
                })
    
                console.log(book.get(book12))
              
                res.status(201).send("book updated Successfully")  
    
    
        }
        else{
            console.log(`The Book ${book12} is already added.`)
            res.status(400).send("book already added")
              
        }
    }
    
        catch{
            res.status(500).send("Internal Server error")
        }
    
    


})

addbook.get('/logout',(req,res)=>{

    res.clearCookie("authToken");
    res.status(201).send("logout Successfully.")



})

addbook.get('/viewbook',authenticate,(req,res)=>{

    try{

        const view=req.query.book12;
        const view1=book.get(view);

        if(view1){
            res.status(201).json(view1);
            console.log("Book details successfully fetched");
            
        }
        else{
            res.status(401).send("Book details not fetched")
        }

    }
    catch{
        res.status(500).send("Internal Server error")
    }


  

})

export {addbook}