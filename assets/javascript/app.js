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
var nextArrival = 0;
var minutesAway = 0;

$(document).on("click", "#submit", function () {
  event.preventDefault();

  var trainName = $("#train-name").val().trim();
  var destination = $("#destination").val().trim();
  var firsttrain = $("#first-train").val().trim();
  var frequency = $("#frequency").val().trim();

  $("#train-name").val("");
  $("#destination").val("");
  $("#first-train").val("");
  $("#frequency").val("");

//var nextArrival = ;
//var minutesAway = ;

  database.ref().push({
    trainname: trainName,
    destination: destination,
    firsttrain: firsttrain,
    frequency: frequency,
    dateadded: firebase.database.ServerValue.TIMESTAMP
  });
})

database.ref().on("child_added", function (childSnapshot) {
  var newTrain = childSnapshot.val().trainname;
  var newDestination = childSnapshot.val().destination;
  var newFirstTrain = childSnapshot.val().firsttrain;
  var newFrequency = childSnapshot.val().frequency;

 // First train
    var startTimeOk = moment(newFirstTrain, "hh:mm").subtract(1, "years");

    // Current Time
    var currentTime = moment();
	
    // Difference between the times
    var differenceTime = moment().diff(moment(startTimeOk), "minutes");

    // Time left
    var timeLeft = differenceTime % newFrequency;

    // Time until next train
    var timeUntilTrain = newFrequency - timeLeft;

    // Next Train
    var nextTrain = moment().add(timeUntilTrain, "minutes");
    var nextTrainArrival = moment(nextTrain).format("HH:mm");


  var row = $("<tr>");

  $("#table-body").append(row);
  $(row).append("<td>" + childSnapshot.val().trainname + "</td>");
  $(row).append("<td>" + childSnapshot.val().destination + "</td>");
  $(row).append("<td>" + newFrequency + "</td>")
  $(row).append("<td>" + nextTrainArrival + "</td>");
  $(row).append("<td>" + timeUntilTrain + "</td>");


});




