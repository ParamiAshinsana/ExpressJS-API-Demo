const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please Enter Product name !"],

        },
        address: {
            type: String,
            required: [true, "Please Enter Product name !"],

        },
    },
    {
        timestamps: true
    }

);

const Student = mongoose.model("Student",StudentSchema);

module.exports = Student;