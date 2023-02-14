/**
 * Recuperationn de l'id du canape via l'url
 *
 * location hred
 * searchParams.get
 */
function getArticleId() {
  return new URL(location.href).searchParams.get("id");
}

/**
 * récupérer du canapé cliquer a partir de l'acceuil avec requête de type GET
 *
 * fetch
 */
async function getArticle(identifiantDeArticle) {
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

/**
 * affichage du canape
 *
 * querySelector ( selectionne un element du html )
 * innerHTML ( envoie un text ou image )
 * textContent ( insert un text )
 * getElementById ( recupere l'element avec l'id visée )
 * boucle For ( pour la couleur )
 */
(async function () {
  const identifiantDeArticle = getArticleId();
  const article = await getArticle(identifiantDeArticle);
  hydrateArticle(article);

  /**
 * Fonction permetant d'envoyer des donnés dans le html ( les inforamtions du canapé )
 *
 */
  function hydrateArticle(article) {
    document.querySelector(".item__img").innerHTML = `<img src="${article.imageUrl}" alt="${article.altTxt}">`;
    document.getElementById("title").textContent = article.name;
    document.getElementById("price").textContent = article.price;
    document.getElementById("description").textContent = article.description;
    
    for (let i = 0; i < article.colors.length; i++) {
      document.getElementById("colors").innerHTML += `<option value="${article.colors[i]}">${article.colors[i]}</option>`;
    }
  }
})();

/**
 * 3 - envoie du 1er canapé dans le localStorage
 * 2 - envoie d'un canapé dans le localStorage, si un canapé est deja dans le localStorage
 * 1 - implementation de la quantite Seul, si un meme produit est existant dans le localStorage
 */

const selctBtnAjoutPanier = document.querySelector("#addToCart");
selctBtnAjoutPanier.addEventListener("click", async (event) => {
  event.preventDefault();
  const identifiantDeArticle = getArticleId();
  const article = await getArticle(identifiantDeArticle);

  // variable qui sera envoyer dans le localStorage pour le panier
  let leProduit = {
    nomProduit: article.name,
    idDuProduit: identifiantDeArticle,
    optionCouleur: document.getElementById("colors").value,
    quantite: parseInt(document.getElementById("quantity").value),
    descriptionDuProduit: article.description,
  };


  /**
 * recuperation des canapé du localStorage
 * 
 * JSON.parse ( convertit le json en objet javascript )
 * localStorage.getItem ( recupere les elements du localStorage )
 */
  let produitEnregistrerDansLocalStorage = JSON.parse(localStorage.getItem("panier"));

  
  /**
   * implementation de la quantite Seul, si un meme produit est existant dans le localStorage
   *
   * if si il y a deja un produit dans le localstorage
   * find ( envoie le 1er produit repondant à la condition que je lui donne )
   * localStorage.setItem ( envoie vers le localStorage )
   * JSON.stringify ( convertit objet javascript en format json )
   * location.reload() ( actualise la page )
   */
  if (produitEnregistrerDansLocalStorage) {
    let canapeDansLocalStorage = produitEnregistrerDansLocalStorage.find(
      (el) => el.idDuProduit == leProduit.idDuProduit && el.optionCouleur == leProduit.optionCouleur
    );
    
    // envoie de la nouvelle quantite dans la quantite deja existance du meme produit
    if (canapeDansLocalStorage) {
      canapeDansLocalStorage.quantite = canapeDansLocalStorage.quantite + leProduit.quantite;
      
      if(canapeDansLocalStorage.quantite > 100 ){
        alert("Attention la quantite total ");
        return false;
      }

      localStorage.setItem("panier",JSON.stringify(produitEnregistrerDansLocalStorage));
      location.reload();
      return false;
    }

    /**
     * envoie d'un canapé dans le localStorage, si un canapé est deja dans le localStorage
     *
     * Condition If ( si le champs option couleur est vide ou quantité inferieur a 1 ou superieur a 100, lance un message d'alerte )
     * Alert
     * Else sinon envoie des elements du canapé choisit dans le localStorage
     * localStorage. SetItem ( envoie au localStorage )
     * Json. Stringify ( convertit objet js en json )
     * Location.reload() ( actualise la page )
     */
    if (
      leProduit.optionCouleur == "" ||
      leProduit.quantite < 1 ||
      leProduit.quantite > 100
    ) {
      alert("Veuillez choisir une couleur, et/ou une quantite superieur à 0 et inferieur à 100");
      return false;
    } else {
      produitEnregistrerDansLocalStorage.push(leProduit);
      localStorage.setItem("panier",JSON.stringify(produitEnregistrerDansLocalStorage));
      location.reload();
    }

    /**
     * envoie du 1er canapé dans le localStorage
     *
     * condition If ( si le champs option couleur est vide ou quantité inferieur a 1 ou superieur a 100, lance un message d'alerte )
     * Alert
     * else sinon crée un tableau
     * push envoyer le produit et c'est information dans le tableau crée
     * localStorage. SetItem ( envoie du tableau contenant le canapé et c'est information dans le localStorage )
     * Json. Stringify ( convertit un objet javascript en json, en gros convertit objet javascript en chaine de caractere dans le localStorage )
     * Location.reload()
     */
  } else {
    if (
      leProduit.optionCouleur == "" ||
      leProduit.quantite == 0 ||
      leProduit.quantite > 100
    ) {
      alert(
        "Veuillez choisir une couleur, et/ou une quantite superieur à 0 et inferieur à 100"
      );
    } else {
      produitEnregistrerDansLocalStorage = [];
      produitEnregistrerDansLocalStorage.push(leProduit);
      localStorage.setItem(
        "panier",
        JSON.stringify(produitEnregistrerDansLocalStorage)
      );
      location.reload();
    }
  }
});
