
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// express configuration
var app = express();
var PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// listening to PORT
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

// URL routing
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});
app.get("/tables", function(req, res) {
  // call function getTableReservations and generate HTML
  res.sendFile(path.join(__dirname, "tables.html"));
  getTableReservations();
  
});
app.post("/reserve", function(req, res) {
  // prase user input and push them to the end of array "reservatioList"
  var customerInfo = req.params.reserve;
  customerInfo.routeName = customerInfo.name.replace(/\s+/g, "").toLowerCase();
  reservationList.push(customerInfo);
  res.json(customerInfo);
  
});


// Reservation List
var reservationList = [{
  name: "Alan",
  phone: "9593942929",
  email: "a@m.com",
  id: 900
}];
var tableLimit = 5;

// returns and array of objects - reservations for those who got a table based on the limit
function getTableReservations(){
  var tableReservations = [];
  var limit;
  // checks to see if the reservation list is more or less than the number of tables
  if (reservationList.length > tableLimit){
    limit = tableLimit;
  }
  else{
    limit = reservationList.length;
  }
  for(var i = 0; i < limit; i++){
    tableReservations.push(reservationList[i]);
  }
  return tableReservations;
}

// returns and array of objects - waiting for those who did not get a table
function getWaitingList(){
  var waitingList = [];
   for(var i = tableLimit; i < reservationList.length; i++){
    waitingList.push(reservationList[i]);
  }
  return waitingList;
}

// console.log("Table Reservations ")
// console.log(getTableReservations());
// console.log("Waiting List ");
// console.log(getWaitingList())