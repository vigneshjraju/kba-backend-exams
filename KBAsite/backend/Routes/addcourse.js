import { Router } from "express";
import authenticate from "../Middleware/auth.js";
import admincheck from "../Middleware/adminauth.js"

const addcourse=Router();
const course=new Map(); // for addcourse


addcourse.post('/addcourse',authenticate,(req,res)=>{

    try{  
  
          if(req.userrole=="admin"){
              const {courseName,courseId,courseType,description,price}=req.body ;
  

              if(course.get(courseName)){
                  console.log(`The coursename ${courseName} is already opted.`)
                  res.status(400).send("Course already opted")
  
              }
  
              else{
                  course.set(courseName,{
                      courseId,
                      courseType,
                      description,
                      price})
  
                      console.log(course.get(courseName))
            
                  res.status(201).send("Course added Successfully")    
              }
          }
          else{
              res.status(403).json({msg:"You are not allowed to do this"})
          }
      }
  
      catch{
          res.status(500).send("Internal Server error")
      }
  
  
  
  })

  //GET method 1.Params 2.Query


//   //1.Params
//   addcourse.get('/getcourse/:cname',(req,res)=>{

//         const name=req.params.cname;
//         console.log(name);
        

//   })

  //2.Query

  addcourse.get('/getcourse',(req,res)=>{

 try{
        const name=req.query.courseName;
        console.log(name);
        const coursedetails=course.get(name);

        if (coursedetails) {
            res.status(200).jdescriptionson(coursedetails);
            console.log(coursedetails);
        
        } 
        else {
        res.status(404).send("Course not found.");

        }
    }

 catch{

        res.status()

  }  
    

})

addcourse.put('/updatecourse',authenticate,(req,res)=>{


    try{  
  
        if(req.userrole=="admin"){
            const {courseName,courseId,courseType,description,price}=req.body ;


            if(course.get(courseName)){
                course.set(courseName,{
                    courseId,
                    courseType,
                    description,
                    price})

                    console.log(course.get(courseName))
          
                res.status(201).send("Course updated Successfully")  

            }

            else{
                console.log(`The coursename ${courseName} is already opted.`)
                res.status(400).send("Course already opted")
                  
            }
        }
        else{
            res.status(403).json({msg:"You are not allowed to do this"})
        }
    }

    catch{
        res.status(500).send("Internal Server error")
    }

})

addcourse.patch('/editcourse',authenticate,admincheck,(req,res)=>{
 try{
    const {courseName,courseType,price}=req.body
    const result=course.get(courseName)

    if(result){

        course.set(courseName,{
            courseId:result.courseId,
            courseType,
            description:result.description,
            price})

            console.log(course.get(courseName))
          
            res.status(201).send("Course updated Successfully")  


    }
    else{
        console.log(`The coursename ${courseName} is already opted.`)
        res.status(400).send("Course already opted")
          
    }
}

    catch{
        res.status(500).send("Internal Server error")
    }

})

addcourse.delete('/deletecourse',authenticate,admincheck,(req,res)=>{

    try{

        const name=req.query.courseName;
        console.log(name);
        const coursedetails=course.get(name);

        if(coursedetails){
            course.delete(name);
            res.status(201).send("Course deleted successfully.")
        }
        else{

            res.status(401).send("Course not found.")
        }

    }

    catch{

        res.status(500).send("Internal Server error")

    }


})

addcourse.get('/logout',(req,res)=>{

    res.clearCookie("authToken");
    res.status(201).send("logout Successfully.")



})




  export {addcourse};

  


