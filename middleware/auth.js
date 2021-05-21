import jwt from 'jsonwebtoken';
import Students from '../models/studentModel';


const auth = async (req, res) => {
    const token = req.headers.authorization;
    if(!token) return res.status(400).json({err: 'Invalid Authentication.'})

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    if(!decoded) return res.status(400).json({err: 'Invalid Authentication.'})

    console.dir(decoded)

    const user = await Students.findOne({_id: decoded.id})

    return {id: student.id, role: user.role, root: user.root};
}


export default auth