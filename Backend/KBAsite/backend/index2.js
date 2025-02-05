import express,{json} from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { userauth1 } from './Routes/userauth1.js';

import { addcourse } from './Routes/addcourse.js';

// import {adminsign} from './Routes/adminsign.js';

import cors from 'cors'

dotenv.config();

const app=express();


app.use(cors({
    origin:'http://127.0.0.1:5500'
}))

app.use(json())  //used only before app.use('/',userauth1);




app.use('/',userauth1);

app.use('/',addcourse);



// app.use('/admin',adminsign)


app.listen(process.env.PORT,function(){
    console.log(`server is listening at ${process.env.PORT}`)
})

mongoose.connect('mongodb://localhost:27017/KBA_Course').then(()=>{
        
    console.log('MongoDB connected successfully to KBACourse');
})
.catch((error)=>{
    console.error('MongoDB connection failed',error);
    
});