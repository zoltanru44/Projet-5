/*----->API DEFINITION<-----*/
const api_1 = "http://localhost:3000/api/teddies/"

/*----->CONSTANTS<-----*/
const winLocation = window.location.search; //Get location.search
let winLocation_ID;
var leftBlock = document.getElementById("left_bloc");
var rightBlock = document.getElementById("right_bloc");
var teddyDescription = document.getElementById("teddy_description");
var optionList = document.getElementById("options_list");
var productPrice = document.getElementById("product_price");
var productNumber = document.getElementById("input_number_product");
var basketProducts = [];
const buttonAddBasket = document.getElementById("button_add_basket");
const buttonAddDiv = document.getElementById("button_add_div");

/*------>FUNCTIONS<------*/

//Function to get the id without ?id=
function getUrl_Id() {
    const winLocation_ID_array = winLocation.split("="); //Split the location.search
    winLocation_ID = winLocation_ID_array[1]; //Get the part after "="
    return winLocation_ID;
}

//Function Add Picture
function addPicture(section, dataTeddyPicture) {
    const newPicture = document.createElement("img");
    section.appendChild(newPicture);
    newPicture.setAttribute('src', dataTeddyPicture);
    newPicture.className = "img-fluid"
    console.log("Adresse de l'image : " + newPicture.src);
}
//Function Add name
function addName(section, dataTeddyName) {
    const newName = document.createElement("h2");
    section.appendChild(newName);
    newName.innerHTML = dataTeddyName;
    newName.className = "text-center js_modified";
    console.log("nom du nounours : " + dataTeddyName);
}
//Function Add description
function addDescription(dataTeddyDescription) {
    teddyDescription.innerHTML = dataTeddyDescription;
    teddyDescription.className = "text-left";
    console.log("description du nounours : " + dataTeddyDescription);
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
        console.log(child);
        let oldChild = section.removeChild(child);
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
        console.log(child);
        let oldChild = section.removeChild(child);
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
                console.log("Récupération des données de l'API OK");
                //Fonction de réponse
                return response.json() // Retourne la réponse en format JSON quand terminé
            }
        })
        .then(function(data) {
            console.log(data);
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
                    console.log(addTeddy);
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
                    console.log(teddiesArray);
                    console.log(teddiesAdded);
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

console.log("ID de la page " + winLocation_ID);
console.log("Adresse utilisée pour la requete " + api_1 + winLocation_ID);