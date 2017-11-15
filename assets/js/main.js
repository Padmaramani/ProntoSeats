var guestName;
var partySize;
var numAdults;
var guestInfo;
var serversnum;
var tables;
var serverName;
var serverPin;
var timeOff;
var server = [];
var x = 1;
var y = 10;
var tableNum = 1;
var seat;
var waitList = [];

var tableArray = [];
var numOTables = 15;
var createdServerNGuest = [];
var guestArray = [];
var dt = new Date();

var c = 1;

var time = dt.getHours() + ":" + dt.getMinutes();
//    dt.format('shorttime')

//tIn = time in.
//tOut = time out
$('#bottom').append(time);

function NewTable(num) {
    this.tableNum = num;
    this.dropdown = false;
};

function openResturant(createArray) {
    if (createArray) {


        for (i = 0; i < numOTables; i++) {

            var tablesInRest = new NewTable(i + 1);
            // if(tablesInRest.dropdown === false){
            tableArray.push(tablesInRest);
            // };
        };
    }

    for (i = 0; i < tableArray.length; i++)
        if (tableArray[i].dropdown === false) {
            $('#selectTable').append('<option id=' + c + '>' + tableArray[i].tableNum + '</option>');
            c++;
        };
};


openResturant(true);

function Server(name, tIn, pin, tOut) {
    this.name = name;
    this.timeIn = tIn;
    this.serverPin = pin;
    this.timeOut = tOut;



};

function Guestinfo(name, size) {
    this.guestName = name;
    this.partySize = size;


    this.setGuestInfo = function () {

        guestInfo = 'Party Name: ' + this.guestName + '<br>' + 'Party Size: ' + this.partySize;


    };

    this.showHost = function () {
        $('#guestInfo').html(guestInfo)
    };
};

$('body').on('click', '.assign', function () {

    var guest = waitList[$(this).data("index")];
    var newGuest = new Guestinfo(guest.guestName, guest.partySize);
    console.log(newGuest);
    guestArray.push(newGuest);
    console.log(guestArray);
    newGuest.setGuestInfo();
    newGuest.showHost();
    $('#assignTable').modal('show')
});

$('body').on('click', '.assign', clear);
$('body').on('click', '.clear', clear);

function clear() {
    console.log("cleared " + waitList[$(this).data("index")].guestName);
    waitList.splice($(this).data("index"), 1);
    $('#waitlist_display').empty();
    for (i = 0; i < waitList.length; i++) {
        var displayWaitlist = $('<tr>');

        displayWaitlist.attr('waitlist_display', waitList[i].guestname);
        displayWaitlist.append('<td>' + waitList[i].guestName + '</td>');
        displayWaitlist.append('<td>' + waitList[i].partySize + '</td>');
        displayWaitlist.append('<td>' + '<button  data-index=' + i + ' type="button" class="assign btn btn-primary">' + 'Assign</button>' + '</td>');
        displayWaitlist.append('<td>' + '<button  data-index=' + i + ' type="button" class="clear btn btn-primary" data-dismiss="modal">' + 'Clear</button>' + '</td>');


        $('#waitlist_display').append(displayWaitlist);


    };
}

function pushWaitlist() {

    if (serverName = $('#guestName').val() == '') {
        return false;
    }
    guestName = $('#guestName').val();
    partysize = $('#partySize').val();

    var newguest = new Guestinfo(guestName, partySize);
    waitList.push(newguest);
    $('#guestName').val('');
    $('#partySize').val('');
    $("#waitlist").html('');
    $('#waitlist_display').empty();
    for (i = 0; i < waitList.length; i++) {
        var displayWaitlist = $('<tr>');

        displayWaitlist.attr('waitlist_display', waitList[i].guestname);
        displayWaitlist.append('<td>' + waitList[i].guestName + '</td>');
        displayWaitlist.append('<td>' + waitList[i].partySize + '</td>');
        displayWaitlist.append('<td>' + '<button  data-index=' + i + ' type="button" class="assign btn btn-primary" data-dismiss="modal">' + 'Assign</button>' + '</td>');
        displayWaitlist.append('<td>' + '<button  data-index=' + i + ' type="button" class="clear btn btn-primary" data-dismiss="modal">' + 'Clear</button>' + '</td>');



        $('#waitlist_display').append(displayWaitlist);


    };
};




function openTables() {
    guestName = $('#guestName').val();
    partySize = $('#partySize').val();
    var newguest = new guestInfo(guestName, partySize);
    guestArray.push(newguest);
    newguest.setGuestInfo();
    newguest.showHost();

    $('#guestName').val('');
    $('#partySize').val('');

};

$('#wait').on('click', function () {

    pushWaitlist();


});
$('#tables').on('click', function () {
    openTables();
    $('#serverSelect').empty();
    for (i = 0; i < server.length; i++) {




        $('#serverSelect').append('<option id=' + x + 'picserver=' + '>' + server[i].name + '</option>');
        x++;

    };
});


function signInServer() {

    serverName = $('#serverNames').val();
    serverPin = $('#serverPin').val();
    timeOff = $('#timeOff').val();

    var newserver = new Server(serverName, time, serverPin, timeOff);
    server.push(newserver)





    var checkIn = $('<tr>');
    checkIn.attr('id', serverName);



    checkIn.append('<td serverinfo=' + serverName.name + '>' + newserver.name + '</td>');

    checkIn.append('<td >' + newserver.timeIn + '</td>');
    checkIn.append('<td serverinfo=' + newserver.name + '>' + newserver.timeOut + '</td>');

    $('#list1').append(checkIn);

    serverName = $('#serverNames').val('');
    serverPin = $('#serverPin').val('');
    timeOff = $('#timeOff').val('');

};

function DisplayMain() {
    $('.seats').empty();
    for (i = 0; i < server.length; i++) {

        var displayServerMain = $('<table class="table">');
        displayServerMain.attr('id', server[i].name);

        displayServerMain.append('<thead>' + '<tr>' + '<th scope="col">' + server[i].name + '</th>' + '<th scope="col">' + server[i].timeOut + '</th>' + '</tr>' + '</thead>');

        $('.seats').append(displayServerMain);

    };
};

function signServerOut() {
    if (serverName = $('#serverNames').val() == '') {
        return;
    }
    serverName = $('#serverNames').val();
    serverPin = $('#serverPin').val();
    timeOff = $('#timeOff').val();
    console.log(server);
    $('#' + serverName).remove();
    for (i = 0; i < server.length; i++) {
        if (server[i].name === serverName) {
            server.splice(i, 1);
        };
    };
    $('#' + serverName).empty();
    serverName = $('#serverNames').val('');
    serverPin = $('#serverPin').val('');
    timeOff = $('#timeOff').val('');
};

$('#signin').on('click', function () {
    $('#serverinput').modal('hide');
    signInServer();
    DisplayMain();

});

$('body').on('click', '#signout', function () {
    $('#serverinput').modal('hide')


    signServerOut();

});

$('#seewait').on('click', function () {
    $('#waitlist').html('');
    $('#waitlist_display').empty();
    for (i = 0; i < waitList.length; i++) {
        var displayWaitlist = $('<tr>');

        displayWaitlist.attr('waitlist_display', waitList[i].guestname);
        displayWaitlist.append('<td>' + waitList[i].guestName + '</td>');
        displayWaitlist.append('<td>' + waitList[i].partySize + '</td>');
        displayWaitlist.append('<td>' + '<button  data-index=' + i + ' type="button" class="assign btn btn-primary">' + 'Assign</button>' + '</td>');
        displayWaitlist.append('<td>' + '<button  data-index=' + i + ' type="button" class="clear btn btn-primary" data-dismiss="modal">' + 'Clear</button>' + '</td>');


        $('#waitlist_display').append(displayWaitlist);


    };
});




$('body').on('click', '.restTables', function () {
    seat = $(this).attr('tclick');
    console.log(seat);
});

$('#choose').on('click', function () {
    $('#assignTable').modal('hide');
    $('#server2').empty();


    for (i = 0; i < server.length; i++) {

        showServers.append('<option id=' + x + '>' + server[i].name + '</option>');
        x++;


        $('#serverSelect').append(showServers);

    };
});

function TableNServer(server, table, guest, party) {
    this.serversSelect = server;
    this.tableSelect = table;
    this.theNameGuest = guest;
    this.thePartySize = party;

    //    this.displaySeatingInfo = function(){
    //        var display=$('<p> The' + theNameGuest +' party will be served by <br> '+ serversSelect+'<br>'+ 'at <br>' + tableSelect+ '</p>');
    //        $('#guest_server_info').html(display);
    //    };
};
// set the table array selcted to true dropdown
function seatingTheGuest() {
    $('#assignTable').modal('hide');
    var selectedServer = $('#serverSelect').val();
    var selectedTable = $('#selectTable').val();
    var TableAndGuestAndServer = new TableNServer(selectedServer, selectedTable, guestArray[0].guestName, guestArray[0].partySize);
    // createdServerNGuest.push(TableAndGuestAndServer);
    var display = $('<p> The ' + TableAndGuestAndServer.theNameGuest + ' party will be served by <br> ' + selectedServer + '<br>' + 'at table <br>' + selectedTable + '</p>');
    console.log(TableAndGuestAndServer);
    $('#guestServerInfo').html(display);
    for (i = 0; i < tableArray.length; i++) {
        if (tableArray[i].tableNum == selectedTable) {
            tableArray[i].dropdown = true;
        };
    };
    $('#selectTable').empty();
    openResturant();
};




$('#tableServer').on('click', function () {
    seatingTheGuest();
    // TableAndGuestAndServer.displaySeatingInfo();
    // for(i=0; i< server.length; i++){
    //     if(server[i].name === selectedServer) {
    // var serverdata = server.detach(i,1);
    //     };
    //     } ;

});


$("#weatherModal").html(`<!-- weather widget start -->
<a target="_blank" href="http://www.booked.net/weather/mission-viejo-7087">
    <img src="https://w.bookcdn.com/weather/picture/3_7087_0_1_137AE9_250_ffffff_333333_08488D_1_ffffff_333333_0_6.png?scode=2&domid=w209&anc_id=20723"
        alt="booked.net" />
</a>
<!-- weather widget end -->

<!-- Irvine -->
<!-- weather widget start -->
<a target="_blank" href="http://www.booked.net/weather/irvine-5539">
    <img src="https://w.bookcdn.com/weather/picture/3_5539_0_1_137AE9_250_ffffff_333333_08488D_1_ffffff_333333_0_6.png?scode=2&domid=w209&anc_id=6330"
        alt="booked.net" />
</a>
<!-- weather widget end -->

<!-- weather widget start -->
<a target="_blank" href="http://www.booked.net/weather/aliso-viejo-33435">
    <img src="https://w.bookcdn.com/weather/picture/3_33435_0_1_137AE9_250_ffffff_333333_08488D_1_ffffff_333333_0_6.png?scode=2&domid=w209&anc_id=6330"
        alt="booked.net" />
</a>
<!-- weather widget end -->

<!-- weather widget start -->
<a target="_blank" href="http://www.booked.net/weather/lake-forest-1407">
    <img src="https://w.bookcdn.com/weather/picture/3_1407_0_1_137AE9_250_ffffff_333333_08488D_1_ffffff_333333_0_6.png?scode=2&domid=w209&anc_id=6330"
        alt="booked.net" />
</a>
<!-- weather widget end -->

<!-- weather widget start -->
<a target="_blank" href="http://www.booked.net/weather/laguna-hills-4979">
    <img src="https://w.bookcdn.com/weather/picture/3_4979_0_1_137AE9_250_ffffff_333333_08488D_1_ffffff_333333_0_6.png?scode=2&domid=w209&anc_id=6330"
        alt="booked.net" />
</a>
<!-- weather widget end -->

<!-- weather widget start -->
<a target="_blank" href="http://www.booked.net/weather/san-juan-capistrano-1359">
    <img src="https://w.bookcdn.com/weather/picture/3_1359_0_1_137AE9_250_ffffff_333333_08488D_1_ffffff_333333_0_6.png?scode=2&domid=w209&anc_id=6330"
        alt="booked.net" />
</a>
<!-- weather widget end -->`);

