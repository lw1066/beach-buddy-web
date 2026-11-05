const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const axios = require("axios");

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/info", async function (req, res) {
  const { lat, long } = req.query;

  // Ensure lat and long are provided
  if (!lat || !long) {
    return res
      .status(400)
      .json({ error: "Latitude and longitude are required query parameters" });
  }

  console.log("calling in info function");

  // Construct Geoapify API URL
  const apiUrl = `https://api.geoapify.com/v2/places?categories=amenity,leisure,catering&filter=circle:${long},${lat},2000&bias=proximity:${long},${lat}&limit=20&apiKey=${process.env.geoapifyKey}`;

  try {
    // Make GET request to Geoapify API
    const response = await axios.get(apiUrl);
    const data = response.data;

    // Return the response data
    return res.json(data);
  } catch (error) {
    // Return error if request fails
    return res
      .status(error.response?.status || 500)
      .json({ error: error.message });
  }
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
