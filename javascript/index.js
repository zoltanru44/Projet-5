/*----->API DEFINITION<-----*/
const api_1 = "http://localhost:3000/api/teddies"

/*----->CONSTANTS<-----*/


const catalogue = document.getElementById("catalogue")

/*------>FUNCTION<------*/
/*------>Création contenu cards<------*/




//Function Add Name, price, picture...
function addProductCard(section, dataTeddyPicture, dataTeddyName, dataTeddyPrice, dataTeddy_id) {
    //Add Section Col
    const newSection = document.createElement("section");
    section.appendChild(newSection);
    newSection.className = "col-sm-6 col-md-4 mb-2";
    //Add section Card
    const newSection_1 = document.createElement("section");
    newSection.appendChild(newSection_1);
    newSection_1.className = "catalogue__section__card card h-100 bg-light border-secondary";

    //Add picture
    const newPicture = document.createElement("img");
    newSection_1.appendChild(newPicture);
    newPicture.setAttribute('src', dataTeddyPicture);
    newPicture.className = "catalogue__section__card__img card-img-top"

    //New div card-body
    const newDiv = document.createElement("div");
    newSection_1.appendChild(newDiv);
    newDiv.className = "catalogue__section__card__text card-body text-center";
    //Add Name
    const newName = document.createElement("h3");
    newDiv.appendChild(newName);
    newName.innerHTML = dataTeddyName;
    newName.className = "catalogue__section__card__text__name product_name";

    //Add price
    const newPrice = document.createElement("p");
    newDiv.appendChild(newPrice);
    dataTeddyPrice_format = dataTeddyPrice / 100
    newPrice.innerHTML = dataTeddyPrice_format.toPrecision(4) + " €";
    newPrice.className = "catalogue__section__card__text__price ";

    //Add button
    const newButton = document.createElement("a");
    newDiv.appendChild(newButton);
    newButton.innerHTML = "Voir le produit";
    newButton.setAttribute('href', './product.html?id=' + dataTeddy_id);
    newButton.className = "catalogue__section__card__btn btn btn-info";
    newButton.setAttribute("type", "button");
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
                    //Add Product card
                addProductCard(catalogue, data[i].imageUrl, data[i].name, data[i].price, data[i]._id);

            }
        })
        .catch(function(error) {
            console.log("Erreur lors de l'appel de la fonction" + error);
        })
}

/*----->Appel de la fonction<-----*/
getAllTeddies()