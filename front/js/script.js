/**
 * récuperation des produits de l'url
 * avec requête de type GET
 * fetch
 */
fetch("http://localhost:3000/api/products/")
  .then((response) => response.json())
  .then(async function (objetAPI) {
    let tousLesCanape = await objetAPI;
    afficheArticle(tousLesCanape);
  });

/**
 * Crée la structure html et insere les infos des canapes
 *
 * Boucle FOR
 * createElement
 * setAttribute
 * appendChild
 * className
 * textContent
 */
function afficheArticle(canape) {
  for (let i = 0; i < canape.length; i++) {
    let baliseA = document.createElement("a");
    baliseA.setAttribute("href", "./product.html?id=" + canape[i]._id);
    document.querySelector(".items").appendChild(baliseA);

    let baliseArticle = document.createElement("article");
    baliseA.appendChild(baliseArticle);

    let baliseIMG = document.createElement("img");
    baliseIMG.setAttribute("src", canape[i].imageUrl);
    baliseIMG.setAttribute("alt", canape[i].altTxt);
    baliseArticle.appendChild(baliseIMG);

    let baliseH3 = document.createElement("h3");
    baliseH3.className = "productName";
    baliseH3.textContent = canape[i].name;
    baliseArticle.appendChild(baliseH3);

    let baliseP = document.createElement("p");
    baliseP.className = "productDescription";
    baliseP.textContent = canape[i].description;
    baliseArticle.appendChild(baliseP);
  }
}
