const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Handle routes
const users = require("./routes/api/users");
const posts = require("./routes/api/posts");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());

//PORT TO RUN
const PORT = process.env.PORT || 5000;

// Db config
const db = require("./config/keys").mongoURI;

// Mongoose db connect
mongoose
  .connect(db, {
    useNewUrlParser: true
  })
  .then(() => console.log("Database up and running"))
  .catch(err => console.log("Database connection failed", err));

// HANDLE CORS
app.use((req, res, next) => {
  // req.header("Access-Control-Allow-Origin", "*");
  // // req.header('Access-Control-Allow-Headers', 'Origin, X-Requsted-With, Content-Type')
  // req.header("Access-Control-Allow-Headers", "*");

  // if (req.method === "OPTIONS") {
  //   req.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
  //   return res.status(200).json({});
  // }
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

// handle users route
app.use("/api/users", users);
app.use("/api/posts", posts);

//@router test
app.get("/", (req, res) =>
  res.json({
    greet: "hello"
  })
);

app.listen(PORT, () => {
  console.log("Server is running at port", +PORT);
});
