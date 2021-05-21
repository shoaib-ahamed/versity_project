import Student from '../../../models/studentModel'
import connectDB from '../../../utils/connectDB'


connectDB()

export default async (req, res) => {
    switch(req.method){
        case "POST":
            await updatedStudent(req, res)
            break;
    }
}



const updatedStudent = async (req, res) => {
  
    try{

        const { course_id , id , quiz , mid , final , attendance_mark , project_mark , assignment_mark , grade , clo} = req.body

        const newResult = new Student({ 
            course_id , id  ,quiz,  mid, final , attendance_mark , project_mark , assignment_mark , grade , clo
        })

        await newResult.save()
        res.json({
            msg: "Updated student result success!",
        })

    }catch(err){
        return res.status(500).json({err: err.message})
    }
}