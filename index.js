const app = require("express")();
const bodyParser = require("body-parser");

// use body-parser urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// Express require mongodb
const mongodb   = require("mongodb").MongoClient;
const objectID  = require("mongodb").ObjectID;

// DB url and db name
const DBURL     = "mongodb://127.0.0.1:27017/";
const dbName    = "sekolah";

// Connect to mongodb
let dbo = null;
mongodb.connect(DBURL, (err, db) => {
    if(err) throw err; //if this file has a error in connect to db, will throw an error to server node

    dbo = db.db(dbName); //inisialization
})

// get from mongodb
app.get("/students", (req, res) => {

    // get from collection siswa / table siswa
    dbo.collection("siswa").find().toArray((err, body) => {
        if(err) throw err;
        res.json(body);
    })
    

})

app.get("/students/:id", (req, res) => {

    let id = req.params.id;
    let id_object = new objectID(id);

    dbo.collection("siswa").find({
        _id:id_object
    }).toArray((err, body) => {

        if(err) throw err;
        res.json(body);

    })
    
})

app.post("/students", (req, res) => {

    let namaSiswa = req.body.nama;
    let kelasSiswa = req.body.kelas;

    dbo.collection("siswa").insertOne({
        nama: namaSiswa,
        kelas: kelasSiswa
    }, (err, body) => {
        
        if(err) throw err;
        res.json(body);

    })

})

app.put("/students/:id", (req, res) => {

    let ido = new objectID(req.params.id);
    let namaSiswa = req.body.nama;
    let kelasSiswa = req.body.kelas;

    dbo.collection("siswa").updateOne({
        _id: ido
    }, {$set: {
        nama: namaSiswa,
        kelas: kelasSiswa
    }}, (err, body) => {

        if(err) throw err;

        res.json(body);

    })
})

app.delete("/students/:id", (req, res) => {

    let ido = new objectID( req.params.id );

    dbo.collection("siswa").deleteOne({
        _id:ido
    }, (err, body) => {

        if(err) throw err;

        res.json(body);

    })

})

app.listen(3000, (err) => {

    if(err) throw err;
    console.log("SERVER BERHASIL DIMULAI");    

})
