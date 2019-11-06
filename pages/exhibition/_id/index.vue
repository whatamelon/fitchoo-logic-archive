<template>
<transition>
  <main class="exhibition-detail">

    <LoginAlertModal />

    <AppCard :exhibition="exhibition" class="app-card "></AppCard>

    <div
      v-masonry
      class="masonry-container"
      transition-duration="0"
      item-selector=".masonry-product"
    >
      <AppProduct
        v-for="product in EXHIBITION_PRODUCTS"
        :key="product.itemId"
        v-masonry-tile
        :product="product"
        class="masonry-product"
      ></AppProduct>
    </div>

    <div v-if="isSpinning" class="spinner-continaer">
      <AppSpinner2></AppSpinner2>
    </div>
  </main>
</transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import AppProduct from "@/components/App/AppProduct";
import AppCard from "@/components/App/AppCard";
import LoginAlertModal from "@/components/Modal/LoginAlertModal";
import AppSpinner2 from "@/components/App/AppSpinner2";

export default {
  components: {
    AppCard,
    AppProduct,
    LoginAlertModal,
    AppSpinner2
  },

  data() {
    return {
      isSpinning: false
    };
  },

  transition ( to, from  ) {
    if (localStorage.getItem("previousPage")=="exhibition" ) {
      return 'slideRight'
    }
    else if (localStorage.getItem("previousPage")=="product-id") {
      return 'slideLeft'
    }
    else {
      return 'nothing'
    }
  },

  computed: {
    ...mapGetters(["EXHIBITION_PRODUCTS"]),
    hasMoreData() {
      return this.$store.getters.HAS_MORE_DATA;
    }
  },

  async asyncData({ store, params }) {
    if (
      store.getters.SAVED_PRODUCTS.length === 0 &&
      store.getters.IS_LOGGED_IN
    ) {
      const savedProducts = await store.dispatch("getSavedProducts");

      if (savedProducts.result.itemList.length === 30) {
        while (store.getters.HAS_MORE_DATA) {
          store.dispatch("setOffset", store.getters.OFFSET + 30);
          const addSavedProducts = await store.dispatch("addSavedProducts");

          if (addSavedProducts.result.itemList.length < 30) {
            store.dispatch("setHasMoreData", false);
          }
        }
      }
      store.dispatch("setHasMoreData", true);
      store.dispatch("resetOffset");
    }

    const exhibitions = await store.getters.EXHIBITIONS;
    const exhibition = exhibitions.filter(exhibition => {
      return exhibition.code == params.id;
    })[0];

    await store.dispatch("getExhibitionProducts", params.id);

    return {
      products: store.getters.EXHIBITION_PRODUCTS,
      exhibition,
      id: params.id
    };
  },

  mounted() {
    this.$store.dispatch("hideLogo");
    this.$store.dispatch("setHeaderTitle", "기획전");
  },

  created() {
    if (process.browser) {
      window.addEventListener("scroll", this.handleScroll);
    }
    this.$store.dispatch("setCurrentRoute", this.$route.path);
    setTimeout(() => {
      this.$store.dispatch("endLoading");
    }, 800);
  },

  methods: {
    async handleScroll() {
      const notExactlyTheBottom = document.body.offsetHeight - 500;

      console.log(notExactlyTheBottom);

      if (
        window.innerHeight + window.scrollY >= notExactlyTheBottom &&
        this.hasMoreData &&
        !this.isSpinning
      ) {
        this.isSpinning = true;
        await this.getMoreProducts();
      }
    },

    getMoreProducts() {
      return new Promise(async (resolve, reject) => {
        try {
          if (this.hasMoreData) {
            await this.$store.dispatch(
              "setOffset",
              this.$store.getters.OFFSET + 30
            );
            const response = await this.$store.dispatch( "addExhibitionProducts" , this.id);
            const products = response.result.itemList;
            if (products.length == 0) {
              this.hasMoreData = false;
              this.$store.dispatch("setHasMoreData", false);
              this.$refs.appAlert.showAlert();
            }
          this.isSpinning = false;
          resolve();
          }
        } catch (error) {
          this.isSpinning = false;
          reject(error);
        }
      });
    }
  },

  async beforeRouteLeave(to, from, next) {
    this.$store.dispatch("startLoading");
    localStorage.setItem("routerStack",this.$route.path);
    this.products = [];
    if (process.browser) {
      window.removeEventListener("scroll", this.handleScroll);
    }
    this.$store.dispatch("setHasMoreData", true);
    this.$store.dispatch("resetOffset");
    this.$store.dispatch("resetFilter");
    this.$store.dispatch("showLogo");
    next();
  }
};
</script>

<style lang="scss" scoped>
.exhibition-detail {
  padding-bottom: 20%;
}

.app-card {
  border: 0;
  border-radius: 0;
  box-shadow: 0 0 0;
}

.cover {
  width: 100%;
  max-width: 500px;
  height: 300px;
  object-fit: cover;
  object-position: 50% 45%;
}

.masonry-container {
  margin: 0;
  padding: 10px 0 10% 0;
  width: 100%;
  position: absolute;
}

.masonry-product {
  margin: 0 0 5px 1%;
  border: 0;
  font-size: 0.8em;
  width: 32%;
  font-size: 0.8em;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  transition: opacity 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  }
}

.more-button-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.more-button {
  padding: 7px 14px;
  border: 2px solid $grey;
  border-radius: 4px;
  font-size: 1em;
  font-weight: 600;
  color: $grey;
}

.spinner-continaer {
  padding-bottom: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
