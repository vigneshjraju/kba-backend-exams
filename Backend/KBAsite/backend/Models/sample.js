import { Schema } from "mongoose";
import { model } from "mongoose";

const demo=new Schema({
    username:{type:String,unique:true},
    firstName:{type:String},
    lastName:{type:String},
    password:{type:String,required:true},
    userRole:{type:String,required:true}
})


const sample=model('Userdetails',demo);

const demo1=new Schema({
    Coursename:{type:String,unique:true},
    CourseID:{type:String,required:true},
    Coursetype:{type:String,required:true},
    Description:{type:String},
    Price:{type:String},
    Image:{type:String}
    
})

const sample1=model('Coursedetails',demo1);




export {sample,sample1}