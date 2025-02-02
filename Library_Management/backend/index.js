import express,{json} from 'express';
import dotenv from 'dotenv';

import {userauth} from './routes/userauth.js'

dotenv.config();

const library=express();

library.use(json())

library.use('/',userauth);

library.listen(process.env.PORT,function(){

    console.log(`Server is listening at ${process.env.PORT}`);
    
})

