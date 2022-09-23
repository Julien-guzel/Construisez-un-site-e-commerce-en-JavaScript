//declaration de la var. "produitenregis.." don't il y a la Key et valeur
let produitEnregistrerDansLocalStorage = JSON.parse(
  localStorage.getItem("panier")
);
//ici je vais chercher le produit du local storage

//afficher les produit
//select de la classe, pour injecter le code html
const positionElement3 = document.querySelector(".cart__item");
let structureProduitPanier = [];
//voir si le panier est vide : afficher le panier est vie
if (produitEnregistrerDansLocalStorage === null) {
} else {
  for (k = 0; k < produitEnregistrerDansLocalStorage.length; k++) {

    structureProduitPanier =
      structureProduitPanier +
      `
      <article class="cart__item" data-id="${produitEnregistrerDansLocalStorage[k].idDuProduit}" data-color="${produitEnregistrerDansLocalStorage[k].optionCouleur}">
                <div class="cart__item__img">
                  <img src="../images/product01.jpg" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>Nom du produit</h2>
                    <p>${produitEnregistrerDansLocalStorage[k].optionCouleur}</p>
                    <p>42,00 €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : ${produitEnregistrerDansLocalStorage[k].quantite}</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produitEnregistrerDansLocalStorage[k].quantite}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
  `
  ;
    
  }
  if (k == produitEnregistrerDansLocalStorage.length) {
    //inject html page panier
    positionElement3.innerHTML = structureProduitPanier;

  }
}