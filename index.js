//index.js
const express = require("express");
const cors = require("cors")

// const multer = require('multer')
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

const usermodel= require("./model/user");
const trainmodel = require("./model/training");
const recruitmodel = require("./model/recruitment");
const employeemodel = require("./model/employee");
const userloginmodel = require("./model/userlogin");
const employeeprofilemodel = require("./model/employeeprofile");
const performancemodel = require("./model/performance");




const app = new express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());
//api creation
app.get('/', (request, response) => {
    response.send("hi database")
})
app.post('/logins', async (request, response) => {
    const { hrid, password } = request.body;
  
    try {
      const user = await usermodel.findOne({ hrid, password });
  
      if (user) {
        response.json({ success: true, message: 'Login successful' });
      } else {
        response.json({ success: false, message: 'Invalid HR ID or Password' });
      }
    } catch (error) {
      response.status(500).json({ success: false, message: 'Error during login' });
    }
  });
//login retrieving
app.get('/logins',async(request,response)=>{
    var data = await usermodel.find();
    response.send(data)
})

app.get('/trainingview',async(request,response)=>{
    var data = await trainmodel.find();
    response.send(data)
    })
app.get('/trainingview',async(request,response)=>{
     var data = await trainmodel.find();
     response.send(data)
     })

//for delete
app.put('/remove/:id',async(request,response)=>{
        let id = request.params.id
        await trainmodel.findByIdAndUpdate(id)
        response.send("Record deleted")
        })    
        
app.put('/trainingedit/:id', async(request,response)=>{
let id = request.params.id
await trainmodel.findByIdAndUpdate(id,request.body)
response.send("Record Deleted")
})
//For Submit button
app.post('/new',(request,response)=>{
    console.log(request.body)
    new trainmodel(request.body).save();
    response.send("Record Sucessfully Saved")
    })



app.listen(4005, (request, response) => {
        console.log("port is running in 4005")
    })


//For Submit button
app.post('/new1',(request,response)=>{
    console.log(request.body)
    new recruitmodel(request.body).save();
    response.send("Record Sucessfully Saved")
    })
app.get('/recruitmentview',async(request,response)=>{
        var data = await recruitmodel.find();
        response.send(data)
        })
app.get('/recruitmentview',async(request,response)=>{
            var data = await recruitmodel.find();
            response.send(data)
            })
app.put('/recruitmentedit/:id', async(request,response)=>{
        let id = request.params.id
         await recruitmodel.findByIdAndUpdate(id,request.body)
        response.send("Record Deleted")
         })
app.put('/remove1/:id',async(request,response)=>{
         let id = request.params.id
         await recruitmodel.findByIdAndUpdate(id)
         response.send("Record deleted")
        }) 

//employee
app.post('/new2',(request,response)=>{
    console.log(request.body)
    new employeemodel(request.body).save();
    response.send("Record Sucessfully Saved")
    })
app.get('/employeeview',async(request,response)=>{
        var data = await employeemodel.find();
        response.send(data)
        })
app.get('/employeeview',async(request,response)=>{
            var data = await employeemodel.find();
            response.send(data)
            })
app.put('/employeeedit/:id', async(request,response)=>{
        let id = request.params.id
         await employeemodel.findByIdAndUpdate(id,request.body)
         response.send("Record Deleted")
          })
app.put('/remove2/:id',async(request,response)=>{
         let id = request.params.id
         await employeemodel.findByIdAndUpdate(id)
         response.send("Record deleted")
        }) 


      //employeelogin

      app.post("/userlogins", async (req, res) => {
        const { empid, password } = req.body;
        console.log("Received login request for empid:", empid, "and password:", password);
      
        try {
          const user = await userloginmodel.findOne({ empid });
      
          if (user) {
            const employees = await employeemodel.findOne({ idd: empid, ename: password });
      
            if (employees) {
              console.log("Login successful for empid:", empid);
              res.status(200).json("Success");
            } else {
              console.log("Invalid password for empid:", empid);
              res.status(401).json("Invalid password");
            }
          } else {
            console.log("User not found for empid:", empid);
            res.status(404).json("User not found");
          }
        } catch (error) {
          console.error("Error during user authentication:", error);
          res.status(500).json("Internal server error");
        }
      });
      

//  app.post('/userlogin',(req,res)=>{
//   const {empid,password} = req.body;
//   userloginmodel.findOne({empid: empid})
//   .then(userr => {
//      if(userr) {
//       if(userr.password === password) {
//           res.json("Success")
//       }
//       else{
//         res.json("password is incorrect")
//       }
//      }
//   })
//  })   


//employeeprofile

app.get('/employeeprofile', async (req, res) => {
  try {
    const employeeprofile = await employeeprofilemodel.findOne(({}, req.body, { new: true }));
    res.json(employeeprofile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/employeeprofile', async (req, res) => {
  try {
    const updatedProfile = await employeeprofilemodel.findOneAndUpdate({}, req.body, { new: true });
    res.json(updatedProfile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


//performance

app.post('/performance', async (req, res) => {
  try {
      const Performances = await performancemodel.create(req.body);
      res.status(201).json(performance);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
});

app.get('/performance', async (req, res) => {
  try {
      const performances = await performancemodel.find();
      res.json(performances);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

app.put('/performance/:id', async (req, res) => {
  const { id } = req.params;
  try {
      const performance = await performancemodel.findByIdAndUpdate(id, req.body, { new: true });
      res.json(performance);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
});

app.delete('/performance/:id', async (req, res) => {
  const { id } = req.params;
  try {
      await performancemodel.findByIdAndDelete(id);
      res.json({ message: 'Performance data deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});




//dasboard

const getEmployeeStatusCount = async () => {
  try {
      return 6;
  } catch (error) {
      console.error('Error fetching employee status count:', error);
      return null;
  }
};

const getTrainingCount = async () => {
  try {
    return 5;
  } catch (error) {
      console.error('Error fetching training count:', error);
      return null;
  }
};

const getProfileCount = async () => {
  try {
      // Your logic to fetch profile count from database
      return 33; // For example
  } catch (error) {
      console.error('Error fetching profile count:', error);
      return null;
  }
};

// Endpoint to fetch dashboard data
app.get('/dashboardData', async (req, res) => {
  try {
      const employeeStatusCount = await getEmployeeStatusCount();
      const trainingCount = await getTrainingCount();
      const profileCount = await getProfileCount();
      res.json({ employeeStatusCount, trainingCount, profileCount });
  } catch (error) {
      console.error('Error fetching dashboard data:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});
