const express = require("express");
const app = express();
const {Auth} = require("./middleware/auth")
app.use(express.json());

const FoodMenu = [
    {id:1, food:"Chowmein", category:"veg", price:500},
    {id:2, food:"Butter Naan", category:"veg", price:100},
    {id:3, food:"Chicken", category:"non-veg", price:1000},
    {id:4, food:"Mutton", category:"non-veg", price:1500},
    {id:5, food:"Momo", category:"veg", price:300},
    {id:6, food:"Chai", category:"veg", price:50},
    {id:7, food:"Rajma", category:"veg", price:300},
    {id:8, food:"Roti", category:"veg", price:20},
    {id:9, food:"Lolipop", category:"non-veg", price:700},
    {id:10, food:"Kebab", category:"non-veg", price:400},
    {id:11, food:"paneer", category:"veg", price:800},
    {id:12, food:"Egg Curry", category:"non-veg", price:300},
    {id:13, food:"salad", category:"veg", price:100},
    {id:14, food:"shourma", category:"veg", price:300},
    {id:15, food:"Butter Chicken", category:"non-veg", price:900},
    {id:16, food:"Mushroom", category:"veg", price:700},
]

const AddToCart = [];
app.get("/food", (req,res)=>{
    res.status(200).send(FoodMenu);
})
app.post("/admin", Auth, (req,res)=>{
    try{
    FoodMenu.push(req.body);
    res.status(201).send("Item Added Succesfully");
    }
    catch(err){
        res.send(err);
    }
    
})
app.delete("/admin/:id", Auth, (req,res)=>{
    const id = parseInt(req.params.id);
    const index = FoodMenu.findIndex(item => item.id ===id);
        if(index===-1){
           res.send("Item Doesn't Exist");
        }
        else{
            FoodMenu.splice(index,1);
            res.send("Succesfully Deleted");
        }
})
app.patch("/admin", Auth, (req,res)=>{  
    const id = req.body.id;
    const fooddata = FoodMenu.find(item=> item.id===id);
        if(fooddata){
            
            if(req.body.food)
                fooddata.food = req.body.food;
            if(req.body.category)
                fooddata.category = req.body.category;
            if(req.body.price)
                fooddata.price = req.body.price;

            res.send("Successfully Updated");
        }
        else{
            res.send("Item not exist")
        }
})
app.post("/user/:id", (req,res)=>{
    const id = parseInt(req.params.id);
    const foodItem = FoodMenu.find(item=> item.id===id);
    if(foodItem){
        AddToCart.push(foodItem);
        res.status(200).send("Item added successfully");
    }
    else{
        res.send("Item Out of stack");
    }
})
app.delete("/user/:id", (req,res)=>{
    try{
    const id = parseInt(req.params.id);

    const index = AddToCart.findIndex(item=>item.id===id);

    if(index!=-1){
        AddToCart.splice(index,1);
        res.send("Item removed succesfully");
    }
    else{
        res.send("Item is not persent in cart");
    }}
    catch(err){
        res.send("Some error:" + err);
    }
})
app.get("/user",(req,res)=>{

    if(AddToCart.length==0)
        res.send("Cart is Empty")
    else
    res.send(AddToCart);
})

app.get("/dummy",(req,res)=>{

    try{
    throw new Error('BROKEN')
    res.send("Hello Coder");
    }
    catch(err){
        res.send("Some error Occured "+err);
    }
})
app.listen(3000, ()=>{
    console.log("Listening at port 3000");
})


const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
// username password cluster

// @ === %40
// @ == hexdecimal: 0x40
const url = "mongodb+srv://coderArmy9:Hunter%409Bhai@codingadda.4ugikcf.mongodb.net/";
const client = new MongoClient(url);

// Database Name
const dbName = 'CoderArmy';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('user');

  // the following code examples can be pasted here...

//   const findResult =  collection.find({});
//   const ans = await findResult.toArray();
  
//   let balance = 0;

//    for await (const doc of findResult){
//     console.log(doc);
//     balance++;
//    }
//   console.log('Found documents =>', ans);


// const insertResult = await collection.insertOne({name:"Soveer", age:40});
// console.log('Inserted documents =>', insertResult);

// const insertResult = await collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }]);
// console.log('Inserted documents =>', insertResult);

const filteredDocs = await collection.find({ a: 3 }).toArray();
console.log('Found documents filtered by { a: 3 } =>', filteredDocs);

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());