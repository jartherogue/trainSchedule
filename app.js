$(document).ready(function() {
    var config = {
        apiKey: "AIzaSyAdlmCuRKH9D3GDhmgr6Iy348SIci63i_Q",
        authDomain: "trainscheduleproject-a6045.firebaseapp.com",
        databaseURL: "https://trainscheduleproject-a6045.firebaseio.com",
        storageBucket: "trainscheduleproject-a6045.appspot.com",
      };
      firebase.initializeApp(config);
      var trainData = firebase.database();
      var trainName = "";
      var destination = "";
      var frequency = 0;
      var firstTrain = "HH:mm";
      var nextArrival = "HH:mm";
      var nextTrain = 0;
    $('#submitButton').on('click', function() {
        event.preventDefault();
        trainName = $("#trainName").val().trim();
        destination = $("#destination").val().trim();
        firstTrain = $("#firstTime").val().trim();
        frequency = $("#frequency").val().trim();
        trainData.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
    });

});