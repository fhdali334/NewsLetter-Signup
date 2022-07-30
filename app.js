
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req,res){
  const firstname = req.body.fname;
  const lastname = req.body.lname;
  const email = req.body.email;

  const data = {
    members:[
      {
      email_address:email,
      status: "subscribed",
      merge_fields: {
      FNAME: firstname,
      LNAME: lastname,
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);

const url = "https://us13.api.mailchimp.com/3.0/lists/2be13e13ca";

const options = {
  method : "POST",
  auth:"fahad:de523671543d17f3a2af3f33369b3bda-us13"
}

const request = https.request(url,options,function(response){

if(response.statusCode === 200){
  res.sendFile(__dirname + "/success.html")
}
else{
res.sendFile(__dirname + "/failure.html")
}

  response.on("data", function(data){
    console.log(JSON.parse(data));
  })
})

request.write(jsonData);
request.end();

});

app.post("/failure", function(req, res){
  res.redirect("/");
})

app.listen(3000);



// List ID
// 2be13e13ca
// API Key
// de523671543d17f3a2af3f33369b3bda-us13
