const store = localStorage.getItem("cart");

var cart = JSON.parse(store);

var totalPayment = 0;
var totalPrice = 0;

var noData = document.querySelector(".no-data");

const showCart = (cart) => {
  var listProductCart = "";
  for (let i = 0; i < cart.length; i++) {
    totalPrice = cart[i].quantity * cart[i].product.price;

    listProductCart += `
        <div class="item-cart">
              <img src="../assets/product/product1/${
                cart[i].product.img
              }" class="img-product-cart" alt="" />
              <div class="info-product-cart">
                <a href="#" class="name-product-cart">${
                  cart[i].product.name
                } - 100ml</a>
                <span class="price-product-cart">${new Intl.NumberFormat(
                  "de-DE"
                ).format(cart[i].product.price)} vnđ</span>
              </div>
              <div class="product-quantity">
                <div class="quantity">
                  <input type="number" onchange="HandleChangeInput(this.value, ${
                    cart[i].product.id
                  })" class="input-quantity" value="${cart[i].quantity}" />
                   <div class="action-quantity">
                     <button class="btn-action" onclick="increase(${
                       cart[i].product.id
                     })">
                       +
                     </button>
                     <button class="btn-action" onclick="decrease(${
                       cart[i].product.id
                     })">
                       -
                     </button>
                   </div>;
                </div>
                <button class="icon-delete" type="button" onclick="deleteItemCart(${
                  cart[i].product.id
                })">
                  ×
                </button>
                <p class="total-quantity">${new Intl.NumberFormat(
                  "de-DE"
                ).format(Number(totalPrice))} vnđ</p>
              </div>
            </div>
        `;
  }

  if (cart.length < 0) {
    noData.style = "display: block";
  } else {
    noData.style = "display: none";
  }

  subTotal();

  document.querySelector(".list-product-cart").innerHTML = listProductCart;
};

function subTotal() {
  let totalMoney = 0;

  for (let i = 0; i < cart.length; i++) {
    totalMoney += cart[i].quantity * cart[i].product.price;
  }
  document.querySelector(
    ".price-provisional"
  ).innerHTML = `${new Intl.NumberFormat("de-DE").format(
    Number(totalMoney)
  )} vnđ`;
  document.querySelector(".total-payment").innerHTML = `${new Intl.NumberFormat(
    "de-DE"
  ).format(Number(totalMoney))} vnđ`;
}

function HandleChangeInput(value, id) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].product.id == id) {
      cart[i].quantity = Number(value);
    }
  }
  showCart(cart);
}

const deleteItemCart = (id) => {
  const store = localStorage.getItem("cart");
  if (store) {
    cart = JSON.parse(store);
  }

  cart = cart.filter((item) => item.product.id != id);
  localStorage.setItem("cart", JSON.stringify(cart));
  showCart(cart);
};

const increase = (id) => {
  let newQuantity = 0;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].product.id == id) {
      newQuantity = cart[i].quantity + 1;
      cart[i].quantity = newQuantity;
    }
  }
  showCart(cart);
};

const decrease = (id) => {
  let newQuantity = 0;

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].product.id == id) {
      newQuantity = cart[i].quantity - 1;

      cart[i].quantity = newQuantity;
    }
  }
  showCart(cart);
};

showCart(cart);
let order = {};

const handlePayment = () => {
  order = { cart, total: totalPayment };

  localStorage.setItem("order", JSON.stringify(order));
  alert("thanh toán thành công");

  localStorage.removeItem("cart");
  location.reload();
  totalPayment = 0;
};

// const handleUpdateCart = () => {
//   location.reload();
//   console.log("update cart");
// };
