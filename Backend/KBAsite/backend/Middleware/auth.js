import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const authenticate=(req,res,next)=>{
    const cookie=req.headers.cookie; 
    console.log(cookie);

    if (!cookie){
        
        console.log("Please login to continue.");
        res.status(401).send("Please login to continue.")
        
    }
    else {
        
        const [name,Token]=cookie.trim().split('=');
        console.log(name);
        console.log(Token);

        if(name=="authToken"){
            const verified=jwt.verify(Token,process.env.SECRET_KEY)
            console.log(verified);

            req.username=verified.UserName; //UserName is from the Token created , req is used as object eg :person.name
            req.userrole=verified.UserRole; //UserRole is from the Token created, req is used as object eg :person.userrole

            next() //it is given to move after authenticate in addcourse route i.e(req,res)
        }

        else{
            res.status(401).send("unauthorized Access")
        }

    }

}

export default authenticate