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
    newPicture.className = "catalogue__section__card__img card-img-top img_fit"

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
}
/*----->PROMISE>-----*/
function promiseGet() {
    return new Promise((resolve, reject) => {
        let recupHttp = new XMLHttpRequest();
        recupHttp.open('GET', api_1);
        recupHttp.send();
        recupHttp.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE) {
                if (this.status === 200) {
                    resolve(JSON.parse(this.responseText));
                } else {
                    reject(recupHttp);
                }
            }
        }
    })
}
/*----->REQUEST>-----*/
promiseGet()
    .then(function(data) { //réponse de reponse.json est l'argument
        //Section Add
        for (let i = 0; i < data.length; i++) {
            //Add Product card
            addProductCard(catalogue, data[i].imageUrl, data[i].name, data[i].price, data[i]._id);
        }
    })
    .catch(function(error) {
        console.log("Erreur lors de l'appel de la fonction" + error);
    })