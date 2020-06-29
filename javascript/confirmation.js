/*----->CONSTANTS<-----*/
const commandNumber = document.getElementById("command_number");
const commandPrice = document.getElementById("command_price");
const buttonDeleteOrderList = document.getElementById("delete_order_list");
const historique = document.getElementById("historique");
const commandValidation = document.getElementById("command_validation");
const winLocation = window.location.search; //Get location.search

let orderAdded = localStorage.getItem("orders");
let orderAddedArray = JSON.parse(orderAdded);

let winLocation_ID;
let orderID;
let numberArray;

console.log(orderAdded);
console.log(orderAddedArray);

/*----->FUNCTIONS<-----*/
//Function to get url ID
function getUrl_Id() {
    const winLocation_ID_array = winLocation.split("="); //Split the location.search
    winLocation_ID = winLocation_ID_array[1]; //Get the part after "="
    return winLocation_ID;
}

//Function to get all orders
function getOrders() {
    if (orderAddedArray) {
        for (let i = 0; i < orderAddedArray.length; i++) {
            console.log(i);
            if (orderAdded != null) {
                addHistory(orderAddedArray[i].confirmationNumber, orderAddedArray[i].totalPrice);
                //To get current order
                if (orderAddedArray[i].confirmationNumber === winLocation_ID) {
                    var orderId = orderAddedArray[i].confirmationNumber;
                    var totalPrice = orderAddedArray[i].totalPrice;
                    console.log("numéro de la commande effectuée " + orderId);
                    numberArray = i;
                    return numberArray;
                }


            } else {
                alert("Vous n'avez passé aucune commande");
            }
        }
    } else {
        alert("Vous n'avez passé aucune commande");
    }
}
//Function to create row for historique
function addHistory(orderID, totalPrice) {
    //Create DIV row
    let newTab = document.createElement("div")
    historique.appendChild(newTab);
    newTab.className = "row";
    //Create number order
    let newOrderID = document.createElement("p");
    newTab.appendChild(newOrderID);
    newOrderID.innerHTML = "Commande n° " + orderID + " ";
    //Create total price
    let newTotalPrice = document.createElement("p");
    newTab.appendChild(newTotalPrice);
    newTotalPrice.innerHTML = "pour un total de " + totalPrice + " €";

}
//function for get and display orderID and total price
function displayOrderPrice(orderID, totalPrice) {
    commandNumber.innerHTML = orderID;
    commandPrice.innerHTML = totalPrice;
}
//Function to clear basket product local storage
function clearBasket() {
    localStorage.removeItem("basketProducts");
}
/*----->CALL<-----*/
clearBasket();
console.log(localStorage.getItem("basketProducts"));
console.log(localStorage.getItem("orders"));
refreshNumberBasket() //basketNumber.js
getUrl_Id();
console.log(winLocation_ID);
if (winLocation_ID != undefined) {
    getOrders();
    var orderId = orderAddedArray[numberArray].confirmationNumber;
    var totalPrice = orderAddedArray[numberArray].totalPrice;
    console.log(orderId);
    console.log(totalPrice);
    displayOrderPrice(orderId, totalPrice);
}


buttonDeleteOrderList.addEventListener('click', function() {
    localStorage.removeItem("orders");
    window.location.href = './confirmation.html';
})