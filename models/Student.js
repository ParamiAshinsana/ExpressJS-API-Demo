// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const StudentSchema = mongoose.Schema(
    {
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