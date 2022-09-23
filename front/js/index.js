// Appel de ma fonction main (declanche l'afficahge de mes articles)
main();

/**
 * Recupere la liste d'articles et les affiches dans le DOM
 */
async function main() {
  const articles = await getArticles();

  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    displayArticle(article);
  }
}
/**
 * recupere la listes des produits via l'API
 * @returns tableau des produits
 */
function getArticles() {
  return fetch("http://localhost:3000/api/products")
    .then(function (httpBodyResponse) {
      return httpBodyResponse.json();
    })
    .then(function (articles) {
      return articles;
    })
    .catch(function (error) {
      alert(error);
    });
}
/**
 * Affiche mon produit dans le HTML (#items)
 * @param {*} article Produit à afficher
 */
function displayArticle(article) {
  
  document.getElementById("items").innerHTML +=
  
  `
  
  <a href="./product.html?id=${article._id}">
            <article>
            <img src=${article.imageUrl} alt=${article.altTxt}>
            <h3 class="productName">${article.name}</h3>
            <p class="productDescription">${article.description}</p>
            </article>
          </a>`;
}