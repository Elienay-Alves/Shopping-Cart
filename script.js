// const { fetchProducts } = require('./helpers/fetchProducts');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const add = document.querySelector('.cart__items');

function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(add);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const events = async (event) => {
  const pai = event.target.parentNode;
  const id = pai.firstChild.innerText;

  fetchItem(id).then((data) => {
    const sku = data.id;
    const name = data.title;
    const salePrice = data.price;

    add.appendChild(createCartItemElement({ sku, name, salePrice }));
    const addCartItem = add.innerHTML;
    saveCartItems(addCartItem);
  });
};

const searchProduct = async (product) => {
  const searchData = await fetchProducts(product);
  const captureSection = document.querySelector('.items');
  searchData.results.forEach((result) => {
    const info = {
      sku: result.id,
      name: result.title,
      image: result.thumbnail,
    };
    const productItem = createProductItemElement(info);
    captureSection.appendChild(productItem);
  });
  
  const buttons = document.getElementsByClassName('item__add');
  for (let index = 0; index < buttons.length; index += 1) {
   buttons[index].addEventListener('click', events);
  }
};
window.onload = () => {
  searchProduct('computador');
  const ol = add;
  ol.innerHTML = getSavedCartItems('cartItems');
  const savedLi = document.querySelectorAll('.cart__item');
  savedLi.forEach((element) => element.addEventListener('click', cartItemClickListener));
};

const clear = document.querySelector('.empty-cart');
function eraseItems() {
  add.innerHTML = '';
}
 clear.addEventListener('click', eraseItems);

// Recebi ajuda do Igor Souza :) 
// Recebi ajuda de um 1:1 incrivel com o embaixa Pondaco
// que me ajudou muito na parte lógica.
// E claro, todas as mentorias da semana ontrack