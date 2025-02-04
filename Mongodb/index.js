import express, { json } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { user } from './routes/route.js';


const app=express();
dotenv.config();

const PORT=process.env.PORT

app.use(json());
app.use('/',user)

app.listen(PORT,function(){

    console.log(`server is listening at ${PORT}`);

})

mongoose.connect('mongodb://localhost:27017/Demo')
