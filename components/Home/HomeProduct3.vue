<template>
  <figure
    v-if="isValid"
    class="home3-product"
    @click="toDetailPage()"
  >
  <div class="home3-product__image-background"
            :class="{ backCustom: isBackHeight }">
      <button
        v-if="!saved"
        class="save-button"
        @click.stop="addToSavedProducts(product)"
      >
        <i class="material-icons save-button__icon">
          favorite
        </i>
      </button>
      <button
        v-if="saved"
        class="save-button"
        @click.stop="deleteFromSavedProducts(product)"
      >
        <i class="material-icons save-button__icon save-button--active">
          favorite
        </i>
      </button>

    <transition>
      <img
        v-show="isLoad"
        class="home3-product__image"
        :class="{ imgCustom: isImgHeight }"
        :src="IMAGE_URL + product.imgFile"
        alt="/h2.jpg"
        @error="hideItem"
        @load="loaded"
      />
    </transition>
    </div>

    <div class="home3-product__info">
        <div class="home3-product__price"
       :class="{ custom: isCustom }"
      ref= "priceCustom">
        {{ separateThousand(product.price) }}
      </div>
      <div class="home3-product__name">{{ product.name }}</div>
    </div>

    <div class="home3-product__model">
      <div class="home3-product__model-name">{{ product.modelName }}</div>
      <div class="home3-product__model-height">
        {{ recalculatedHeight(product.modelHeight) }}cm
      </div>
    </div>
  </figure>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      isValid: true,
      saved: false,
      isCustom:false,
      isBackHeight:false,
      isImgHeight:false,
      isLoad: false
    };
  },

  computed: {
    ...mapGetters(["IMAGE_URL"])
  },

  created() {
  
    this.isSaved();
    if (process.browser && this.$route.name.includes("model")) {
      window.addEventListener("custom", this.priceCustom);
    }

     if  (this.$route.name.includes("model")) {
      this.isCustom = true;
    } // price font-size custom

    if  (this.$route.name.includes("model")) {
      this.isBackHeight = true;
    } //div background height custom -> 190

    if  (this.$route.name.includes("model")) {
      this.isImgHeight = true; 
    } //img height custom -> 190
  },

  mounted() {},

  methods: {

    loaded() {
        this.isLoad = true;
      },

    recalculatedHeight(height) {
      height = height.toString().substring(0, 3);
      return height;
    },

    isNew(updatedAt) {
      updatedAt = updatedAt.substring(0, 10);
      const splitUpdatedAt = updatedAt.split("-");

      const year = parseInt(splitUpdatedAt[0]);
      const month = parseInt(splitUpdatedAt[1]);
      const day = parseInt(splitUpdatedAt[2]);

      const timestampParsedUpdatedAt = new Date(year, month - 1, day).getTime();

      const now = new Date().getTime();
      // const week = 604800000;
      const twoDays = 172800000;
      const timePassed = now - timestampParsedUpdatedAt;

      return timePassed <= twoDays ? true : false;
    },
    
    priceCustom() {
      if (this.$route.name.includes("model")) {
          this.$refs.priceCustom.style.font.size="1.4em";
        }
    },

    isSaved() {
      const savedProducts = this.$store.getters.SAVED_PRODUCTS;
      for (let i = 0; i < savedProducts.length; i++) {
        if (savedProducts[i].itemId == this.product.itemId) {
          this.saved = true;
          return;
        }
      }
      return;
    },

    separateThousand(price) {
      price = price.toString();
      let index;
      if (price.length == 6) {
        index = 3;
      } else if (price.length == 5) {
        index = 2;
      } else if (price.length == 4) {
        index = 1;
      } else {
        return price;
      }
      return price.substring(0, index) + "," + price.substring(index);
    },

    hideItem() {
      this.isValid = true;
    },

    addToSavedProducts(product) {
      if (!this.$store.getters.IS_LOGGED_IN) {
        this.$store.dispatch("openLoginAlertModal");
        return;
      }

      this.$store.dispatch("addToSavedProducts", product);
      this.saved = true;
    },

    async deleteFromSavedProducts(product) {
      this.saved = false;

      await this.$store.dispatch("startLoading");
      await this.$store.dispatch("deleteFromSavedProducts", product);
      setTimeout(() => {
        this.$store.dispatch("endLoading");
      }, 200);
    },

    toDetailPage() {
     
        this.$amplitude
          .getInstance()
          .logEvent("click products", { clickedPage: "홈" });

      const itemId = this.product.itemId.toString();
      const heart = this.saved ? "1" : "0";
      const itemName = this.product.name;
      const imgUrl = this.$store.getters.IMAGE_URL + this.product.imgFile;

      // for snslogin
      if (window.AppType == "android") {
        window.fcjs_if.setItemInfo(itemId, heart, itemName, imgUrl);
      }
      if(window.AppType == "ios2"){
        var message = {
          'itemId': itemId,
          'heart': heart,
          'itemName': itemName,
          'imgUrl': imgUrl
        };
        window.webkit.messageHandlers.setItemInfo.postMessage(message);
      }
      //

      // by shlee
      // alert("check OS type(AppProduct vue): " + window.OsType)
      // for android
      if (localStorage.accessToken && window.OsType == "android") {
        window.fc_android.setAuthToken(localStorage.accessToken);
      }
      if (window.OsType == "android") {
        window.fc_android.setItemInfo(itemId, heart, itemName, imgUrl);
      }
      // for ios
      if (window.OsType == "ios") {
        if (localStorage.accessToken) {
          alert(
            "fitchoo://call?func=setItemInfo&itemId=" +
              itemId +
              "&heart=" +
              heart +
              "&itemName=" +
              itemName +
              "&imgUrl=" +
              imgUrl +
              "&token=" +
              localStorage.accessToken
          );
        } else {
          alert(
            "fitchoo://call?func=setItemInfo&itemId=" +
              itemId +
              "&heart=" +
              heart +
              "&itemName=" +
              itemName +
              "&imgUrl=" +
              imgUrl +
              "&token=" +
              ""
          );
        }
      }

      const product = this.product;
      const recentProducts = JSON.parse(localStorage.recentProducts);
      localStorage.setItem('modelId', product.modelId);

      localStorage.setItem('cat1',product.cat1);
      localStorage.setItem('cat2',product.cat2);
      localStorage.setItem('product_id' , product.itemId);

      const isIncluded =
        recentProducts.filter(product => product.itemId == this.product.itemId)
          .length === 0
          ? false
          : true;

      if (!isIncluded) {
        if (recentProducts.length === 30) {
          recentProducts.pop();
        }
        recentProducts.unshift(product);
        localStorage.recentProducts = JSON.stringify(recentProducts);
      }

      
      // const recentProductId = JSON.parse(localStorage.recentProductId);
      // recentProductId.push(product);
      // localStorage.recentProductId = JSON.stringify(recentProductId);



      this.$store.dispatch("setProductInfo", product);
      localStorage.setItem("product", JSON.stringify(product));
      console.log(product);
      
      if (this.$route.name == null ) {
        window.open(product.linkUrl);
      }
     else  if(this.$route.name.includes("collection") ||
          this.$route.name.includes("collection1") ||
          this.$route.name.includes("exhibition") ||
          this.$route.name.includes("model")  ||
          this.$route.name.includes("home") 
      ) {
      this.$router.push("/product");
      console.log(heart);
      }
      else {
        window.open(product.linkUrl);
      }
     
    }
  }
};
</script>

<style lang="scss">
.custom {
  font-size:1.4em !important;
}
.imgCustom {
 height:190px !important;
}
.backCustom {
   height:190px !important;
}
.home3-product {
  margin: 0 1% 6% 1% !important;
  position: relative;
  background: #fefefe;
  border: 1px solid #f2f2f2;
  border-radius: 4px;
  width: 31.3% !important;
  transition: opacity 0.4s ease-in-out;
  cursor: pointer;

  &__new {
    position: absolute;
    background-color: $primary;
    color: $white;
    margin: 6px;
    padding: 1px 6px 1px 6px;
    border-radius: 4px;
    font-size: 0.7em;
    font-weight: 700;
    z-index: 1;
  }

  &__image-background {
    background: $light-grey;
    width: 100%;
    height: 150px;
    border-radius:5px;
  }

  &__image {
    width: 100%;
    height: 150px;
    object-fit: cover;
    transition: all .3s ease;
    opacity: 1;
    border-radius:5px;
  }

  &__image.v-enter {
      opacity: 0;
  }

  &__info {
    padding: 7% 7px 0 7px;
    text-align: left;
  }

  &__name {
    font-size: 0.8em;
    color: #BDBDBD;
    font-weight: 400;
    letter-spacing: 0;
    word-break: keep-all;
    word-wrap: break-word;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
  }

  &__price {
    font-size: 1.3em;
    color: #000;
    font-weight: 800;
    letter-spacing: 0;
  }

  &__model {
    padding: 1% 7px 0 7px;
    display: flex;
    justify-content: space-between;
    font-size: 0.9em;
  }

  &__model-height {
    padding-left: 5px;
    font-weight: 800;
    font-size: 1em;
    line-height: 1.3;
  }

  &__model-name {
      font-size: 0.8em;
    font-weight: 500;
  }
}

.save-button {
  position: absolute;
  width: auto;
  height: auto;
  top: 0;
  right: 0;
  z-index: 1;

  &__icon {
    margin: 5px 5px 25px 25px;
    color: #dddddd;
    font-size: 2em;
  }

  &--active {
    color: $primary;
  }
}
</style>
