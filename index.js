require('dotenv').config()
const express=require("express");
const cors = require("cors");
const Mssg = require("./configfb");


const app=express();
app.use(express.json());

const corsOptions = {
    origin: "http://localhost:3000" // frontend URI (ReactJS)
}
app.use(cors(corsOptions));

app.get('/', (req,res)=>{
    res.send("Working");
})

app.post('/chat', async (req,res)=>{
    const chat = req.body;
    var good = "Consectetur velit cillum Lorem proident ex anim.Mollit amet nisi esse fugiat aliqua officia consectetur tempor adipisicing officia sint aute magna eu."+Math.random()
    try{
        await Mssg.add(chat)
        .then(res.send({"answer":good}));
    }catch(err){
        console.log(err);
    }
    
})

app.post('/realtime', async (req,res)=>{
    const chat = req.body;
    var good = {"ath":"62000", "atl":"4800", "day":"34000", "night":"29234"}
    try{
        await Mssg.add(chat)
        .then(res.send({"answer":good}));
    }catch(err){
        console.log(err);
    }
    
})

app.listen(5000, ()=>{
    console.log("Backend is running on 5000");
})