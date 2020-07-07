/*----->CONSTANTS<-----*/
const history = document.getElementById("history");
const deleteOrderDiv = document.getElementById("delete_order_div");

let orderAdded = localStorage.getItem("orders");
let orderAddedArray = JSON.parse(orderAdded);

const buttonDeleteOrderList = document.getElementById("delete_order_list");

/*----->Function to display delete confirmation<-----*/
function textMessageNoHistoric(section) {
    let infoTextDelete = document.createElement("p");
    section.appendChild(infoTextDelete);
    infoTextDelete.setAttribute("id", "textMessageDelete");
    infoTextDelete.className = "text-center alert-danger col-sm-6 mx-auto";
    infoTextDelete.innerHTML = "Malheureusement, vous n'avez pas passé de commande récemment"

}
//Function to get button invisible
function buttonInvisible(button) {
    button.classList.remove("visible");
    button.classList.add("invisible");
}

//Function to get all orders
function getOrders() {
    if (orderAddedArray) {
        for (let i = 0; i < orderAddedArray.length; i++) {
            if (orderAdded != null) {
                addHistory(orderAddedArray[i].confirmationNumber, orderAddedArray[i].totalPrice);
            } else {
                textMessageNoHistoric(history);
                buttonInvisible(deleteOrderDiv);
            }
        }
    } else {
        textMessageNoHistoric(history);
        buttonInvisible(deleteOrderDiv);
    }
}

//Function to create row for historic
function addHistory(orderID, totalPrice) {
    //Create Li
    let newTab = document.createElement("li")
    history.appendChild(newTab);
    newTab.className = "list-group-item list-group-item-dark";
    newTab.innerHTML = "Commande n° " + orderID + " pour un total de " + totalPrice + " €";
}


/*-----
/*----->CALL<-----*/
getOrders();

/*----->EVENTS<-----*/
buttonDeleteOrderList.addEventListener('click', function() {
    localStorage.removeItem("orders");
    window.location.href = './commands.html';
})