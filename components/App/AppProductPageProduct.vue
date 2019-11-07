<template>
  <figure
    v-if="isValid"
    class="app2-product"
    @click="toDetailPage(product.linkUrl)"
  >
    <div v-if="isNew(product.uploadTime)" class="app2-product-new">new</div>
    <div class="app2-product-image-background"
            :class="{ backCustom: isBackHeight }">
      <button
        v-if="!saved"
        class="save-button"
        @click.stop="addToSavedProducts(product)"
      >
        <i class="material-icons save-button-icon">
          favorite
        </i>
      </button>
      <button
        v-if="saved"
        class="save-button"
        @click.stop="deleteFromSavedProducts(product)"
      >
        <i class="material-icons save-button-icon save-button--active">
          favorite
        </i>
      </button>

      <img
        class="app2-product-image"
        :class="{ imgCustom: isImgHeight }"
        :src="IMAGE_URL + product.imgFile"
        alt="/h2.jpg"
        @error="hideItem"
        loading="lazy"
      />
    </div>

    <div class="app2-product-info">
      <div class="app2-product-name">{{ product.name }}</div>
      <div class="app2-product-price"
       :class="{ custom: isCustom }"
      ref= "priceCustom">
        {{ separateThousand(product.price) }}
      </div>
    </div>

    <div class="app2-product-model">
      <div class="app2-product-model-name">{{ product.modelName }}</div>
      <div class="app2-product-model-height">
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
      isImgHeight:false
    };
  },

  computed: {
    ...mapGetters(["IMAGE_URL"])
  },

  mounted() {},

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

  methods: {
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

   async toDetailPage() {
      if (this.$route.name.includes("model-id")) {
        this.$amplitude
          .getInstance()
          .logEvent("click products", { clickedPage: "모델상세" });
      } else if (this.$route.name.includes("exhibition")) {
        this.$amplitude
          .getInstance()
          .logEvent("click products", { clickedPage: "기획전" });
      } else if (this.$route.name.includes("collection")) {
        this.$amplitude
          .getInstance()
          .logEvent("click products", { clickedPage: "모아보기" });
      } else if (this.$route.name.includes("saved")) {
        this.$amplitude
          .getInstance()
          .logEvent("click products", { clickedPage: "찜" });
      } else if (this.$route.name.includes("home")) {
        this.$amplitude
          .getInstance()
          .logEvent("click products", { clickedPage: "홈" });
      }

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
      // localStorage.setItem('modelId', product.modelId);
      
      await this.$store.dispatch("getModelInfo", product.modelId);
      console.log(product.modelId)

      localStorage.setItem('cat1',product.cat1);
      localStorage.setItem('cat2',product.cat2);
      // localStorage.setItem('product_id' , product.itemId);

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
     else  if(this.$route.name.includes("product")
      ) {
      this.$store.dispatch("setModel",this.$store.getters.MODEL_INFO);
      console.log(this.$store.getters.MODEL_INFO)
        this.$store.dispatch("startLoading");
        setTimeout(() => {
          this.$store.dispatch("endLoading");
        }, 500);
      this.$router.push("/product/" + product.itemId);
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

.app2-product {

  &-image {
    width : 180px;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    object-fit: cover;
    // margin : 0 0 0 -5%;
    animation : fadeIn 2s both;
    opacity : 0;

          @keyframes fadeIn{
    to {
        opacity: 1;
    }
      }

    &-background {
      width : 100%;
      overflow:hidden;
      height:160px;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
    }
  }
}

@media all and (min-width : 400px){
.app2-product{
  width:39% !important;
}
 .app2-product-image {
    width : 160px;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    object-fit: cover;
    animation : fadeIn 2s both;
    opacity : 0;

          @keyframes fadeIn{
    to {
        opacity: 1;
    }
      }
 }
}

.app2-product {
  margin: 0 0 20px 2%;
  position: relative;
  background: #fefefe;
  border: 1px solid #f2f2f2;
  border-radius: 6px;
  width: 42%;
  transition: opacity 0.4s ease-in-out;
  cursor: pointer;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);

  &-new {
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

  &-info {
    padding: 7px 10px;
    text-align: left;
  }

  &-name {
    font-size: 0.8em;
    color: #000;
    font-weight: 300;
    letter-spacing: 0;
    word-break: keep-all;
    word-wrap: break-word;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
  }

  &-price {
    font-size: 1.0em;
    color: #000;
    font-weight: 600;
    letter-spacing: 0;
  }

  &-model {
    padding: 5px 10px;
    border-top: 1px solid $light-grey;
    display: flex;
    justify-content: space-between;
    font-size: 0.8em;
  }

  &-model-name {
    color: $grey;
  }

  &-model-height {
    padding-left: 5px;
    font-weight: 700;
  }
}

.save-button {
  position: absolute;
  width: auto;
  height: auto;
  top: 0;
  right: 0;
  z-index: 1;

  &-icon {
    margin: 5px 5px 25px 25px;
    color: #dddddd;
    font-size: 2em;
  }

  &--active {
    color: $primary;
  }
}
</style>
