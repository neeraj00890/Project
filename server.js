const express = require("express");
const app = express();
require("dotenv").config(); 
require("./DataBase/database").connectDb();

const routes = require("./routes/routes")
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(routes)


app.listen(PORT,
    ()=> {
        console.log(`server is listening on ${PORT}`);
     });


