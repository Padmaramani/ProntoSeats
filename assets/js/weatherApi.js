currentWeather();
var myVar = setInterval(function () {
    currentWeather();
}, 3000);


function currentWeather() {

    var date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!
    var yyyy = date.getFullYear();

    if (dd < 10) {

        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    today = mm + '/' + dd + '/' + yyyy;
    if (hours > 12) {
        hours = ((hours + 11) % 12 + 1);
    }
    minutes = date.getMinutes(); // =>  30
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    seconds = date.getSeconds(); // => 51
    time = hours + ':' + minutes;
    var targetDate = document.getElementById("currentts");
    targetDate.innerHTML = today + " " + time;

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?zip=92691,us&units=imperial&cnt=3&APPID=f7a50c78795e80e2b73eb71043ebc20c";
    $.ajax({
        url: queryURL,
        method: "GET",
        crossDomain: true
    }).done(function (response) {
        // console.log(response);
        var targetDiv01 = document.getElementById("currentTemp");
        targetDiv01.innerHTML = response.main.temp + "F";

        // var targetDiv03 = document.getElementById("currentweatherdesc");
        // targetDiv03.innerHTML = response.weather[0].description;

        icon_id = response.weather[0].icon;

        $("#imgid").attr("src", "https://openweathermap.org/img/w/" + icon_id + ".png");

    });
};

function forecastbutton() {

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?zip=92691,us&units=imperial&APPID=f7a50c78795e80e2b73eb71043ebc20c";
    $.ajax({
        url: queryURL,
        method: "GET",
        crossDomain: true
    }).done(function (response) {

        var topicDiv = $("<div class='forecast01' id='forecast01'>");
        var p = $("<p>").text("Date: " + response.list[0].dt_txt);
        var p1 = $("<p1>").text("Temperature: " + response.list[0].main.temp);
        var p2 = $("<p2>").text("Weather: " + response.list[0].weather[0].description);

        topicDiv.append(p);
        topicDiv.append(p1);
        topicDiv.append(p2);

        $("#forecast-appear-here").prepend(topicDiv);
        var popup = document.getElementById("forecast-appear-here");
        popup.classList.toggle("show");
    });
};