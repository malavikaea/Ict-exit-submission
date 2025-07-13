const express = require("express");
const mongoose = require('mongoose')
require('./connection');;
const cors = require("cors");
const Blogmodel= require("./model")
const app = express();
var PORT = 3001;
app.use(express.json());
app.use(cors());

// connectD();
//Write your POST API here
app.post("/add",async(req,res)=>{
try{
  const newBlog = new Blogmodel(req.body); // create new instance
  const savedBlog = await newBlog.save();  // await save
  console.log("Saved to DB:", savedBlog);  // show saved result

  res.status(201).send({
      message: "Blog added",
      blog: savedBlog,
  });
  // await Blogmodel(req.body).save()
  // res.send({messaage:"data added"})
  // console.log(req.body);
}catch(error){
  console.log(error)
}
})
app.get("/get", async (req, res) => {
  try {
    let data = await Blogmodel.find();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});
//update blog
app.put('/update/:id',async(req,res)=>{
  try{
    await Blogmodel.findByIdAndUpdate(req.params.id,req.body)
    res.send({message:"data updated"})
  }catch(error){
    console.log(error)
  }
})
app.delete('/delete/:id',async(req,res)=>{
try{
  await Blogmodel.findByIdAndDelete(req.params.id);
  res.send({message:"Deleted"})
}
catch(error){
  console.log(error)

}})
app.listen(PORT, () => {
  console.log(`${PORT} is up and running`);
});
