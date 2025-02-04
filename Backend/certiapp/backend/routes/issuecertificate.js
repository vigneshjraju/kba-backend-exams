import { Router } from "express";
import authenticate from "../middleware/authentication.js";
import adminchec from "../middleware/admincheck.js";

const issue = Router();
const issuer = new Map();

issue.post('/issuecertificate',authenticate,(req,res)=>{

    try {
        
        if(req.Userole=='Admin') {

            const {courseName,courseId,candidatename,grade,description} = req.body;

            if (issuer.get(courseName)) {
                console.log(`The course name ${courseName} is already opted.`);
                 res.status(400).send("Course already opted");
            }
            else{
            
            issuer.set(courseName,{
                courseId,
                candidatename,
                grade,
                description
            });
            console.log(issuer.get(courseName));
            
            //console.log(`Added course: ${JSON.stringify(issuer.get(courseName))}`);
             res.status(201).send("Certificate created successfully");
            }

        } 
        else {
            
             res.status(403).send("You are not allowed to perform this action.");
        }

    } 
    
    catch (error) {
        
         res.status(500).send("Internal Server error.");
    }
});

  issue.patch('/editcertificate',authenticate,adminchec,(req,res)=>{
    try{
        const {courseName,candidatename,grade}=req.body;

        const r2=issuer.get(courseName);

        if(r2){

            issuer.set(courseName,{
                courseId:r2.courseId,
                candidatename,
                grade,
                description:r2.description
            });

            res.status(201).send("Certificate succesfully edited.")
            
        }

        else{

            res.status(201).send("Certificate not created.")

        }
    }
    catch{
        res.status(500).send("Internal Server error.");
    }

  })   

  issue.get('/certificate',authenticate,(req,res)=>{

    try{

        const certis=req.query.courseName;
        const cert1=issuer.get(certis);

        if(cert1){
            res.status(201).json(cert1);
            console.log("Certificate successfully fetched");
            
        }
        else{
            res.status(401).send("certificate not fetched")
        }

    }
    catch{
        res.status(500).send("Internal Server error")
    }


  })




export {issue};
