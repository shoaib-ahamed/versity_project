import bcrypt from 'bcrypt'
import Teachers from '../../../models/teacherModel'
import connectDB from '../../../utils/connectDB'
import valid from '../../../utils/valid'


connectDB()

export default async (req, res) => {
    switch(req.method){
        case "POST":
            await register(req, res)
            break;
    }
}

const register = async (req, res) => {
    try{
        const { id, password, cf_password } = req.body

        console.log('in reg page ' + id + ' ' + password + ' ' + cf_password)

        const errMsg = valid(id, password, cf_password)
        if(errMsg) return res.status(400).json({err: errMsg})

        console.log('valid')

        // const check_id = await Teachers.findOne({ id })

        // console.log(check_id)

        // if(check_id) return res.status(400).json({err: 'This id already exists.'})

        

        const passwordHash = await bcrypt.hash(password, 12)

        console.log('password hash ' + passwordHash)

        const newTeacher = new Teachers({ 
            id,  password: passwordHash
        })

        console.log(newTeacher)

        await newTeacher.save()
        res.json({msg: "Register Success!"})

    }catch(err){
        return res.status(500).json({err: err.message})
    }
}