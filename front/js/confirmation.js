// selectionne la class pour afficher le numero de commande
let orderIdNumberElt = document.querySelector("#orderId");

/**
 * afficher le numero de commande contenu dans l'url
 *
 * innerHTML ( inject dans le html )
 * recupere orderId ( qui se trouve dans l'url )
 * window.location.href searchparams.get ( recupere dans l'url le numero de commande, contenue dans "orderId" )
 */
orderIdNumberElt.innerHTML = new URL(window.location.href).searchParams.get("orderId");
