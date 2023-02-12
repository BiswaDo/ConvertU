const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();


app.set("view engine","ejs");
app.use(express.static("public"));
app.use("/steps-image", express.static("steps-image"));
app.use("/script",express.static("script"));

app.use(express.urlencoded({extended: true}));

app.use(express.json());

app.get("/", function(req,res){
    res.render("index");
});

app.get("/about",function(req,res){
    res.render("about");
})

app.get("/help", function(req,res){
    res.render("help");
})

app.post("/",function(req,res){
    res.redirect("/");
})



app.post("/download-mp3", async function(req,res){
    const videoId = req.body.videoID;
    if(
        videoId === undefined || videoId === "" || videoId === null
    ){
        return res.render("index",{success:false,message:"Please enter the valid video id."});
    }else{
        const fetchAPI = await fetch(`https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`,{
            "method":"GET",
            "headers":{
                "x-rapidapi-key": process.env.api_key,
                "x-rapidapi-host": process.env.api_host
            }
        });

        
        const fetchResponce = await fetchAPI.json();
        
        if(fetchResponce.status === "ok")
        return res.render("index", {success:true, song_title: fetchResponce.title, song_link: fetchResponce.link});
        else
        return res.render("index",{success:false, message: fetchResponce.msg}); 
        }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
    console.log(`server started on ${PORT}`);
});