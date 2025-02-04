
const admincheck=(req,res,next)=>{
    if(req.userrole=="Admin"){
        next();
    }
    else{
        res.status(403).json({msg:"You are not allowed to do this"})
        
    }
}

export default admincheck