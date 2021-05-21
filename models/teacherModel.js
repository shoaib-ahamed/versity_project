import mongoose from 'mongoose'

const teacherSchema = new mongoose.Schema({
    id: { 
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {type: String,default: 'teacher'},
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png'
    }
}, {
    timestamps: true
})

let Dataset = mongoose.models.teachers || mongoose.model('teachers', teacherSchema)
export default Dataset