/*----->CONSTANTS<-----*/
const commandNumber = document.getElementById("command_number");
const commandPrice = document.getElementById("command_price");

const historic = document.getElementById("historic");
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
    const winLocationParameters = new URLSearchParams(winLocation);
    winLocation_ID = winLocationParameters.get('orderId');
    console.log(winLocation_ID);
    return winLocation_ID;
}

//Function to get all orders
function getOrders() {
    if (orderAddedArray) {
        for (let i = 0; i < orderAddedArray.length; i++) {

            if (orderAdded != null) {
                addHistory(historic, orderAddedArray[i].confirmationNumber, orderAddedArray[i].totalPrice);
                //To get current order
                if (orderAddedArray[i].confirmationNumber === winLocation_ID) {
                    let orderId = orderAddedArray[i].confirmationNumber;
                    console.log(" numéro de la commande effectuée " + orderId);
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
function addHistory(section, orderID, totalPrice) {
    //Create Li
    let newTab = document.createElement("li")
    section.appendChild(newTab);
    newTab.className = "list-group-item list-group-item-dark";
    newTab.innerHTML = "Commande n° " + orderID + " pour un total de " + totalPrice + " €";
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
refreshNumberBasket() //basketNumber.js
getUrl_Id();
if (winLocation_ID != undefined) {
    getOrders();
    let orderId = orderAddedArray[numberArray].confirmationNumber;
    let totalPrice = orderAddedArray[numberArray].totalPrice;
    displayOrderPrice(orderId, totalPrice);
}