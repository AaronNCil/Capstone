const express = require("express"); 
const app = express();
const cors = require("cors"); 
const path = require("path"); 
const mysql = require("mysql"); 
const bodyParser = require("body-parser");
const api = mysql.createConnection ({
    host: "capstone.cbpba6q3mggr.us-east-1.rds.amazonaws.com",
    user: "Mariah",
    password: "MariahMarie14", 
    database: "capstone"
})

api.connect((err) => {
    if (err) {
        throw err; 
    } else {
        console.log("Connected to Server")
    }
}); 

const handleQueryResult = (err, results, res) => {
    if (err) {
        console.error(err); 
        return res.status(500).send("Internal Server Error");
    }
    if (results.length === 0) {
        return res.status(404).send("No Results Found"); 
    }
    res.status(200).send(results);
};

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/Resources", (req, res) => {
    const sql = "SELECT * FROM Accounts";
    api.query(sql, (err, results) => {
        res.send(results); 
    })
});
app.use(express.static("assets"));
app.use(express.static(path.join(__dirname, "build")));
app.get("*", (req, res) => {
    try {
        res.sendFile(path.join(__dirname, "build, "index.html")); 
    } catch (error) {
        console.error(error); 
        res.status(500).send("Internal Server Error");
    }
});
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); 
    next(); 
});
app.listen(3000, () => {
    console.log("Server started on port 3000")
})