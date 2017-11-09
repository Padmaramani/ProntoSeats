var waitList = [];

function customer(nm, numAdults, numChildren) {
    this.name = nm;
    this.numberAdults = numAdults;
    this.numberChildren = numChildren;
};

function addCustomer(name, numAdults, numChildren) {
    currentCustomer = new customer(name, numAdults, numChildren);
    waitList.push(currentCustomer);
}

function displayList() {
    $("#waitlist").html('');
    for (i = 0; i < waitList.length; i++) {
        currentDiv = $("<div>");
        currentDiv.addClass("waitList");
        currentDiv.attr("id", i);
        currentDiv.append("<h4>Customer " + i + "</h4>");
        currentDiv.append(waitList[i].name);
        currentDiv.append("<h4>Adults</h4>");
        currentDiv.append(waitList[i].numberAdults);
        currentDiv.append("<h4>Children</h4>");
        currentDiv.append(waitList[i].numberChildren);
        currentDiv.append("<hr><br>");
        $("#waitlist").append(currentDiv);
    }
}

//todo
function seatGuests() {

}

//todo
function clearGuests() {

}


addCustomer("david", 1, 30);
addCustomer("robinson", 10);
addCustomer("davidson", 200);

displayList();