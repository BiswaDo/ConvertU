const express = require("express");
const https = require("https"); 
const { URL } = require("url");  
require("dotenv").config();

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/steps-image", express.static("steps-image"));
app.use("/script", express.static("script"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
    res.render("index");
});

app.get("/about", function (req, res) {
    res.render("about");
});

app.get("/help", function (req, res) {
    res.render("help");
});

app.post("/", function (req, res) {
    res.redirect("/");
});

app.post("/download-mp3", async function (req, res) {
    const video = req.body.videoID;
    
    if (!video) {
        return res.render("index", { success: false, message: "Please enter the valid video url." });
    } else {
        // Construct the URL using the 'URL' module
        const apiUrl = new URL(`https://youtube-mp3-downloader2.p.rapidapi.com/ytmp3/ytmp3/?url=${video}`);
        
        // Make the request using the 'https' module
        const fetchAPI = https.request(apiUrl, {
            method: "GET",
            headers: {
                "x-RapidApi-key": process.env.api_key,
                "x-RapidApi-host": process.env.api_host,
            },
        });

        // Handle the response
        fetchAPI.on("response", async (response) => {
            let data = "";
            response.on("data", (chunk) => {
                data += chunk;
            });

            response.on("end", () => {
                const fetchResponce = JSON.parse(data);
                res.write(<h1>Song name :"+fetchResponce.title+"</h1>);
                res.write(<h2>Click here to download:- <a href='"+fetchResponce.link+"'>Download</a></h2>);
                res.send();
            });
        });

        fetchAPI.end();
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log(`server started on ${PORT}`);
});
