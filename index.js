const express = require('express')
const mongoose = require('mongoose');
const app = express()
const Student = require('./models/student.model.js');

app.use(express.json());

app.listen(3000, ()=>{
    console.log("Server is running");
    
});

app.get('/',(req,res)=>{
    res.send("Hello from Node API78");
});

app.post('/api/students',async(req,res)=>{
    // console.log(req.body);
    // res.send(req.body);
    try{
         const student = await Student.create(req.body);
         res.status(200).json(student);
    }catch(error){
        res.status(500).json({message: error.message});
    }
});







mongoose.connect('mongodb://localhost:27017/ExpressCrudApp', {
    
})
.then(() => {
    console.log("Connected to database");
})
.catch(() => {
    console.log("Error connecting to the database");
});