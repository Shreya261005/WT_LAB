const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

let db;

async function connectDB() {
    await client.connect();
    db = client.db("student_notes");
    console.log("MongoDB Connected");
}
connectDB();


// ADD NOTE
app.post("/notes", async (req, res) => {

    const note = {
        title: req.body.title,
        subject: req.body.subject,
        description: req.body.description,
        created_date: new Date().toISOString().split("T")[0]
    };

    await db.collection("notes").insertOne(note);
    res.send({message:"Note Added"});
});


// VIEW NOTES
app.get("/notes", async (req, res) => {

    const notes = await db.collection("notes").find().toArray();
    res.send(notes);
});


// UPDATE NOTE
app.put("/notes/:id", async (req, res) => {

    const id = req.params.id;

    await db.collection("notes").updateOne(
        {_id: new ObjectId(id)},
        {$set:{
            title:req.body.title,
            description:req.body.description
        }}
    );

    res.send({message:"Note Updated"});
});


// DELETE NOTE
app.delete("/notes/:id", async (req, res) => {

    const id = req.params.id;

    await db.collection("notes").deleteOne(
        {_id:new ObjectId(id)}
    );

    res.send({message:"Note Deleted"});
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});