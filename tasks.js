const app = require("express")();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
    extended: false
}));

// mongodb require
const mongodb   = require("mongodb").MongoClient;
const ObjectID  = require("mongodb").ObjectID;

// mongodb config
const DBUrl     = "mongodb://127.0.0.1:27017/";
const DBName    = "tasks";

// mongodb connection
let dbo = null;
mongodb.connect(DBUrl, (err, res) => {

    if(err) throw err; //if have a error, throw to node server
    dbo = res.db(DBName);

})

// REST API

    // Endpoint tasks:
        // GET tasks
        app.get("/tasks", (req, res) => {

            dbo.collection("tasks").find().toArray((err, body) => {
                if(err) throw err;
                res.json(body);
            })

        })

        // GET one tasks with id
        app.get("/tasks/:id", (req, res) => {

            let id = req.params.id;
            let ido = new ObjectID(id);

            dbo.collection("tasks").find({
                _id: ido
            }).toArray((err, body) => {

                if(err) throw err;
                res.json(body);

            })

        })

        // POST one tasks
        app.post("/tasks", (req, res) => {

            let task = req.body.task;

            dbo.collection("tasks").insertOne({
                task: task
            }, (err, body) => {
                if(err) throw err;

                res.json(body);
            })

        })

        // PUT one tasks WITH ID
        app.put("/tasks/:id", (req, res) => {

            let ido = new ObjectID(req.params.id);
            let task = req.body.task;

            dbo.collection("tasks").updateOne({
                _id: ido
            }, {
                $set: {
                    task: task
                }
            }, (err, body) => {

                if(err) throw err;
                res.json(body);

            })

        })

        // DELETE ONE TASK WITH ID
        app.delete("/tasks/:id", (req, res) => {

            let ido = new ObjectID(req.params.id);

            dbo.collection("tasks").deleteOne({
                _id: ido
            }, (err, body) => {
                if(err) throw err;

                res.json(body);
            })

        })

// SERVER LISTEN PORT
app.listen(8000, (err) => {
    if(err) throw err;
    console.log("BERHASIL DI JALANKAN");
})