<template>
  <div id="app" style="margin: 0">
    <title>Rand-E-Mart</title>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container px-4 px-lg-5">
        <img
          class="navbar-logo ms-0 me-4"
          src="./assets/logo.png"
          style="width: 15%"
        />
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li class="nav-item">
              <a
                class="nav-link-custom nav-link active"
                v-on:click="navigateTo('home')"
                aria-current="page"
                style="cursor: pointer"
                v-if="page === 'home'"
                onmouseover="this.style.outline='1px solid black'; this.style.borderRadius='5px';"
                onmouseout="this.style.outline='none';"
                >Home</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link-custom nav-link"
                v-on:click="navigateTo('home')"
                aria-current="page"
                style="cursor: pointer"
                v-if="page === 'products' || page === 'cart'"
                onmouseover="this.style.outline='1px solid black'; this.style.borderRadius='5px';"
                onmouseout="this.style.outline='none';"
                >Home</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link-custom nav-link active"
                v-on:click="navigateTo('products')"
                style="cursor: pointer"
                v-if="page === 'products'"
                onmouseover="this.style.outline='1px solid black'; this.style.borderRadius='5px';"
                onmouseout="this.style.outline='none';"
                >Products</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link-custom nav-link"
                v-on:click="navigateTo('products')"
                style="cursor: pointer"
                v-if="page === 'home' || page === 'cart'"
                onmouseover="this.style.outline='1px solid black'; this.style.borderRadius='5px';"
                onmouseout="this.style.outline='none';"
                >Products</a
              >
            </li>
          </ul>
          <form class="d-flex" style="margin-right: 15px">
            <a
              class="btn btn-outline-dark"
              type="submit"
              v-on:click="navigateTo('cart')"
            >
              <i class="bi-cart-fill me-1"></i>
              Cart
              <span class="badge bg-dark text-white ms-1 rounded-pill">{{
                cartCount
              }}</span>
            </a>
          </form>
          <form class="d-flex" v-if="cart.length > 0">
            <a
              class="btn btn-outline-dark"
              type="submit"
              v-on:click="navigateTo('checkout')"
            >
              <i class="bi-cart-fill me-1"></i>
              Checkout
            </a>
          </form>
        </div>
      </div>
    </nav>

    <section class="py-5 home-section" v-if="page === 'home'">
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          height: 70vh;
          flex-direction: column;
        "
      >
        <h1 style="text-align: center">Welcome to Rand-E-Mart</h1>
        <p>
          Discover the perfect after-school class for your child at Rand-E-Mart
        </p>
        <h1>Book Now</h1>
        <button
          class="btn btn-primary btn"
          type="submit"
          v-on:click="navigateTo('products')"
          style="text-align: center; margin-top: 25px"
        >
          Book Now
        </button>
      </div>
    </section>

    <div id="products">
      <ProductList
        :products="this.products"
        @addProduct="addToCart"
        v-if="page === 'products'"
      ></ProductList>
    </div>

    <div id="cart">
      <Cart
        :cart="cart"
        @remove-from-cart="removeFromCart"
        @reduce-quantity="reduceQuantity"
        v-if="page === 'cart'"
      ></Cart>
    </div>

    <div id="checkout">
      <checkOut
        :cart="cart"
        :cart-total="cartTotal"
        :cart-count="cartCount"
        :checkout="checkOut"
        @submit-checkout="submitCheckout"
        v-if="page === 'checkout'"
      ></checkOut>
    </div>

    <footer class="py-5 bg-dark" v-if="page === 'home'">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-12 col-sm-6 mb-3 mb-sm-0 text-center text-sm-start">
            <p class="m-0 text-white">© 2023 Rand-E-Mart</p>
          </div>
          <div class="col-12 col-sm-6 text-center text-sm-end">
            <ul class="list-inline mb-0">
              <li class="list-inline-item me-3">
                <a href="https://github.com/umairdadaa">
                  <i class="fab fa-github fa-2x text-white"></i>
                </a>
              </li>
              <li class="list-inline-item me-3">
                <a href="mailto:m.umairrr@outlook.com">
                  <i class="far fa-envelope fa-2x text-white"></i>
                </a>
              </li>
              <li class="list-inline-item">
                <a
                  href="https://www.linkedin.com/in/muhammad-umair-dada-865501196/"
                >
                  <i class="fab fa-linkedin-in fa-2x text-white"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import ProductList from "./components/productList.vue";
import Cart from "./components/cartList.vue";
import checkOut from "./components/checkOut.vue";
import Swal from "sweetalert2";

export default {
  name: "App",
  components: {
    ProductList,
    Cart,
    checkOut,
  },
  data() {
    return {
      page: "home",
      products: [],
      cart: [],
      checkOut: [],
    };
  },

  methods: {
    navigateTo(page) {
      this.page = page;
    },

    addToCart(product) {
      if (!this.cart.includes(product)) {
        this.cart.push(product);
      } else {
        console.log("Product exists in cart");
      }
      product.cartquantity++;
      product.space--;

      Swal.fire(
        "Added to Cart!",
        product.subject + " has been added to your cart!",
        "success"
      );
    },

    removeFromCart(product) {
      product.cartquantity--;
      product.space++;
      this.cart.splice(product, 1);

      Swal.fire(
        "Removed from Cart!",
        product.subject + " has been removed from your cart!",
        "success"
      );
    },

    reduceQuantity(product) {
      product.cartquantity--;
      product.space++;
    },

    cartCounter() {
      if (this.cart.length > 0) {
        return true;
      } else {
        return false;
      }
    },

    submitCheckout() {
      this.cart.forEach((item) => {
        item.cartquantity = 0;
      });
      this.cart = [];
      Swal.fire(
        "Thank you for your purchase!",
        "Your order has been placed!",
        "success"
      ).then(() => {
        setTimeout(() => {
          this.navigateTo("home");
        }, 1000);
      });

      event.preventDefault();
    },
  },

  computed: {
    cartCount() {
      let count = 0;
      this.cart.forEach((item) => {
        count += item.cartquantity;
      });
      console.log(count);
      return count;
    },

    cartTotal() {
      let total = 0;
      this.cart.forEach((item) => {
        total += item.price * item.cartquantity;
      });
      return total;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.navbar-logo {
  width: 15%;
  margin-right: 1rem;
}

.home-section {
  background-image: url(./assets/background.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  height: 83.5vh;
}

#products {
  background-image: url(./assets/background.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  /* height: 83.5vh; */
}
</style>
