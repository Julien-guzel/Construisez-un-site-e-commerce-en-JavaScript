// recuperer le ID de l'article-----------------------------------------------------------------------
function getArticleId() {
  return new URL(location.href).searchParams.get("id");
}

function getArticle(identifiantDeArticle) {
  return fetch(`http://localhost:3000/api/products/${identifiantDeArticle}`)
    .then(function (httpBodyResponse) {
      return httpBodyResponse.json();
    })
    .then(function (article) {
      return article;
    })
    .catch(function (error) {
      alert(error);
    });
}
// Afficher les elements dans le html------------------------------------------------------------------
function hydrateArticle(article) {
  document.getElementById("title").textContent = article.name;
  document.getElementById("description").textContent = article.description;
  document.getElementById("price").textContent = article.price;
  document.getElementById(
    "item__img"
  ).innerHTML = `<img src="${article.imageUrl}" alt="${article.altTxt}" width="700">`;
  for (let i = 0; i < article.colors.length; i++) {
    const couleursDesArticles = article.colors[i];
    // console.log(document.getElementById("colors").innerHTML);
    document.getElementById(
      "colors"
    ).innerHTML += `<option value="${couleursDesArticles}">${couleursDesArticles}</option>`;
  }
}

(async function () {
  const identifiantDeArticle = getArticleId();
  const article = await getArticle(identifiantDeArticle);
  hydrateArticle(article);

  // selectionner l'id de la couleurs-----------------------------------------------------------------
  const idColors = document.querySelector("#colors");

  // selectionner la quantité---------------------------------------------------------------------
  const selectionneQuantite = document.querySelector("#quantity");

  // selectionner Button ajout au panier---------------------------------------------------------------------
  const selctBtnAjoutPanier = document.querySelector("#addToCart");

  // mettre le choix de la couleur par l'utilisateur------------------------------------------------------
  const choixColors = idColors.value;
})();

const selctBtnAjoutPanier = document.querySelector("#addToCart");

// ecouter le boutton et envoyer le panier------------------------------------------------------------
selctBtnAjoutPanier.addEventListener("click",async (event) => {
  event.preventDefault(); // ---preventDefault()--- permet d'ajouter au panier sans actualiser la page----
console.log("le bouton");
  const identifiantDeArticle = getArticleId();
  const article = await getArticle(identifiantDeArticle);

  // Je veut envoyer quoi dans mon panier ?------------------------------------------------------------------------
  let leProduit = {
    // nomProduit: article.name,
    idDuProduit: identifiantDeArticle,
    optionCouleur: document.getElementById("colors").value,
    quantite: document.getElementById("quantity").value,
    // prix: article.price,
  };

  // localStorage----------------------------------------------------------------------------
  //Mettre les clé et valeur dans le localStorage ( getItem )
  //JSON.parse convertit le JSON en Objet JavaScript
  let produitEnregistrerDansLocalStorage = JSON.parse(
    localStorage.getItem("panier")
  );

  // JON.parse -> passer de format JSON à Objet ( dans localStorage )
  // si il y a deja un produit dans le local Storage-----------------------------------------
  if (produitEnregistrerDansLocalStorage) {
    // je regarde dans le local storage, si l'article ID et la couleur

    //push permet de mettre "leProduit" dans le tableau "produitEnregistrerDansLocalStorage"
    //envoie le produit choisit---------------------------------------------------------------
    produitEnregistrerDansLocalStorage.push(leProduit);

    //envoie le produit dans la Key "panier" en format JSON dans le localStorage-------------
    //JOSN.stringify convertit l'objet javascript en chaine de caractere JSON---------
    localStorage.setItem(
      "panier",
      JSON.stringify(produitEnregistrerDansLocalStorage)
    );

    // Si il n'y a pas de produit dans le localStorage-------------------------------------------
  } else {
    //creation tableau vide
    produitEnregistrerDansLocalStorage = [];
    //envoie le produit choisit---------------------------------------------------------------
    produitEnregistrerDansLocalStorage.push(leProduit);
    //envoie le produit dans la Key "panier" en format JSON dans le localStorage-------------
    //JOSN.stringify convertit l'objet javascript en chaine de caractere JSON---------
    localStorage.setItem(
      "panier",
      JSON.stringify(produitEnregistrerDansLocalStorage)
    );
    //push permet de mettre "leProduit" dans le tableau "produitEnregistrerDansLocalStorage"
  }
});
// localStorage.setItem --- pour mettre des valeurs dans le localStorage
//aller .map et aller voir .filter
