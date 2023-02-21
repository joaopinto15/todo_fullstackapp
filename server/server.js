const express = require("express");
const cors = require("cors");
const todosRoutes = require("./todos.routes.js");
const { response } = require("express");
const app = express();

app.use(express.json());
app.use(cors());
app.use(todosRoutes);




app.listen(5000, () => console.log("http://localhost:5000/"));