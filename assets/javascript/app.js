// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCibHccsoOOucscr0E_0NOzXx0ZTqRxD7I",
  authDomain: "train-table-ca472.firebaseapp.com",
  databaseURL: "https://train-table-ca472.firebaseio.com",
  projectId: "train-table-ca472",
  storageBucket: "train-table-ca472.appspot.com",
  messagingSenderId: "941351706429",
  appId: "1:941351706429:web:1b7776804daa4dcea86f54"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

//Variables
var trainName = "";
var destination = "";
var firstTrain = "";
var frequency = 0;
var nextArrival = 0;
var minutesAway = 0;

$(document).on("click", "#submit", function () {
  event.preventDefault();

  trainName = $("#train-name").val().trim();
  destination = $("#destination").val().trim();
  firstTrain = $("#first-train").val().trim();
  frequency = $("#frequency").val().trim();

  $("#train-name").val("");
  $("#destination").val("");
  $("#first-train").val("");
  $("#frequency").val("");

  database.ref().push({
    trainname: trainName,
    destination: destination,
    firstrain: firstTrain,
    frequency: frequency,
    dateadded: firebase.database.ServerValue.TIMESTAMP
  });
})

database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val().trainname);
  console.log(childSnapshot.val().destination);
  console.log(childSnapshot.val().firstrain);
  console.log(childSnapshot.val().frequency);

  // var monthsWorked = moment().diff(childSnapshot.val().startdate, 'months');
  // console.log(moment());
  // console.log(monthsWorked);

  // var totalBilled = monthsWorked * childSnapshot.val().monthlyrate;

  var row = $("<tr>");

  $("#table-body").append(row);
  $(row).append("<td>" + childSnapshot.val().trainname + "</td>");
  $(row).append("<td>" + childSnapshot.val().destination + "</td>");
  $(row).append("<td>" + childSnapshot.val().firstrain + "</td>");
  $(row).append("<td>" + frequency + "</td>")
  $(row).append("<td>" + "next arrival" + "</td>");
  $(row).append("<td>" + "minutes away" + "</td>");


});




