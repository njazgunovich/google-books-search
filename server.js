const express = require("express");
const path = require("path");
require("dotenv").config()
const bodyParser = require("body-parser")
require("./models/book")
const PORT = process.env.PORT || 3001;
const app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
const mongoose = require('mongoose');

const uri = `mongodb+srv://${process.env.ATLASUSERNAME}:${process.env.ATLASPASSWORD}@cluster0.7njwy.mongodb.net/googleBooks?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const Book= mongoose.model("Book")

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.post("/api/books", async function(req,res){
  const book= new Book(req.body)
  await book.save()
 res.send(201)
})
app.get("/api/books", async function(req,res){
  await Book.find({}, (err, docs) => {
    res.json(docs)
    })
})

app.delete("/api/books/:id", async function(req,res){
  Book.deleteOne({ _id: req.params.id}, function (err) {
    if(err) console.log(err);
    console.log("Successful deletion");
  });
})
// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
