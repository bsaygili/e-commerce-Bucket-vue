app.component("product-display", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },

  template:
    /*html*/
    `
  <div class="product-display">
  <div class="product-container">
    <div class="product-image">
      <img :src="image" :alt="description" />
    </div>
    <div class="product-info">
      <h1>{{title}}</h1>
      <p v-if="inStock">In Stock</p>
      <p v-else>Out of Stock</p>
      <p>Shipping: {{shipping}}</p>
      <p v-if="onSale">On Sale</p>
      <ul>
        <li v-for="detail in details">{{detail}}</li>
      </ul>
      <div
        v-for="(variant,index) in variants"
        :key="variant.id"
        @mouseover="updateVariant(index)"
        class="color-circle"
        :style="{backgroundColor:variant.color}">
      </div>
      <div class="button-group">
        <button
          class="button"
          :class="{disabledButton:!inStock}"
          @click="incrementCard"
          :disabled="!inStock">
          Add to Card
        </button>
        <button class="button" @click="decrimentCard">Remove Card</button>
      </div>
    </div>
  </div>
</div>
<review-list v-if="reviews.length" :reviews="reviews"></review-list>
<review-form @review-submitted="addReview"></review-form>
    `,
  data() {
    return {
      card: 0,
      product: "Socks",
      brand: "Saygılı",
      description: "Lorem ipsum sit amet dolor.",
      selectedVariant: 0,
      onSale: true,
      details: ["%50 cotton", "%30 wool", "%20 polyester"],
      variants: [
        {
          id: 2234,
          color: "green",
          image: "./assets/images/green-socks.jpg",
          quantity: 50,
        },
        {
          id: 2235,
          color: "blue",
          image: "./assets/images/blue-socks.jpg",
          quantity: 0,
        },
      ],
      reviews: [],
    };
  },
  methods: {
    incrementCard() {
      this.$emit("add-to-card", this.variants[this.selectedVariant].id);
    },
    decrimentCard() {
      this.$emit("minus-to-card");
    },
    updateVariant(index) {
      this.selectedVariant = index;
    },
    addReview(review) {
      this.reviews.push(review);
    },
  },
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].image;
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity;
    },
    shipping() {
      if (this.premium) {
        return "Free";
      }
      return "$2.99";
    },
  },
});
