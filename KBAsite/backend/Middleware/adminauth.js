
const admincheck=(req,res,next)=>{
    if(req.userrole=="admin"){
        next();
    }
    else{
        res.status(403).json({msg:"You are not allowed to do this"})
        
    }
}

export default admincheck