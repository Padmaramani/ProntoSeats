var start
var end

function getAddress() {
  var form = new FormData(document.getElementById("addressline1"));
  var value01 = form.get("inputAddress");
  value01 = value01.trim();
  var value02 = form.get("inputAddress2");
  value02 = value02.trim();
  var value03 = form.get("inputCity");
  value03 = value03.trim();
  var value04 = form.get("inputState");
  value04 = value04.trim();
  var value05 = form.get("inputZip");
  value05 = value05.trim();
  var form2 = new FormData(document.getElementById("addressline2"));
  var value21 = form2.get("inputAddress2");
  value21 = value21.trim();
  var value22 = form2.get("inputAddress22");
  value22 = value22.trim();
  var value23 = form2.get("inputCity2");
  value23 = value23.trim();
  var value24 = form2.get("inputState2");
  value24 = value24.trim();
  var value25 = form2.get("inputZip2");
  value25 = value25.trim();

  origin = value01 + "+" + value02 + "+" + value03 + "+" + value04 + "+" + value05;
  destination = value21 + "+" + value22 + "+" + value23 + "+" + value24 + "+" + value25;
  console.log(origin);
  console.log(destination);
  start = origin;
  end = destination;
}


$("#buttonClick").on("click", function () {
  event.preventDefault();
  console.log("This is a test");

  getAddress();


  var queryURL = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" + origin + "&destinations=" + destination + "&key=AIzaSyAN9ZGRk3W70W42BrtEoEm1QtA8zCbM59g";
  console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET",
    crossDomain: true
  }).done(function (response) {

    console.log(response);
    var distance = response.rows[0].elements[0].distance.text;
    var duration = response.rows[0].elements[0].duration.text;


    var newDiv = $("<div>");
    newDiv.text("The distance is:" + distance);
    newDiv.attr("id", "newDiv");

    var newDiv2 = $("<div>");
    newDiv2.text("The duration is:" + duration);
    // We can then  append it to the other div using the same ".append" method.
    $("#empty-div").append(newDiv);
    $("#newDiv").append(newDiv2);



  });

  var queryURL = "https://maps.googleapis.com/maps/api/directions/json?origin=" + origin + "&destination=" + destination + "&key=AIzaSyBiIqiufjANe-rskUyfRzenxSacRGBCf80";
  console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET",
    crossDomain: true
  }).done(function (response) {

    console.log(response);
    steps = response.routes[0].legs[0].steps;
    for (i = 0; i < steps.length; i++) {
      console.log(steps[i].html_instructions);


      var newDiv = $("<div>");
      newDiv.html(steps[i].html_instructions + steps[i].distance.text + steps[i].duration.text);
      // We can then  append it to the other div using the same ".append" method.

      $("#empty-div2").append(newDiv);
    }

  });
})

function initMap() {

  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: {
      lat: 37.774929,
      lng: -122.419416
    }
  });



  directionsDisplay.setMap(map);

  var onChangeHandler = function () {
    getAddress()
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };

  document.getElementById("buttonClick").addEventListener("click", onChangeHandler);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  console.log("inside calc and display:" + start);
  console.log("inside calc and display:" + end);
  directionsService.route({
    origin: start,
    destination: end,
    travelMode: 'DRIVING'
  }, function (response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

$("#googleMaps").on("shown.bs.modal", function () {
  google.maps.event.trigger(map, "resize");
});