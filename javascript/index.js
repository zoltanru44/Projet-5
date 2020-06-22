/*----->API DEFINITION<-----*/
const api_1 = "http://localhost:3000/api/teddies"

/*----->CONSTANTS<-----*/


const catalogue = document.getElementById("catalogue")

/*------>FUNCTION<------*/
/*------>Création contenu cards<------*/



//Function Add Picture
function addPicture(section, dataTeddyPicture) {
    const newPicture = document.createElement("img");
    section.appendChild(newPicture);
    newPicture.setAttribute('src', dataTeddyPicture);
    newPicture.className = "catalogue__section__card__img card-img-top"
    console.log(newPicture.className);
}
//Function Add Name and price
function addNamePrice(section, dataTeddyName, dataTeddyPrice) {
    const newDiv = document.createElement("div");
    section.appendChild(newDiv);
    newDiv.className = "catalogue__section__card__text card-body text-center";
    const newName = document.createElement("h3");
    newDiv.appendChild(newName);
    newName.innerHTML = dataTeddyName;
    newName.className = "catalogue__section__card__text__name product_name";
    console.log(dataTeddyName);
    //Add price
    const newPrice = document.createElement("p");
    newDiv.appendChild(newPrice);
    dataTeddyPrice_format = dataTeddyPrice / 100
    newPrice.innerHTML = dataTeddyPrice_format.toPrecision(4) + " €";
    newPrice.className = "catalogue__section__card__text__price ";
    console.log(dataTeddyPrice / 100);
}
//Function Add button with id link
function addButtonId(section, dataTeddy_id) {
    const newButton = document.createElement("a");
    section.appendChild(newButton);
    newButton.innerHTML = "Voir le produit";
    newButton.setAttribute('href', './product.html?id=' + dataTeddy_id);
    newButton.className = "catalogue__section__card__btn btn-block badge";
    console.log(dataTeddy_id);
}



function consoleLog(data) {
    console.log(data);
}

/*----->REQUEST>-----*/
function getAllTeddies() {
    fetch(api_1) //Requete de l'API
        .then(function(response) {
            if (response.ok) {
                console.log("Récupération des données de l'API OK");
                //Fonction de réponse
                return response.json() // Retourne la réponse en format JSON quand terminé
            }
        })
        .then(function(data) { //réponse de reponse.json est l'argument
            console.log(data)
                //Section Add
            for (let i = 0; i < data.length; i++) {
                console.log(i)
                    //new section
                const newSection = document.createElement("section");
                catalogue.appendChild(newSection);
                newSection.className = "catalogue__section__card card col-sm-4";
                console.log(newSection.className);
                //Add Picture
                addPicture(newSection, data[i].imageUrl);
                //Add Name and price
                addNamePrice(newSection, data[i].name, data[i].price);
                //Add Button with id link
                addButtonId(newSection, data[i]._id);
            }
        })
        .catch(function(error) {
            console.log("Erreur lors de l'appel de la fonction" + error);
        })
}

/*----->Appel de la fonction<-----*/
getAllTeddies()