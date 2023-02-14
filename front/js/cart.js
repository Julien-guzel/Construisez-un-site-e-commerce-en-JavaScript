/**
 * recupere les canapes du localstorage et les convertit en objet js
 * 
 * JSON.parse ( convertit json en js )
 * localStorage.getItem ( recupere item du localStorage )
 */
let produitEnregistrerDansLocalStorage = JSON.parse(localStorage.getItem("panier"));

/**
 * Fonction recuperation du prix
 * 
 * en utilisant fetch
 */
async function recuperationCanape(idDuProduit) {
  return await fetch("http://localhost:3000/api/products/" + idDuProduit)
    .then((response) => response.json())
    .then(async function (resultatAPI) {
      return resultatAPI;
    });
}

/**
 * creation structures html
 * affichage des canapes, du nombre d'articles et prix total
 *
 * Boucle FOR ( sur le canape du localStorage )
 * Function recuperation prix ( pour afficher le prix des canapés )
 * document.createElement ( creation des balises html )
 * document.querySelector ( selection des class pour injecter dans le html )
 * className ( creation class et nommage )
 * setAttribute ( creation attribut et inject un details du canapés )
 * appendChild ( placement des balises )
 * textContent ( injection d'un text dans le html )
 */
async function affichagePanier() {

  let totalprice = 0;
  let nombreTotal = 0;

  for (let v = 0; v < produitEnregistrerDansLocalStorage.length; v++) {

    const canap = await recuperationCanape(produitEnregistrerDansLocalStorage[v].idDuProduit);

    let sectionCartItem = document.querySelector("#cart__items");
    let articleCartItem = document.createElement("article");
    articleCartItem.className = "cart__item";
    articleCartItem.setAttribute("data-id",produitEnregistrerDansLocalStorage[v].idDuProduit);
    articleCartItem.setAttribute("data-color",produitEnregistrerDansLocalStorage[v].optionCouleur);
    sectionCartItem.appendChild(articleCartItem);

    let divCartIteamImg = document.createElement("div");
    divCartIteamImg.className = "cart__item__img";
    articleCartItem.appendChild(divCartIteamImg);

    let baliseImg = document.createElement("img");
    baliseImg.setAttribute("src",canap.imageUrl);
    baliseImg.setAttribute("alt",canap.altTxt);
    divCartIteamImg.appendChild(baliseImg);

    let divCartIteamContent = document.createElement("div");
    divCartIteamContent.className = "cart__item__content";
    articleCartItem.appendChild(divCartIteamContent);

    let divCartIteamContentDescription = document.createElement("div");
    divCartIteamContentDescription.className ="cart__item__content__description";
    divCartIteamContent.appendChild(divCartIteamContentDescription);

    let baliseH2 = document.createElement("h2");
    baliseH2.textContent = produitEnregistrerDansLocalStorage[v].nomProduit;
    divCartIteamContentDescription.appendChild(baliseH2);

    let balisePColor = document.createElement("p");
    balisePColor.textContent = produitEnregistrerDansLocalStorage[v].optionCouleur;
    divCartIteamContentDescription.appendChild(balisePColor);

    let balisePPrix = document.createElement("p");
    balisePPrix.textContent = canap.price + "€";
    divCartIteamContentDescription.appendChild(balisePPrix);

    // calcule pour obtenir le prix total
    totalprice = totalprice + canap.price * produitEnregistrerDansLocalStorage[v].quantite;
    // calcule pour obtenir la quantite total
    nombreTotal = nombreTotal + produitEnregistrerDansLocalStorage[v].quantite;

    let divCartItemContentSettings = document.createElement("div");
    divCartItemContentSettings.className = "cart__item__content__settings";
    divCartIteamContent.appendChild(divCartItemContentSettings);

    let divCartItemContentSetttingsQuantity = document.createElement("div");
    divCartItemContentSetttingsQuantity.className = "cart__item__content__settings__quantity";
    divCartItemContentSettings.appendChild(divCartItemContentSetttingsQuantity);

    let balisePQuantite = document.createElement("p");
    balisePQuantite.textContent = "Qté :";
    divCartItemContentSetttingsQuantity.appendChild(balisePQuantite);

    let inputQuantite = document.createElement("input");
    inputQuantite.className = "itemQuantity";
    inputQuantite.setAttribute("type", "number");
    inputQuantite.setAttribute("name", "itemQuantity");
    inputQuantite.setAttribute("min", "1");
    inputQuantite.setAttribute("max", "100");
    inputQuantite.setAttribute("value", produitEnregistrerDansLocalStorage[v].quantite);
    divCartItemContentSetttingsQuantity.appendChild(inputQuantite);

    let divCartItemContentSettingsDelete = document.createElement("div");
    divCartItemContentSettingsDelete.className = "cart__item__content__settings__delete";
    divCartItemContentSettings.appendChild(divCartItemContentSettingsDelete);

    let pDeSupprimer = document.createElement("p");
    pDeSupprimer.className = "deleteItem";
    pDeSupprimer.textContent = "Supprimer";
    divCartItemContentSettingsDelete.appendChild(pDeSupprimer);
  }

  // Affichage du nombre total d'article
  const quantiteTotalHtml = document.querySelector("#totalQuantity");
  quantiteTotalHtml.innerHTML = nombreTotal;

  // affichage du prix total
  const prixTotalHtml = document.querySelector("#totalPrice");
  prixTotalHtml.innerHTML = totalprice;

  // appel des fonctions de suppression de produit et modification de la quantite
  gestionEventclickSuppression();
  modificationQuantite();
}
affichagePanier();

/**
 * modification de la quantite de l'article
 *
 * document.querySelectorAll ( selectionne l'input contenant la quantite des canapés )
 * boucle FOR ( boucle sur le ou les input de quantite )
 * addEventListener "change" ( ecoute le changement de l'input de quantite )
 * localStorage.setItem ( envoie le tableau des produits avec la nouvelle quantite dans le localStorage )
 * JSON.stringify ( convertit objet js en json )
 * location.reload() ( actualisation de la page )
 */
function modificationQuantite() {
  let inputQuantite = document.querySelectorAll(".itemQuantity");

  for (let k = 0; k < inputQuantite.length; k++) {
    inputQuantite[k].addEventListener("change", (event) => {
      event.preventDefault();

      produitEnregistrerDansLocalStorage[k].quantite = inputQuantite[k].valueAsNumber;

      localStorage.setItem( "panier", JSON.stringify(produitEnregistrerDansLocalStorage));
      location.reload();
    });
  }
}

/**
 * cette fonction permet de supprimer un article
 *
 * querySelectorAll ( selectionne le ou les bouttons supprimées )
 * boucle FOR ( boucle sur le ou les bouttons )
 * addEventListener "click" ( ecoute le click sur le boutton supprimés )
 * filter ( recupere le tableau, filtre le tableau par rapport a la condition que je lui donne
 * et me ré-envoie un nouveau tableau, avec la condition respecter )
 */
function gestionEventclickSuppression() {
  let btnSupprimer = document.querySelectorAll(".cart__item__content__settings__delete");

  for (let x = 0; x < btnSupprimer.length; x++) {

    btnSupprimer[x].addEventListener("click", (event) => {
      event.preventDefault();

      produitEnregistrerDansLocalStorage = produitEnregistrerDansLocalStorage.filter((canape) => 
      canape.idDuProduit + canape.optionCouleur !== produitEnregistrerDansLocalStorage[x].idDuProduit + produitEnregistrerDansLocalStorage[x].optionCouleur);

      localStorage.setItem("panier",JSON.stringify(produitEnregistrerDansLocalStorage)
      );

      location.reload();
    });
  }
}

/**
 * Fonction permetant de controler les champs du formulaire
 *
 * regex ( conditionne les champs )
 * querySelector ( selectionne la classe des champs du formulaire )
 * getElementById ( recupere l'id dans le html )
 * textContent ( inject un texte dans le html )
 * addEventListener click ( ecoute le click sur le boutton "commander" )
 * boucle for ( les canapes contenue dans le panier )
 * push ( envoie une information dans un tableau )
 */
function controleChamps(value, regex, idChamps) {
  if (regex(value)) {
    document.querySelector(idChamps).textContent = "";
    return true;
  } else {
    document.querySelector(idChamps).textContent = "Veuillez bien remplir ce champs";
    return false;
  }
}

const btnCommander = document.querySelector("#order");
btnCommander.addEventListener("click", (e) => {
  e.preventDefault();

  let inputName = document.getElementById("firstName");
  let inputLastName = document.getElementById("lastName");
  let inputAdress = document.getElementById("address");
  let inputCity = document.getElementById("city");
  let inputMail = document.getElementById("email");

  let produit = [];

  for (let i = 0; i < produitEnregistrerDansLocalStorage.length; i++) {
    produit.push(produitEnregistrerDansLocalStorage[i].idDuProduit);
  }

  const order = {
    contact: {
      firstName: inputName.value,
      lastName: inputLastName.value,
      address: inputAdress.value,
      city: inputCity.value,
      email: inputMail.value,
    },
    products: produit,
  };

  // Controle les donnée des champs
  const regexPrenomNom = (value) => {
    return /^[a-zA-Z\-]+$/.test(value);
  };
  const regexAdresse = (value) => {
    return /^\s*\S+(?:\s+\S+){2}/.test(value);
  };
  const regexVille = (value) => {
    return /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/.test(value);
  };
  const regexEmail = (value) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
  };

  /**
 * appelle des fonctions de controle de champs, avec les valeurs
 */
  controleChamps(order.contact.firstName, regexPrenomNom, "#firstNameErrorMsg");
  controleChamps(order.contact.lastName, regexPrenomNom, "#lastNameErrorMsg");
  controleChamps(order.contact.address, regexAdresse, "#addressErrorMsg");
  controleChamps(order.contact.city, regexVille, "#cityErrorMsg");
  controleChamps(order.contact.email, regexEmail, "#emailErrorMsg");

  /**
   * condition, si les regex = true
   *
   * if ( si les regex sont respecter, post dans l'url le numero de commande )
   * Json.stringify ( convertit objet js en json )
   * fetch ( recupere l'url )
   * post du numero de commande dans l'url
   * localStorage.clear()
   */
  if (
    controleChamps(order.contact.firstName, regexPrenomNom, "#firstNameErrorMsg") == true &&
    controleChamps(order.contact.lastName,regexPrenomNom,"#lastNameErrorMsg") == true &&
    controleChamps(order.contact.address, regexAdresse, "#addressErrorMsg") == true &&
    controleChamps(order.contact.city, regexVille, "#cityErrorMsg") == true &&
    controleChamps(order.contact.email, regexEmail, "#emailErrorMsg") == true
  ) {
    // post dans l'URL contenu dans "fetch" la Varible "order"
    const options = {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    fetch("http://localhost:3000/api/products/order", options)
      .then((response) => response.json())
      .then(function (resultOrder) {
        document.location.href = "confirmation.html?orderId=" + resultOrder.orderId;
        localStorage.clear();
      })

      .catch((err) => {
        alert("Problème avec fetch : " + err.message);
      });
  }
});
