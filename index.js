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

// Create Student
app.post('/api/students',async(req,res)=>{
    try{
         const student = await Student.create(req.body);
         res.status(200).json(student);
    }catch(error){
        res.status(500).json({message: error.message});
    }
});

// Get Student
app.get('/api/students',async(req,res)=>{
    try{
         const students = await Student.find({});
         res.status(200).json(students);
    }catch(error){
        res.status(500).json({message: error.message});
    }
});

// Get Selected Student
app.get('/api/students/:id',async(req,res)=>{
    try{
        const { id } = req.params;
        const students = await Student.findById(id);
        res.status(200).json(students);
    }catch(error){
        res.status(500).json({message: error.message});
    }
});


// Update Student
app.put('/api/students/:id',async(req,res)=>{
    try{
        const { id } = req.params;
        const student = await Student.findByIdAndUpdate(id,req.body);
        if(!student){
            return res.status(404).json({message: "not found student!"});
        }

        const updatedStudent = await Student.findById(id);
        res.status(200).json(updatedStudent);
    }catch(error){
        res.status(500).json({message: error.message});
    }
});

// Delete Student
app.delete('/api/students/:id',async(req,res)=>{
    try{
        const { id } = req.params;
        const students = await Student.findByIdAndDelete(id);
        if(!students){
            return res.status(404).json({message: "not found student!"});
        }

        res.status(200).json({message: "Deleted Successfully!"});
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