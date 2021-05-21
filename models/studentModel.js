import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({
    id: { 
        type: String,
        required: true
    },
    role: {type: String,default: 'student'},
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png'
    },
    course_id: String,
    quiz: String,
    mid: String,
    final: String,
    attendance_mark: String,
    project_mark: String,
    assignment_mark: String,
    grade: String,
    plo : {
        type: String
    },
    clo: String
}, {
    timestamps: true
})

let Dataset = mongoose.models.students || mongoose.model('students', studentSchema)
export default Dataset