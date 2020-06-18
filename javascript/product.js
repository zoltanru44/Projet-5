/*----->API DEFINITION<-----*/
const api_1 = "http://localhost:3000/api/teddies/"

/*----->CONSTANTS<-----*/
const winLocation = window.location.search; //Get location.search
let winLocation_ID;
var leftBlock = document.getElementById("left_bloc");
var rightBlock = document.getElementById("right_bloc");
var teddyDescription = document.getElementById("teddy_description");
var optionList = document.getElementById("options_list");
var products = [];
const buttonAddBasket = document.getElementById("button_add_basket");


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



            /*----->EVENT<-----*/

            //Click function create addTeddy
            buttonAddBasket.addEventListener('click', function() {
                let addTeddy = {
                    ID: data._id,
                    picture: data.imageUrl,
                    name: data.name,
                    option: optionList.value,
                    price: data.price,
                    description: data.description,
                }
                console.log(addTeddy);
                const teddiesAdded = localStorage.getItem("products")
                if (teddiesAdded) {
                    teddiesArray = JSON.parse(teddiesAdded);
                    teddiesArray.push(addTeddy);
                    localStorage.setItem('products', JSON.stringify(teddiesArray));
                    alert(data.name + " a bien été ajouté au panier !");
                } else {
                    teddiesArray = [];
                    teddiesArray.push(addTeddy);
                    localStorage.setItem('products', JSON.stringify(teddiesArray));
                    alert(data.name + " a bien été ajouté au panier !");
                }
                console.log(teddiesArray);
                console.log(teddiesAdded);
            });

        })

    /*.catch(function(error) {
        console.log("Erreur lors de l'appel de la fonction " + error);
    })*/
}

/*----->Appel de la fonction<-----*/
getUrl_Id();
getAllTeddies();

console.log("ID de la page " + winLocation_ID);
console.log("Adresse utilisée pour la requete " + api_1 + winLocation_ID);



/*----->CONSTANT<-----*/


/*----->FUNCTION<-----*/