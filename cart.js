let label = document.querySelector("#label");
let shoppingCart = document.querySelector("#shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];
let calculation = () => {
  let cartIcon = document.querySelector(".cartamount");
  cartIcon.innerHTML = basket
    .map((x) => x.item)
    .reduce((acc, cur) => acc + cur, 0);
};
calculation();
let generateCartItems = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket.map((x) => {
      let { id, item } = x;
      let search = shopItem.find((y) => y.id === id);
      return `<div class="cart-item">
      <img width="80" src="${search.img}"/>
      <div class="details">
      <div class="title-price-x">
      <h4 class="title-cart">
      <p>${search.name}</p>
      <p class="title-price">$ ${search.price}</p>
      </h4>
      <svg onclick="remove(${id})" class="cross" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10"><path fill="red" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>
      </div>
     <div class="btn btn1">
            <svg
            onclick="decrement(${id})"
              xmlns="http://www.w3.org/2000/svg"
              class="svgdecrement"
              width="10"
              height="10"
              fill="none"
              viewBox="0 0 10 2"
            >
              <path fill="#fff" d="M0 .375h10v1.25H0V.375Z" /></svg>
            <div id="quantity-${id}" class="quantity">${item}
            </div><svg
            onclick="increment(${id})"
              class="svgincrement"
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              fill="none"
              viewBox="0 0 10 10"
            >
              <path
                fill="#fff"
                d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
              />
            </svg>
          </div>
      <h4><p>Total price: $ ${item * search.price}</h4>
      </div>  
      </div>`;
    }));
  } else {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
        <button class="HomeBtn"> Back to home</button>
        </a>`;
  }
};
generateCartItems();

let increment = (id) => {
  let selectedItem = id;
  console.log(selectedItem);
  let search = basket.find((x) => x.id === selectedItem);
  if (search === undefined) {
    basket.push({
      id: selectedItem,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  // console.log(basket);
  update(selectedItem);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem);
  if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  // console.log(basket);
  update(selectedItem);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  console.log(search.item);
  document.getElementById(`quantity-${id}`).innerHTML = search.item;
  calculation();
  TotalAmount();
};
let remove = (id) => {
  let selectedItem = id;
  basket = basket.filter((x) => x.id !== selectedItem);
  calculation();
  generateCartItems();
  TotalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
};
let clearCart = () => {
  basket = [];
  calculation();

  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};
let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = shopItem.find((y) => y.id === id) || [];
        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    label.innerHTML = `<h2>Total Bill : $ ${amount}</h2>
    <button class="checkout">Checkout</button>
    <button onclick="clearCart()" class="removeAll">Clear Cart</button>`;
  } else return;
};
TotalAmount();
