import Student from '../../../models/studentModel'
import connectDB from '../../../utils/connectDB'
import { createAccessToken, createRefreshToken } from '../../../utils/generateToken'


connectDB()

export default async (req, res) => {
    switch(req.method){
        case "POST":
            await login(req, res)
            break;
    }
}

const login = async (req, res) => {
    try{
        const { id } = req.body
        
        const student = await Student.findOne({  id : id })
        
        if(!student) return res.status(400).json({err: 'This Student does not exist.'})

        const access_token = createAccessToken({id: student._id})
        const refresh_token = createRefreshToken({id: student._id})

        
        res.json({
            msg: "Login Success!",
            refresh_token,
            access_token,
            student: {
                course_id: student.course_id,
                id: student.id,
                role: student.role,
                avatar: student.avatar,
                quiz: student.quiz,
                mid: student.mid,
                final: student.final,
                attendance_mark: student.attendance_mark,
                project_mark: student.project_mark,
                assignment_mark: student.assignment_mark,
                grade: student.grade,
                clo: student.clo
            }
        })
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}