//boilerplate code for all the modules the project needs, body parser for accessing data submited through a form, http to create requests to external servers
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");
require('dotenv').config();

const apiKey = process.env.API_KEY;
const listIdentifier = process.env.LIST_IDENTIFIER;

// allows the page to display static elements like css and images.
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

//gets page when a person goes to the home directory
app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
})

//activates when there is a post request at the home directory
app.post("/",function(req,res){

    //sets the variables equal to specific parts of the data body
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    
    //creates a variable that is equal to where the information from the form is going to post to the mailchimp server
    
    const url = "https://us8.api.mailchimp.com/3.0/lists/" + listIdentifier;

    // object that will is in a format that mailchimp will accept, defines certain fields that I have collected
    const data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME:lastName,
                }
            }
        ]
    }

    //converts the object into a string form that mailchimp will accet
    var jsonData = JSON.stringify(data);

    // an object that defines the specific parameters of the https.request() method
    //makes a post request to the mailchimp servers and also defines the api key for authentication
    var options = {
        method:"POST",
        auth:":" + apiKey
    }

    //sets a variable to a post request to mailchimp servers, after already sending the data
    //checks if it was succesful and if it is, the server sends the client the success page, but if it isnt then the server sends it the fialure page
    var request = https.request(url,options,function(response){
        
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        } else{
            res.sendFile(__dirname + "/failure.html");
        }
        
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })

  
    })

    //sends the psot request and passes through the data that it will send
    request.write(jsonData);
    request.end();
})

// determines what port the server will deploy the code on and what will happen as soon as the code is deployed
app.listen(process.env.PORT || 3000, function(){
    console.log("server is running on 3000");
})