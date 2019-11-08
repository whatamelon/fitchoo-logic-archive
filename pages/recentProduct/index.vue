<template>
<transition name="slideRight">
  <main class="saved-container">
<!-- <noscript style="
    display: none;
    visibility: hidden;
    height: 0px;
    width: 0px;
    max-width: 0px;
    max-height: 0px;
    border: none;
">
  <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5KW535K"
  height="0" width="0" left="0" top="0"
  style="visibility:hidden;display:none;border:none;height:0px;width:0px;max-width: 0px;max-height: 0px;">
  </iframe>
</noscript> -->
    <AppSpinner v-if="IS_LOADING" />

      <div v-if="!hasRecentProducts" class="no-match">
        <h2 class="no-match__oops">
          최근에 본 상품이 없네요!
        </h2>

        <button class="no-match__button" @click="goToCollectionPage">
          신상품 보러 가기
        </button>
      </div>

      <no-ssr v-if="hasRecentProducts">
        <div
          transition-duration="0"
          class="masonry-container"
          item-selector=".masonry-item"
        >
          <AppProduct
            v-for="product in recentProducts"
            :key="product.itemId"
            :product="product"
            class="masonry-item"
          ></AppProduct>
        </div>
      </no-ssr>
  </main>
</transition>
</template>

<script>
import AppProduct from "@/components/App/AppProduct";
import AppSpinner from "@/components/App/AppSpinner";
import AppSpinner2 from "@/components/App/AppSpinner2";

import NoSSR from "vue-no-ssr";

import { mapGetters, mapActions } from "Vuex";

export default {
  components: {
    AppProduct,
    AppSpinner,
    AppSpinner2,
    "no-ssr": NoSSR
  },
        transition: 'slideRight',
  data() {
    return {
      isSpinning: false,
      currentProducts: this.$store.getters.SAVED_PRODUCTS
    };
  },

  computed: {
    ...mapGetters(["IS_LOADING", "SAVED_PRODUCTS"]),

    hasProducts() {
      return this.$store.getters.SAVED_PRODUCTS.length > 0 ? true : false;
    },

    hasRecentProducts() {
      return this.recentProducts.length === 0 ? false : true;
    },

    hasMoreData() {
      return this.$store.getters.HAS_MORE_DATA;
    },

    recentProducts() {
      return JSON.parse(localStorage.recentProducts);
    }
  },

  async asyncData({ store, next }) {
    if (!localStorage.getItem("height")) {
      next("/index");
    }
    store.dispatch("startLoading");
    store.dispatch("setHasMoreData", false);
    if (store.getters.IS_LOGGED_IN) {
      await store.dispatch("getSavedProducts");

      if (store.getters.SAVED_PRODUCTS.length == 30) {
        store.dispatch("setHasMoreData", true);
      }
    }
  },

  mounted() {
    this.$store.dispatch("setHeaderTitle", "최근 본 상품");
    this.$store.dispatch("hideLogo");

    if (!this.$store.getters.USER_HEIGHT) {
      this.$router.push("/");
    }

    setTimeout(() => {
      this.$store.dispatch("endLoading");
    }, 500);
  },

  created() {
    this.$store.dispatch("setCurrentRoute", this.$route.path);
    if (process.browser) {
      window.addEventListener("scroll", this.handleScroll);
    }
  },

  methods: {
    ...mapActions(["setHasMoreData"]),

    async handleScroll() {
      const notExactlyTheBottom = document.body.offsetHeight - 500;

      if (
        window.innerHeight + window.scrollY >= notExactlyTheBottom &&
        this.hasMoreData &&
        !this.isSpinning
      ) {
        this.isSpinning = true;
        await this.getMoreProducts();
      }
    },

    getRecentProducts() {
        this.recentProducts = JSON.parse(localStorage.recentProducts);
      
    },

    goToCollectionPage() {
      this.$router.push("/collection");
    },

    getMoreProducts() {
      return new Promise(async (resolve, reject) => {
        try {
          if (this.hasMoreData) {
            await this.$store.dispatch(
              "setOffset",
              this.$store.getters.OFFSET + 30
            );
            const response = await await this.$store.dispatch(
              "addSavedProducts"
            );
            const products = response.result.itemList;
            if (products.length == 0) {
              this.hasMoreData = false;
              this.$store.dispatch("setHasMoreData", false);
            }
          }
          this.isSpinning = false;
          resolve();
        } catch (error) {
          this.isSpinning = false;
          reject(error);
        }
      });
    }
  },

  async beforeRouteLeave(to, from, next) {
    await this.$store.dispatch("startLoading");
    if (process.browser) {
      window.removeEventListener("scroll", this.handleScroll);
    }
    this.$store.dispatch("showLogo");
    this.$store.dispatch("resetOffset");
    this.$store.dispatch("resetFilter");
    this.$store.dispatch("resetSavedProducts");
    this.$store.dispatch("setHasMoreData", true);
    next();
  }
};
</script>

<style lang="scss" scoped>
.saved-container {
  padding-bottom: 20%;
  height: 100%;
  min-height: 100vh;
}

.no-match {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20% 0;

  &__oops {
    color: $primary;
    font-size: 1.3em;
    font-weight: 600;
  }

  &__button {
    margin-top: 30px;
    padding: 10px 20px;
    font-size: 1em;
    border: 2px solid $grey;
    // background-color: $dark-grey;
    color: $grey;
    font-weight: 600;
    border-radius: 4px;
  }
}

.masonry-container {
  margin: 10px 0 0 0;
  padding-bottom: 10%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.masonry-item {
  margin: 0 0 5px 1%;
  border: 0;
  font-size: 0.8em;
  width: 32%;
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
