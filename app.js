$(document).ready(function() {
    var config = {
        apiKey: "AIzaSyAdlmCuRKH9D3GDhmgr6Iy348SIci63i_Q",
        authDomain: "trainscheduleproject-a6045.firebaseapp.com",
        databaseURL: "https://trainscheduleproject-a6045.firebaseio.com",
        storageBucket: "trainscheduleproject-a6045.appspot.com",
      };
      firebase.initializeApp(config);
      var rightNow = moment().format('MMMM Do YYYY, HH:mm');
      console.log(rightNow);
      var trainData = firebase.database();
      var trainName = "";
      var destination = "";
      var frequency = 0;
      var firstTrain = ""
      var nextArrival = "";
      var nextTrain = 0;
    $('#submitButton').on('click', function() {
        event.preventDefault();
        trainName = $("#trainName").val().trim();
        destination = $("#destination").val().trim();
        firstTrain = moment($("#firstTime").val().trim(), "HH:mm").subtract(10, "years").format("X");
        console.log(firstTrain);
        frequency = $("#frequency").val().trim();
        trainData.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        $("#trainName").val("");
        $("#destination").val("");
        $("#firstTime").val("");
        $("#frequency").val("");
    });
    trainData.ref().on("child_added", function (snapshot,) {
        //setting variables from FB info to use in time conversions and populating table.
        console.log(snapshot.val());
        trainName = (snapshot.val().trainName);
        destination = (snapshot.val().destination);
        firstTrain = (snapshot.val().firstTrain);
        console.log(firstTrain);
        frequency = (snapshot.val().frequency);
        console.log(frequency);
//Setting Time Conversion, minutes to next arrival and arrival time.
        var timeDif = moment().diff(moment.unix(firstTrain), "minutes");
        //finding the remainder to help us determine how far off the next train is. the Minutes place - the remainder should give us how many minutes the next train is. 
        var timeRemaining = moment().diff(moment.unix(firstTrain), "minutes") % frequency;
        var minAway = frequency - timeRemaining;
        console.log(timeDif);
        console.log(timeRemaining);
        console.log(minAway);
        //when will the next train arrive
        var nextArrival = moment().add(minAway, "m").format("HH:mm A");
        console.log(nextArrival);
        var newRow = ("<tr>" +
                    "<td>" + trainName + "</td>" +
                    "<td>" + destination + "</td>" +
                    "<td>" + frequency + "</td>" +
                    "<td>" + nextArrival + "</td>" +
                    "<td>" + minAway + "</td>" +
                    "</tr>");
                $("#fromFBase").append(newRow);
    });
});