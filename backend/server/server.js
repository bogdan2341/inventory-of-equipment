const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectToDb = require("./database");

const errorHandler = require("./middleware/errorHandler");

const apiRoutes = require("./routes");

require("dotenv").config();
const { PORT, DB_URI } = process.env || 3030;

connectToDb(DB_URI);

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/", apiRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server is starting on port " + PORT);
});
