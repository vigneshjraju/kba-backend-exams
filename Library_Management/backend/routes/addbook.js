import { Router } from "express";
import authenticate from "../Middleware/authentication.js";
 
const addbook=Router();
const book=new Map();

addbook.post('/addbook',authenticate,(req,res)=>{



})