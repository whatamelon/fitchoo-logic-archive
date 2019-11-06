<template>
<transition>
  <main class="model-container">

    <HeightEditModal :title="'내 키를 입력해주세요.'" />

    <AppHeightDivider
      :my-height=" '내 키의 모델' "
      :low-height=" '158cm 이하' "
      :mean-height=" '159~167cm' "
      :high-height=" '168cm 이상' "
      @switched="onSwitchHeight"
    ></AppHeightDivider>
    
        <!-- <div class="carousel__skeleton"></div> -->
        <!-- <AppCarousel></AppCarousel> -->
        <ModelBanner></ModelBanner>


      <div class="model-divider">
        <ModelMeanHeight></ModelMeanHeight>
      </div>


  </main>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AppSpinner from "@/components/App/AppSpinner";
import InputModal from "@/components/Modal/InputModal";
import AppCarousel from "@/components/App/AppCarousel";
import AppSpinner2 from "@/components/App/AppSpinner2";
import AppHeightDivider from "@/components/App/AppHeightDivider";
import ModelMeanHeight from "@/components/Model/ModelMeanHeight";
import ModelBanner from "@/components/Model/ModelBanner";

export default {
  components: {
    AppSpinner,
    AppCarousel,
    AppSpinner2,
    HeightEditModal: InputModal,
    AppHeightDivider,
    ModelMeanHeight,
    ModelBanner
  },

  transition ( to, from  ) {
    if (localStorage.getItem("previousPage")=="model-id" ||
        localStorage.getItem("previousPage")=="exhibition-id" ) {
      return 'slideLeft'
    }
    else {
      return 'nothing'
    }
  },

  data() {
    return {
      random_model : this.$store.getters.RANDOM_MODEL,
      height: localStorage.height,
      isMyHeight:false,
      isLowHeight:false,
      isMeanHeight:true,
      isHighHeight:false,
      models_mean_height: this.$store.getters.MODELS_MEAN_HEIGHT
    };
  },

  computed: {
    ...mapGetters([
      "IS_LOGGED_IN",
      "IS_LOADING",
      "USER_HEIGHT",
      "MODELS_MEAN_HEIGHT",,
    ]),

    hasHeight() {
      return this.$store.getters.USER_HEIGHT ? true : false;
    }
  },

  async asyncData({ store, next }) {

    const params = {
      offset : 0,
      limit : 5
    }


        if (localStorage.getItem("previousPage")=="model-id") {

    }
    else {

        await store.dispatch("getModelsMeanHeight" , params);


    }

    store.dispatch("setCurrentRoute", "/model");
    if (!localStorage.getItem("height")) {
      next("/index");
    }
    
    return {
      products: store.getters.EXHIBITION_PRODUCTS,
      models_mean_height : store.getters.MODELS_MEAN_HEIGHT
    };
  },

  created() {

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

    localStorage.removeItem("product");
    localStorage.removeItem("backButton");

    this.$store.dispatch("setCurrentRoute", this.$route.path);
    this.$amplitude.getInstance().logEvent("page view model-list");

    window.addEventListener("touchmove", this.preventElasticScroll);

    setTimeout(() => {
      this.$store.dispatch("endLoading");
    }, 100);
  },

 mounted() {
    const lastTime = localStorage.getItem("lastTime");
    const now = new Date().getTime();
    this.timeChecker(lastTime, now);
  },

  methods: {

    onSwitchHeight(height) {
      this.isMyHeight = height === "myHeight" ? true : false;
      this.isLowHeight = height === "lowHeight" ? true : false;
      this.isMeanHeight = height === "meanHeight" ? true : false;
      this.isHighHeight = height === "highHeight" ? true : false;
      console.log(height);

      if (height == "myHeight") {
        this.isMyHeight == true;
        this.isLowHeight == false;
        this.isMeanHeight == false;
        this.isHighHeight == false;
        this.$router.push("/model");
      console.log("내키");
      }
      if (height == "lowHeight") {
        this.isLowHeight == true;
        this.isMyHeight == false;
        this.isMeanHeight == false;
        this.isHighHeight == false;
        this.$router.push("/modelLow");
      console.log("작은키");
      }
      if (height == "highHeight") {
        this.isHighHeight == true;
        this.isMyHeight == false;
        this.isLowHeight == false;
        this.isMeanHeight == false;
        this.$router.push("/modelHigh");
      console.log("큰키");
      }
    },

    preventElasticScroll () {
    
      document.addEventListener(
      'touchmove',
      function(e) {
      e.preventDefault();
      },false);},


    goToExhibition() {
    this.$amplitude.getInstance().logEvent("click middle-banner");

    this.$router.push("/exhibition");
    },

     goToExhibition1() {
      this.$amplitude.getInstance().logEvent("click middle-banner");

    this.$router.push("/exhibition/00re23");
    },

     goToExhibition2() {
      this.$amplitude.getInstance().logEvent("click middle-banner");

    this.$router.push("/exhibition/15re22");
    },

    goToCollection() {
      this.$amplitude.getInstance().logEvent("click middle-banner");

      this.$router.push("/collection");
    },

     goToLike() {
      this.$amplitude.getInstance().logEvent("click middle-banner");
      localStorage.getItem("random_model");

      this.$store.dispatch("setModel", this.$store.getters.RANDOM_MODEL);
      localStorage.setItem("model", JSON.stringify(this.$store.getters.RANDOM_MODEL));
      
      this.$router.push("/model/" + this.$store.getters.RANDOM_MODEL);
     },

     goToLike1() {
        this.$amplitude.getInstance().logEvent("click middle-banner");
        this.$store.dispatch("setModel", 182);
        localStorage.setItem("model", JSON.stringify( {"modelId":"182","name":"제인","likePoint":"51","modelExp":"꾸안꾸 스타일의 제인언니, 모어제인!","modelIntro":"\"저는 골반이 없고 종아리가 있는 편이라, <br/>통바지핏의 바지를 자주 연출해줍니다 :)\"","imgFaceFile":"/models/모어제인_small.jpg","imgTitleFile":"/models/모어제인_cover.jpg","height":"158","topValue":"55","bottomValue":"26","footValue":"230","shoulderCode":"s2","pelvisCode":"p3","uploadTime":"2019-09-30 19:52:55.0","isNew":"false","orderNum":"1075","styleList":["20대","모던시크","심플베이직","유니크"],"imgList":[{"imgFile":"/models/182/182_1.jpg","priority":"1"},{"imgFile":"/models/182/182_2.jpg","priority":"2"},{"imgFile":"/models/182/182_3.jpg","priority":"3"},{"imgFile":"/models/182/182_10.jpg","priority":"4"},{"imgFile":"/models/182/182_9.jpg","priority":"4"},{"imgFile":"/models/182/182_8.jpg","priority":"4"},{"imgFile":"/models/182/182_7.jpg","priority":"4"},{"imgFile":"/models/182/182_6.jpg","priority":"4"},{"imgFile":"/models/182/182_5.jpg","priority":"4"},{"imgFile":"/models/182/182_4.jpg","priority":"4"}],"shopList":[{"shopId":"129","name":"모어제인","linkUrl":"https://smartstore.naver.com/morejane"}]}  ) );
        
        this.$router.push("/model/182");
     },

     goToLike2() {
        this.$amplitude.getInstance().logEvent("click middle-banner");
      this.$store.dispatch("setModel", 190);
      localStorage.setItem("model", JSON.stringify( {"modelId":"190","name":"백민정","likePoint":"3","modelExp":"모델 민정은 심플하게. 분위기있게.","modelIntro":"\"저는 다리를 길어보이게하는 하이웨스트 바지에 <br/>다양한 상의를 코디해 입는 걸 좋아한답니다!\"","imgFaceFile":"/models/charmingup_small.jpg","imgTitleFile":"/models/charmingup_cover.jpg","height":"156","topValue":"44","bottomValue":"26","footValue":"225","shoulderCode":"s2","pelvisCode":"p3","uploadTime":"2019-10-10 16:19:41.0","isNew":"true","orderNum":"5","styleList":["20대","러블리","로맨틱","심플베이직","캠퍼스룩"],"imgList":[{"imgFile":"/models/190/190_1.jpg","priority":"1"},{"imgFile":"/models/190/190_2.jpg","priority":"2"},{"imgFile":"/models/190/190_3.jpg","priority":"3"},{"imgFile":"/models/190/190_10.jpg","priority":"4"},{"imgFile":"/models/190/190_9.jpg","priority":"4"},{"imgFile":"/models/190/190_8.jpg","priority":"4"},{"imgFile":"/models/190/190_7.jpg","priority":"4"},{"imgFile":"/models/190/190_6.jpg","priority":"4"},{"imgFile":"/models/190/190_5.jpg","priority":"4"},{"imgFile":"/models/190/190_4.jpg","priority":"4"}],"shopList":[{"shopId":"136","name":"챠밍업","linkUrl":"https://www.charmingup.co.kr"}]}  ) );
      
      this.$router.push("/model/190");
     },

     goToLike3() {
        this.$amplitude.getInstance().logEvent("click middle-banner");
      this.$store.dispatch("setModel", 188);
      localStorage.setItem("model", JSON.stringify( {"modelId":"188","name":"소연","likePoint":"2","modelExp":"캐주얼부터 베이직한 데일리룩까지! 색감부자 소연","modelIntro":"\"상체에 비해 하체가 있는 편이라서, <br/>하체 커버 코디를 좋아합니다!\"","imgFaceFile":"/models/foryourday_small.jpg","imgTitleFile":"/models/foryourday_cover.jpg","height":"159","topValue":"44","bottomValue":"26","footValue":"230","shoulderCode":"s3","pelvisCode":"p1","uploadTime":"2019-10-10 16:19:41.0","isNew":"true","orderNum":"3","styleList":["20대","30대","러블리","심플베이직","캠퍼스룩"],"imgList":[{"imgFile":"/models/188/188_1.jpg","priority":"1"},{"imgFile":"/models/188/188_2.jpg","priority":"2"},{"imgFile":"/models/188/188_3.jpg","priority":"3"},{"imgFile":"/models/188/188_10.jpg","priority":"4"},{"imgFile":"/models/188/188_9.jpg","priority":"4"},{"imgFile":"/models/188/188_8.jpg","priority":"4"},{"imgFile":"/models/188/188_7.jpg","priority":"4"},{"imgFile":"/models/188/188_6.jpg","priority":"4"},{"imgFile":"/models/188/188_5.jpg","priority":"4"},{"imgFile":"/models/188/188_4.jpg","priority":"4"}],"shopList":[{"shopId":"134","name":"포유어데이","linkUrl":"https://smartstore.naver.com/foryourday/"}]}  ) );
      
      this.$router.push("/model/188");
     },

    timeChecker(lastTime, currentTime) {
      const oneDay = 86400000;
      if (lastTime - currentTime > oneDay) {
        localStorage.removeItem("lastTime");
      }
    },

    parseTimestamp(date) {
      date = date.substring(0, 10);
      const splitDate = date.split("-");
      const year = parseInt(splitDate[0]);
      const month = parseInt(splitDate[1]);
      const day = parseInt(splitDate[2]);
      const timestampParsedDate = new Date(year, month - 1, day).getTime();
      return timestampParsedDate;
    }
  },

  async beforeRouteLeave(to, from, next) {
    await this.$store.dispatch("startLoading");
    // this.$store.dispatch("resetModels");
    localStorage.removeItem("random_model");
    localStorage.removeItem("clickBanner");
    localStorage.setItem("routerStack",this.$route.path);
    localStorage.setItem("whereitis",window.pageYOffset);
    if (process.browser) {
      window.removeEventListener("scroll", this.hello);
      window.removeEventListener("wheel", this.hello);
      window.removeEventListener("scroll", this.handleScrollMean);
    }
    next();
  }
};
</script>

<style lang="scss" scoped>

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

.model-container {
  margin: 0;
  height: 100%;
  min-height: 100vh;
  background-color: $lighter-grey;
  padding-bottom: 20%;
  width: 100%;
  max-width: 500px;
  overflow-y: hidden;
}

.sorry-image {
  width: 200px;
}

.space {
  height: 20px;
}

.height {
  &__title{
  margin: 30px 0px 15px 0px;
  padding: 0;
  font-weight: 600;
  font-size: 2.0em;
  letter-spacing: -0.05em;
  text-align: center;
  }

&__subtitle {
    font-weight: 500;
    margin: 0 0 30px 0;
}
}

.model-divider {
  width: 100%;
  max-width: 500px;
  margin-top: 3%;
  margin-bottom: 0px;

  &__flex {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 0 1em;
    margin: 50px 0 ;
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

  &__info {
    color: $grey;
    font-size: 0.8em;
    font-weight: 600;
  }
}

</style>
