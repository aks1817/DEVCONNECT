const express = require("express");
const connectDB = require("./config/db");
const app = express();
const path = require("path");

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

//Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));

if (process.env.NODE_ENV === "production") {
  //static files
  app.use(express.static(path.resolve(__dirname, "client", "build")));

  app.get("/", function (req, res) {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT =
  process.env.PORT ||
  4050; /* That process.env.PORT line is for the port that will be used when hosted on Heroku or 5000 port will be used in local */
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
