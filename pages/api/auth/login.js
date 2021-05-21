import bcrypt from 'bcrypt'
import Teacher from '../../../models/teacherModel'
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
        const { id , password } = req.body

        console.log(id)
        
        const teacher = await Teacher.findOne({ id })

        console.log(teacher)
        
        if(!teacher) return res.status(400).json({err: 'This teacher does not exist.'})

        const isMatch = await bcrypt.compare(password, teacher.password)
        if(!isMatch) return res.status(400).json({err: 'Incorrect password.'})

        const access_token = createAccessToken({id: teacher._id})
        const refresh_token = createRefreshToken({id: teacher._id})

        
        res.json({
            msg: "Login Success!",
            refresh_token,
            access_token,
            teacher: {
                id: teacher.id,
                role: teacher.role,
                avatar: teacher.avatar,
            }
        })
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}