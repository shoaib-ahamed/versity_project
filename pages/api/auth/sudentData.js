import Student from '../../../models/studentModel'
import connectDB from '../../../utils/connectDB'



connectDB()

export default async (req, res) => {
    switch(req.method){
        case "GET":
            await getStudentDataPostPlo(req, res)
            break;
    }
}


const getStudentDataPostPlo = async (req, res) => {
    const students = await Student.findAll()

    console.log(students)

    res.json({
        msg: "Login Success!",
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
}