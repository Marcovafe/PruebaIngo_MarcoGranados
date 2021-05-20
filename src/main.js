//Inicializamos la carga de todos los items con la llamada al funcion 'loadData()'
window.onload = () => {
  loadData();
};

/*  Esta funcion asincrona recoleta la informacion del 'data.json'
    una vez cargado el json pasaremos a la creacion de los items utilizando 
    la funcion llamada 'createItem()'
*/
async function loadData() {
  var dataJson = [];
  await fetch("../data/data.json")
    .then((data) => data.json())
    .then((json) => {
      dataJson = json;
    });

  dataJson.forEach((element) => createItem(element));
}

/**
 * Esta funcion tiene como objetivo crear los diferentes
 * items que estan contenidos en el data.json
 * aqui se toma como parametro un solo item que contiene
 * el precio, nombre, imagen e id del mismo
 * @param {json} element
 * @returns void
 */
function createItem(element) {
  //Definimos el componente padre recolectandolo del html principal.
  var parentGrid = document.getElementById("grid-container");
  //Se definen las variables a usar para poder observar los items.
  var itemDivParent = document.createElement("div");
  var itemDivImg = document.createElement("div");
  var img = document.createElement("img");
  var itemDescrpParent = document.createElement("div");
  var itemPrice = document.createElement("div");
  var itemName = document.createElement("div");

  //Descripcion de Item Componente Padre, se añade la clase respectiva
  itemDescrpParent.classList.add("itemDescrp");
  /*  Añadir clases definidas para el precio y verificacion de que el elemento contiene
    el item 'price', en caso de no tenerlo se prueba con 'newprice' y se añade la etiqueta 'Nuevo'
*/
  if (element.price) {
    //Se añade el contenido y las clases respectivas para mostrar el precio del item
    itemPrice.classList.add("itemPrice");
    itemPrice.classList.add("left");
    itemPrice.innerHTML = "₡" + element.price;
  } else {
    //Se añade el contenido y las clases respectivas para mostrar el precio del item
    itemPrice.classList.add("itemPrice");
    itemPrice.classList.add("left");
    itemPrice.innerHTML = "₡" + element.new_price;
    //Se añade la variable innerNewSpan por ser un elemento con caracteristica 'newprice'
    var itemNewSpan = document.createElement("div");
    itemNewSpan.innerHTML = "Nuevo";
    itemNewSpan.classList.add("imgNewItem");
    itemNewSpan.classList.add("bottom");
    itemNewSpan.classList.add("right");
    itemDivImg.appendChild(itemNewSpan);
  }
  //Se añade el nombre del item
  itemName.classList.add("itemName");
  itemName.classList.add("left");
  itemName.innerHTML = element.name;

  //Se añade la imagen del item
  img.src=element.image
  img.alt=element.name
  img.classList.add("imgItemIMG")
  itemDivImg.appendChild(img)
  //se agrega la clase respectiva para el container padre y el id del item
  itemDivParent.classList.add("grid-item");
  itemDivParent.id = element.id;
  itemDivImg.classList.add("imgItem");
  //Se añade la imagen del producto al contenedor respectivo
  //itemDivImg.style.backgroundImage = `url(${element.image})`;
  /* Por ultimo se añaden todos las variables al contenedor principal del item y tambien se
    agrega al padre de todos los items.
*/
  itemDescrpParent.appendChild(itemPrice);
  itemDescrpParent.appendChild(itemName);
  itemDivParent.appendChild(itemDivImg);
  itemDivParent.appendChild(itemDescrpParent);
  parentGrid.appendChild(itemDivParent);
  return;
}
