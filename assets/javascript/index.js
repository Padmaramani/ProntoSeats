var guestName;
var partysize;
var numAdults;
var guestinfo;
var serversnum;
var tables;
var serverName;
var serverPin;
var timeOff;
var server = [];
var x = 1;
var y =10;
var tableNum= 1;
var seat;
var waitList = [];
var guests =[];
var tableArray=[];
var numOTables = 15;
var createdServerNGuest=[];
var guestArray=[];
var dt = new Date();
var t = 1;

var time = dt.getHours() + ":" + dt.getMinutes();
//    dt.format('shorttime')

//tIn = time in.
//tOut = time out
$('#bottom').append(time);

function NewTable(num,seats){
    this.tableNum =num;
    this.empty =seats;
};
function openResturant(){
    
    for(i =0; i< numOTables; i++){
        
        var tablesInRest = new NewTable(t,4);
    tableArray.push(tablesInRest);
        t++;
    }
    // todo create table objects 
    for(i =0; i < tableArray.length; i++)
    $('#select_table').append('<option id='+ x +'picserver='+ '>' + tableArray[i].tableNum + '</option>');
    };
    

openResturant();

function Server(name, tIn, pin, tOut) {
    this.name = name;
    this.timeIn = tIn;
    this.serverPin = pin;
    this.timeOut = tOut;

    

};

function Guestinfo(name,size) {
    this.guestName = name;
    this.partysize = size;
    

    this.setguestinfo = function () {

        guestinfo = 'Guest Name: ' + this.guestName + '<br>' + 'Adults: ' + this.partysize;


    };

    this.showHost = function () {
        $('#guestinfo').html(guestinfo)
    };
};

function pushWaitlist() {

    if(serverName = $('#guestName').val()==''){
        return;
    }
    guestName = $('#guestName').val();
    partysize = $('#party_size').val();
    
    var newguest = new Guestinfo(guestName, partysize);
    waitList.push(newguest);
    $('#guestName').val('');
    $('#party_size').val('');
    $("#waitlist").html('');
    $('#waitlist_display').empty();
    for (i = 0; i < waitList.length; i++) {
    var displayWaitlist = $('<tr>');
    
    displayWaitlist.attr('waitlist_display', waitList[i].guestname);
    displayWaitlist .append('<td>' + waitList[i].guestName + '</td>');
     displayWaitlist .append('<td>' + waitList[i].partysize + '</td>');
     displayWaitlist.append('<td>' + '<button  type="button" id="assign" class="btn btn-primary" data-dismiss="modal">'+  'Assign</button>' +'</td>');
     displayWaitlist.append('<td>' + '<button  type="button" id="clear" class="btn btn-primary" data-dismiss="modal">'+  'Clear</button>' +'</td>');

     

$('#waitlist_display').append(displayWaitlist);
   

};
};
// function that builds a grid in the "container"
function createGrid(serversnum, tables) {
    for (var rows = 0; rows < serversnum; rows++) {
        for (var columns = 0; columns < tables; columns++) {
            $("#container").append("<div class='grid'></div>");
        };
    };
    $(".grid").width(200);
    $(".grid").height(200);

};

function openTables() {
    guestName = $('#guestName').val();
    partysize = $('#party_size').val();
    var newguest = new Guestinfo(guestName, partysize);
    guestArray.push(newguest);
    newguest.setguestinfo();
    newguest.showHost();

    $('#children').val('');
    $('#guestName').val('');
    $('#adults').val('');

    
};

$('#wait').on('click', function () {

    pushWaitlist();


});
$('#tables').on('click', function () {
    openTables();
    $('#server_select').empty();
    for(i=0; i < server.length; i++){
        
        
    
    
   $('#server_select').append('<option id='+ x +'picserver='+ '>' + server[i].name + '</option>');
        x++;
     
    };
});


function signInServer() {

    serverName = $('#servernames').val();
    serverPin = $('#serverpin').val();
    timeOff = $('#timeoff').val();

    var newserver = new Server(serverName, time, serverPin, timeOff);
server.push(newserver)





    var checkIn = $('<tr>');
    checkIn.attr('id', serverName);
    
    

    checkIn.append('<td serverinfo=' + serverName.name +'>' + newserver.name + '</td>');

    checkIn.append('<td >' + newserver.timeIn + '</td>');
    checkIn.append('<td serverinfo=' + newserver.name + '>' + newserver.timeOut + '</td>');

    $('#list1').append(checkIn);
    for(i =0;i < server.length;i++){
var displayServerMain = $('<table class="table">');
displayServerMain.attr('class',server[i].name);

displayServerMain.append('<thead>'+'<tr>' + '<th scope="col" id=' + server[i].name +'>'+ server[i].name+'  ' + server[i].timeOut+'</th'+ '</tr>' +'</thead>');

$('.seats').html(displayServerMain);

    };
    serverName = $('#servernames').val('');
    serverPin = $('#serverpin').val('');
    timeOff = $('#timeoff').val('');

};

function signServerOut() {
    if(serverName = $('#servernames').val()==''){
        return;
    }
    serverName = $('#servernames').val();
    serverPin = $('#serverpin').val();
    timeOff = $('#timeoff').val();
    console.log(server);
    $('#' + serverName).remove();
    for(i=0; i< server.length; i++){
        if(server[i].name === serverName) {
    server.splice(i,1);
        };
        } ;
   
    serverName = $('#servernames').val('');
    serverPin = $('#serverpin').val('');
    timeOff = $('#timeoff').val('');
};

$('#signin').on('click', function () {
    $('#serverinput').modal('hide');
    signInServer();

});

$('body').on('click', '#signout', function () {
    $('#serverinput').modal('hide')
    
    // if ($('#list1').length > 0) { 
    
    // }
    signServerOut();
    
});

$('#seewait').on('click', function () {
    
});




$('body').on('click','.restTables',function(){
     seat = $(this).attr('tclick');
   console.log(seat);
});

$('#choose').on('click',function(){
    $('#assigntable').modal('hide');
$('#server2').empty();


for(i=0; i < server.length; i++){
    
    


    showServers.append('<option id='+x +'picserver='+ '>' + server[i].name + '</option>');
    x++;
    // showServers.append('<option>' + server[i].timeOut + '</option>');

$('#server_select').append(showServers);

};
});
function TableNServer(server,table){
    this.serversSelect = server;
    this.tableSelect = table;

   this.displaySeatingInfo = function(){
       var display=$('<p> The </p>');
       $('#guest_server_info').html(display);
   };
};

function seatingTheGuest(){
    $("#assigntable").modal("hide");
    var selectedServer = $("#server_select").val();
    var selectedTable = $('#select_table').val();
var TableAndGuestAndServer = new TableNServer(selectedServer,selectedTable);
// createdServerNGuest.push(TableAndGuestAndServer);

        $('#guest_server_info').append(createdServerNGuest);

};





$('#table_server').on('click',function(){
   seatingTheGuest();

// for(i=0; i< server.length; i++){
//     if(server[i].name === selectedServer) {
// var serverdata = server.detach(i,1);
//     };
//     } ;
});