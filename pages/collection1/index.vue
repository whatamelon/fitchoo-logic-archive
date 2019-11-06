<template>
  <main
    class="collection-container"
    :class="{ 'block-scroll': SHOW_BOTTOM_SHEET }"
    id="collectionProduct"
  >
    <AppSpinner v-if="IS_LOADING" />
    
      <LoginAlertModal />
      

            <div>
    <div class="tab">
      <div
        class="tab__title2"
        @click="goToRoute('/collection')"
        id="leftTabTab"
      >
        나와 비슷한 키의 상품
      </div>
      <div
        class="tab__title1"
        @click="goToRoute('/collection1')"
        id="rightTabTab"
      >
        전체 상품
      </div>
    </div>
    <div class="tab-space"></div>
  </div>

      <div v-if="!SHOW_BOTTOM_SHEET">
      <AppHorizontalScrollBar class="fix-category"></AppHorizontalScrollBar>

      <div class="buttons-container">
        <AppDropdown></AppDropdown>

        <div class="buttons-subcontainer">
          <!-- <div class="shaker">
            <div class="shaker-body">
              <span class="shaker-body__text">내 키</span>
              <span class="shaker-body__text">에 맞게 상품검색</span>
            </div>
            <div class="shaker-arrow"></div>
          </div> -->

          <FilterButton></FilterButton>
    
        </div>
      </div>

      <div v-if="isSorry" class="sorry-container">
        <img
          class="sorry__image"
          src="/sorrybutIloveyou.png"
          alt="/sorrybutIloveyou.png"
        />
        <h4 class="sorry__message">{{ sorryMessage }}</h4>
      </div>

      <div
        v-masonry
        transition-duration="0"
        class="masonry-container"
        item-selector=".masonry-product"
      >
        <AppProduct
          v-for="product in COLLECTION_PRODUCTS"
          :key="product.itemId"
          v-masonry-tile
          :product="product"
          class="masonry-product"
        ></AppProduct>
      </div>

      <div v-if="isSpinning" class="spinner-continaer">
        <AppSpinner2></AppSpinner2>
      </div>

      <AppAlert ref="appAlert" :alert-message="'더 없어요! 끝!'"></AppAlert>

    </div>
    <AppFilterSheet2 ref="bottomSheet"></AppFilterSheet2>
    
  </main>
</template>

<script>
import AppHorizontalScrollBar from "@/components/App/AppHorizontalScrollBar";
import AppProduct from "@/components/App/AppProduct";
import AppSpinner from "@/components/App/AppSpinner";
import AppDropdown from "@/components/App/AppDropdown";
import AppFilterSheet2 from "@/components/App/AppFilterSheet2";
import FilterButton from "@/components/Button/FilterButton";
import GoUpButton from "@/components/Button/GoUpButton";
import LoginAlertModal from "@/components/Modal/LoginAlertModal";
import AppSpinner2 from "@/components/App/AppSpinner2";
import AppAlert from "@/components/App/AppAlert";
import { mapGetters } from "vuex";
import AppTab2 from "@/components/App/AppTab2";


export default {
  components: {
    AppHorizontalScrollBar,
    AppProduct,
    AppDropdown,
    AppSpinner,
    AppFilterSheet2,
    LoginAlertModal,
    FilterButton,
    GoUpButton,
    AppSpinner2,
    AppAlert,
    AppTab2
  },
  data() {
    return {
      isSpinning: false,
      sorryMessage:
        "해당 카테고리의 상품이 아직 없어요. ㅠㅠ 조금만 기다려주세요! 폭풍업뎃중!"
    };
  },
  
  scrollToTop: true,

    transition ( to, from  ) {
    if (localStorage.getItem("previousPage")=="product-id" ) {
      return 'slideLeft'
    }
    else {
      return 'nothing'
    }
  },

  computed: {
    ...mapGetters([
      "IS_LOADING",
      "SHOW_BOTTOM_SHEET",
      "COLLECTION_PRODUCTS",
      "FIRST_CATEGORY",
      "SECOND_CATEGORY"
    ]),

    isSorry() {
      return this.$store.getters.COLLECTION_PRODUCTS.length == 0 ? true : false;
    },

    hasMoreData() {
      return this.$store.getters.HAS_MORE_DATA;
    }
    
  },

  async asyncData({ store  }) {

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

    const params = {
      offset: 0,
      limit: 999
    };

    if (localStorage.getItem("height")) {
      await store.dispatch("getModels", params);
    }

    const height = store.getters.USER_HEIGHT;
 if (localStorage.getItem("cat1")) {
      const cat1 = localStorage.getItem("cat1");
      localStorage.removeItem("cat1");

      const cat2 = localStorage.getItem("cat2");
      localStorage.removeItem("cat2");

      const productCategory = localStorage.getItem("productCategory");
      localStorage.removeItem("productCategory");

      store.dispatch("setFirstCategory", cat1);
      store.dispatch("setSecondCategory", { code : cat2, name: productCategory});
    }

    else{

    store.dispatch("setFirstCategory", "001");
    }

  function heightRangeCalculator(range = 0, height = 0) {
      const min = parseInt(height) - range;
      const max = parseInt(height) + range;
      const heightRange = min + "r" + max;

      return heightRange;

    }
    store.dispatch("setHeightRange", heightRangeCalculator(100, height));
    store.dispatch("setTemporaryHeightRange", heightRangeCalculator(100, height));
    store.dispatch("getCollectionProducts");

  },

  created() {    

    localStorage.removeItem("product");    
    localStorage.removeItem("model");
    localStorage.removeItem("backButton");

    if (localStorage.getItem("recentModelId") != 0) {
    const recentModelId = JSON.parse(localStorage.recentModelId);
    recentModelId.length = 0;
    localStorage.recentModelId = JSON.stringify(recentModelId);
    }
    else {

    }

    if (localStorage.getItem("recentProductId") != 0) {
    const recentProductId = JSON.parse(localStorage.recentProductId);
    recentProductId.length = 0;
    localStorage.recentProductId = JSON.stringify(recentProductId);
    }
    else {

    }
    this.$amplitude.getInstance().logEvent("page view collection");
    this.$store.dispatch("setCurrentRoute", this.$route.path);
    if (process.browser) {
      window.addEventListener("scroll", this.handleScroll);
    }

    if (!this.$store.getters.USER_HEIGHT) {
      this.$router.push("/");
    }

    if (this.$store.getters.MODELS.length == 0) {
      this.sorryMessage =
        "입력하신 키의 모델 상품이 아직 없어요. ㅠㅠ \n 조금만 기다려주세요! 폭풍업뎃중!";
    }
    


    setTimeout(() => {
      this.$store.dispatch("endLoading");
      window.scrollTo(0, 0);
    }, 500);
  },

  methods: {
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
    

    getMoreProducts() {
      return new Promise(async (resolve, reject) => {
        try {
          await this.$store.dispatch(
            "setOffset",
            this.$store.getters.OFFSET + 30
          );
          console.log(this.$store.getters.OFFSET);
            console.log(response);
          const response = await this.$store.dispatch("addCollectionProducts");
          const products = response.result.itemList;
          if (products.length == 0) {
            this.hasMoreData = false;
            this.$store.dispatch("setHasMoreData", false);
            this.$refs.appAlert.showAlert();
          }
          this.isSpinning = false;
          resolve();
        } catch (error) {
          this.isSpinning = false;
          reject(error);
        }
      });
    },

        goToRoute(path) {
      this.$store.dispatch("setCurrentRoute", path);
      this.$router.push(path);
    }
  },

  beforeRouteLeave(to, from, next) {
    localStorage.setItem("routerStack",this.$route.path);
    localStorage.removeItem("left");
    localStorage.removeItem("right");
    this.$store.dispatch("startLoading");
    if (process.browser) {
      window.removeEventListener("scroll", this.handleScroll);
    }
       if(to.name!="product") {

    this.$store.dispatch("setActiveSecondCategory", [
      {
        code: "000",
        name: "전체"
      },
      {
        code: "001",
        name: "코트"
      },
      {
        code: "002",
        name: "자켓"
      },
      {
        code: "003",
        name: "점퍼"
      },
      {
        code: "004",
        name: "가디건"
      }
    ]);
    this.$store.dispatch("resetCollectionProducts");
    this.$store.dispatch("resetOffset");
    this.$store.dispatch("resetFilter");
    }
    this.$store.dispatch("setHasMoreData", true);
    this.$store.dispatch("setDropdownInactive", false);
    next();
  }
};
</script>

<style lang="scss" scoped>
.noShow {
  display: none;
}

.tab {
  margin: 0;
  width: 100%;
  max-width: 500px;
  position: fixed;
  display: flex;
  text-align: center;
  background-color: $white;
  z-index: 4;

  &__title1 {    
    font-weight: 600;
    font-size: 0.9em;
    width: 50%;
    padding: 15px 10px;
    color: $primary;
    border-bottom: solid 3px $primary;
  }

  &__title2 {
    padding: 15px 10px;
    border-bottom: solid 1px $light-grey;
    width: 50%;
    font-size: 0.9em;
    font-weight: 600;
    color: $grey;
  }
  

}

.tab-space {
  height: 51px;
}


.collection-container {
  background: $white;
  min-height: 800px;
  height: 100%;
  padding-bottom: 20%;
}

.fix-category-space {
  height: 40px;
}

.buttons-container {
  padding: 5px 1%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.buttons-subcontainer {
  display: flex;
  align-items: center;
}

.shaker {
  display: flex;
  align-items: baseline;
  margin-right: 10px;

  animation: shake 0.9s infinite;
}

@keyframes shake {
  from,
  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  0% {
    -webkit-transform: translate3d(2px, 0, 0);
    transform: translate3d(2px, 0, 0);
  }

  50% {
    -webkit-transform: translate3d(-2px, 0, 0);
    transform: translate3d(-2px, 0, 0);
  }
  100% {
    -webkit-transform: translate3d(2px, 0, 0);
    transform: translate3d(2px, 0, 0);
  }
}

.shaker-body {
  margin: 0 0 0 10px;
  padding: 6px 12px;
  background-color: $dark-grey;
  border-radius: 4px;
  display: flex;
  align-items: baseline;
  justify-content: center;
  align-content: center;

  &__text {
    font-size: 0.8em;
    color: $white;
    letter-spacing: 0.001em;
    font-weight: 600;
  }

  &--red {
    color: $primary;
  }
}

.shaker-arrow {
  width: 0px;
  height: 0px;
  background-color: $dark-grey;
  width: 0;
  height: 0;
  border-left: 3px solid transparent;
  border-right: 0 solid $white;
  border-top: 3px solid $white;
  border-bottom: 3px solid $white;
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

.block-scroll {
  overflow: hidden;
  overflow-y: scroll !important;
  width: 100%;
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

.sorry-container {
  padding: 15% 5% 30% 5%;
  color: $grey;
  height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.sorry {
  &__image {
    width: 200px;
  }

  &__message {
    width: 260px;
    margin: 10px 0;
    text-align: center;
    font-size: 1em;
  }
}
</style>
