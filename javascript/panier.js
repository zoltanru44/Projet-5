/*----->API DEFINITION<-----*/
const api_2 = "http://localhost:3000/api/teddies/order"

/*----->CONSTANTS<-----*/
const basketContent = document.getElementById("basket_content");
const basketPrice = document.getElementById("basket_price");
const basketform = document.getElementById("basket_form");
const buttonDeleteBasket = document.getElementById("button_delete_basket");
const buttonCommander = document.getElementById("button_commander");
const buttonSend = document.getElementById("button_send");
const buttonDeleteDiv = document.getElementById("button_delete_div");

const objectsNumber = document.getElementById("objects_number");
const objectsPrice = document.getElementById("objects_price");
const objectsPort = document.getElementById("objects_port");
const objectsTotal = document.getElementById("objects_total");
const basketForm = document.getElementById("basket_form");
const basketRightPart = document.getElementById("basket_right_part");

//Inputs form
const formNameGroup = document.getElementById("form_name_group");
const formName = document.getElementById("form_name");
const formFirstNameGroup = document.getElementById("form_first_name_group");
const formFirstName = document.getElementById("form_first_name");
const formAddressGroup = document.getElementById("form_address_group");
const formAddress = document.getElementById("form_address");
const formCityGroup = document.getElementById("form_city_group");
const formCity = document.getElementById("form_city");
const formMailGroup = document.getElementById("form_mail_group");
const formMail = document.getElementById("form_mail");

//Local storage
let basketTeddiesAdded = localStorage.getItem("basketProducts");
let basketTeddiesArray = JSON.parse(basketTeddiesAdded);
let totalObjetsArray = [];

let definitiveTotalPrice;
/*----->FUNCTIONS<-----*/
/*----->Function for picture - description - price and delete<-----*/
function addProductList_description(section, localDataTeddy, i) {
    //Create unique div by object for delete button
    const newDiv = document.createElement("li"); //Creation of div
    section.appendChild(newDiv);
    newDiv.id = "div_product" + i;
    newDiv.className = "list-group-item border-secondary panier_main__section__basket__li row justify-content-center "

    //AddName
    const newName = document.createElement("h2");
    newDiv.appendChild(newName);
    newName.className = "panier_main__section__basket__name";
    newName.innerHTML = localDataTeddy[i].name;

    //-->Add div for picture - description - price and delete
    const newDiv_1 = document.createElement("div"); //Creation of div
    newDiv.appendChild(newDiv_1);
    newDiv_1.className = "panier_main__section__basket__product__div col row ";

    //DIV_1 ---> Creation of img
    const newPicture = document.createElement("img");
    newDiv_1.appendChild(newPicture);
    newPicture.setAttribute('src', localDataTeddy[i].picture);
    newPicture.className = "panier_main__section__basket__product__img col-md-3 mx_auto";

    //DIV_1 --->Creation of DIV_2 for description and option
    const newDiv_2 = document.createElement("div"); //Creation of div
    newDiv_1.appendChild(newDiv_2);
    newDiv_2.className = "panier_main__section__basket__product col-md-5 text-center";

    //DIV_1 ---> DIV_2 --> Creation of description
    const newDescription = document.createElement("p");
    newDiv_2.appendChild(newDescription);
    newDescription.innerHTML = localDataTeddy[i].description;
    newDescription.className = "panier_main__section__basket__product__description";

    //DIV_1 ---> DIV_2 --> Creation of option
    const newOption = document.createElement("p");
    newDiv_2.appendChild(newOption);
    newOption.innerHTML = "Couleur choisie : " + localDataTeddy[i].option;
    newOption.className = "panier_main__section__basket__product__option";

    //DIV_1 ---> Creation of DIV_3 for price and delete button
    const newDiv_3 = document.createElement("div"); //Creation of div
    newDiv_1.appendChild(newDiv_3);
    newDiv_3.className = "panier_main__section__basket__div_price col-md-4 text-center";

    //DIV_1 ---> DIV_3 --> Creation of price
    const newPrice = document.createElement("p");
    newDiv_3.appendChild(newPrice);
    const localDataTeddy_price_format = localDataTeddy[i].price / 100
    newPrice.innerHTML = localDataTeddy_price_format.toPrecision(4) + " €";
    newPrice.className = "panier_main__section__basket__product__div_price__price";

    //DIV_1 ---> DIV_3 --> Creation number of products
    const newNumber = document.createElement("p");
    newDiv_3.appendChild(newNumber);
    const localDataTeddy_number = localDataTeddy[i].number;
    newNumber.innerHTML = "Nombre de nounours : " + localDataTeddy_number;
    newNumber.className = "panier_main__section__basket__product__div_number";

    //DIV_1 ---> DIV_3 --> Add Button for delete object
    const newButton = document.createElement("button");
    newDiv_3.appendChild(newButton);
    newButton.innerHTML = "Supprimer le produit";
    newButton.id = "button_delete_" + i;
    newButton.className = "btn btn-warning";
    newButton.type = "button";
}

/*----->Function to display delete confirmation<-----*/
function textMessageDeleteConfirmation(section) {
    let child = document.getElementById("textMessageDelete");
    if (child) { //Delete old message
        console.log(child);
        let oldChild = section.removeChild(child);
    }
    let infoTextDelete = document.createElement("p");
    section.appendChild(infoTextDelete);
    infoTextDelete.setAttribute("id", "textMessageDelete");
    infoTextDelete.className = "text-center alert-danger col-sm-6 mx-auto";
    infoTextDelete.innerHTML = "Panier supprimé !"

}
/*----->Function to display No objects in the basket<-----*/
function textMessageNoBasket(section) {
    let infoTextNoBasket = document.createElement("p");
    section.appendChild(infoTextNoBasket);
    infoTextNoBasket.className = "text-center alert-danger col-sm-6 mx-auto";
    infoTextNoBasket.innerHTML = "Panier vide !"
}

/*----->function for total calculate<-----*/

function totalCalculation(i) {
    // number of objects
    objectsNumber.innerHTML = i + 1;
    // Price of all objects
    totalObjetsArray.push(basketTeddiesArray[i].price);
    //total calculation
    let totalCalculationPriceResult = 0;
    for (let i = 0; i < basketTeddiesArray.length; i++) {
        totalCalculationPriceResult += totalObjetsArray[i];
    }
    totalCalculationPriceResult_form = totalCalculationPriceResult / 100
    objectsPrice.innerHTML = totalCalculationPriceResult_form + " €";
    //Ports
    let shippingPrice = 12;
    objectsPort.innerHTML = shippingPrice + " €";
    //Total
    definitiveTotalPrice = totalCalculationPriceResult_form + shippingPrice;
    objectsTotal.innerHTML = definitiveTotalPrice + " €";
}

/*----->Regex functions<-----*/
function validText(value) {
    return /^[a-zA-Zéàèç" "]{3,}$/.test(value);
}

function validAddress(value) {
    return /^[a-zA-Z0-9éèäâùç" "]{3,}$/.test(value);
}

function validMail(value) {
    return /^[a-zA-Z0-9.:#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/.test(value);
}
/*----->Function to insert error message form<-----*/
function insertErrorMessage(section, errortext) {
    let errorMessage = document.createElement("div");
    section.appendChild(errorMessage);
    errorMessage.innerHTML = errortext;
    errorMessage.classList.add("invalid-feedback");
}
/*----->Function to create an alert message<-----*/
function alertErrorText(section, message) {
    /*let otherAlerts = document.querySelectorAll("alertError")
    console.log(otherAlerts);
    section.removeChild(otherAlerts);*/


    let alertMessage = document.createElement("div");
    section.appendChild(alertMessage);
    alertMessage.innerHTML = message;
    alertMessage.className = "alert alert-danger alertError";
    alertMessage.setAttribute("role", "alert");
}

/*----->Function to check form inputs<-----*/
//Check form name
function CheckName() {
    if (validText(formName.value) === false) {
        console.log("Nom faux !");
        formName.classList.remove("is-valid");
        formName.classList.add("is-invalid");

    } else {
        console.log("Nom OK !");
        formName.classList.remove("is-invalid");
        formName.classList.add("is-valid");
    }
}
//Check form first name
function CheckFirstName() {
    if (validText(formFirstName.value) === false) {
        console.log("Prénom faux !");
        formFirstName.classList.remove("is-valid");
        formFirstName.classList.add("is-invalid");
    } else {
        console.log("Prénom OK !");
        formFirstName.classList.remove("is-invalid");
        formFirstName.classList.add("is-valid");
    }
}
//Check form adress
function CheckAdress() {
    if (validAddress(formAddress.value) === false) {
        console.log("Adresse faux !");
        formAddress.classList.remove("is-valid");
        formAddress.classList.add("is-invalid");
    } else {
        console.log("Adresse OK !");
        formAddress.classList.remove("is-invalid");
        formAddress.classList.add("is-valid");
    }
}
//Check form City
function CheckCity() {
    if (validText(formCity.value) === false) {
        console.log("Ville faux !");
        formCity.classList.remove("is-valid");
        formCity.classList.add("is-invalid");
    } else {
        console.log("Ville OK !");
        formCity.classList.remove("is-invalid");
        formCity.classList.add("is-valid");
    }
}
//Check form Mail
function CheckMail() {
    if (validMail(formMail.value) === false) {
        console.log("Mail faux !");
        formMail.classList.remove("is-valid");
        formMail.classList.add("is-invalid");
    } else {
        console.log("Mail OK !");
        formMail.classList.remove("is-invalid");
        formMail.classList.add("is-valid");
    }
}

//Live check controls
formNameGroup.addEventListener("input", function() {
    CheckName();
});
formFirstNameGroup.addEventListener("input", function() {
    CheckFirstName();
});
formAddressGroup.addEventListener("input", function() {
    CheckAdress();
});
formCityGroup.addEventListener("input", function() {
    CheckCity();
});
formMailGroup.addEventListener("input", function() {
    CheckMail();
});

/*----->Function layout<-----*/
function getProductList() {
    if (basketTeddiesArray) {
        for (let i = 0; i < basketTeddiesArray.length; i++) { //Iteration for all basketProducts
            console.log(i);
            if (basketTeddiesAdded != null) { //If there is something in the basket
                addProductList_description(basketContent, basketTeddiesArray, i);
                totalCalculation(i);

            } else { //If nothing in the basket => Alert
                textMessageNoBasket(basketContent);
                basketRightPart.classList.add("invisible");
                buttonDeleteBasket.classList.add("invisible");
            }
        }
        console.log(basketTeddiesArray);
    } else {
        textMessageNoBasket(basketContent);
        basketRightPart.classList.add("invisible");
        buttonDeleteBasket.classList.add("invisible");
    }
}

/*----->Function go to confirmation page and save orders in local storage<-----*/
function openConfirmationPage(orderID, totalPrice) {

    let confirmationInformations = {
        confirmationNumber: orderID,
        totalPrice: totalPrice,
    }
    const orderAdded = localStorage.getItem("orders")
    if (orderAdded) {
        orderArray = JSON.parse(orderAdded);
        orderArray.push(confirmationInformations);
        localStorage.setItem('orders', JSON.stringify(orderArray));
    } else {
        orderArray = [];
        orderArray.push(confirmationInformations);
        localStorage.setItem('orders', JSON.stringify(orderArray));
    }
    console.log(localStorage.getItem("orders"));
    window.location.href = './confirmation.html?orderId=' + orderID;
}

/*----->Request<-----*/
var toSend;

const postCommand = async(url, dataToSend) => {
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(dataToSend),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    if (response.ok) {
        console.log("Envoi des données réussi");
        return await response.json();
    } else {
        console.log("Erreur lors de l'envoi des données : " + error);
    }
}



/*----->FUNCTION CALL<-----*/
getProductList();

/*----->EVENT<-----*/
//Button for delete all the basket
buttonDeleteBasket.addEventListener('click', function() {
    if (basketTeddiesArray) {
        localStorage.removeItem("basketProducts") //Clear the local storage

        while (basketContent.firstChild) {
            basketContent.removeChild(basketContent.lastChild); //Clear basket page
        }
        refreshNumberBasket();
        textMessageDeleteConfirmation(basketContent);
        basketForm.classList.remove("visible");
        basketForm.classList.add("invisible");
        basketRightPart.classList.add("invisible");
        buttonDeleteBasket.classList.add("invisible");
    }
})

//Button "Commander" and form load
buttonCommander.addEventListener('click', function() {
    basketForm.classList.remove("invisible");
    basketForm.classList.add("visible");
    basketForm.scrollIntoView();
})



buttonSend.addEventListener('click', async(event) => {
    if ((formName.value === '' || formFirstName.value === '' || formAddress.value === '' || formCity.value === '' || formMail.value === '')) {
        alertErrorText(basketForm, "veuillez remplir tous les champs");
    } else if (validText(formName.value) === false || validText(formFirstName.value) === false || validAddress(formAddress.value) === false || validText(formCity.value) === false || validMail(formMail.value) === false) {
        inputsControls();
        console.log("Le nom respecte le format : " + validText(formName.value));
        console.log("Le prénom respecte le format : " + validText(formFirstName.value));
        console.log("L'adresse respecte le format : " + validAddress(formAddress.value));
        console.log("La ville respecte le format : " + validText(formCity.value));
        console.log("L'email respecte le format : " + validMail(formMail.value));
        alert("Merci de remplir correctement les champs");
    } else if (basketTeddiesArray.length === 0) {
        alert("Merci d'ajouter des oursons au panier");
    } else {
        //Creation of the array of product as string
        let products = [];
        for (let i = 0; i < basketTeddiesArray.length; i++) {
            products.push(basketTeddiesArray[i].ID);
        }
        // Creation of contact array
        let contact = {
            firstName: formFirstName.value,
            lastName: formName.value,
            address: formAddress.value,
            city: formCity.value,
            email: formMail.value,
        }
        let toSend = { contact, products };
        console.log(toSend);
        const response = await postCommand(api_2, toSend);
        if (response) {
            console.log(response.orderId);
            console.log(definitiveTotalPrice);
            openConfirmationPage(response.orderId, definitiveTotalPrice);
        }
    }
})