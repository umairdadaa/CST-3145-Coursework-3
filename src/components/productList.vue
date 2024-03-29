<template>
  <div>
    <header class="bg-dark py-5">
      <div class="container px-4 px-lg-5 my-5">
        <div class="text-center text-white">
          <h1 class="display-4 fw-bolder">Learn in style</h1>
          <input
            class="form-control mr-sm-2"
            type="text"
            placeholder="🔍 Search"
            v-model="search"
          />
          <div
            style="display: flex; justify-content: center; align-items: center"
          >
            <select
              class="form-select mr-sm-2"
              v-model="sortByOptions.type"
              style="width: 100%; max-width: 250px; margin: 10px"
              @change="sortProducts"
            >
              <option value="subject">Alphabatically</option>
              <option value="price">Price</option>
              <option value="space">Availability</option>
              <option value="location">location</option>
            </select>

            <select
              class="form-select small"
              style="width: 100%; max-width: 250px; margin: 10px"
              @change="sortProducts"
              v-model="sortByOptions.direction"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>
    </header>

    <section class="py-5">
      <div class="container px-4 px-lg-5 mt-5">
        <div
          class="row gx-4 gx-lg-5 row-cols-1 row-cols-md-3 row-cols-xl-4 justify-content-center"
        >
          <div
            class="col mb-5"
            v-for="product in filteredProducts"
            :key="product.id"
          >
            <div class="card h-100">
              <!-- Product image-->
              <img
                class="card-img-top"
                v-bind:src="product.image"
                style="
                  height: 250px;
                  width: 100%;
                  border-bottom: 1px solid grey;
                "
              />
              <!-- Product details-->
              <div class="card-body p-4">
                <div class="text-center">
                  <!-- Product name-->
                  <h5 class="fw-bolder" style="border-bottom: 1px solid grey">
                    {{ product.subject }}
                  </h5>
                  <!-- Product price-->
                  <h5 class="fw-normal">Location:</h5>
                  <h5 class="fw-light">{{ product.location }}</h5>
                  <h5 style="margin-top: 15px" class="fw-normal">
                    Spaces: {{ product.space }}
                  </h5>
                  <h5 style="margin-top: 15px" class="fw-semibold">
                    AED {{ product.price }}
                  </h5>
                </div>
              </div>
              <!-- Product actions-->
              <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <div class="text-center">
                  <button
                    class="btn btn-outline-dark mt-auto"
                    @click="addToCart(product)"
                    v-if="spaceCount(product)"
                  >
                    Add To Cart
                  </button>
                  <button class="btn btn-danger mt-auto" v-else disabled>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { products } from "./products.js";

// import { products } from './products';

export default {
  data() {
    return {
      products: products,
      search: "",
      sortByOptions: {
        type: "subject",
        direction: "asc",
      },
    };
  },
  // mounted() {
  //   fetch('http://localhost:3000/products')
  //     .then(response => response.json())
  //     .then(data => {
  //       this.products = data;
  //     })
  //     .catch(error => console.error(error));
  // },
  methods: {
    addToCart(product) {
      this.$emit("addProduct", product);
    },
    spaceCount(product) {
      if (product.space > 0) {
        return true;
      } else {
        return false;
      }
    },
    sortProducts() {
      if (this.sortByOptions.type === "subject") {
        if (this.sortByOptions.direction === "asc") {
          this.products.sort((a, b) => {
            return a.subject.localeCompare(b.subject);
          });
        } else {
          this.products.sort((a, b) => {
            return b.subject.localeCompare(a.subject);
          });
        }
      } else if (this.sortByOptions.type === "price") {
        if (this.sortByOptions.direction === "asc") {
          this.products.sort((a, b) => {
            return a.price - b.price;
          });
        } else {
          this.products.sort((a, b) => {
            return b.price - a.price;
          });
        }
      } else if (this.sortByOptions.type === "space") {
        if (this.sortByOptions.direction === "asc") {
          this.products.sort((a, b) => {
            return a.space - b.space;
          });
        } else {
          this.products.sort((a, b) => {
            return b.space - a.space;
          });
        }
      } else if (this.sortByOptions.type === "location") {
        if (this.sortByOptions.direction === "asc") {
          this.products.sort((a, b) => {
            return a.location.localeCompare(b.location);
          });
        } else {
          this.products.sort((a, b) => {
            return b.location.localeCompare(a.location);
          });
        }
      }
    },
  },

  computed: {
    filteredProducts() {
      return this.products.filter((product) => {
        return (
          product.subject.toLowerCase().includes(this.search.toLowerCase()) ||
          product.location.toLowerCase().includes(this.search.toLowerCase())
        );
      });
    },
  },
};
</script>

<style>
/* Product card */
.card {
  background-color: #f9f9f9;
  border: 1px solid #ccc;
}

.card:hover {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  border: 1px solid #000;
}

.card .card-img-top {
  object-fit: cover;
  height: 200px;
}

.card .btn-outline-dark {
  color: #000;
  background-color: #fff;
  border-color: #000;
}

.card .btn-outline-dark:hover {
  background-color: #000;
  color: #fff;
  border-color: transparent;
}

.card .btn-danger {
  color: #fff;
  background-color: #dc3545;
  border-color: #dc3545;
}

.card .btn-danger:hover {
  background-color: #c82333;
  color: #fff;
  border-color: #bd2130;
}

.card h5 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #000;
}

.card p {
  font-size: 0.8rem;
  margin-bottom: 0.25rem;
  color: #555;
}

.card h6 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #000;
}

.card .text-primary {
  color: #007bff;
}

.card .text-muted {
  color: #6c757d;
}

/* Rounded corners */
.rounded-3 {
  border-radius: 0.5rem !important;
}

/* Shadows */
.shadow {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1) !important;
}

/* Custom classes */
.title-gradient {
background: linear-gradient(to right, #292f4c, #1b1e32);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
font-size: 2.5rem;
font-weight: 900;
text-align: center;
margin-top: 3rem;
margin-bottom: 3rem;
}

.btn-gradient {
background-image: linear-gradient(to right, #292f4c, #1b1e32);
color: #fff;
border-color: transparent;
transition: all 0.3s ease;
border-radius: 25px;
padding: 10px 25px;
}

.btn-gradient:hover {
background-color: #292f4c;
color: #fff;
border-color: transparent;
}

</style>
