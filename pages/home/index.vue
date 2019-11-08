<template>
<transition>

    <main class="home-container">
        <div class="carousel__skeleton"></div>
        <AppCarousel></AppCarousel>

        <div class="home-title-container">
          <span class="home-title-1">내 키의 모델이 입은</span>
          <span class="home-title-2">상품을 쇼핑해보세요.</span>
          <span class="home-title-3">나와 비슷한 키의 모델이 입은 상품을 모아왔어요.</span>
        </div>
        <div class="home-content-container1">



            <div class="home-content-title">
                <div class="home-content-title__title">
                    <span class="home-content-title__title__height">{{height}}cm.</span>
                    <span class="hashtag">#</span>
                    <span class="home-content-title__title__category">예쁘게 맞는 코트</span>
                </div>
                <div class="home-content-title__sub">
                    <span class="home-content-title__sub__explain">비슷한 키의 모델이 입은 코트만 모아왔어요.</span>
                </div>
            </div>

        <div v-if="HOME_PRODUCTS.length == 0" class="sorry-container">
            <img
              class="sorry__image"
              src="/sorrybutIloveyou.png"
              alt="/sorrybutIloveyou.png"
            />
            <h4 class="sorry__message">{{ sorryMessage }}</h4>
        </div>

        <div v-else>
            <div class="home-content-contents">
                <HomeProduct
                  v-for="product in HOME_PRODUCTS"
                  :key="product.itemId"
                  :product="product"
                  class="masonry-product">
              </HomeProduct>
            </div>

            <div class="home-content-button" 
                    id="homeButton1"
                    @click="moreProduct1">더보기</div>
          </div>
        </div>
        
        <div class="home-content-container">

            <div class="home-content-title">
                <div class="home-content-title__title">
                    <span class="home-content-title__title__height">{{height}}cm.</span>
                    <span class="hashtag">#</span>
                    <span class="home-content-title__title__category">수선이 필요 없는 바지</span>
                </div>
                <div class="home-content-title__sub">
                    <span class="home-content-title__sub__explain">비슷한 키의 모델이 입은 바지만 모아왔어요.</span>
                </div>
            </div>

          <div v-if="HOME_PRODUCTS2.length == 0" class="sorry-container">
            <img
              class="sorry__image"
              src="/sorrybutIloveyou.png"
              alt="/sorrybutIloveyou.png"
            />
            <h4 class="sorry__message">{{ sorryMessage }}</h4>
        </div>

        <div v-else>

            <div class="home-content-contents">
                <HomeProduct2
                  v-for="product in HOME_PRODUCTS2"
                  :key="product.itemId"
                  :product="product"
                  class="masonry-product">
              </HomeProduct2>
            </div>

            <div class="home-content-button"
                    id="homeButton2"
                    @click="moreProduct2">더보기</div>

          </div>
        </div>


        <div class="home-content-container">

            <div class="home-content-title">
                <div class="home-content-title__title">
                    <span class="home-content-title__title__height">{{height}}cm.</span>
                    <span class="hashtag">#</span>
                    <span class="home-content-title__title__category">딱 맞는 길이감의 원피스</span>
                </div>
                <div class="home-content-title__sub">
                    <span class="home-content-title__sub__explain">비슷한 키의 모델이 입은 원피스만 모아왔어요.</span>
                </div>
            </div>

        <div v-if="HOME_PRODUCTS3.length == 0" class="sorry-container">
            <img
              class="sorry__image"
              src="/sorrybutIloveyou.png"
              alt="/sorrybutIloveyou.png"
            />
            <h4 class="sorry__message">{{ sorryMessage }}</h4>
        </div>

        <div v-else>

            <div class="home-content-contents">
                <HomeProduct3
                  v-for="product in HOME_PRODUCTS3"
                  :key="product.itemId"
                  :product="product"
                  class="masonry-product">
              </HomeProduct3>
            </div>

            <div class="home-content-button"
                    id="homeButton3"
                    @click="moreProduct3">더보기</div>
          </div>
        </div>


         <div class="home-title-container">
          <span class="home-title-11" id="showModel">내 스타일의</span>
          <span class="home-title-22" id="showModel2">모델을 찾아보세요.</span>
          <span class="home-title-33" id="showModel3">키가 3cm 차이나는 비슷한 키의 모델을 모아왔어요.</span>
        </div>

        <div class="home-content-container2">

        <div v-if="MODELS.length == 0" class="sorry-container">
            <img
              class="sorry__image"
              src="/sorrybutIloveyou.png"
              alt="/sorrybutIloveyou.png"
            />
            <h4 class="sorry__message">{{ sorryMessageModel }}</h4>
        </div>

        <div v-else>

            <div class="home-content-contents">
                <HomeMyModel></HomeMyModel>
            </div>

        </div>

            <div class="home-content-button"
                    id="modelButton"
                    @click="moreMyModel">더보기</div>
            

        </div>

        <HomeFooter></HomeFooter>


    </main>
</transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AppCarousel from "@/components/App/AppCarousel";
import HomeProduct from "@/components/Home/HomeProduct";
import HomeProduct2 from "@/components/Home/HomeProduct2";
import HomeProduct3 from "@/components/Home/HomeProduct3";
import HomeMyModel from "@/components/Home/HomeMyModel";
import HomeFooter from "@/components/Home/HomeFooter";
import AppSpinner from "@/components/App/AppSpinner";

export default {
    components: {
        AppCarousel,
        HomeProduct,
        HomeProduct2,
        HomeProduct3,
        HomeMyModel,
        HomeFooter,
        AppSpinner
    },

  transition ( to, from  ) {
    if (localStorage.getItem("previousPage")=="model-id" ||
        localStorage.getItem("previousPage")=="product-id" ) {
      return 'slideLeft'
    }
    else {
      return 'nothing'
    }
  },

  data() {
    return {
      height: localStorage.height,
      models: this.$store.getters.MODELS,
      moreHomeProducts1: true,
      moreHomeProducts2: true,
      moreHomeProducts3: true,
      isMoreModel:true,
      sorryMessage:
        "입력하신 키의 모델 상품이 아직 없어요. ㅠㅠ \n 조금만 기다려주세요! 폭풍업뎃중!",
      sorryMessageModel :
        "입력하신 키의 모델이 아직 없어요. ㅠㅠ \n 조금만 기다려주세요! 폭풍업뎃중!"
    };
  },

   computed: {
    ...mapGetters([
      "IS_LOADING",
      "HOME_PRODUCTS",
      "HOME_PRODUCTS2",
      "HOME_PRODUCTS3",
      "FIRST_CATEGORY",
      "SECOND_CATEGORY",
      "MODELS",
    "USER_EMAIL",
    ]),

    hasMoreData() {
      return this.$store.getters.HAS_MORE_DATA;
    }
    },

    
  async asyncData({ store  }) {

        store.dispatch("setCurrentRoute", "/home");

    const params1 = {
      offset : 0,
      limit : 5
    }

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
      limit: 10,
      sortOrder:"dh"
    };

    const params2 = {
      offset: 0,
      limit: 12,
      sortOrder:"dh"
    };

    const params3 = {
      offset: 0,
      limit: 12,
      sortOrder:"dh"
    };

    const height = store.getters.USER_HEIGHT;

      function heightRangeCalculator(range = 0, height = 0) {
      const min = parseInt(height) - range;
      const max = parseInt(height) + range;
      const heightRange = min + "r" + max;

      return heightRange;

    }

    
    if (localStorage.getItem("previousPage")=="model-id" ||
        localStorage.getItem("previousPage")=="product-id") {
    }
    else {
        await store.dispatch("getModels", params1);
        
    
    store.dispatch("setHeightRange", heightRangeCalculator(3, height));
    store.dispatch("setTemporaryHeightRange", heightRangeCalculator(3, height));
    store.dispatch("getHomeProducts",params);
    
    store.dispatch("getHomeProducts2",params2);
    
    store.dispatch("getHomeProducts3",params3);
      // store.dispatch("setUserInfo");
    
    }

    return {
      models : store.getters.MODELS
    };
  },

created() {

  // this.$amplitudeClient.setUserId(this.$store.getters.USER_EMAIL);
  console.log(this.$store.getters.USER_EMAIL)


        const userEmail = {
          userEmail: this.$store.getters.USER_EMAIL
        };
        this.$amplitude.getInstance().setUserId(userEmail);
        console.log(userEmail)

  
    this.$amplitude.getInstance().logEvent("page view home");

    window.addEventListener("scroll", this.findSecond);

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
    
},

mounted() {
  

  if(localStorage.getItem("homeProduct1All")=="1") {
    this.moreHomeProducts1 = false;
    var button1 =  document.getElementById("homeButton1");
    button1.innerHTML ="전체보기"
    localStorage.removeItem("homeProduct1All");
  }
  
  if(localStorage.getItem("homeProduct2All")=="1") {
    this.moreHomeProducts2 = false;
    var button2 =  document.getElementById("homeButton2");
    button2.innerHTML ="전체보기"
    localStorage.removeItem("homeProduct2All");
  }
  
  if(localStorage.getItem("homeProduct3All")=="1") {
    this.moreHomeProducts3 = false;
    var button3 =  document.getElementById("homeButton3");
    button3.innerHTML ="전체보기"
    localStorage.removeItem("homeProduct3All");
  }
  
  if(localStorage.getItem("modelAll")=="1") {
    this.isMoreModel = false;
    var modelButton =  document.getElementById("modelButton");
    modelButton.innerHTML ="전체보기"
    localStorage.removeItem("modelAll");
  }
  
    var container =  document.getElementsByClassName("model-card-container");
    for(var i=0; i< container.length; i++) {
      container[i].style.borderTop="0px solid";
    console.log("없앴다!");
    }
},

methods:{
  async moreProduct1() {
      if (
        this.moreHomeProducts1
      ) {
        await this.getMoreProducts1();
      }
      else {
        
        await this.$store.dispatch("setActiveFirstCategory", "001");
        localStorage.setItem("secCat", "coat");
        this.$router.push("/collection");
      }
    },

  getMoreProducts1() {
    
    var button1 =  document.getElementById("homeButton1");
    var homeProduct1 =  document.getElementsByClassName("home-product");
      return new Promise(async (resolve, reject) => {
        try {
          await this.$store.dispatch(
            "setOffsetHomeProducts",
            this.$store.getters.OFFSET_HOME_PRODUCTS + 10
          );
          console.log(this.$store.getters.OFFSET_HOME_PRODUCTS);
            console.log(response);
          const response = await this.$store.dispatch("addHomeProducts");
          if (homeProduct1.length <= 40 &&
              homeProduct1.length > 30) {
            
        button1.innerHTML ="전체보기"
            this.moreHomeProducts1 = false;
            localStorage.setItem("homeProduct1All","1");
          }
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    },

    
  async moreProduct2() {
      if (
        this.moreHomeProducts2
      ) {
        await this.getMoreProducts2();
      }
      else {
        
        await this.$store.dispatch("setActiveFirstCategory", "003");
        localStorage.setItem("secCat", "pants");
        this.$router.push("/collection");
      }
    },

  getMoreProducts2() {
    
    var button2 =  document.getElementById("homeButton2");
    var homeProduct2 =  document.getElementsByClassName("home2-product");
      return new Promise(async (resolve, reject) => {
        try {
          await this.$store.dispatch(
            "setOffsetHomeProducts2",
            this.$store.getters.OFFSET_HOME_PRODUCTS2 + 12
          );
          console.log(this.$store.getters.OFFSET_HOME_PRODUCTS2);
            console.log(response);
          const response = await this.$store.dispatch("addHomeProducts2");
          if (homeProduct2.length == 48 &&
              homeProduct2.length > 36) {
            
        button2.innerHTML ="전체보기"
            this.moreHomeProducts2 = false;
            localStorage.setItem("homeProduct2All","1");
          }
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    },

    
  async moreProduct3() {
      if (
        this.moreHomeProducts3
      ) {
        await this.getMoreProducts3();
      }
      else {
        
        await this.$store.dispatch("setActiveFirstCategory", "005");
        localStorage.setItem("secCat", "onePiece");
        this.$router.push("/collection");
      }
    },

  getMoreProducts3() {
    
    var button3 =  document.getElementById("homeButton3");
    var homeProduct3 =  document.getElementsByClassName("home3-product");
      return new Promise(async (resolve, reject) => {
        try {
          await this.$store.dispatch(
            "setOffsetHomeProducts3",
            this.$store.getters.OFFSET_HOME_PRODUCTS3 + 12
          );
          console.log(this.$store.getters.OFFSET_HOME_PRODUCTS3);
            console.log(response);
          const response = await this.$store.dispatch("addHomeProducts3");
          if (homeProduct3.length == 48 &&
              homeProduct3.length > 36) {
            
        button3.innerHTML ="전체보기"
            this.moreHomeProducts3 = false;
            localStorage.setItem("homeProduct3All","1");
          }
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    },
  
  async moreMyModel() {
    if (
        this.isMoreModel
      ) {
        await this.getMoreMyModel();
      }
      else {
        this.$router.push("/model");
      }
    },

  getMoreMyModel() {
    
    var modelButton =  document.getElementById("modelButton");
    var modelCard =  document.getElementsByClassName("model-card-container");
     return new Promise(async (resolve, reject) => {
        try {
            await this.$store.dispatch(
              "setOffsetModel",
              this.$store.getters.OFFSET_MODEL + 5
            );
            const response = await this.$store.dispatch("addModels");
            const modelLength = response.result.modelList;
          if (modelLength.length == 0 ||
              modelCard.length == 20) {
            
        modelButton.innerHTML ="전체보기"
            this.isMoreModel = false;
            localStorage.setItem("modelAll","1");
          }
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    },

  findSecond() {
      var t = document.getElementById("showModel");
      if ( window.scrollY >= t.offsetTop -600) {
        document.getElementById("showModel").classList.add("fadeIn");
        document.getElementById("showModel2").classList.add("fadeIn");
        document.getElementById("showModel3").classList.add("fadeIn");
        console.log("보였어!");
      }
    },
},

  beforeRouteLeave(to, from, next) {
    localStorage.setItem("routerStack",this.$route.path);

    if(localStorage.getItem("secCat")=="coat") {
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
    
    this.$store.dispatch("setDropdownInactive", false);
    }
    if(localStorage.getItem("secCat")=="pants") {
    this.$store.dispatch("setActiveSecondCategory", [
      {
        code: "000",
        name: "하의"
      },
      {
        code: "001",
        name: "청바지"
      },
      {
        code: "002",
        name: "슬랙스"
      },
      {
        code: "003",
        name: "숏팬츠"
      },
      {
        code: "004",
        name: "레깅스"
      },
      {
        code: "004",
        name: "롱팬츠"
      }
    ]);
    
      this.$store.dispatch("setDropdownInactive", false);
    }
    if(localStorage.getItem("secCat")=="onePiece") {
      this.$store.dispatch("setDropdownInactive", true);
    }
    this.$store.dispatch("resetOffset");
    this.$store.dispatch("resetOffsetHomeProducts");
    this.$store.dispatch("resetOffsetHomeProducts2");
    this.$store.dispatch("resetOffsetHomeProducts3");
    localStorage.setItem("whereitis",window.pageYOffset);
    this.$store.dispatch("setHasMoreData", true);
      window.removeEventListener("scroll", this.findSecond);
    next();
  }
}
</script>

<style lang="scss" scoped>
.home-title{
  &-container{
    display: grid;
    margin: 11% 3% 0 3%;
    width:94%;
    border-bottom: 1px solid #ececec;
    padding-bottom: 4%;
  }

  &-1, &-2{
    font-size:2.1em;
    font-weight: 800;
    letter-spacing: -1.5px;
    line-height: 1.5;
    opacity : 0;
      animation : fadeInUp 1s both;
      @keyframes fadeInUp{
        from {
        transform: translate3d(0,40px,0)
    }
    to {
        transform: translate3d(0,0,0);
        opacity: 1
    }
      }
  }

  &-3{
    font-size: 0.9em;
    font-weight: 600;
    color:#BDBDBD;
    letter-spacing: -1px;
    padding: 4% 0 0 0;
    opacity : 0;
      animation : fadeInUp 1s both;
      @keyframes fadeInUp{
        from {
        transform: translate3d(0,40px,0)
    }
    to {
        transform: translate3d(0,0,0);
        opacity: 1
    }
      }
  }

  
  &-11, &-22{
    font-size:2.1em;
    font-weight: 800;
    letter-spacing: -1.5px;
    line-height: 1.5;
  }

  &-33{
    font-size: 0.9em;
    font-weight: 600;
    color:#BDBDBD;
    letter-spacing: -1px;
    padding: 4% 0 0 0;
  }
}

.fadeIn {

    opacity : 0;
      animation : fadeInUp 1s both;
      @keyframes fadeInUp{
        from {
        transform: translate3d(0,40px,0)
    }
    to {
        transform: translate3d(0,0,0);
        opacity: 1
    }
      }
}

.home-content-button{
    width: 94%;
    height: 35px;
    background-color: #ececec;
    border-radius: 4px;
    margin:0 3%;
    text-align: center;
    line-height: 3;
    font-size: 0.85em;
    font-weight: 800;
    color: #666666;
}

.home-content-button2{
    width: 94%;
    height: 35px;
    background-color: #ececec;
    border-radius: 4px;
    margin:0 3%;
    text-align: center;
    line-height: 3;
    font-size: 0.8em;
    font-weight: 800;
    display:none;
}

.show {
  display:contents;
}

.home-content-contents {
  margin: 0;
  padding: 6% 0 3% 0;
  width: 100%;
  background-color:#ffffff;
}

.masonry-product {
  margin: 0 1% 6% 3%;
  border: 0;
  font-size: 0.8em;
  width: 45%;
  font-size: 0.8em;
  transition: opacity 0.2s ease, box-shadow 0.2s ease;
  display: inline-block;
}

.home-content-title {
  
      padding: 0 2%;
    &__title{
        &__height{
            font-size: 1.6em;
            font-weight: 800;
            letter-spacing: -1px;
        }
        &__category{
            font-size: 1.6em;
            font-weight: 800;
            letter-spacing: -1.5px;
        }
    }

    &__sub{
        padding:0.7% 0 0 0;
        &__explain{
            font-size: 0.9em;
            font-weight: 600;
            letter-spacing: -1px;
            color:#BDBDBD;
        }
    }
}
.home-content-container{
    padding: 9% 1%;
    border-bottom: 10px solid #ececec;
}

.home-content-container1{
    padding: 11% 1%;
    border-bottom: 10px solid #ececec;
}

.home-content-container2{
    padding: 3% 1% 16% 1%;
    border-bottom: 10px solid #ececec;
}

.hashtag{
    color:$primary;
    font-size: 1.5em;
    font-weight: 800;
}

.slider-container{
    height:auto !important;
}

.carousel__skeleton {
      width:100%;
      height:282px;
      position: absolute;
      animation-name : fadeCarousel;
      animation-duration: 0.2s;
      animation-delay: 1s;
      animation-fill-mode: both;
      @keyframes fadeCarousel {
        0% {
          background-color : #ececec;
          z-index: 2;  
        }
        100% {      
          background-color : transparent;
          z-index: 0;  
        }
      }
}

@media all and (min-width : 400px){
    .carousel__skeleton {
      width:100%;
      height:310.5px;
      position: absolute;
      animation-name : fadeCarousel;
      animation-duration: 0.2s;
      animation-delay: 1s;
      animation-fill-mode: both;
      @keyframes fadeCarousel {
        0% {
          background-color : #ececec;
          z-index: 2;  
        }
        100% {      
          background-color : transparent;
          z-index: 0;  
        }
      }
    }
}

@media all and (max-width : 330px){
    .carousel__skeleton {
      width:100%;
      height:240px;
      position: absolute;
      z-index: 2;  
      animation-name : fadeCarousel;
      animation-duration: 0.2s;
      animation-delay: 1s;
      animation-fill-mode: both;
      @keyframes fadeCarousel {
        0% {
          background-color : #ececec;
          z-index: 2;  
        }
        100% {      
          background-color : transparent;
          z-index: 0;  
        }
      }
    }
}

@media all and (min-width : 500px){
    .carousel__skeleton {
      width:100%;
      height:375px;
      position: absolute;
      z-index: 2;  
      animation-name : fadeCarousel;
      animation-duration: 0.2s;
      animation-delay: 1s;
      animation-fill-mode: both;
      @keyframes fadeCarousel {
        0% {
          background-color : #ececec;
          z-index: 2;  
        }
        100% {      
          background-color : transparent;
          z-index: 0;  
        }
      }
    }
}

.home-container {
  margin-bottom: 10%;
  height: 100%;
  min-height: 100vh;
  background-color: #ffffff;
  width: 100%;
  max-width: 500px;
  overflow-y: hidden;
}

.sorry-container {
  padding: 15% 5% 10% 5%;
  color: $grey;
  height: 40vh;
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