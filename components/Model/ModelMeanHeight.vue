<template>
<main>
    <div class="modelHeight" ref="modelHeight" id="modelHeightForCount">
          <div
            id="modelCard"
            v-for="model in MODELS_MEAN_HEIGHT"
            :key="model.modelId"
            class="model-card-container"
          >

          <div v-once>

          <div class="case1"
                  v-if ="Math.floor(Math.random()*3) + 1 == 1"
                  @click="toDetailPage(model)">
              <div class="model-card-title">
                <div class="model-card-title__top">
                <span class="model-height" >{{ model.height }}cm</span>
                   <div class="shaker" v-show="model.height == height">
                    <div class="shaker-body">
                      <span class="shaker-body__text">나와 똑같은 키의 모델</span>
                    </div>
                    <div class="shaker-arrow"></div>
                  </div>
                </div>
                <span class="model-explain">{{ model.modelExp || "모델 설명" }} </span>
              </div>
              <div class="image-container-one">
                <div v-if="model.imgList.length > 0" class="image-container-two">
                  <span v-if="model.isNew == 'true'" class="model__new" id="newModel">new</span>
                  <div class="model-card-main-image-container"></div>
                  <img
                    class="model-card-main-image"
                    :src="IMAGE_URL + model.imgList[0].imgFile"
                    alt="..."
                    loading="lazy"
                  />
                </div>
                <div v-if="model.imgList.length > 0" class="image-container-three">
                  <div class="image-container-four">
                    <div class="model-card-secondary-image-skeleton"></div>
                    <img
                      class="model-card-secondary-image"
                      :src="IMAGE_URL + model.imgList[1].imgFile"
                      loading="lazy"
                    alt="..."
                      />
                  </div>
                  <div class="image-container-five">
                  <div class="model-card-secondary-image-skeleton2"></div>
                      <img
                        class="model-card-secondary-image"
                        :src="IMAGE_URL + model.imgList[2].imgFile"
                        loading="lazy"
                        alt="..."
                      />
                  </div>
                </div>
              </div>
              <div class="model__profile">
                <div class="model__profile-image-container">
                </div>
                <img
                  class="model__profile-image"
                  :src="IMAGE_URL + model.imgFaceFile"
                  loading="lazy"
                  alt="..."
                />
                <div class="model__flex">
                  <div class="model__info">
                    <span class="model__name">{{ model.name }}</span>
                    <span class="model__shop">{{model.shopList[0].name || "쇼핑몰 이름"}}</span>
                  </div>
                  <div class="model__tags">
                    <span
                      v-for="style in model.styleList"
                      :key="style"
                      class="model__tag"
                      >{{ style }}</span>
                  </div>
                </div>
              </div>
            </div>

          <div class="case2"
                  v-else-if ="Math.floor(Math.random()*3) + 1 == 2"
                  @click="toDetailPage(model)">
              <div class="model-card-title">
                <div class="model-card-title__top">
                <span class="model-height" >{{ model.height }}cm</span>
                   <div class="shaker" v-show="model.height == height">
                    <div class="shaker-body">
                      <span class="shaker-body__text">나와 똑같은 키의 모델</span>
                    </div>
                    <div class="shaker-arrow"></div>
                  </div>
                </div>
                <span class="model-explain">{{ model.modelExp || "모델 설명" }}</span>
              </div>
              <div class="image-container-one__case2">
                <div v-if="model.imgList.length > 0" class="image-container-two__case2">
                  <div v-if="model.isNew == 'true'" class="model__new" id="newModel">new</div>
                  <div class="model-card-main-image__case2__skeleton"></div>
                  <img
                    class="model-card-main-image__case2"
                    :src="IMAGE_URL + model.imgList[0].imgFile"
                    alt="..."
                    loading="lazy"
                    />
                </div>
                <div v-if="model.imgList.length > 0" class="image-container-two__case2">
                  <div class="model-card-main-image__case2__skeleton"></div>
                  <img
                    class="model-card-main-image__case2"
                    :src="IMAGE_URL + model.imgList[1].imgFile"
                    alt="..."
                    loading="lazy"
                    />
                </div>
                <div v-if="model.imgList.length > 0" class="image-container-two__case2">
                  <div class="model-card-main-image__case2__skeleton"></div>
                  <img
                    class="model-card-main-image__case2"
                    :src="IMAGE_URL + model.imgList[2].imgFile"
                    alt="..."
                    loading="lazy"
                    />
                </div>
                <div v-if="model.imgList.length > 0" class="image-container-two__case2">
                  <div class="model-card-main-image__case2__skeleton"></div>
                  <img
                    class="model-card-main-image__case2"
                    :src="IMAGE_URL + model.imgList[3].imgFile"
                    alt="..."
                    loading="lazy"
                    />
                </div>
                <div v-if="model.imgList.length > 0" class="image-container-two__case2__three">
                  <div class="model-card-main-image__case2__skeleton"></div>
                  <img
                    class="model-card-main-image__case2"
                    :src="IMAGE_URL + model.imgList[4].imgFile"
                    alt="..."
                    loading="lazy"
                    />
                </div>
              </div>
              <div class="model__profile">
                <div class="model__profile-image-container">
                </div>
                <img
                  class="model__profile-image"
                  :src="IMAGE_URL + model.imgFaceFile"
                  loading="lazy"
                  alt="..."
                  />
              <div class="model__flex">
                <div class="model__info">
                  <span class="model__name">{{ model.name }}</span>
                  <span class="model__shop">{{model.shopList[0].name || "쇼핑몰 이름"}}</span>
                </div>
                <div class="model__tags">
                  <span
                    v-for="style in model.styleList"
                    :key="style"
                    class="model__tag">{{ style }}</span>
                </div>
              </div>
            </div>
          </div>

        <div class="case3"
                v-else
                @click="toDetailPage(model)">
          <div class="model-card-title">
                <div class="model-card-title__top">
                <span class="model-height" >{{ model.height }}cm</span>
                   <div class="shaker" v-show="model.height == height">
                    <div class="shaker-body">
                      <span class="shaker-body__text">나와 똑같은 키의 모델</span>
                    </div>
                    <div class="shaker-arrow"></div>
                  </div>
                </div>
                <span class="model-explain">{{ model.modelExp || "모델 설명" }} </span>
          </div>
          <div class="image-container-one">
            <div v-if="model.imgList.length > 0" class="image-container-three__case3">
              <div v-if="model.isNew == 'true'" class="model__new" id="newModel">new</div>
              <div class="image-container-four__case3">
                <div class="image-container-four__case3__skeleton"></div>
                  <img
                    class="model-card-secondary-image__case3"
                    :src="IMAGE_URL + model.imgList[1].imgFile"
                    loading="lazy"
                    alt="..."
                    />
              </div>
              <div class="image-container-five__case3">
              <div class="image-container-five__case3__skeleton"></div>
                <img
                  class="model-card-secondary-image__case3"
                  :src="IMAGE_URL + model.imgList[2].imgFile"
                  loading="lazy"
                  alt="..."
                  />
              </div>
            </div>
            <div v-if="model.imgList.length > 0" class="image-container-two__case3">
              <div class="model-card-main-image__case3__skeleton"></div>
                <img
                  class="model-card-main-image__case3"
                  :src="IMAGE_URL + model.imgList[0].imgFile"
                  alt="..."
                  loading="lazy"
                  />
            </div>
          </div>
          <div class="model__profile">
            <div class="model__profile-image-container">
            </div>
              <img
                class="model__profile-image"
                :src="IMAGE_URL + model.imgFaceFile"
                loading="lazy"
                alt="..."
                />
            <div class="model__flex">
              <div class="model__info">
                <span class="model__name">{{ model.name }}</span>
                <span class="model__shop">{{model.shopList[0].name || "쇼핑몰 이름"}}</span>
              </div>
              <div class="model__tags">
                <span
                  v-for="style in model.styleList"
                  :key="style"
                  class="model__tag">{{ style }}</span>
              </div>
            </div>
          </div>
        </div>
        </div>
        </div>
      </div>

    <transition  :duration="3000">
        <div v-if="isSpinning" class="spinner-continaer">
            <AppSpinner2></AppSpinner2>
        </div>
    </transition>
</main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AppSpinner2 from "@/components/App/AppSpinner2";

export default {
    components: {
        AppSpinner2
    },

    data() {
      return {
            isSpinning: false,
            models_mean_height: this.$store.getters.MODELS_MEAN_HEIGHT,
            moreModel : true,
            height : localStorage.getItem("height")
        };
  },

    computed: {
    ...mapGetters([
      "IMAGE_URL",
      "IS_LOADING",
      "MODELS_MEAN_HEIGHT"
    ]),

    },

// async asyncData({ store, next }) {
//       const params = {
//       offset : 0,
//       limit : 5
//     }

//     if (localStorage.getItem("previousPage")=="model-id") {
//     }
//     else {

//         await store.dispatch("getModelsMeanHeight", params);

//     }
//     return {
//       models_mean_height : store.getters.MODELS_MEAN_HEIGHT
//     };
//   },

created() {
    if (!localStorage.getItem("previousPage").includes("model")) {
        this.$store.dispatch( "setOffsetModelMeanHeight",0);
    }

      window.addEventListener("scroll", this.handleScrollMean);
      window.removeEventListener("scroll", this.handleScroll);
      window.removeEventListener("scroll", this.handleScrollLow);
      window.removeEventListener("scroll", this.handleScrollHigh);
},

 methods: {
    async handleScrollMean() {
      
      if (
        this.$route.name=="modelMean" &&
        this.$store.getters.MODELS_MEAN_HEIGHT.length !=0 &&
        window.innerHeight + window.scrollY >= document.body.offsetHeight-100 &&
        !this.isSpinning &&
        this.moreModel
       ) {
         this.isSpinning = true;
         await this.getMoreModelsMean();
      console.log("평균키 헨들스크롤움직임");
       }
    },

    getMoreModelsMean() {
      return new Promise(async (resolve, reject) => {
        try {
            await this.$store.dispatch(
              "setOffsetModelMeanHeight",
              this.$store.getters.OFFSET_MODEL_MEAN_HEIGHT + 5
            );
            const response = await this.$store.dispatch("addModelsMeanHeight");
            const noMoreMeanModel = response.result.modelList;
            if (noMoreMeanModel.length == 0) {
                this.moreModel = false;
            }
          this.isSpinning = false;
            resolve();
        } catch (error) {
          this.isSpinning = false;
          reject(error);
        }
      });
    },

    toDetailPage(model) {
      this.$amplitude
        .getInstance()
        .logEvent("click model-profile", { modelId: model.modelId  , clickedModelPage: "모델찾기"});

      this.$store.dispatch("setModel", model);
      localStorage.setItem("model", JSON.stringify(model));
      localStorage.setItem("modelHeightClick","1");

      const recentModelId = JSON.parse(localStorage.recentModelId);
      recentModelId.push(model);
      localStorage.recentModelId = JSON.stringify(recentModelId);
      
      this.$router.push("/model/" + model.modelId);
    }
 },

    async beforeRouteLeave(to, from, next) {
      window.removeEventListener("scroll", this.handleScrollMean);
    next();
  }

}
</script>

<style lang="scss" scoped>

.shaker {
  display: flex;
  align-items: baseline;
  margin-top:2%;
  animation: shake 0.9s infinite, arrowFade 0.2s 1s both;
}

@keyframes arrowFade {
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
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
  padding: 4px 12px;
  background-color: $primary;
  border-radius: 4px;
  display: flex;
  align-items: baseline;
  justify-content: center;
  align-content: center;

  &__text {
    font-size: 0.7em;
    color: $white;
    letter-spacing: 0.001em;
    font-weight: 600;
  }
}

.shaker-arrow {
  width: 0px;
  height: 0px;
  background-color: $primary;
  border-left: 0px solid $white;
  border-right: 6px solid transparent;
  border-top: 3px solid $white;
  border-bottom: 3px solid $white;
  position: absolute;
  top:25%;
  left:4%;
}

.spinner-continaer {
  padding-bottom: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.model-divider {
  width: 100%;
  max-width: 500px;
  margin-top: 15%;
  margin-bottom: 0px;
  border-top:10px solid #ececec;

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

  &__flex__second {
    margin : 50px 0;
     display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 0 1em;

    &.fadeIn {
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
  }

  &__info {
    color: $grey;
    font-size: 0.8em;
    font-weight: 600;
  }
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
    color: $grey;
    font-weight: 600;
    border-radius: 4px;
  }
}

.masonry-container {
  margin: 0;
  margin-bottom: 20px;
  padding-top: 10px;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-wrap: wrap;
}

.model {
  margin: 0 0 20px 5%;
  border-radius: 10px;
  width: 42.5%;
  display: flex !important;
  justify-content: space-between !important;
  flex-direction: column;
  background-color: $white;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  transition: opacity 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  }

  &__image-container {
    width: 100%;
    height: 190px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    object-fit: cover;
  }

  &__new {
    position: absolute;
    margin: 7px;
    padding: 0px 6px 2px 6px;
    border-radius: 4px;
    font-size: 0.7em;
    font-weight: 700;
    z-index: 4;
      color:#ececec;
      background-color : #ec3e39;
  animation-name : fade_new;
  animation-duration: 0.2s;
  animation-delay: 1s;
  animation-fill-mode: both;
  @keyframes fade_new {
    0% {
      background-color : #ececec;
      color:#ececec;
    }
    100% {
      background-color : #ec3e39;
      color:#ffffff;
    }
  }
  }

  &__image {
    width: 100%;
    height: 190px;
    background-color: $light-grey;
    object-fit: cover;
    object-position: 50% 50%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  &__profile {
    padding: 0px 0px 15px 0px;
    display: flex;
    position: relative;
  }

  &__profile-image {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    object-fit: cover;
    object-position: -20% 0;
    margin: 0 5px 0 0;
    z-index:1;

  &-container{ 
    z-index: 2;
    width:50px;
    height: 50px;
    left:-2px;
    top:-2px;
    border-radius: 50%;
    margin: 0 5px 0 0;
    position:absolute;
    animation-name : fade_profileFace;
    animation-duration: 0.2s;
    animation-delay: 1s;
    animation-fill-mode: both;
    @keyframes fade_profileFace {
      0% {
        background-color: #ececec;
      }
      100% {      
        background-color: transparent;
      }
    }
  }

  }


  &__info {
    padding: 0px 5px 3px 5px;
    width: 250px;
    display: block;
    justify-content: space-between;
    align-items: baseline;
  }

  &__name {
    margin-right: 5px;
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
    margin-right: 5px;
    font-size: 1em;
    font-weight: 700;
  }

  &__shop {
    margin-right: 5px;
    color: $grey;
    font-size: 0.8em;
    font-weight: 700;
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
      color:#888;
    }
  }
  }

  &__tags {
    padding: 0 5px;
    width: 100%;
    display: block;
    justify-content: flex-start;
    align-items: baseline;
  }

  &__tag {
    margin-right: 5px;
    border-radius: 5px;
    padding: 2px 5px;
    background-color: $light-grey;
    color: #666666;
    font-size: 0.8em;
    font-weight: 700;
      animation-name : fade_tag;
  animation-duration: 0.2s;
  animation-delay: 1s;
  animation-fill-mode: both;
  @keyframes fade_tag {
    0% {
      background-color : #ececec;
      color:#ececec;
    }
    100% { 
      background-color : #f1f1f1;
      color:#666;
    }
  }
  }
}

@media only screen and (max-width: 360px) {
  .model__name {
    font-size: 1em;
  }
}

.model-card-container {
  width: 100%;
  max-width: 500px;
  padding: 6% 3% 10% 3%;
  border-top: 10px solid #ececec;
  overflow-y: hidden;

  &__getMarginTop{
      width: 100%;
      max-width: 500px;
      padding: 3% 3% 10% 3%;
      margin-top:300px;
  }

  :active {
    background-color : #ececec;
  }
}

.model-card-container:nth-child(1) {
  border-top: 0px solid !important;
}

.model-height {
  margin:0 0 3px 0;
  font-size : 1.6em;
  width:85px;
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

.model-explain {
  animation-name : fade_explain;
  animation-duration: 0.2s;
  animation-delay: 1s;
  animation-fill-mode: both;
  width:100%;
  @keyframes fade_explain {
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


.model-card-title {
  font-weight: 600;
  margin: 0 0 10px 0;
  font-size: 1.1em;
  display : grid;
  &__top {
    display:flex;
  }
}

.model-card-image-container {
  margin: 5px 0;
  width: 100%;
  max-width: 500px;
  height: 190px;
  display: flex;
}

.model-card-second-image-container {
  width: 60%;
}

.model-card-third-image-container {
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
}

.model-card-main-image {
  width: 99.2%;
  border-radius: 5px;
  object-fit: cover;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  z-index: 1;

  &-container {
    z-index: 2;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    position: absolute;
  animation-name : fade;
  animation-duration: 0.2s;
  animation-delay: 1s;
  animation-fill-mode: both;
  @keyframes fade {
    0% {
      background-color : #ececec;
      box-shadow: 0px rgba(0, 0, 0, 0);
    }
    100% {      
      background-color : transparent;
      box-shadow: 0px rgba(0, 0, 0, 0);
    }
  }
  }

  &__case2 {
    width: auto;
    height : 232.859px;
    border-radius: 5px;
    object-fit: cover;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
        &__skeleton{
    z-index: 2;
    width: 96%;
    height: 96%;
    left:-2px;
    top:-2px;
    border-radius: 5px;
    position: absolute;
  animation-name : fade;
  animation-duration: 0.2s;
  animation-delay: 1s;
  animation-fill-mode: both;
  @keyframes fade {
    0% {
      background-color : #ececec;
      box-shadow: 0px rgba(0, 0, 0, 0);
    }
    100% {      
      background-color : transparent;
      box-shadow: 0px rgba(0, 0, 0, 0);
    }
  }
  }
  }

  &__case3 {
    width: 99.2%;
    border-radius: 5px;
    object-fit: cover;
    box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
    z-index: 1;

    &__skeleton{
    z-index: 2;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    position: absolute;
  animation-name : fade;
  animation-duration: 0.2s;
  animation-delay: 1s;
  animation-fill-mode: both;
  @keyframes fade {
    0% {
      background-color : #ececec;
      box-shadow: 0px rgba(0, 0, 0, 0);
    }
    100% {      
      background-color : transparent;
      box-shadow: 0px rgba(0, 0, 0, 0);
    }
  }
  }
}
}

.model-card-secondary-image {
  width: 96%;
  border-radius: 5px;
  object-fit: cover;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
      &-skeleton{
    z-index: 2;
    width: 99%;
    height: 102%;
    right : -2px;
    top: -2px;
    border-radius: 5px;
    position: absolute;
  animation-name : fade_1;
  animation-duration: 0.2s;
  animation-delay: 1s;
  animation-fill-mode: both;
  @keyframes fade_1 {
    0% {
      background-color : #ececec;
      box-shadow: 0px rgba(0, 0, 0, 0);
    }
    100% {      
      background-color : transparent;
      box-shadow: 0px rgba(0, 0, 0, 0);
    }
  }
  }

    &-skeleton2{
    z-index: 2;
    width: 99%;
    height: 102%;
    right : -2px;
    top: -2px;
    position: absolute;
    border-radius: 5px;
  animation-name : fade1;
  animation-duration: 0.2s;
  animation-delay: 1s;
  animation-fill-mode: both;
  @keyframes fade1 {
    0% {
      background-color : #ececec;
      box-shadow: 0px;
    }
    100% {      
      background-color : transparent;
      box-shadow: 0px;
    }
  }
  }

  &__case3 {
    width: 96%;
    border-radius: 5px;
    object-fit: cover;
    box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);

  }
}

.image-container-one {
  display: flex;
  width: 100%;
  padding-bottom:15px;

  &__case2{
    overflow: -moz-scrollbars-none;
    overflow-x : auto;
    overflow-y: hidden;
    display: flex;
    width: 110%;
    margin-left:-12px;
    padding-left:12px;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display : none;
      width:0px;
    }
  }
  
}
.image-container-two {
  width: 66.6%;
  position: relative;
  overflow-y: hidden;

  &__case2{
    padding : 0px 15px 15px 0px;
    position:relative;

    &__three {
      padding-right:27px;
    position:relative;
    }
  }

  &__case3 {
    display:flex;
    justify-content: flex-end;
    align-items: flex-end;
    width: 66.6%;
    position:relative;
  overflow-y: hidden;
  }
}
.image-container-three {
  width: 33.3%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__case3 {
    width: 33.3%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
.image-container-four {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  position:relative;
  overflow-y: hidden;
  &__case3 {
    box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
    position:relative;
  overflow-y: hidden;
        &__skeleton{
    z-index: 2;
    width: 99%;
    height: 102%;
    left : -2px;
    top: -2px;
    position: absolute;
    border-radius: 5px;
  animation-name : fade;
  animation-duration: 0.2s;
  animation-delay: 1s;
  animation-fill-mode: both;
  @keyframes fade {
    0% {
      background-color : #ececec;
      box-shadow: 0px rgba(0, 0, 0, 0);
    }
    100% {      
      background-color : transparent;
      box-shadow: 0px rgba(0, 0, 0, 0);
    }
  }
  }
  }
}
.image-container-five {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
    position:relative;
  overflow-y: hidden;
  &__case3 {
    box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
    position:relative;
  overflow-y: hidden;
        &__skeleton{
    z-index: 2;
    width: 99%;
    height: 102%;
    left : -2px;
    top: -2px;
    position: absolute;
    border-radius: 5px;
  animation-name : fade;
  animation-duration: 0.2s;
  animation-delay: 1s;
  animation-fill-mode: both;
  @keyframes fade {
    0% {
      background-color : #ececec;
      box-shadow: 0px rgba(0, 0, 0, 0);
    }
    100% {      
      background-color : transparent;
      box-shadow: 0px rgba(0, 0, 0, 0);
    }
  }
  }
  }
}
</style>