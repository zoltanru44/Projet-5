const basketContent = document.getElementById("basket_content");
const basketPrice = document.getElementById("basket_price");
const basketform = document.getElementById("basket_form");
const buttonDeleteBasket = document.getElementById("button_delete_basket");

/*buttonAddBasket.addEventListener('click', function() {
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
});*/
function addProductList(section, localDataTeddyName) {
    //AddName and suppress button in div
    const newDiv = document.createElement("div");
    section.appendChild(newDiv);
    newDiv.className = "panier_main__section__basket__name";
    const newName = document.createElement("h2");
    section.appendChild(newName);
    newName.className = "panier_main__section__basket__name";
    newName.innerHTML = localDataTeddyName;
    console.log(localDataTeddyName);
}

const basketTeddiesAdded = localStorage.getItem("products")
const basketTeddiesArray = JSON.parse(basketTeddiesAdded);

function getProductList() {
    for (let i = 0; i < basketTeddiesArray.length; i++) {

        console.log(i)
        if (basketTeddiesAdded != null) {
            addProductList(basketContent, basketTeddiesArray[i].name);


        } else {
            alert(" Aucun produit dans le panier");
        }

    }
    console.log(basketTeddiesArray);
}

/*----->FUNCTION CALL<-----*/
getProductList();

/*----->EVENT<-----*/
buttonDeleteBasket.addEventListener('click', function() {
    localStorage.clear("products");
})