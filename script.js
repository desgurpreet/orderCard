let cardFood = document.querySelector(".card");

let basket = JSON.parse(localStorage.getItem("data")) || [];
let orderFood = () => {
  return (cardFood.innerHTML = shopItem.map((x) => {
    let { id, name, title, price, img } = x;
    let search = basket.find((x) => x.id === id) || [];
    return ` <div id=${x.id} class="waffle">
          <img
            src="${img}"
            class="img"
            alt=""
            srcset=""
          />
          <p class="heading">${name}</p>
          <p class="title">${title}</p>
          <p class="price">$ ${price}</p>
          <div class="btn">
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
            <div id="quantity-${id}" class="quantity">
            ${search.item === undefined ? 0 : search.item}
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
          </div>
       `;
  })).join("");
};
orderFood();

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
  basket=basket.filter((x)=>x.item!==0)
  localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  console.log(search.item);
  document.getElementById(`quantity-${id}`).innerHTML = search.item;
  calculation();
};
let calculation = () => {
  let cartIcon = document.querySelector(".cartamount");
  cartIcon.innerHTML = basket
    .map((x) => x.item)
    .reduce((acc, cur) => acc + cur, 0);
};
calculation();
