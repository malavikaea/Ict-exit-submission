//Write missing codes here
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: String,
  content: String,
  img_url: String,
});
module.exports=mongoose.model('blog',schema)

