let monPanier = document.getElementById("mon_panier");



//All buttons 
const buttonDeleteBasket_monPanier = document.getElementById("button_delete_basket");
const buttonAddBasket_monPanier = document.getElementById("button_add_basket");

//Display of number of articles
function refreshNumberBasket() {
    let basketTeddiesAdded_monPanier = localStorage.getItem("basketProducts");
    let basketTeddiesArray_monPanier = JSON.parse(basketTeddiesAdded_monPanier);
    if (basketTeddiesArray_monPanier) {
        let numberOfbasketProducts = basketTeddiesArray_monPanier.length;
        monPanier.innerHTML = "Mon Panier (" + numberOfbasketProducts + ")";
        console.log(numberOfbasketProducts + " produit dans le panier");
    } else {
        monPanier.innerHTML = "Mon Panier (0)";
        console.log("Panier vide !");
    }
}

/*----->FUNCTION CALL<-----*/
refreshNumberBasket()