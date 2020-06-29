/*----->CONSTANTS<-----*/
const history = document.getElementById("history");

let orderAdded = localStorage.getItem("orders");
let orderAddedArray = JSON.parse(orderAdded);

//Function to get all orders
function getOrders() {
    if (orderAddedArray) {
        for (let i = 0; i < orderAddedArray.length; i++) {
            console.log(i);
            if (orderAdded != null) {
                addHistory(orderAddedArray[i].confirmationNumber, orderAddedArray[i].totalPrice);
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
    history.appendChild(newTab);
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

/*----->CALL<-----*/
getOrders();