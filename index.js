const app = require("express")();
const bodyParser = require("body-parser");

// use body-parser urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

app.get("/students", (req, res) => {

    res.end("MENAMPILKAN SISWA");

})

app.get("/students/:nama", (req, res) => {

    let namaSiswa = req.params.nama;

    res.end("Menampilkan data siswa dengan nama: " + namaSiswa);
    
})

app.post("/students", (req, res) => {

    let namaSiswa = req.body.nama;
    let alamat = req.body.alamat;

    res.end("MENAMBAH DATA SISWA DENGAN NAMA: "+ namaSiswa + " ALAMAT: "+ alamat);

})

app.put("/students/:id", (req, res) => {

    let id = req.params.id;
    let namaSiswa = req.body.nama;
    let alamat = req.body.alamat;

    res.end("MENGUPDATE DATA SISWA DENGAN ID: " + id + " MENJADI NAMA: " + namaSiswa + " ALAMAT: " + alamat);
})

app.delete("/students/:id", (req, res) => {

    let id = req.params.id;

    res.end("MENGHAPUS DATA SISWA DENGAN ID: " + id);

})

app.listen(3000, (err) => {

    if(err) throw err;
    console.log("SERVER BERHASIL DIMULAI");    

})
