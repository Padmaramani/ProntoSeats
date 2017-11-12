var  guestName
var numAdults;
var numChild;
var guestinfo;
var serversnum;
var tables;
var serverName;
var serverPin;
var timeOff;
server=[];

 var dt = new Date();

    var time = dt.getHours() + ":" + dt.getMinutes();
   dt.format('shorttime')

   //tIn = time in.
   //tOut = time out
function Server(name,tIn,pin,tOut){
this.name =name;
this.timeIn = tIn;
this.serverPin=pin;
this.timeOut =tOut;

this.addToList =function(){
    
  

};

};

function Guestinfo(name,aduts,child){
    this.guestName=name;
    this.numAdults=aduts;
    this.numChild=child;

    this.setguestinfo = function(){

        guestinfo= 'Guest Name: ' + this.guestName +'<br>'+ 'Adults: ' + this.numAdults+ '<br>'+ 'Children: ' + this.numChild;
        
      
    };

    this.assignTable = function(){
        $('#guestinfo').html(guestinfo)
    }
};

function pushWaitlist(){
    guestName = $('#guestName').val();
    numAdults = $('#adults').val();
    numChild =$('#children').val();
    var newguest = new Guestinfo(guestName,numAdults,numChild);
    
     $('#guestName').val('');

window.location.assign('waitlist.html');

};
function openTables(){
    guestName = $('#guestName').val();
    numAdults = $('#adults').val();
    numChild =$('#children').val();
    var newguest = new Guestinfo(guestName,numAdults,numChild);
    newguest.setguestinfo();
    newguest.assignTable();
    
    $('#children').val('');
    $('#guestName').val('');
    $('#adults').val('');
     
    createGrid(4,10);
}
$('#wait').on('click',function(){
    
    pushWaitlist();
    newguest.setguestinfo();


});
$('#tables').on('click',function(){
   openTables();
});
$('#serverlist').on('click',function(){
    
})
// function that builds a grid in the "container"
function createGrid(serversnum,tables) {
    for (var rows = 0; rows < serversnum; rows++) {
        for (var columns = 0; columns < tables; columns++) {
            $("#container").append("<div class='grid'></div>");
        };
    };
    $(".grid").width(200);
    $(".grid").height(200);
    
};
function signInServer (){
    serverName =  $('#servername').val();
serverPin = $('#serverpin').val();
timeOff=$('#timeoff').val();
 var  newserver = new Server(serverName,time,serverPin,timeOff);
 var addName = $('<td>');
 addName.addClass('serverNamesIn');
  addName.append(newserver.name);
  $('#list1').append(addName);
 
}
$('#signin').on('click',function(){
    $('#exampleModal').modal('hide')
    signInServer();
    
})
$('#bottom').append(time)