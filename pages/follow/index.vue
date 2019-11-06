<template>
<transition name="slideRight">
  <main class="model-container">

    <AppSpinner v-if="IS_LOADING" />

    <LoginAlertModal />
    <!-- <AppDownloadModal /> -->

    <HeightEditModal :title="'내 키를 입력해주세요.'" />

    <!-- No Following Models -->
    <div
      v-if=" FOLLOWING_MODELS.length === 0"
      class="no-following-models"
    >
      <h4>팔로우한 모델이 없어요. ㅠㅠ</h4>
    </div>
    <!-- No Following Models -->

      <div 
      v-else
      class="model-divider">
        <!-- <dir class="model-divider__flex">
          <span class="height__title">내가 팔로우한 <br/> 모델 언니.</span>
        </dir> -->

        <div
          v-for="model in followingModelList"
          :key="model.modelId"
          class="model-card-container"
           @click="toDetailPage(model)"
        >
          <!-- case1 -->

          <div class="case1" v-if ="Math.floor(Math.random()*3) + 1 == 1">
          <div class="model-card-title">
            <!-- <span style="color: red;">#</span> -->
            {{ model.modelExp || "모델 설명" }}
          </div>
          <div class="image-container-one">
            <div v-if="model.imgList.length > 0" class="image-container-two">
              <div v-if="isNew(model.uploadTime)" class="model__new">new</div>
              <img
                class="model-card-main-image"
                :src="IMAGE_URL + model.imgList[0].imgFile"
                alt="/iu.jpg"
                loading="lazy"
              />
            </div>
            <div v-if="model.imgList.length > 0" class="image-container-three">
              <div class="image-container-four">
                <img
                  class="model-card-secondary-image"
                  :src="IMAGE_URL + model.imgList[1].imgFile"
                  loading="lazy"
                />
              </div>
              <div class="image-container-five">
                <img
                  class="model-card-secondary-image"
                  :src="IMAGE_URL + model.imgList[2].imgFile"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          <div class="model__profile">
            <img
              class="model__profile-image"
              :src="IMAGE_URL + model.imgFaceFile"
              loading="lazy"
            />

            <div class="model__flex">
              <div class="model__info">
                <span class="model__name">{{ model.name }}</span>
                <span class="model__height">{{ model.height }}cm</span>
                <span class="model__shop">{{
                  model.shopList[0].name || "쇼핑몰 이름"
                }}</span>
              </div>
              <div class="model__tags">
                <span
                  v-for="style in model.styleList"
                  :key="style"
                  class="model__tag"
                  >{{ style }}</span
                >
              </div>
            </div>
          </div>
          </div>


          <!-- case2 -->

          <div class="case2" v-else-if ="Math.floor(Math.random()*3) + 1 == 2">
          <div class="model-card-title">
            <!-- <span style="color: red;">#</span> -->
            {{ model.modelExp || "모델 설명" }}
          </div>
          <div class="image-container-one__case2">
            <div v-if="model.imgList.length > 0" class="image-container-two__case2">
              <div v-if="isNew(model.uploadTime)" class="model__new">new</div>
              <img
                class="model-card-main-image__case2"
                :src="IMAGE_URL + model.imgList[0].imgFile"
                alt="/iu.jpg"
                loading="lazy"
              />
            </div>
            <div v-if="model.imgList.length > 0" class="image-container-two__case2">
              <img
                class="model-card-main-image__case2"
                :src="IMAGE_URL + model.imgList[1].imgFile"
                alt="/iu.jpg"
                loading="lazy"
              />
            </div>
            <div v-if="model.imgList.length > 0" class="image-container-two__case2">
              <img
                class="model-card-main-image__case2"
                :src="IMAGE_URL + model.imgList[2].imgFile"
                alt="/iu.jpg"
                loading="lazy"
              />
            </div>
            <div v-if="model.imgList.length > 0" class="image-container-two__case2">
              <img
                class="model-card-main-image__case2"
                :src="IMAGE_URL + model.imgList[3].imgFile"
                alt="/iu.jpg"
                loading="lazy"
              />
            </div>
            <div v-if="model.imgList.length > 0" class="image-container-two__case2__three">
              <img
                class="model-card-main-image__case2"
                :src="IMAGE_URL + model.imgList[4].imgFile"
                alt="/iu.jpg"
                loading="lazy"
              />
            </div>
          </div>
          <div class="model__profile">
            <img
              class="model__profile-image"
              :src="IMAGE_URL + model.imgFaceFile"
              loading="lazy"
            />

            <div class="model__flex">
              <div class="model__info">
                <span class="model__name">{{ model.name }}</span>
                <span class="model__height">{{ model.height }}cm</span>
                <span class="model__shop">{{
                  model.shopList[0].name || "쇼핑몰 이름"
                }}</span>
              </div>
              <div class="model__tags">
                <span
                  v-for="style in model.styleList"
                  :key="style"
                  class="model__tag"
                  >{{ style }}</span
                >
              </div>
            </div>
          </div>
          </div>


        <!-- case3 -->

        <div class="case3" v-else>
        <div class="model-card-title">
            <!-- <span style="color: red;">#</span> -->
            {{ model.modelExp || "모델 설명" }}
          </div>
          <div class="image-container-one">
            <div v-if="model.imgList.length > 0" class="image-container-three__case3">
              <div v-if="isNew(model.uploadTime)" class="model__new">new</div>
              <div class="image-container-four__case3">
                <img
                  class="model-card-secondary-image__case3"
                  :src="IMAGE_URL + model.imgList[1].imgFile"
                  loading="lazy"
                />
              </div>
              <div class="image-container-five__case3">
                <img
                  class="model-card-secondary-image__case3"
                  :src="IMAGE_URL + model.imgList[2].imgFile"
                  loading="lazy"
                />
              </div>
            </div>
            <div v-if="model.imgList.length > 0" class="image-container-two__case3">
              <img
                class="model-card-main-image__case3"
                :src="IMAGE_URL + model.imgList[0].imgFile"
                alt="/iu.jpg"
                loading="lazy"
              />
            </div>
          </div>
          <div class="model__profile">
            <img
              class="model__profile-image"
              :src="IMAGE_URL + model.imgFaceFile"
              loading="lazy"
            />

            <div class="model__flex">
              <div class="model__info">
                <span class="model__name">{{ model.name }}</span>
                <span class="model__height">{{ model.height }}cm</span>
                <span class="model__shop">{{
                  model.shopList[0].name || "쇼핑몰 이름"
                }}</span>
              </div>
              <div class="model__tags">
                <span
                  v-for="style in model.styleList"
                  :key="style"
                  class="model__tag"
                  >{{ style }}</span
                >
              </div>
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

import AppSpinner from "@/components/App/AppSpinner";

import LoginAlertModal from "@/components/Modal/LoginAlertModal";
// import AppDownloadModal from "@/components/Modal/AppDownloadModal";
import InputModal from "@/components/Modal/InputModal";

export default {
  components: {
    AppSpinner,
    LoginAlertModal,
    // AppDownloadModal,
    HeightEditModal: InputModal
  },
          transition: 'slideRight',

  data() {
    return {
      showLoginAlertModal: false,
      height: localStorage.height
    };
  },

  computed: {
    ...mapGetters([
      "IMAGE_URL",
      "IS_LOGGED_IN",
      "IS_LOADING",
      "USER_HEIGHT",
      "FOLLOWING_MODELS"
    ]),

    hasHeight() {
      return this.$store.getters.USER_HEIGHT ? true : false;
    },

    filteredModelList() {
      return this.sortNewModelsFirst().filter(model => {
        return !this.containsModel(model.modelId, this.followingModelList);
      });
    },

    followingModelList() {
      return this.$store.getters.FOLLOWING_MODELS;
    },

    
  },

  async asyncData({ store, next }) {
    if (!localStorage.getItem("height")) {
      next("/index");
    }

    const params = {
      offset: 0,
      limit: 999
    };

    if (localStorage.getItem("accessToken")) {
      await store.dispatch("setFollowingModels");
    }


    return {
      products: store.getters.EXHIBITION_PRODUCTS,
      models : store.getters.MODELS,
      models_remain : store.getters.MODELS_REMAIN
    };
  },

  created() {
    console.log(this.sameHeightModels);
    this.$store.dispatch("setCurrentRoute", this.$route.path);

    setTimeout(() => {
      this.$store.dispatch("endLoading");
    }, 100);
  },

  mounted() {
    this.$store.dispatch("setHeaderTitle", "내가 팔로우한 모델");
    this.$store.dispatch("hideLogo");

    // by shlee for app : avoid 'openAppDownloadModal' popup
    // alert("check OS type 3 (index vue): " + window.OsType);
    if (!(window.OsType == "android" || window.OsType == "ios")) {
      if (!localStorage.getItem("lastTime")) {
        this.$amplitude.getInstance().logEvent("view modal CTA-app");
        this.$store.dispatch("openAppDownloadModal");
      }
    }

    const lastTime = localStorage.getItem("lastTime");
    const now = new Date().getTime();
    this.timeChecker(lastTime, now);
  },

  methods: {
    ...mapActions(["openModal"]),

  
    timeChecker(lastTime, currentTime) {
      const oneDay = 86400000;
      if (lastTime - currentTime > oneDay) {
        localStorage.removeItem("lastTime");
      }
    },


    sortNewModelsFirst() {
      let models = this.$store.getters.MODELS;
      models = models.sort((a, b) => {
        return (
          this.parseTimestamp(b.uploadTime) - this.parseTimestamp(a.uploadTime)
        );
      });
      return models;
    },

    containsModel(modelId, followingModelList = []) {
      for (let i = 0; i < followingModelList.length; i++) {
        if (followingModelList[i].modelId === modelId) {
          return true;
        }
      }
      return false;
    },

    hideModal() {
      window.scrollTo(0, 0);
      this.showLoginAlertModal = false;
    },


    parseTimestamp(date) {
      date = date.substring(0, 10);
      const splitDate = date.split("-");
      const year = parseInt(splitDate[0]);
      const month = parseInt(splitDate[1]);
      const day = parseInt(splitDate[2]);
      const timestampParsedDate = new Date(year, month - 1, day).getTime();
      return timestampParsedDate;
    },

    isNew(updatedAt) {
      const timestampParsedUpdatedAt = this.parseTimestamp(updatedAt);
      const now = new Date().getTime();
      const week = 604800000;
      // const twoDays = 172800000;
      const timePassed = now - timestampParsedUpdatedAt;
      const isNew = timePassed <= week ? true : false;

      return isNew;
    },

    toDetailPage(model) {
      this.$amplitude
        .getInstance()
        .logEvent("click model-profile", { modelId: model.modelId , clickedModelPage: "팔로잉모델" });

      this.$store.dispatch("setModel", model);
      localStorage.setItem("model", JSON.stringify(model));

      const path = "/model/" + model.modelId;
      this.$router.push(path);
    }
  },

  async beforeRouteLeave(to, from, next) {
    this.$store.dispatch("showLogo");
    await this.$store.dispatch("startLoading");
    this.$store.dispatch("resetModels");
  }
};
</script>

<style lang="scss" scoped>

.model-container {
  margin: 0;
  height: 100%;
  min-height: 100vh;
  background-color: $lighter-grey;
  padding-bottom: 20%;
  width: 100%;
  max-width: 500px;
}

.tab {
  margin: 0;
  width: 100%;
  max-width: 500px;
  position: fixed;
  display: flex;
  text-align: center;
  background-color: $white;
  z-index: 2;

  &__title {
    padding: 15px 10px;
    border-bottom: solid 1px $light-grey;
    width: 50%;
    font-size: 0.9em;
    font-weight: 600;
    color: $grey;
  }

  &--active {
    color: $primary;
    border-bottom: solid 3px $primary;
  }
}

.tab-space {
  height: 55px;
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


.no-following-models {
  padding: 15% 5% 30% 5%;
  color: $grey;
  height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h4 {
    margin: 10px 0;
    text-align: center;
    font-size: 1.2em;
  }
}

.model-divider {
  width: 100%;
  max-width: 500px;
  margin-top: 10%;
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
    // background-color: $dark-grey;
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

  // position: absolute;
}

.model {
  margin: 0 0 20px 5%;
  border-radius: 10px;
  width: 42.5%;
  display: flex !important;
  justify-content: space-between !important;
  flex-direction: column;
  background-color: $white;
  // position: absolute;
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
    background-color: $primary;
    color: $white;
    margin: 7px;
    padding: 0px 6px 2px 6px;
    border-radius: 4px;
    font-size: 0.7em;
    font-weight: 700;
    z-index: 4;
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
    padding: 15px 0px;
    display: flex;
  }

  &__profile-image {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    object-fit: cover;
    object-position: -20% 0;
    margin: 0 5px 0 0;
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
    color: $grey;
    font-size: 0.8em;
    font-weight: 700;
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
  padding: 3% 3% 10% 3%;
}

.model-card-title {
  font-weight: 600;
  margin: 0 0 10px 0;
  font-size: 1.1em;
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

  &__case2 {
    width: auto;
    height : 232.859px;
    border-radius: 5px;
    object-fit: cover;
    box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
  }

  &__case3 {
    width: 99.2%;
    border-radius: 5px;
    object-fit: cover;
    box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  }
}

.model-card-secondary-image {
  width: 96%;
  border-radius: 5px;
  object-fit: cover;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);

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

  &__case2{
    overflow: -moz-scrollbars-none;
    overflow-x : auto;
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

  &__case2{
    padding-right:15px;

    &__three {
      padding-right:27px;
    }
  }

  &__case3 {
    display:flex;
    justify-content: flex-end;
    align-items: flex-end;
    width: 66.6%;
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
  &__case3 {
    box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  }
}
.image-container-five {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  &__case3 {
    box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  }
}
</style>
