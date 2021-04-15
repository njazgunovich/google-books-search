const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const bookSchema=new Schema({
    authors: [String],
    description: String, 
    image: String,
    link: String, 
    title: String 
  
})
module.exports = mongoose.model("Book",bookSchema)