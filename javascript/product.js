/*----->API DEFINITION<-----*/
const api_1 = "http://localhost:3000/api/teddies/"

/*----->CONSTANTS<-----*/
const winLocation = window.location.search; //Get location.search
let winLocation_ID;
let leftBlock = document.getElementById("left_bloc");
let rightBlock = document.getElementById("right_bloc");
let teddyDescription = document.getElementById("teddy_description");
let optionList = document.getElementById("options_list");
let productPrice = document.getElementById("product_price");
let productNumber = document.getElementById("input_number_product");
let basketProducts = [];
const buttonAddBasket = document.getElementById("button_add_basket");
const buttonAddDiv = document.getElementById("button_add_div");

/*------>FUNCTIONS<------*/

//Function to get the id without ?id=
function getUrl_Id() {
    const winLocationParameters = new URLSearchParams(winLocation);
    winLocation_ID = winLocationParameters.get('id');
    return winLocation_ID;
}
//Function Add Picture
function addPicture(section, dataTeddyPicture) {
    const newPicture = document.createElement("img");
    section.appendChild(newPicture);
    newPicture.setAttribute('src', dataTeddyPicture);
    newPicture.className = "img-fluid"
}
//Function Add name
function addName(section, dataTeddyName) {
    const newName = document.createElement("h2");
    section.appendChild(newName);
    newName.innerHTML = dataTeddyName;
    newName.className = "text-center js_modified";
}
//Function Add description
function addDescription(dataTeddyDescription) {
    teddyDescription.innerHTML = dataTeddyDescription;
    teddyDescription.classList.add("responsive_text_center");
}
//Function options
function addOptions(ulName, dataOption) {
    for (let i = 0; i < dataOption.length; i++) {
        const newOption = document.createElement('option');
        ulName.appendChild(newOption);
        newOption.innerHTML = dataOption[i];
        newOption.className = "right_bloc__options_list__choice "
        newOption.id = "option_" + i;
    }
}
//function Price
function addPrice(section, dataTeddyPrice) {
    const newPrice = document.createElement("p");
    section.appendChild(newPrice);
    dataTeddyPrice_format = dataTeddyPrice / 100
    newPrice.innerHTML = dataTeddyPrice_format.toPrecision(4) + " €";
}
//Function to create message after add product
function textMessageAdd(section, basketValue, value, name) {
    let child = document.getElementById("textMessageAdd");
    if (child) { //Delete old message
        section.removeChild(child);
    }
    let infoTextAdd = document.createElement("p");
    section.appendChild(infoTextAdd);
    infoTextAdd.setAttribute("id", "textMessageAdd");
    infoTextAdd.className = "text-center alert-success";
    if (basketValue != 1) {
        infoTextAdd.innerHTML = value + " nounours " + name + " ont bien été ajoutés au panier !"
    } else {
        infoTextAdd.innerHTML = value + " nounours " + name + " a bien été ajouté au panier !"
    }
}

function textMessageAlertNumber(section) {
    let child = document.getElementById("textMessageAdd");
    if (child) { //Delete old message
        section.removeChild(child);
    }
    let infoTextAlert = document.createElement("p");
    section.appendChild(infoTextAlert);
    infoTextAlert.setAttribute("id", "textMessageAdd");
    infoTextAlert.className = "text-center alert-danger";
    infoTextAlert.innerHTML = "Merci d'ajouter une quantité valide"
}

/*----->REQUEST>-----*/
function getAllTeddies() {
    fetch(api_1 + winLocation_ID) //Requete de l'API
        .then(function(response) {
            if (response.ok) {
                //Fonction de réponse
                return response.json() // Retourne la réponse en format JSON quand terminé
            }
        })
        .then(function(data) {
            //left block Adds
            // Add picture
            addPicture(leftBlock, data.imageUrl);
            // Add name
            addName(leftBlock, data.name);
            //Right bloc Adds
            //Add Description
            addDescription(data.description);
            //Add options
            addOptions(optionList, data.colors);
            //Add price
            addPrice(productPrice, data.price);

            /*----->EVENT<-----*/

            //Click function create addTeddy
            buttonAddBasket.addEventListener('click', function() {
                if (productNumber.value <= 0) {
                    textMessageAlertNumber(buttonAddDiv);
                } else {
                    let addTeddy = {
                        ID: data._id,
                        picture: data.imageUrl,
                        name: data.name,
                        option: optionList.value,
                        price: data.price,
                        description: data.description,
                        number: productNumber.value,
                    }
                    const teddiesAdded = localStorage.getItem("basketProducts")
                    if (teddiesAdded) {
                        teddiesArray = JSON.parse(teddiesAdded);
                        teddiesArray.push(addTeddy);
                        localStorage.setItem('basketProducts', JSON.stringify(teddiesArray));
                        textMessageAdd(buttonAddDiv, productNumber.value, productNumber.value, data.name)
                    } else {
                        teddiesArray = [];
                        teddiesArray.push(addTeddy);
                        localStorage.setItem('basketProducts', JSON.stringify(teddiesArray));
                        textMessageAdd(buttonAddDiv, productNumber.value, productNumber.value, data.name)
                    }
                    refreshNumberBasket();
                }
            });
        })
        .catch(function(error) {
            console.log("Erreur lors de l'appel de la fonction" + error);
        })
}

/*----->Appel de la fonction<-----*/
getUrl_Id();
getAllTeddies();