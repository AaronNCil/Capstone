const express = require("express"); 
const app = express();
const cors = require("cors"); 
const path = require("path"); 
const mysql = require("mysql"); 
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const api = mysql.createConnection ({
    host: "cappin.cbpba6q3mggr.us-east-1.rds.amazonaws.com",
    user: "Mariah",
    password: "MariahMarie14", 
    database: "Cap"
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
    const sql = "SELECT * FROM Resources";
    api.query(sql, (err, results) => {
        res.send(results); 
    })
});
app.get("/Resources", (req, res) => {
    const sql = "SELECT * FROM Resources WHERE Category='Affordable Housing'";
    api.query(sql, (err, results) => {
        res.send(results); 
    })
});
app.get("/Resources", (req, res) => {
    const sql = "SELECT * FROM Resources WHERE Category = 'Job Training' ";
    api.query(sql, (err, results) => {
        res.send(results); 
    })
});
app.get("/Resources", (req, res) => {
    const sql = "SELECT * FROM Resources WHERE Category = 'Financial Education' ";
    api.query(sql, (err, results) => {
        res.send(results); 
    })
});

app.post("/api/signup", (req, res) => {
    const { name, email, password, location } = req.body;
    // Insert the data into the Users table
    api.query(
      "INSERT INTO Accounts (Username, Email, Passwords, Location) VALUES (?, ?, ?, ?)",
      [name, email, password, location],
      (error, results) => {
        if (error) throw error;
        if (results.affectedRows > 0) {
          res.redirect("/login");
          console.log("added user");
        } else {
          res.status(400).json({ message: "Sign up failed" });
        }
      }
    );
  });
  app.post("/api/contact", (req, res) => {
    const { firstname, lastname, phonenumber, email, note } = req.body;
    // Insert the data into the Contact table
    api.query(
      "INSERT INTO Contact (FirstName, LastName, PhoneNumber, Email, Note) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, phonenumber, email, note],
      (error, results) => {
        if (error) throw error;
        if (results.affectedRows > 0) {
          res.redirect("/");
          console.log("Thank you for contacting us!");
        } else {
          res.status(400).json({ message: "Couldn't send contact. Try again Later." });
        }
      }
    );
  });

  app.post('/api/login', (req, res) => {

    const q = "SELECT * FROM Accounts WHERE EMAIL = ?";
    const value = req.body.email;

    api.query(q, value, (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found!");
        if (req.body.password !== data[0].Passwords) return res.status(400).json("Wrong username or password!");
        const token = jwt.sign({ id: data[0].id }, "jwtkey");
        const { password, ...other } = data[0];

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);

    })
    return res.data;
})


app.post("/api/logout", (req, res) => {
    res.clearCookie("access_token",{
        sameSite:"none",
        secure:true
      });
      res.status(200).send("User logged out");
})
app.use(express.static("assets"));
app.use(express.static(path.join(__dirname, "build")));
app.get("*", (req, res) => {
    try {
        res.sendFile(path.join(__dirname, "build", "index.html"));
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