import mongoose from 'mongoose'

const connectDB = () => {
          if(mongoose.connections[0].readyState){
                    console.log('DB is connected...')
                    return
          }
          mongoose.connect(process.env.MONGODB_URL , {
                    useCreateIndex: true,
                    useFindAndModify: false,
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
          }, err => {
                    if(err) throw err;
                    console.log('connected to MongoDB.')
          })
}

export default connectDB