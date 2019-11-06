<template>
<transition>
  <main class="product-detail-container">

    
    <!-- <AppSpinner v-if="IS_LOADING" /> -->

        <div class="product-main">
            <div class="product-main-image-container">
                <div class="product-main-image__skeleton"></div>        
                <img class="product-main-image"
                          :src="IMAGE_URL + PRODUCT_INFO.imgFile"/>
            </div>

              <div class="product-main-profile">
                <div class="model-profile">
                <div class="model-profile__profile-image__skeleton"></div>
                  <img
                    class="model-profile__profile-image"
                    :src="IMAGE_URL + model.imgFaceFile" />

                  <div class="model-profile__flex">
                    <div class="model-profile__info">
                      <div class="model-profile__info__up">
                      <span class="model-profile__name">{{ model.name }}</span>
                      </div>
                      <div class="model-profile__info__down">
                      <span class="model-profile__height">{{ model.height }}cm</span>
                       <span v-if="model.shopList[0]" class="model-profile__shop">{{
            model.shopList[0].name || "쇼핑몰 이름"
          }}</span>
                      </div>
                    </div>
                    <div class="model-profile__tags">
                      <span
                        class="model-profile__tag"
                        >
                        </span>
                    </div>
                  </div>
                </div>

            <div class="product-profile">               
                    <span class="product-profile__name">
                      {{PRODUCT_INFO.name}}</span>
                    <span class="product-profile__price">
                      {{ separateThousand(PRODUCT_INFO.price) }}</span>
            </div>
            <div class="product-link"
                              @click="toDetailPage(PRODUCT_INFO.linkUrl)">         
                <div class="product-link__skeleton"></div>        
                <button class="button-link">
                  상품 보러가기
              </button>
          </div>
          </div>
       </div>

       <div class="content-main" id="sameProduct">
         <div class="content-title">
          <div class="content-title__profile-image__skeleton"></div>
           <img class="content-title__profile-image"
                    :src="IMAGE_URL + model.imgFaceFile" />
             <span class="content-title__title">{{ model.name }} 모델의 다른 {{ category }}</span>
         </div>
              <div class="masonry-container">
                <AppProductPageProduct
                  v-for="product in MODEL_SAME_PRODUCTS"
                  :key="product.itemId"
                  :product="product"
                  class="masonry-item1"
                ></AppProductPageProduct>
              </div>
       </div>

       <div class="content-main" id="newProduct">
         <div class="content-title">
            <div class="content-title__profile-image__skeleton"></div>
           <img class="content-title__profile-image"
                    :src="IMAGE_URL + model.imgFaceFile" />
             <span class="content-title__title">{{ model.name }} 모델의 신상품</span>
         </div>
              <div class="masonry-container">
                <AppProductPageProduct
                  v-for="product in MODEL_PRODUCTS_NEW"
                  :key="product.itemId"
                  :product="product"
                  class="masonry-item2"
                ></AppProductPageProduct>
              </div>
          </div>
       </div>

       <div class="another-main" id="sameHeight">
         <div class="another-title">
             <span class="another-title__title">{{ model.name }} 모델과 비슷한 키의 모델</span>
         </div>
          <div class="another-card-container">
            <div class="sameHeight-card"
                    id="sameHeightModelCard"
                  v-for="model in HEIGHT_MODELS"
                  :key="model.modelId"
                  @click="toModelPage(model)">
              <div class="sameHeight-card__background">
                  <img class="sameHeight-card__background-image"
                            :src="IMAGE_URL + model.imgTitleFile" />
              </div>
              <div class="sameHeight-card__profile">
                  <img class="sameHeight-card__profile-image"
                            :src="IMAGE_URL + model.imgFaceFile"/>
                  <div class="sameHeight-card__profile-right">
                  <span class="sameHeight-card__profile-name">{{ model.name }}</span>
                  <span class="sameHeight-card__profile-height">{{ model.height }}cm</span>
                  </div>
              </div>
            </div>
          </div>
       </div>

        <div class="another-main-style" id="sameStyle">
         <div class="another-title">
             <span class="another-title__title">이런 모델은 어때요?</span>
         </div>
          <div class="another-card-container">
            <div class="sameHeight-card"
                  v-for="model in STYLE_MODELS"
                  :key="model.modelId"
                  @click="toModelPage(model)">
              <div class="sameHeight-card__background">
                  <img class="sameHeight-card__background-image"
                            :src="IMAGE_URL + model.imgTitleFile" />
              </div>
              <div class="sameHeight-card__profile">
                  <img class="sameHeight-card__profile-image"
                            :src="IMAGE_URL + model.imgFaceFile"/>
                  <div class="sameHeight-card__profile-right">
                  <span class="sameHeight-card__profile-name">{{ model.name }}</span>
                  <span class="sameHeight-card__profile-height">{{ model.height }}cm</span>
                  </div>
              </div>
            </div>
          </div>
       </div>
       

  </main>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AppProductPageProduct from "@/components/App/AppProductPageProduct";
// import AppSpinner from "@/components/App/AppSpinner";

export default {
  components: {
    AppProductPageProduct
    // AppSpinner
  },

  transition ( to, from  ) {
    if(localStorage.getItem("routerStack") == null) {
      return 'nothing'
    }
    else if (localStorage.getItem("routerStack").includes("model")) {
      return 'slideRight'
    }
    else if (localStorage.getItem("previousPage")=="product") {
      return 'nothing'
    }
    else {
      return 'nothing'
    }
  },

  data() {
    return {
      category : localStorage.getItem('productCategory'),
      style_models : this.$store.getters.STYLE_MODELS,
      height_models : this.$store.getters.HEIGHT_MODELS,
      model_products_new : this.$store.getters.MODEL_PRODUCTS_NEW,
      model_same_products : this.$store.getters.MODEL_SAME_PRODUCTS,
      model_info: this.$store.getters.MODEL_INFO
    };
  },
  scrollToTop: true,

  computed: {
    ...mapGetters([
      // "IS_LOADING",
      "IMAGE_URL",
      "MODEL_PRODUCTS",
      "MODELS",
      "PRODUCT_INFO",
      "STYLE_MODELS",
      "HEIGHT_MODELS",
      "MODEL_PRODUCTS_NEW",
      "MODEL_SAME_PRODUCTS",
      "MODEL_INFO"
    ])
  },

  async asyncData({ store, params }) {
    var productInfo = JSON.parse(localStorage.getItem('product'));
    var category1 = productInfo.cat1;
    var category2 = productInfo.cat2;

    console.log(productInfo);
    console.log(category1);
    console.log(category2);

 switch (category1) {
        case "001":
          if(category2 == "000") {
            localStorage.setItem('productCategory', '아우터');
          }
          else if (category2 == "001") {
            localStorage.setItem('productCategory', '코트');
          }
          else if (category2 == "002") {
            localStorage.setItem('productCategory', '자켓');
          }
          else if (category2 == "003") {
            localStorage.setItem('productCategory', '점퍼');
          }
          else {
            localStorage.setItem('productCategory', '가디건');
          }
          break;
        case "002":
          if(category2 == "000") {
            localStorage.setItem('productCategory', '상의');
          }
          else if (category2 == "001") {
            localStorage.setItem('productCategory', '티셔츠');
          }
          else if (category2 == "002") {
            localStorage.setItem('productCategory', '니트');
          }
          else if (category2 == "003") {
            localStorage.setItem('productCategory', '블라우스/셔츠');
          }
          else if (category2 == "004") {
            localStorage.setItem('productCategory', '후드/맨투맨');
          }
          else {
            localStorage.setItem('productCategory', '나시');
          }
          break;
        case "003":
          if(category2 == "000") {
            localStorage.setItem('productCategory', '하의');
          }
          else if (category2 == "001") {
            localStorage.setItem('productCategory', '청바지');
          }
          else if (category2 == "002") {
            localStorage.setItem('productCategory', '슬랙스');
          }
          else if (category2 == "003") {
            localStorage.setItem('productCategory', '숏팬츠');
          }
          else if (category2 == "004") {
            localStorage.setItem('productCategory', '레깅스');
          }
          else {
            localStorage.setItem('productCategory', '롱팬츠');
          }
          break;
        case "004":
            localStorage.setItem('productCategory', '스커트');
          break;
        case "005":
            localStorage.setItem('productCategory', '원피스');
          break;
        case "006":
            localStorage.setItem('productCategory', '신발');
          break;
        case "007":
            localStorage.setItem('productCategory', '가방');
          break;
        case "008":
            localStorage.setItem('productCategory', '악세서리');
          break;
        case "009":
          if(category2 == "000") {
            localStorage.setItem('productCategory', '쥬얼리');
          }
          else if (category2 == "001") {
            localStorage.setItem('productCategory', '귀걸이');
          }
          else if (category2 == "002") {
            localStorage.setItem('productCategory', '목걸이/팔찌');
          }
          else if (category2 == "003") {
            localStorage.setItem('productCategory', '반지');
          }
          else {
            localStorage.setItem('productCategory', '기타');
          }
          break;
        case "0010":
            localStorage.setItem('productCategory', '비치웨어');
          break;
        case "0011":
            localStorage.setItem('productCategory', '란제리');
          break;
 }

    //     if (localStorage.getItem("previousPage")=="model-id") {
    // }
    // else {
     await store.dispatch("getModelProductsNew");
    await  store.dispatch("getModelSameProducts");
   await   store.dispatch("getStyleModels", params);
    await  store.dispatch("getHeightModels", params);
    store.dispatch("setModel",store.getters.MODEL_INFO);
  // }
    

    return {
      saved: false,
      category: localStorage.getItem('productCategory'),
      models : store.getters.MODELS,
      productList: store.getters.MODEL_PRODUCTS,
      model: store.getters.MODEL,
      product: store.getters.PRODUCT_INFO,
      style_models : store.getters.STYLE_MODELS,
      height_models : store.getters.HEIGHT_MODELS,
      model_products_new : store.getters.MODEL_PRODUCTS_NEW,
      model_same_products : store.getters.MODEL_SAME_PRODUCTS,
      model_info : store.getters.MODEL_INFO
    };
  },

  created() {
    this.isSaved();
  },
    
  mounted() {


    if(localStorage.getItem("backButton") == "1") {
      localStorage.removeItem("backButton");
      const recentModelId = JSON.parse(localStorage.recentModelId);
    recentModelId.pop();

    localStorage.setItem("recentModelId", JSON.stringify(recentModelId));

    // const recentProductId = JSON.parse(localStorage.recentProductId);
    // recentProductId.pop();

    // localStorage.setItem("recentProductId", JSON.stringify(recentProductId));
    }

    var heightModelsIsHere = Object.values(this.$store.getters.HEIGHT_MODELS);

    for (var i=0; i<heightModelsIsHere.length; i++) {
    if(heightModelsIsHere[i].modelId == this.$store.getters.MODEL.modelId ) {
      document.getElementsByClassName('sameHeight-card')[i].style.display = 'none';
      break;
    }
    }   
    
    var newProductsIsHere = Object.values(this.$store.getters.MODEL_PRODUCTS_NEW);

    for (var i=0; i<newProductsIsHere.length; i++) {
    if(newProductsIsHere[i].itemId == this.$store.getters.PRODUCT_INFO.itemId ) {
      document.getElementsByClassName('masonry-item2')[i].style.display = 'none';
      break;
    }
    }
        
    var sameProductsIsHere = Object.values(this.$store.getters.MODEL_SAME_PRODUCTS);

    for (var i=0; i<sameProductsIsHere.length; i++) {
    if(sameProductsIsHere[i].itemId == this.$store.getters.PRODUCT_INFO.itemId ) {
      document.getElementsByClassName('masonry-item1')[i].style.display = 'none';
      break;
    }
    }
    
    

    if(this.$store.getters.MODEL_SAME_PRODUCTS.length<5) {
      document.getElementById('sameProduct').style.display="none";
    }

    if(this.$store.getters.MODEL_PRODUCTS_NEW.length<5) {
      document.getElementById('newProduct').style.display="none";
    }

    if(this.$store.getters.HEIGHT_MODELS.length<5) {
      document.getElementById('sameHeight').style.display="none";
    }

    if(!this.$store.getters.STYLE_MODELS) {
      document.getElementById('sameStyle').style.display="none";
    }

    this.$store.dispatch("setHeaderTitle", "상품상세");
    this.$store.dispatch("hideLogo");

    if(localStorage.getItem('routerStack') == '' ||
              localStorage.getItem('routerStack') == null  ){}
    else if(localStorage.getItem('routerStack').includes('model')) {
      this.$store.dispatch("setCurrentRoute", '/model');
    }
    else if(localStorage.getItem('routerStack').includes('collection')) {
      this.$store.dispatch("setCurrentRoute", '/collection');
    }
    else if(localStorage.getItem('routerStack').includes('exhibition')) {
      this.$store.dispatch("setCurrentRoute", '/exhibition');
    }
  },

  methods: {

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

    toModelPage(model) {
      
      this.$amplitude
        .getInstance()
        .logEvent("click model-profile", { modelId: model.modelId  , clickedModelPage: "상품상세"});


      this.$store.dispatch("setModel", model);
      localStorage.setItem("model", JSON.stringify(model));
      localStorage.setItem('fromAnotherRouter','1');

      const recentModelId = JSON.parse(localStorage.recentModelId);
      recentModelId.push(model);
      localStorage.recentModelId = JSON.stringify(recentModelId);

      
      this.$router.push("/model/" + model.modelId);
    },

    toDetailPage(linkUrl) {
      
      this.$amplitude.getInstance().logEvent("go-shop");

      const itemId = this.product.itemId.toString();
      const heart = this.saved ? "1" : "0";
      console.log(heart);
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
      // for ios(old version)
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

      console.log("응페이지로갔어~");
        window.open(linkUrl);
    }
  },


  beforeRouteLeave(to, from, next) {
    localStorage.removeItem('routerStack');
    localStorage.removeItem('modelId');
    if (to.name=="collection" || to.name=="collection1") {
    }
    else {
      localStorage.removeItem('cat1');
    localStorage.removeItem('cat2');
    localStorage.removeItem('productCategory');
    }
    this.$store.dispatch("showLogo");
    // this.$store.dispatch("startLoading");
    next();
  }
  };
</script>

<style scoped lang="scss">
.product-main {
  display: flex;
  padding: 9% 5%;

  &-image-container {
    padding : 0 5px 0 0;
    width:40%;
    position: relative;
  }
    &-image {
    border-radius: 6px;
    width: 100%;
    height: 200px;
    object-fit: cover;
    z-index: 1;

    &__skeleton {
            z-index: 2;
            width:100%;
            height: 210px;
            left:-3px;
            top:-5px;
            border-radius: 6px;
            position:absolute;
            animation-name : fade_mainImage;
            animation-duration: 0.2s;
            animation-delay: 1s;
            animation-fill-mode: both;
            @keyframes fade_mainImage {
              0% {
                background-color: #ececec;
              }
              100% {      
                background-color: transparent;
              }
            }
    }
  }
  &-profile {
    width : 60%;
    padding-left : 3%;
  }
}

.model-profile{
  display: flex;
  position: relative;
  &__profile-image {
    width: 47px;
    height: 47px;
    border-radius: 50%;
    object-fit: cover;
    z-index:1;

     &__skeleton {
            z-index: 2;
            width: 52px;
            height: 52px;
            left:-3px;
            top:-3px;
            border-radius: 50%;
            position:absolute;
            animation-name : fade_mainImage;
            animation-duration: 0.2s;
            animation-delay: 1s;
            animation-fill-mode: both;
            @keyframes fade_mainImage {
              0% {
                background-color: #ececec;
              }
              100% {      
                background-color: transparent;
              }
            }
    }
  }
    &__name {
    margin-right: 10px;
    margin-bottom: 5px;
    font-size: 1em;
    font-weight: 700;

    animation-name : fade_name;
  animation-duration: 0.2s;
  animation-delay: 1s;
  animation-fill-mode: both;
  @keyframes fade_name {
    0% {
      background-color : #ececec;
      color:#ececec;
    }
    100% {      
      background-color : transparent;
      color:#000000;
    }
  }
  }
  &__height {
    margin-right: 10px;
    font-size: 0.8em;
    font-weight: bold;
    animation-name : fade_height;
    animation-duration: 0.2s;
    animation-delay: 1s;
    animation-fill-mode: both;
    @keyframes fade_height {
      0% {
        background-color : #ececec;
        color:#ececec;
      }
      100% {      
        background-color : transparent;
        color:#000000;
      }
    }
  }
  &__shop {
    margin-right: 10px;
    color: $grey;
    font-size: 0.8em;
    font-weight: 500;

    animation-name : fade_shop;
    animation-duration: 0.2s;
    animation-delay: 1s;
    animation-fill-mode: both;
    @keyframes fade_shop {
      0% {
        background-color : #ececec;
        color:#ececec;
      }
      100% {      
        background-color : transparent;
        color:#888888;
      }
  }
  }

  &__info{
    margin: 2% 0 0 7%;
    &__up {
      margin-top : 1%;
  }
    &__down {
      display: flex;
      margin : 5% 0 0 1%;
  }
  }
}

.product-profile {
  padding: 17px 0px 26px 2%;
  display: grid;

  &__name {
    font-size: 0.9em;
    animation-name : fade_height;
    animation-duration: 0.2s;
    animation-delay: 1s;
    animation-fill-mode: both;
    @keyframes fade_height {
      0% {
        background-color : #ececec;
        color:#ececec;
      }
      100% {      
        background-color : transparent;
        color:#000000;
      }
    }
  }
  &__price {
    margin-top: 1%;
    font-size: 1.3em;
    font-weight: 700;
    animation-name : fade_height;
    animation-duration: 0.2s;
    animation-delay: 1s;
    animation-fill-mode: both;
    @keyframes fade_height {
      0% {
        background-color : #ececec;
        color:#ececec;
      }
      100% {      
        background-color : transparent;
        color:#000000;
      }
    }
  }
}

.product-link {
  position : absolute;
  top : 192px;
  width: 55%;
  &__skeleton {
            z-index: 2;
            width: 95%;
            height:115%;
            left:-5px;
            top:-1px;
            border-radius: 3px;
            position:absolute;
            animation-name : fade_mainImage;
            animation-duration: 0.2s;
            animation-delay: 1s;
            animation-fill-mode: both;
            @keyframes fade_mainImage {
              0% {
                background-color: #ececec;
              }
              100% {      
                background-color: transparent;
              }
            }
    }
}

@media all and (min-width : 400px){
.product-link {
  position : absolute;
  top : 195px;
  width: 55%;
  &__skeleton {
            z-index: 2;
            width: 95%;
            height:115%;
            left:-5px;
            top:-1px;
            border-radius: 3px;
            position:absolute;
            animation-name : fade_mainImage;
            animation-duration: 0.2s;
            animation-delay: 1s;
            animation-fill-mode: both;
            @keyframes fade_mainImage {
              0% {
                background-color: #ececec;
              }
              100% {      
                background-color: transparent;
              }
            }
    }
}
}

@media all and (max-width : 330px){
.product-link {
  position : absolute;
  top : 187px;
  width: 55%;
  &__skeleton {
            z-index: 2;
            width: 95%;
            height:115%;
            left:-5px;
            top:-1px;
            border-radius: 3px;
            position:absolute;
            animation-name : fade_mainImage;
            animation-duration: 0.2s;
            animation-delay: 1s;
            animation-fill-mode: both;
            @keyframes fade_mainImage {
              0% {
                background-color: #ececec;
              }
              100% {      
                background-color: transparent;
              }
            }
    }
}
}

@media all and (min-width : 500px){
.product-link {
  position : absolute;
  top : 203px;
  width: 55%;
  &__skeleton {
            z-index: 2;
            width: 95%;
            height:115%;
            left:-5px;
            top:-1px;
            border-radius: 3px;
            position:absolute;
            animation-name : fade_mainImage;
            animation-duration: 0.2s;
            animation-delay: 1s;
            animation-fill-mode: both;
            @keyframes fade_mainImage {
              0% {
                background-color: #ececec;
              }
              100% {      
                background-color: transparent;
              }
            }
    }
}
}

.button-link {
    z-index:1;
    padding: 12px 5px;
    border-radius: 3px;
    width: 90%;
    background-image: linear-gradient(to right,  #f45c43,#eb3346);
    color: $white;
    font-size: 0.9em;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
}

.content-main {
  border-top : 10px solid #ececec;
  padding:0 0 3% 5%;
  background-color : #ffffff;
}

.content-title{
  padding: 25px 0px 10px 0;
  position:relative;

  &__title {
    font-size: 1em;
    font-weight: 700;
    margin-left: 5px;
    animation-name : fade_height;
    animation-duration: 0.2s;
    animation-delay: 1s;
    animation-fill-mode: both;
    @keyframes fade_height {
      0% {
        background-color : #ececec;
        color:#ececec;
      }
      100% {      
        background-color : transparent;
        color:#000000;
      }
    }
  }
    &__profile-image {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
    z-index: 1;

         &__skeleton {
            z-index: 2;
            width: 35px;
            height: 35px;
            left:-3px;
            top:22px;
            border-radius: 50%;
            position:absolute;
            animation-name : fade_mainImage;
            animation-duration: 0.2s;
            animation-delay: 1s;
            animation-fill-mode: both;
            @keyframes fade_mainImage {
              0% {
                background-color: #ececec;
              }
              100% {      
                background-color: transparent;
              }
            }
    }
  }
}

.another-main {
  border-top : 10px solid #ececec;
  padding:0 0 7% 5%;

  &-style{
      border-top : 10px solid #ececec;
      padding:0 0 23% 5%;
  }
}

.another-title{
  padding: 25px 0px 10px 0;

  &__title {
    font-size: 1em;
    font-weight: 700;
    animation-name : fade_height;
    animation-duration: 0.2s;
    animation-delay: 1s;
    animation-fill-mode: both;
    @keyframes fade_height {
      0% {
        background-color : #ececec;
        color:#ececec;
      }
      100% {      
        background-color : transparent;
        color:#000000;
      }
    }
  }
}

.masonry-container {
  margin: 0 0 0 -8%;
  padding: 10px 0 3% 5.6%;
  background-color : #ffffff;
  width: 110%;
  display: flex;
  justify-content: space-between;
  overflow-x: scroll;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    &::-webkit-scrollbar {
      display : none;
      width:0px;
    }
}

.masonry-item {
  margin: 0 0 16px 3.5%;
  border: 0;
  font-size: 0.8em;
  width: 45%;
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
  transition: opacity 0.2s ease, box-shadow 0.2s ease;
  border-radius:6px;

  &:hover {
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  }
}

.app-product {

  &__image {
    width : 150px;
    height : 200px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    object-fit: contain;
    margin : 0 0 0 -5%;

    &-background {
      width : 100%;
      overflow:hidden;
      height:160px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
  }
}

@media all and (max-width : 400px){
 .app-product__image {
    width : 150px;
    height : 200px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    object-fit: contain;
 }
}

.another-card-container{
  display : flex;
  overflow-x:scroll;
  margin: 0 0 0 -8%;
  padding : 0 0 0 8%;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display : none;
    width:0px;
  }
}

.sameHeight-card{
  height: auto;
  width : 40%;
  margin : 0 7% 0 0;
}
.sameHeight-card{

  &__background {
    width:100%;
    border-radius: 7px;
    margin : 5% 0;
    overflow: hidden;
  }

  &__background-image{
    width:220px;
    object-fit: contain;
    margin-left:-30%;
  }

  &__profile {
    display:flex;
    margin : 8% 0 0 0;

      &-image{
          width:30%;
          height:30%;
          border-radius: 50%;
        }

     &-right{
       display: grid;
       margin:0 0 0 7%;
     }
     
    &-name {
      font-size:0.8em;
      font-weight: 500;
      margin:6% 0 0 0;
      padding : 0 0 0 3%;
    }

    &-style {
      border-radius: 10%;
      padding: 1px 10px;
      background-color: #ececec;
      color: #666666;
      font-size: 0.4em;
      font-weight: 700;
    }

    &-height {
      font-size:1.1em;
      font-weight: 700;
    }

  }
}
</style>