/*----->API DEFINITION<-----*/
const api_1 = "http://localhost:3000/api/teddies/"

/*----->CONSTANTS<-----*/
const winLocation = window.location.search; //Get location.search
let winLocation_ID;
let data;
var leftBlock = document.getElementById("left_bloc");

/*------>FUNCTION<------*/
function getUrl_Id() {
    const winLocation_ID_array = winLocation.split("="); //Split the location.search
    winLocation_ID = winLocation_ID_array[1]; //Get the part after "="
    console.log(winLocation_ID);
    return winLocation_ID;
}

//Function Add Picture
function addPicture(section, dataTeddyPicture) {
    const newPicture = document.createElement("img");
    section.appendChild(newPicture);
    newPicture.setAttribute('src', dataTeddyPicture);
    newPicture.className = "img-fluid"
    console.log(newPicture.className);
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
        .then(function(data) { //data est la réponse de reponse.json
            console.log(data)
                //Section Add
                // Add picture
            addPicture(leftBlock, data.imageUrl);
            console.log(data);

            /*for (let i = 0; i < data.length; i++) {
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
            }*/
        })
        .catch(function(error) {
            console.log("Erreur lors de l'appel de la fonction" + error);
        })
}

/*----->Appel de la fonction<-----*/
getAllTeddies()
getUrl_Id()
console.log(winLocation_ID)
console.log(api_1 + winLocation_ID)