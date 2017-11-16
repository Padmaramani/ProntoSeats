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
    this.displayToHome = false;



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
}

function clear() {
    console.log("cleared " + waitList[$(this).data("index")].guestName);
    waitList.splice($(this).data("index"), 1);
    $('#waitlist_display').empty();
    for (i = 0; i < waitList.length; i++) {
        var displayWaitlist = $('<tr>');

        displayWaitlist.attr('waitlist_display', waitList[i].guestname);
        displayWaitlist.append('<td>' + waitList[i].guestName + '</td>');
        displayWaitlist.append('<td>' + waitList[i].partySize + '</td>');
        displayWaitlist.append('<td>' + '<button  data-index=' + i + ' type="button" class="btn btn-primary assign">' + 'Assign</button>' + '</td>');
        displayWaitlist.append('<td>' + '<button  data-index=' + i + ' type="button" class="btn btn-primary clear" data-dismiss="modal">' + 'Clear</button>' + '</td>');


        $('#waitlist_display').append(displayWaitlist);


    };
}

$('body').on('click', '.assign', function () {

    var guest = waitList[$(this).data("index")];
    var newGuest = new Guestinfo(guest.guestName, guest.partySize);
    console.log(newGuest);
    guestArray.push(newGuest);
    // console.log(guestArray);
    newGuest.setGuestInfo();
    newGuest.showHost();
    $('#assignTable').modal('show')
    console.log(guestArray)
    clear();
});


$('body').on('click', '.clear', function () {
    clear();
});




function pushWaitlist() {

    if (serverName = $('#guestName').val() == '') {
        return false;
    }
    guestName = $('#guestName').val();
    partySize = $('#partySize').val();

    var newguest = new Guestinfo(guestName, partySize);
    waitList.push(newguest);
    console.log(waitList);
    $('#guestName').val('');
    $('#partySize').val('');
    $("#waitlist").html('');
    $('#waitlist_display').empty();
    for (i = 0; i < waitList.length; i++) {
        var displayWaitList = $('<tr>');

        displayWaitList.attr('waitlist_display', waitList[i].guestName);
        displayWaitList.append('<td>' + waitList[i].guestName + '</td>');
        displayWaitList.append('<td>' + waitList[i].partySize + '</td>');
        displayWaitList.append('<td>' + '<button  data-index=' + i + ' type="button" class="assign btn btn-primary" data-dismiss="modal">' + 'Assign</button>' + '</td>');
        displayWaitList.append('<td>' + '<button  data-index=' + i + ' type="button" class="clear btn btn-primary" data-dismiss="modal">' + 'Clear</button>' + '</td>');


        $('#waitlist_display').append(displayWaitList);

        // for (i = 0; i < waitList.length; i++) {
        //     var DisplayWaitList = $('<tr>');

        //     DisplayWaitList.attr('waitlist_display', waitList[i].guestname);
        //     DisplayWaitList.append('<td>' + waitList[i].guestName + '</td>');
        //     DisplayWaitList.append('<td>' + waitList[i].partysize + '</td>');
        //     DisplayWaitList.append('<td>' + '<button  data-index=' + i + ' type="button" class="assign btn btn-primary" data-dismiss="modal">' + 'Assign</button>' + '</td>');
        //     DisplayWaitList.append('<td>' + '<button  data-index=' + i + ' type="button" class="clear btn btn-primary" data-dismiss="modal">' + 'Clear</button>' + '</td>');



        //     $('#waitlist_display').append(DisplayWaitList);


    };
};




function openTables() {
    guestName = $('#guestName').val();
    partySize = $('#partySize').val();
    var newguest = new Guestinfo(guestName, partySize);
    guestArray.push(newguest);
    newguest.setGuestInfo();
    newguest.showHost();

    $('#guestName').val('');
    $('#partySize').val('');

};

$('#wait').on('click', function (event) {
    event.preventDefault();
    pushWaitlist();


});
$('#tables').on('click', function () {
    openTables();
    $('#serverSelect').empty();
    for (i = 0; i < server.length; i++) {



        $('#serverSelect').append('<option id=' + x + '>' + server[i].name + '</option>');
        x++;

    };
});


function signInServer() {



    console.log("I am inside signInServer");
    serverName = $('#serverNames').val();
    serverPin = $('#serverPin').val();
    timeOff = $('#timeOff').val();

    var newserver = new Server(serverName, time, serverPin, timeOff);
    server.push(newserver);
    console.log(newserver);


    // var checkIn = $('<tr>');
    // checkIn.attr('id', serverName);



    // checkIn.append('<td serverinfo=' + serverName.name + '>' + newserver.name + '</td>');

    // checkIn.append('<td >' + newserver.timeIn + '</td>');
    // checkIn.append('<td serverinfo=' + newserver.name + '>' + newserver.timeOut + '</td>');

    // $('#list1').append(checkIn);

    serverName = $('#serverNames').val('');
    serverPin = $('#serverPin').val('');
    timeOff = $('#timeOff').val('');

};

function DisplayMain() {


    for (i = 0; i < server.length; i++) {
        if (server[i].displayToHome == false) {
            console.log(server[i].name);
            var displayServerMain = $('<table class="table">');
            displayServerMain.attr('id', server[i].name);

            displayServerMain.append('<thead>' +
                '<tr>' + '<th class="serverName">' +
                server[i].name +
                '</th>' +
                '<th class="serverStats">' + '</th>' +
                '<th>Tables</th>' + '<th class="serverStats">' + '</th>' +
                '  <th>Guests</th>' + '<th class="serverOffShift">Off Shift at ' +
                server[i].timeOut + '</th>' +
                '</tr>' + '</thead>' + '<tbody> <tr class= ' + '>' +
                '<td colspan="6" class= ' + server[i].name + '>');
            console.log(displayServerMain);
            $('.overview').append(displayServerMain);
            server[i].displayToHome = true;

        };
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

$('#signIn').on('click', function () {

    $('#serverAdmin').modal('hide');
    signInServer();
    DisplayMain();

});

$('body').on('click', '#signOut', function () {
    $('#serverAdmin').modal('hide')


    signServerOut();

});

$('#viewWaitList').on('click', function () {
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
    this.sizeOfParty = party;

    this.console = function () {
        console.log(TableNServer.sizeOfParty);
    }
    //    this.displaySeatingInfo = function(){
    //        var display=$('<p> The' + theNameGuest +' party will be served by <br> '+ serversSelect+'<br>'+ 'at <br>' + tableSelect+ '</p>');
    //        $('#guest_server_info').html(display);
    //    };
};
// set the table array selcted to true dropdown
function seatingTheGuest() {
    $("#assignTable").modal("hide");
    var selectedServer = $("#serverSelect").val();
    var selectedTable = $('#selectTable').val();
    for (i = 0; i < guestArray.length; i++) {
        PartyName = guestArray[i].guestName;
        sizeOfTheParty = guestArray[i].partySize;
    };
    //guestArray[0].guestName, guestArray[0].partysize
    var TableAndGuestAndServer = new TableNServer(selectedServer, selectedTable, PartyName, sizeOfTheParty);
    createdServerNGuest.push(TableAndGuestAndServer);
    console.log(createdServerNGuest.sizeOfParty);
    console.log(guestArray);
    console.log(createdServerNGuest[0].tableSelect);
    console.log(createdServerNGuest);
    for (i = 0; i < createdServerNGuest.length; i++) {
        tableAssign = createdServerNGuest[i].tableSelect;
        numPeople = createdServerNGuest[i].thePartySize;
    };
    var addTableButton = $('<a  href="## clear table ##" class="tableButton pictureTable" value=' + tableAssign + '>' +
        '<span class="tablenum">' + tableAssign + '</span>' +
        // '<span class="seatedGuests">' + numPeople + '</span>'+
        '</a>' + '</td>');
    $('.' + selectedServer).append(addTableButton);
    console.log(tableAssign);
    console.log(numPeople);
    if (tableAssign === serverName) {
        server.splice(i, 1);
    };
    //   var display = $('<p> The ' + TableAndGuestAndServer.theNameGuest + ' party will be served by <br> ' + selectedServer + '<br>' + 'at table <br>' + selectedTable + '</p>');
    // <td colspan="6">
    //           <a href="## clear table ## " class="tableButton">
    //             <span class="tableNumber">12</span>
    //             <span class="seatedPatrons">4</span>
    //           </a>
    //         </td>
    //       </tr>
    //     </tbody>
    //   $('#guest_server_info').html(display);
    for (i = 0; i < tableArray.length; i++) {
        if (tableArray[i].tableNum == selectedTable) {
            tableArray[i].dropdown = true;
        };
    };
    $('#selectTable').empty();
    openResturant();
};



$('body').on('click', '.pictureTable', function () {



    console.log($(this).val());

})



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