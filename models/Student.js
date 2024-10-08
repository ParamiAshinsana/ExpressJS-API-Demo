// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const StudentSchema = mongoose.Schema(
    {
        studentId: {
            type: String,
            required: [true, "Please Enter Student Id !"],
            unique: true, // Enforce unique constraint
        },
        name: {
            type: String,
            required: [true, "Please Enter Student name !"],
        },
        address: {
            type: String,
            required: [true, "Please Enter Student name !"],
        },
    },
    {
        timestamps: true
    }

);

const Student = mongoose.model("Student",StudentSchema);

// module.exports = Student;
export default Student;