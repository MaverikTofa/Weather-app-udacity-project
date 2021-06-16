/*Comments from commentsOnlyJs folder*/
////// Setup empty JS object to act as endpoint for all routes -->done projectData object
////// Express to run server and routes -->done
////// Start up an instance of app -->done
/////* Dependencies */ --> done express,body-parser,cors
/////* Middleware*/ --> done
////// Here we are configuring express to use body-parser as middle-ware. -->done
////// Cors for cross origin allowance -->done
////// Initialize the main project folder -->done static"website
////// Spin up the server --> done
////// Callback to debug --> done console.log(spin up)
////// Initialize all route with a callback function --> done
////// Callback function to complete GET '/all' --> done
////// Post Route -->done

// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require("body-parser");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// GET "/all" sending projectData object back to client side
app.get("/all", (req, res) => {
    res.send(projectData);
});

// POST "/data" receiving data from client side and save it in projectData object
app.post("/save", (req, res) => {
    res.send(
        (projectData.date = req.body.date),
        (projectData.temprature = req.body.temprature),
        (projectData.feelings = req.body.feelings)
    );
});

// Setup Server
const port = 8000;
app.listen(port, () => console.log(`Spun & Running on port ${port}`));
