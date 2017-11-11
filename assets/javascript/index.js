var  guestNameWait;
var guestNameTable;
function pushWaitlist(){
     guestNameWait = $('#guestName').val();
    //  $('#test').html(guestName);
     $('#guestName').val('');

window.location.assign('waitlist.html');

};
function openTables(){
    guestNameTable = $('#guestName').val();
    numAdults = $('#adults').val();
    numChild =$('#children').val();
    $('#guestinfo').html('Guest Name: ' + guestNameTable +'<br>'+ 'Adults: ' + numAdults+ '<br>'+ 'Children: ' + numChild);
    $('#children').val('');
    $('#guestName').val('');
    $('#adults').val('');
   
}
$('#wait').on('click',function(){
    
    pushWaitlist();
  


});
$('#tables').on('click',function(){
   openTables();
});