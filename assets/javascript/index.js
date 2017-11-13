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
var dt = new Date();

var time = dt.getHours() + ":" + dt.getMinutes();
//    dt.format('shorttime')

//tIn = time in.
//tOut = time out
$('#bottom').append(time);

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
});


function signInServer() {

    serverName = $('#servernames').val();
    serverPin = $('#serverpin').val();
    timeOff = $('#timeoff').val();

    var newserver = new Server(serverName, time, serverPin, timeOff);
server.push(newserver)

    var checkIn = $('<tr>');
    checkIn.attr('id', serverName);
    
    // checkIn.append('<th scope="row">' + x);

    checkIn.append('<td serverinfo=' + serverName.name +'>' + newserver.name + '</td>');

    checkIn.append('<td >' + newserver.timeIn + '</td>');
    checkIn.append('<td serverinfo=' + newserver.name + '>' + newserver.timeOut + '</td>');

    $('#list1').append(checkIn);


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
    window.location.assign('waitlist.html');
});

function NewTable(num,seats){
    this.tableNum =num;
    this.empty =seats;
}
function openResturant(){
$('#opentables').html('');
// todo create table objects 
 for (i = 0; i < y; i++){
    
   createTables= $('<img class="restTables"  src="assets/images/table.ico" tclick='+ tableNum+ '><span class="badge badge-secondary">' + tableNum +'</span> </img>' );
   
   $('#opentables').append(createTables);
tableNum++;
};
};
openResturant();

$('body').on('click','.restTables',function(){
     seat = $(this).attr('tclick');
   console.log(seat);
});

$('#choose').on('click',function(){
    $('#assigntable').modal('hide');
$('#availableservers').empty();


for(i=0; i < server.length; i++){
    
    var showServers = $('<tr>');
    showServers.attr('id',x);
    showServers.attr('pickserver', server[i].name);

x++;
    showServers.append('<td>' + server[i].name + '</td>');

    showServers.append('<td>' + server[i].timeOut + '</td>');

$('#availableservers').append(showServers);

};
});
$('body').on('click','#'+ x,function(){
    console.log(x);
//   var add=  $(this).attr('.server-choice');
//   $('.serverchoice').addClass('table-primary')
  

  $( ".server-choice" ).addClass( "table-primary" );
  $('.server-choice table-primary').removeClass( ".server-choice" );
});