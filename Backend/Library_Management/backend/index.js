import express,{json} from 'express';
import dotenv from 'dotenv';

import {userauth} from './routes/userauth.js'
import { addbook } from './routes/addbook.js';

dotenv.config();

const library=express();

library.use(json())

library.use('/',userauth);
library.use('/',addbook);

library.listen(process.env.PORT,function(){

    console.log(`Server is listening at ${process.env.PORT}`);
    
})

