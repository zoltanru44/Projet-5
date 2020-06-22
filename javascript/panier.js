/*----->API DEFINITION<-----*/
const api_2 = "http://localhost:3000/api/teddies/order"

/*----->CONSTANTS<-----*/
const basketContent = document.getElementById("basket_content");
const basketPrice = document.getElementById("basket_price");
const basketform = document.getElementById("basket_form");
const buttonDeleteBasket = document.getElementById("button_delete_basket");
const buttonCommander = document.getElementById("button_commander");
const buttonSend = document.getElementById("button_send");

const objectsNumber = document.getElementById("objects_number");
const objectsPrice = document.getElementById("objects_price");
const objectsPort = document.getElementById("objects_port");
const objectsTotal = document.getElementById("objects_total");
const basketForm = document.getElementById("basket_form");

//Inputs form
const formName = document.getElementById("form_name");
const formFirstName = document.getElementById("form_first_name");
const formAddress = document.getElementById("form_adress");
const formCity = document.getElementById("form_city");
const formMail = document.getElementById("form_mail");

//Local storage
let basketTeddiesAdded = localStorage.getItem("basketProducts")
let basketTeddiesArray = JSON.parse(basketTeddiesAdded);
let totalObjetsArray = []

/*----->FUNCTIONS<-----*/
/*----->Function for picture - description - price and delete<-----*/
function addProductList_description(section, localDataTeddy, i) {
    //Create unique div by object for delete button
    const newDiv = document.createElement("div"); //Creation of div
    section.appendChild(newDiv);
    newDiv.id = "div_product" + i;

    //AddName
    const newName = document.createElement("h2");
    newDiv.appendChild(newName);
    newName.className = "panier_main__section__basket__name";
    newName.innerHTML = localDataTeddy[i].name;
    console.log(localDataTeddy[i].name);

    //-->Add div for picture - description - price and delete
    const newDiv_1 = document.createElement("div"); //Creation of div
    newDiv.appendChild(newDiv_1);
    newDiv_1.className = "panier_main__section__basket__product row";

    //DIV_1 ---> Creation of img
    const newPicture = document.createElement("img");
    newDiv_1.appendChild(newPicture);
    newPicture.setAttribute('src', localDataTeddy[i].picture);
    newPicture.className = "panier_main__section__basket__product__img col-sm-3";

    //DIV_1 --->Creation of DIV_2 for description and option
    const newDiv_2 = document.createElement("div"); //Creation of div
    newDiv_1.appendChild(newDiv_2);
    newDiv_2.className = "panier_main__section__basket__product col-sm-5";

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
    newDiv_3.className = "panier_main__section__basket__div_price col-sm-4";

    //DIV_1 ---> DIV_3 --> Creation of price
    const newPrice = document.createElement("p");
    newDiv_3.appendChild(newPrice);
    const localDataTeddy_price_format = localDataTeddy[i].price / 100
    newPrice.innerHTML = localDataTeddy_price_format.toPrecision(4) + " €";
    newPrice.className = "panier_main__section__basket__product__div_price__price";

    //DIV_1 ---> DIV_3 --> Add Button for delete object
    const newButton = document.createElement("button");
    newDiv_3.appendChild(newButton);
    newButton.innerHTML = "Supprimer le produit";
    newButton.id = "button_delete_" + i;
    newButton.className = "panier_main__section__basket__product__div_price__button button_single_delete";
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
    objectsTotal.innerHTML = totalCalculationPriceResult_form + shippingPrice + " €"
}

/*----->Regex functions<-----*/
function validText(value) {
    return /^[a-zA-Z]{3,}$/.test(value);
}

function validMail(value) {
    return /^[a-zA-Z0-9.:#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/.test(value);
}

/*----->Function layout<-----*/
function getProductList() {
    if (basketTeddiesArray) {
        for (let i = 0; i < basketTeddiesArray.length; i++) { //Iteration for all basketProducts
            console.log(i);
            if (basketTeddiesAdded != null) { //If there is something in the basket
                addProductList_description(basketContent, basketTeddiesArray, i);
                totalCalculation(i);

            } else { //If nothing in the basket => Alert
                alert(" Aucun produit dans le panier");
            }
        }
        console.log(basketTeddiesArray);
    } else {
        alert("Panier Vide");
    }
}

/*----->Request<-----*/
var toSend;

function postCommand(toSend) {
    fetch(api_2, {
            method: 'POST',
            body: toSend,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(function(response) {
            if (response.ok) {
                console.log(response.order_ID)
                return response.json
            }
        })
        .catch(function(error) {
            console.log("Erreur lors de l'appel de la fonction" + error);
        })

}
//Test other way
function sendPost(url, toSend) {
    return new Promise((resolve, reject) => {
        let recovHttp = new XMLHttpRequest();
        recovHttp.open('POST', url);
        recovHttp.setRequestHeader('content-type', 'application/json');
        recovHttp.send(JSON.stringify(toSend));
        recovHttp.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE) {
                if (this.status >= 200 && this.status <= 300) {
                    resolve(JSON.parse(this.responseText));
                } else {
                    reject('encore une erreur');
                }
            }

        }
    });
}

/*----->FUNCTION CALL<-----*/
getProductList();

/*----->EVENT<-----*/
//Button for delete all the basket
buttonDeleteBasket.addEventListener('click', function() {
    localStorage.clear("basketProducts") //Clear the local storage

    while (basketContent.firstChild) {
        basketContent.removeChild(basketContent.lastChild); //Clear basket page
    }
    alert("Panier Vidé !");
})

//Button for delete just one product
/*
const buttonDeleteObject = document.getElementsByClassName("button_single_delete");

buttonDeleteObject.addEventListener('click', function() {
    console.log("poney")
    console.log(buttonDeleteObject);
    //const buttonDeleteObject_number = document.getElementsByClassName("button_delete_object" + i);
})
*/
//Button "Commander" and form load
buttonCommander.addEventListener('click', function() {
    basketForm.classList.remove("invisible");
    basketForm.classList.add("visible");
    basketForm.scrollIntoView();
})

//Button send
var basketProductsArray = [];

buttonSend.addEventListener('click', function() {
    if ((formName.value === '' || formFirstName.value === '' || formAddress.value === '' || formCity.value === '' || formMail.value === '')) {
        alert("Merci de remplir tous les champs");
    } else if (validText(formName.value) === false || validText(formFirstName.value) === false || validText(formAddress.value) === false || validText(formCity.value) === false || validMail(formMail.value) === false) {
        alert("Merci de remplir correctement tous les champs");
    } else if (basketTeddiesArray.length === 0) {
        alert("Merci d'ajouter des oursons au panier");
    } else {
        //Creation of the array of product as string
        for (let i = 0; i < basketTeddiesArray.length; i++) {
            basketProductsArray.push(basketTeddiesArray[i].ID);
        }
        var products = basketProductsArray;
        console.log(products);

        // Creation of contact array
        var contact = {
            firstName: formFirstName.value,
            lastName: formName.value,
            address: formAddress.value,
            city: formCity.value,
            email: formMail.value,
        }
        var toSend = { contact, products };
        sendPost(api_2, toSend) //Whithout Fetch
            /*postCommand(toSend) //With Fetch*/
            .then(function(response) {
                window.location.href = './confirmation.html?orderId=' + response.orderId;
            })
    }
    console.log(toSend);



})

//Form input controls
formName.addEventListener('change', function(event) {
    if (validText(formName.value) === false) {
        console.log("faux !");
    } else {
        console.log("c'est bon !");
    }
})