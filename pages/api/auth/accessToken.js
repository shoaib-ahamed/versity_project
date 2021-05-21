import jwt from 'jsonwebtoken';
import Students from '../../../models/studentModel';
import connectDB from '../../../utils/connectDB';
import { createAccessToken } from '../../../utils/generateToken';

connectDB()

export default async (req, res) => {
    try{

        const rf_token = req.cookies.refreshtoken;

        console.log(rf_token);
        
        if(!rf_token) return res.status(400).json({err: 'Please login now!'})

        const result = jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET)

        if(!result) return res.status(400).json({err: 'Your token is incorrect or has expired.'})

        const student = await Students.findById(result.id)
        if(!student) return res.status(400).json({err: 'student does not exist.'})

        console.log(student)

        const access_token = createAccessToken({id: student._id})

        res.json({
            access_token,
            student: {
                id: student.id,
                role: student.role,
                avatar: student.avatar
            }
        })
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}

