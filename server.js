const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const { application } = require("express");
const api = mysql.createConnection({
  host: "cappin.cbpba6q3mggr.us-east-1.rds.amazonaws.com",
  user: "Mariah",
  password: "MariahMarie14",
  database: "Cap",
});

api.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("Connected to Server");
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
  });
});
app.get("/Resources", (req, res) => {
  const sql = "SELECT * FROM Resources WHERE Category='Affordable Housing'";
  api.query(sql, (err, results) => {
    res.send(results);
  });
});
app.get("/Resources", (req, res) => {
  const sql = "SELECT * FROM Resources WHERE Category = 'Job Training' ";
  api.query(sql, (err, results) => {
    res.send(results);
  });
});
app.get("/Resources", (req, res) => {
  const sql = "SELECT * FROM Resources WHERE Category = 'Financial Education' ";
  api.query(sql, (err, results) => {
    res.send(results);
  });
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
        res
          .status(400)
          .json({ message: "Couldn't send contact. Try again Later." });
      }
    }
  );
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  api.query(
    "SELECT * FROM Accounts WHERE Email = ?",
    [email],
    (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        const user = results[0];
        if (user.Passwords === password) {
          res.json({ message: "login successful" });
          console.log("login successful");
        } else {
          res.json({ message: "login failed" });
        }
      } else {
        res.json({ message: "Invalid password or email" });
      }
    }
  );
});

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
  console.log("Server started on port 3000");
});

//setting up the forum page
app.get("/Forum", (req, res) => {
  const sql = "SELECT * FROM Forum";
  api.query(sql, (err, results) => {
    res.send(results);
  });
});

// //adding requests that align with filter methods
// //makes it easier to navigate posts with these filters
// //will try to add a search function but will see how hard that is
// app.get("/Forum", (req, res) => {
//   const sql = "SELECT * FROM Forum WHERE Category='Affordable Housing'";
//   api.query(sql, (err, results) => {
//     res.send(results);
//   });
// });
// app.get("/Forum", (req, res) => {
//   const sql = "SELECT * FROM Forum WHERE Category = 'Job Training' ";
//   api.query(sql, (err, results) => {
//     res.send(results);
//   });
// });
// app.get("/Forum", (req, res) => {
//   const sql = "SELECT * FROM Forum WHERE Category = 'Financial Education' ";
//   api.query(sql, (err, results) => {
//     res.send(results);
//   });
// });

// //in this get route going to setup another page so that it displays and gives you access to edit previous posts you've made
// app.get("/Forumedits", (req, res) => {
//   const sql =
//     "SELECT * FROM Forum WHERE Username = 'the username im going to pull from the localstorage'";
//   api.query(sql, (err, results) => {
//     res.send(results);
//   });
// });

// //going to need a post route so that it updates into the database whatever edits have been made
// app.post("/api/Forumedits", (req, res) => {
//     const { updatedContent } = req.body;
//     // Insert the data into the Contact table
//     api.query(
//       "INSERT INTO Forum (updatedContent) VALUES (?)",
//       [updatedContent],
//       (error, results) => {
//         if (error) throw error;
//         if (results.affectedRows > 0) {
//           res.redirect("/Forum");
//           console.log("You're edits have been made");
//         } else {
//           res
//             .status(400)
//             .json({ message: "Couldn't send updates. Try again Later." });
//         }
//       }
//     );
//   });
