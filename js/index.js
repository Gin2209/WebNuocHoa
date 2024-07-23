let products = [];

fetch("../db/product.json")
  .then((res) => res.json())
  .then((data) => {
    var productsList = data.products.map(
      (item) =>
        `  
        <div class="product-item d-flex flex-column align-items-center justify-content-center p-4 me-3 text-center text-decoration-none">
              <img
                src="./assets/product/product1/${item.img}"
                class="img-product"
                alt=""
              />
              <span class="name-product">${item.name}</span>
              <p class="price-product">${item.price} vnđ</p>
              <div class="button-action">
                <button class="btn-add border-0 text-light btn-primary me-2 outline-none" type="button" onclick="addToCart(${item.id})">Mua</button>
                <button class="btn-detail border-0 text-light btn-danger outline-none" type="button" onclick="addProductDetail(${item.id})">Xem chi tiết</button>
              </div>  
          </div>
              `
    );

    const productHtml = productsList.join("");

    document.querySelector(".owl-carousel").innerHTML = productHtml;
    $(".owl-carousel").owlCarousel({
      loop: true,
      margin: 10,
      nav: true,
      responsive: {
        0: {
          items: 1,
        },
        768: {
          items: 2,
        },
        1000: {
          items: 3,
        },
        1280: {
          items: 4,
        },
      },
    });
  });

const addProductDetail = async (id) => {
  try {
    fetch("../db/product.json")
      .then((res) => res.json())
      .then((data) => {
        const productDetail = data.products.find((item) => item.id == id);
        window.localStorage.setItem(
          "productDetail",
          JSON.stringify(productDetail)
        );
      });
    window.location.href = "../view/ProductDetail.html";
  } catch (error) {
    console.log(error);
  }
};

const addToCart = async (id) => {
  let storage = localStorage.getItem("cart");
  let quantity = 1;
  if (storage) {
    cart = JSON.parse(storage);
  }

  try {
    fetch("../db/product.json")
      .then((res) => res.json())
      .then((data) => {
        var product = data.products.find((item) => item.id == id);
        let item = cart.find((c) => c.product.id == id);
        if (item) {
          item.quantity += 1;
        } else {
          cart.push({ product, quantity: quantity });
        }
        window.localStorage.setItem("cart", JSON.stringify(cart));
      });
    window.location.href = "../view/Cart.html";
  } catch (error) {
    console.log(error);
  }
};
