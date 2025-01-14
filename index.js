import express from "express";  
import bodyParser from "body-parser"; 
import cors from "cors"; 
import quotesRoutes from "./routes/quotes.js";  
import httpAuth from "http-auth";
import authConnect from "http-auth-connect"; 

const app = express(); 
app.use(cors()); 
const PORT = process.env.PORT || 5000; 

app.use(bodyParser.json()); 

const digest = httpAuth.digest({
    realm: "exampleRealm",
    file: ".htdigest" 
});

app.use('/quotes', authConnect(digest), quotesRoutes); 

app.get('/', authConnect(digest), (req, res) => { 
    res.send(`Hello from express - ${req.user}!`); 
}); 

app.listen(PORT, () => { 
    console.log(`Server is up and running on port ${PORT}!`); 
});
