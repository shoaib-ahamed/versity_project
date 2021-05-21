import Plo from '../../models/ploModel'
import connectDB from '../../utils/connectDB'


connectDB()

export default async (req, res) => {
    switch(req.method){
        case "POST":
            await updatedPlo(req, res)
            break;
    }
}



const updatedPlo = async (req, res) => {
  
    try{

        const {plo , clo1 , clo2 , clo3, clo4 , clo5 , clo6 } = req.body

        console.log(req.body)

        console.log(clo1)

        const newResult = new Plo({ 
           plo , clo1 , clo2 , clo3, clo4 , clo5 , clo6
        })

        console.log(newResult)

        await newResult.save()
        res.json({
            msg: "Updated Plo result success!",
        })

    }catch(err){
        return res.status(500).json({err: err.message})
    }
}