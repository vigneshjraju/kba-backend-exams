import { Router } from "express";
import authenticate from "../Middleware/auth.js";
import admincheck from "../Middleware/adminauth.js"
import { sample1 } from "../Models/sample.js";
import upload from "../Middleware/upload.js";//Import multer configuration

const addcourse=Router();
// const course=new Map(); // for addcourse


addcourse.post('/addcourse',authenticate,admincheck,upload.single("courseImage"),async(req,res)=>{

    try{  
  
          
              const {courseName,courseId,courseType,description,price}=req.body ;
              const existingcourse=await sample1.findOne({COURSENAME:courseName})

              if(existingcourse){
                res.status(400).send("Course already Exists")
              }

              else{
                const imagepath=req.file?req.file.path:" "; //if reqfile exists store it in imagepath

                const newCourse=new sample1({
                    Coursename:courseName, //schema:postman
                    CourseID:courseId,
                    Coursetype:courseType,
                    Description:description,
                    Price:price,
                    Image:imagepath //storing image

                })

                await newCourse.save();
                console.log(newCourse);
                
                res.status(201).send("Course added Successfully")


              }

              


            //   if(course.get(courseName)){
            //       console.log(`The coursename ${courseName} is already opted.`)
            //       res.status(400).send("Course already opted")
  
            //   }
  
            //   else{
            //       course.set(courseName,{
            //           courseId,
            //           courseType,
            //           description,
            //           price})
  
            //           console.log(course.get(courseName))
            
            //       res.status(201).send("Course added Successfully")    
            //   }
         
      }
  
      catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
  
  
  
  })

  //GET method 1.Params 2.Query


//   //1.Params
//   addcourse.get('/getcourse/:cname',(req,res)=>{

//         const name=req.params.cname;
//         console.log(name);
        

//   })

  //2.Query

addcourse.get('/getcourse',async(req,res)=>{

 try{
        const name1=req.query.courseName;
        const name=await sample1.findOne({Coursename:name1});
        
        if(name){
            res.status(201).send(name);
            console.log("Course fetched successfully.");
            
        }
        else{
            res.status(400).send("Course not found.")
        }



        
        // const name=req.query.courseName;
        // console.log(name);
        // const coursedetails=course.get(name);

        // if (coursedetails) {
        //     res.status(200).jdescriptionson(coursedetails);
        //     console.log(onst name=req.query.courseName;coursedetails);
        
        // } 
        // else {
        // res.status(404).send("Course not found.");

        // }
    }

 catch{

        res.status(500).send("Internal server error.")

  }  
    

})

addcourse.put('/updatecourse',authenticate,admincheck,async(req,res)=>{


    try{  

        const {courseName,courseId,courseType,description,price}=req.body;
        
        const result=await sample1.findOne({Coursename:courseName});

        console.log(result);
        

        if (result){

            result.Coursename=courseName;
            result.CourseID=courseId;
            result.Coursetype=courseType;
            result.Description=description;
            result.Price=price;

            await result.save();
            res.status(201).send("Course updated Successfully")

        }
        else{
                 console.log(`The coursename ${courseName} not found.`)
                 res.status(400).send("Course not found.")
            }
  
        // if(req.userrole=="admin"){
        //     const {courseName,courseId,courseType,description,price}=req.body ;


        //     if(course.get(courseName)){
        //         course.set(courseName,{
        //             courseId,
        //             courseType,
        //             description,
        //             price})

        //             console.log(course.get(courseName))
          
        //         res.status(201).send("Course updated Successfully")  

            // // }

            // else{
            //     console.log(`The coursename ${courseName} not found.`)
            //     res.status(400).send("Course not found.")
                  
            // }
        // }
        // else{
        //     res.status(403).json({msg:"You are not allowed to do this"})
        // }
    }

    catch{
        res.status(500).send("Internal Server error")
    }

})

addcourse.patch('/editcourse',authenticate,admincheck,async(req,res)=>{
 try{
    const {courseName,courseId,courseType}=req.body;

    const result=await sample1.findOne({Coursename:courseName});

    if (result){

        result.Coursename=courseName;
        result.CourseID=courseId;
        result.Coursetype=courseType; 

        await result.save();
        res.status(201).send("Course Edited Successfully")

    }

    else{
        console.log(`The coursename ${courseName} not found.`)
        res.status(400).send("Course not found.")
    }



    // const result=course.get(courseName)

    // if(result){

    //     course.set(courseName,{
    //         courseId:result.courseId,
    //         courseType,
    //         description:result.description,
    //         price})

    //         console.log(course.get(courseName))
          
    //         res.status(201).send("Course updated Successfully")  


    // }
    // else{
    //     console.log(`The coursename ${courseName} is already opted.`)
    //     res.status(400).send("Course already opted")
          
    // }
    }

    catch{
        res.status(500).send("Internal Server error")
    }

})

addcourse.delete('/deletecourse',authenticate,admincheck,async(req,res)=>{

    try{

        const name1=req.query.courseName;

        const name=await sample1.findOneAndDelete({Coursename:name1});
        
        if(name){

            res.status(201).send("Course Deleted successfully.");
            console.log("Course Deleted successfully.");
            
        }
        else{
            res.status(400).send("Course not found.")
        }



        // console.log(name);
        // const coursedetails=course.get(name);

        // if(coursedetails){
        //     course.delete(name);
        //     res.status(201).send("Course deleted successfully.")
        // }
        // else{

        //     res.status(401).send("Course not found.")
        // }

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

  


