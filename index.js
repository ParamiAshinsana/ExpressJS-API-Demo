import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Student from './models/Student.js';

dotenv.config();

const app = express();

// Detailed CORS Configuration
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow necessary HTTP methods
    credentials: true // If your frontend needs to send cookies or authentication headers
  }));

app.use(express.json());

app.listen(3000, () => {
    console.log("Server is running");
});

app.get('/getData', (req, res) => {
    res.send("Hello");
});

// Create Student
app.post('/api/saveStudent', async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(200).json(student);
    } catch (error) {
        // res.status(500).json({ message: error.message });
        if (error.code === 11000) { // Duplicate key error code
            res.status(400).json({ message: "Student ID must be unique!" });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
});

// Get Students
app.get('/api/getStudents', async (req, res) => {
    try {
        const students = await Student.find({});
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get Selected Student
app.get('/api/getSelectedStudent/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({ message: "Student not found!" });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Student
app.put('/api/updateStudent/:studentId', async (req, res) => {
    try {
        const { studentId } = req.params;
        const student = await Student.findOneAndUpdate({ studentId }, req.body, { new: true });

        if (!student) {
            return res.status(404).json({ message: "Student not found!" });
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// app.put('/api/updateStudent/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const student = await Student.findByIdAndUpdate(id, req.body, { new: true });
//         if (!student) {
//             return res.status(404).json({ message: "Student not found!" });
//         }
//         res.status(200).json(student);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// Delete Student
app.delete('/api/deleteStudent/:studentId', async (req, res) => {
    try {
        const { studentId } = req.params;
        const student = await Student.findOneAndDelete({ studentId });

        if (!student) {
            return res.status(404).json({ message: "Student not found!" });
        }

        res.status(200).json({ message: "Student deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// app.delete('/api/deleteStudent/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const student = await Student.findByIdAndDelete(id);
//         if (!student) {
//             return res.status(404).json({ message: "Student not found!" });
//         }
//         res.status(200).json({ message: "Deleted Successfully!" });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ExpressCrudApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to database");
})
.catch((error) => {
    console.error("Error connecting to the database", error);
});




























// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import Student from './models/Student.js'; // Ensure this path is correct
// // const Student = require('./models/student.model');
// const app = express()

// app.use(cors());

// app.use(express.json());


// app.listen(3000, ()=>{
//     console.log("Server is running");
    
// });

// app.get('/getData',(req,res)=>{
//     res.send("Hello");
// });

// // Create Student
// app.post('/api/saveStudent',async(req,res)=>{
//     try{
//          const student = await Student.create(req.body);
//          res.status(200).json(student);
//     }catch(error){
//         res.status(500).json({message: error.message});
//     }
// });

// // Get Student
// app.get('/api/getStudents',async(req,res)=>{
//     try{
//          const students = await Student.find({});
//          res.status(200).json(students);
//     }catch(error){
//         res.status(500).json({message: error.message});
//     }
// });

// // Get Selected Student
// app.get('/api/getSelectedstudent/:id',async(req,res)=>{
//     try{
//         const { id } = req.params;
//         const students = await Student.findById(id);
//         res.status(200).json(students);
//     }catch(error){
//         res.status(500).json({message: error.message});
//     }
// });


// // Update Student
// app.put('/api/updateStudent/:id',async(req,res)=>{
//     try{
//         const { id } = req.params;
//         const student = await Student.findByIdAndUpdate(id,req.body);
//         if(!student){
//             return res.status(404).json({message: "not found student!"});
//         }

//         const updatedStudent = await Student.findById(id);
//         res.status(200).json(updatedStudent);
//     }catch(error){
//         res.status(500).json({message: error.message});
//     }
// });

// // Delete Student
// app.delete('/api/deleteStudent/:id',async(req,res)=>{
//     try{
//         const { id } = req.params;
//         const students = await Student.findByIdAndDelete(id);
//         if(!students){
//             return res.status(404).json({message: "not found student!"});
//         }

//         res.status(200).json({message: "Deleted Successfully!"});
//     }catch(error){
//         res.status(500).json({message: error.message});
//     }
// });






// mongoose.connect('mongodb://localhost:27017/ExpressCrudApp', {
    
// })
// .then(() => {
//     console.log("Connected to database");
// })
// .catch(() => {
//     console.log("Error connecting to the database");
// });