let bigImg = document.querySelector(".img-product-detail");

let product = [];
var quantity;

const getProductDetail = async () => {
  const store = localStorage.getItem("productDetail");

  var productDetail = JSON.parse(store);
  const priceVnd = new Intl.NumberFormat("de-DE").format(productDetail.price);

  document.querySelector(".main-right").innerHTML = `
        <div class="info-product w-full mb-5">
            <h1 class="name-product-detail">${productDetail.name}</h1>
            <p class="price-product-detail">${priceVnd} vnđ</p>
            <div class="capacity">Dung tích: 100ml</div>
          </div>
          <div class="action-product-detail">
            <div class="quantity">
              <input type="number" name="quantity" class="input-quantity-detail" value="1"/>
              <div class="action-quantity">
                <button class="btn-action" onclick="increase()">+</button>
                <button class="btn-action" onclick="decrease()">-</button>
              </div>
            </div>
            <button class="add-cart" type="button" onclick="addToCart(${productDetail.id})">THÊM VÀO GIỎ HÀNG</button>
          </div>
          <div class="intro-product-detail">
            <h2 class="title-intro">Mô tả</h2>
            <p class="intro-text">
          ${productDetail.intro}
            </p>
          </div>
  `;

  product = productDetail;
  bigImg.src = `../assets/product/product1/${productDetail.img}`;
};

getProductDetail();

const increase = () => {
  let quantity = parseInt(
    document.querySelector(".input-quantity-detail").value,
    10
  );
  quantity = isNaN(quantity) ? 0 : quantity;
  quantity++;
  document.querySelector(".input-quantity-detail").value = quantity;
};

const decrease = () => {
  let quantity = parseInt(
    document.querySelector(".input-quantity-detail").value,
    10
  );
  quantity = isNaN(quantity) ? 0 : quantity;
  quantity--;
  document.querySelector(".input-quantity-detail").value = quantity;
};

let cart = [];
const addToCart = async (id) => {
  let storage = localStorage.getItem("cart");
  let quantity = Number(document.querySelector(".input-quantity-detail").value);
  if (storage) {
    cart = JSON.parse(storage);
  }

  let item = cart.find(c => c.product.id == id); 
  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ product, quantity: quantity });
  }

  window.location.href = "./Cart.html";
  window.localStorage.setItem("cart", JSON.stringify(cart));
};
