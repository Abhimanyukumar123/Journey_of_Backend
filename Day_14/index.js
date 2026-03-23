const mongoose = require('mongoose');
async function main() {
  await mongoose.connect("mongodb+srv://coderArmy9:Hunter%409Bhai@codingadda.4ugikcf.mongodb.net/Bookstore");
  const userSchema = new Schema({
    name:String,
    age: Number,
    city:String,
    gender: String
  })
  //Model ko create === Collection create karna(Table ko create karna)
  //Class create kari hai
  const User = mongoose.model("user",userSchema);
  //Document ko create kiya hai or Object ko create kiya hai
  const user1 = new User({name:"Abhimanyu",age:20,city:"dwarka", gender:"Male"});
  await user1.save();

  await User.create({name:"Mohan", city:"pakistan", age:30});


  await User.insertMany([{name:"Ipsita", age:18},{age:25, gender:"Male"}]);


  const ans = await User.find({});
  console.log(ans);

  //find document by particular field

  const result = await User.find({name:"Abhimanyu"});
  console.log(result);

}
module.exports = main;