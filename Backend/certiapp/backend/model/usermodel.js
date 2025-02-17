
import { Schema } from "mongoose";
import { model } from "mongoose";

const usersign=new Schema({

    USERNAME:{type:String,unique:true},
    EMAIL:{type:String,required:true},
    PASSWORD:{type:String,required:true},
    USERROLE:{type:String,required:true,enum:["User","Admin"]}
    

})

const sign=model('Users',usersign);

export {sign}