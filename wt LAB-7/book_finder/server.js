const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const client = new MongoClient("mongodb://127.0.0.1:27017");

let db;

async function connectDB(){
    await client.connect();
    db = client.db("book_store");
    console.log("MongoDB Connected");
}

connectDB();


// Search book by title
app.get("/books/search", async(req,res)=>{

    const title = req.query.title;

    const books = await db.collection("books")
    .find({title:{$regex:title,$options:"i"}})
    .toArray();

    res.send(books);
});


// Filter by category
app.get("/books/category/:category", async(req,res)=>{

    const books = await db.collection("books")
    .find({category:req.params.category})
    .toArray();

    res.send(books);
});


// Sort books
app.get("/books/sort/:field", async(req,res)=>{

    let field=req.params.field;
    let order=1;

    if(field==="rating"){
        order=-1;
    }

    const books = await db.collection("books")
    .find()
    .sort({[field]:order})
    .toArray();

    res.send(books);
});


// Top rated books
app.get("/books/top", async(req,res)=>{

    const books = await db.collection("books")
    .find({rating:{$gte:4}})
    .limit(5)
    .toArray();

    res.send(books);
});


// Pagination
app.get("/books", async(req,res)=>{

    let page=parseInt(req.query.page)||1;
    let limit=5;
    let skip=(page-1)*limit;

    const books = await db.collection("books")
    .find()
    .skip(skip)
    .limit(limit)
    .toArray();

    res.send(books);
});


app.listen(3000,()=>{
    console.log("Server running on port 3000");
});