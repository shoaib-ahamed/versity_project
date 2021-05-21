import mongoose from 'mongoose'

const ploSchema = new mongoose.Schema({
  plo : String,
  clo1 : String,
  clo2 : String,
  clo3 : String,
  clo4 : String,
  clo5 : String,
  clo6 : String
}, {
    timestamps: true
})

let Dataset = mongoose.models.plos || mongoose.model('plos', ploSchema)
export default Dataset