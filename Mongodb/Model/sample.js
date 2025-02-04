import { Schema } from "mongoose";
import { model } from "mongoose";

const Demo=new Schema({

    userid:{type:String,required:true},
    name:{type:String,required:true},
    dob:{type:String,required:true}

})

const sample=model('sample1',Demo)

export {sample}