var myVar = setInterval(function () {
    currentWeather()
}, 3000);

function currentWeather() {

    var date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!
    var yyyy = date.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = mm + '/' + dd + '/' + yyyy;

    hours = date.getHours(); // => 9
    minutes = date.getMinutes(); // =>  30
    seconds = date.getSeconds(); // => 51
    time = hours + ':' + minutes + ':' + seconds;
    var targetDate = document.getElementById("currentts");
    targetDate.innerHTML = today + " " + time;

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?zip=92691,us&units=imperial&cnt=3&APPID=9cc1ac9e103bec3fdc87b1ee74880bba";
    $.ajax({
        url: queryURL,
        method: "GET",
        crossDomain: true
    }).done(function (response) {
        console.log(response);
        var targetDiv01 = document.getElementById("currentTemp");
        targetDiv01.innerHTML = response.main.temp + "F";

        // var targetDiv03 = document.getElementById("currentweatherdesc");
        // targetDiv03.innerHTML = response.weather[0].description;

        icon_id = response.weather[0].icon;

        $("#imgid").attr("src", "http://openweathermap.org/img/w/" + icon_id + ".png");

    });
};

function forecastbutton() {

    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?zip=92691,us&units=imperial&APPID=9cc1ac9e103bec3fdc87b1ee74880bba";
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