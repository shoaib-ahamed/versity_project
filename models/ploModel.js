import mongoose from 'mongoose'

const ploSchema = new mongoose.Schema({
  plo : string,
  clo1 : string,
  clo2 : string,
  clo3 : string,
  clo4 : string,
  clo5 : string,
  clo6 : string
}, {
    timestamps: true
})

let Dataset = mongoose.models.plos || mongoose.model('plos', ploSchema)
export default Dataset