<template>
<transition>
  <main class="my-page-container">

  <!-- <AppSpinner3 v-if="!IS_WAIT"/> -->
    <AppLoginSheet />
    <HeightEditModal :title="'내 키를 입력해주세요.'" />

    <div v-if="!IS_LOGGED_IN" class="not-logged-in">
      <h1 class="not-logged-in__title">
        로그인이 필요해요!
      </h1>
      <h2 class="not-logged-in__subtitle">
        회원가입 및 로그인 후 FITCHOO의 다양한 서비스를 이용해보세요
      </h2>
      <button class="not-logged-in__button" @click="logIn">
        로그인/회원가입
      </button>
    </div>

    <div v-if="IS_LOGGED_IN" class="logged-in">
      <h1 class="logged-in__title">{{ USER_EMAIL }}</h1>
    </div>

    <div class="my-info">
      <h3 class="my-info__height">
        키
      </h3>
      <button class="my-info__button" @click="openModal">
        <span class="material-icons my-info__icon">
          edit
        </span>
        <span>
          {{ USER_HEIGHT }}
        </span>
      </button>
    </div>

    <div class="options-container">
      <div class="option" @click="clickFollowModels">
        내가 팔로우한 모델
      </div>
      <div class="option" @click="clickSaved">
        찜
      </div>
      <div class="option" @click="clickRecentProduct">
        최근 본 상품
      </div>
      <div class="option" @click="clickContactUs">
        이용 문의
      </div>
      <div class="option" @click="clickTerms">
        이용 약관
      </div>
      <div class="option" @click="clickPrivacy">
        개인 정보 처리 방침
      </div>
      <div class="option" @click="clickRegisterStore">
        모델 등록 문의
      </div>
      <div v-if="IS_LOGGED_IN" class="option" @click="logOut">
        로그아웃
      </div>
    </div>
  </main>
</transition>
</template>

<script>
import AppLoginSheet from "@/components/App/AppLoginSheet";
import InputModal from "@/components/Modal/InputModal";
import LoginAlertModal from "@/components/Modal/LoginAlertModal";
// import AppSpinner3 from "@/components/App/AppSpinner3";

import { mapGetters, mapActions } from "vuex";

export default {
  head() {
    return {
      script: [
        {
          src: "https://connect.facebook.net/en_US/sdk.js",
          defer: true
        },
        {
          src: "/js/google-login.js"
        },
        {
          src: "/js/naver-sdk.js"
        }
      ]
    };
  },
    transition ( to, from  ) {
    if (localStorage.getItem("previousPage")=="follow" ||
        localStorage.getItem("previousPage")=="saved" ||
        localStorage.getItem("previousPage")=="contact" ||
        localStorage.getItem("previousPage")=="terms" ||
        localStorage.getItem("previousPage")=="privacy" ||
        localStorage.getItem("previousPage")=="recentProduct" 
        ) {
      return 'slideLeft'
    }
    else {
      return 'nothing'
    }
  },

  components: {
    AppLoginSheet,
    HeightEditModal: InputModal,
    LoginAlertModal,
    // AppSpinner3
  },

  data() {
    return {};
  },

  computed: {
    ...mapGetters([
    "IS_LOGGED_IN", 
    "USER_HEIGHT", 
    "USER_EMAIL",
    // "IS_WAIT"
    ])
  },

  asyncData({ store, next }) {
    if (!localStorage.getItem("height")) {
      next("/index");
    }
    if (localStorage.accessToken && !store.getters.USER_EMAIL) {
      store.dispatch("setUserInfo");
    }
  },

  created() {
    
    // this.$store.dispatch("startWait");

        const recentModelId = JSON.parse(localStorage.recentModelId);
        recentModelId.length = 0;
        localStorage.recentModelId = JSON.stringify(recentModelId);

         const recentProductId = JSON.parse(localStorage.recentProductId);
        recentProductId.length = 0;
        localStorage.recentProductId = JSON.stringify(recentProductId);
    
    
    if (!this.$store.getters.USER_HEIGHT) {
      this.$router.push("/");
    }

    this.$amplitude.getInstance().logEvent("page view mypage");

    this.$store.dispatch("closeLoginSheet");
    this.$store.dispatch("setCurrentRoute", this.$route.path);

    window.addEventListener("load", this.getNaverInfo);

    setTimeout(() => {
      this.$store.dispatch("endLoading");
    }, 100);
  },

  mounted() {

    if (localStorage.getItem("wantLogin")) {
      this.$store.dispatch("openLoginSheet");
      localStorage.removeItem("wantLogin");
    }
  },

  methods: {
    ...mapActions(["openModal"]),

    clickFollowModels() {
      if (!this.$store.getters.IS_LOGGED_IN) {
        this.$store.dispatch("openLoginAlertModal");
        return;
      }else {
      this.$router.push("/follow");
      }
    },

    clickSaved() {
      if (!this.$store.getters.IS_LOGGED_IN) {
        this.$store.dispatch("openLoginAlertModal");
        return;
      }else {
      this.$router.push("/saved");
      }
    },

    clickContactUs() {
      this.$router.push("/contact");
    },

    clickRecentProduct() {
      this.$router.push("/recentProduct");
    },

    getNaverInfo() {
      window.naverLogin.getLoginStatus(async function(status) {
        window.$nuxt.$store.dispatch("startLoading");
        if (status) {
          const email = window.naverLogin.user.getEmail();
          const uniqId = window.naverLogin.user.getId();

          const loginForm = {
            appType: window.OsType || "web",
            pushKey: window.PushToken || "",
            email,
            passwd: "",
            snsType: "naver",
            snsId: uniqId
          };

          const snsResponse = await window.$nuxt.$store.dispatch(
            "snsLogin",
            loginForm
          );

          window.$nuxt.$store.dispatch("closeLoginSheet");

          if (snsResponse.status == 200) {
            this.$amplitude
              .getInstance()
              .logEvent("complete sign-up", { signUpMethod: "naver" });

            await window.$nuxt.$store.dispatch("setIsLoggedIn", true);
            await window.$nuxt.$store.dispatch("setEmail", email);
          } else {
            alert("이 이메일로 이미 가입된 적이 있습니다.");
          }

          await window.$nuxt.$store.dispatch("endLoading");
          window.location.replace("https://fitchoo.kr/model");
        } else {
          await window.$nuxt.$store.dispatch("endLoading");
        }
      });
    },

    clickPrivacy() {
      this.$router.push("/privacy");
    },

    clickTerms() {
      this.$router.push("/terms");
    },

    clickRegisterStore() {
      window.open(
        "https://docs.google.com/forms/d/e/1FAIpQLScYAJi1qkBJZRFbs0zOachwXMJQNCQ2aiFqLk-KRDbryaJ-aA/viewform?usp=sf_link"
      );
    },

    logIn() {
      this.$store.dispatch("openLoginSheet");
    },

    async logOut() {
      const logoutResponse = await this.$store.dispatch("logout");
      if (logoutResponse.status == 200) {
        this.$router.push("/index");
      } else {
        this.$router.push("/index");
      }
    }
  },

  async beforeRouteLeave(to, from, next) {
    await this.$store.dispatch("startLoading");

    next();
  }
};
</script>

<style lang="scss" scoped>
.my-page-container {
  background-color: $white;
  height: 100%;
  min-height: 100vh;
}

.not-logged-in {
  padding: 30px 0 10px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  text-align: center;

  &__title {
    margin: 10px 0;
    font-size: 1.6em;
    font-weight: 600;
  }

  &__subtitle {
    margin: 10px 0;
    font-size: 0.8em;
    color: $grey;
  }

  &__button {
    margin: 10px;
    padding: 15px 25px;
    border-radius: 4px;
    background-color: $primary;
    color: $white;
    font-weight: 600;
    font-size: 1.1em;
  }
}

.logged-in {
  padding: 50px 30px 30px 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  text-align: center;

  &__title {
    margin: 10px 0;
    font-size: 1.2em;
    font-weight: 600;
  }
}

.my-info {
  padding: 20px;
  width: 100%;
  height: 62px;
  display: flex;
  align-items: baseline;
  align-content: center;
  justify-content: space-between;

  &__height {
    font-size: 1em;
  }

  &__icon {
    margin-right: 5px;
    font-size: 1.2em;
  }

  &__button {
    padding: 5px 15px;
    border: 1px solid $grey;
    border-radius: 4px;
    font-size: 1em;
    font-weight: 600;

    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
  }
}

.options-container {
  width: 100%;
  margin-bottom:100px;

  div:last-child {
    border-bottom: 1px solid $light-grey;
  }
}

.option {
  padding: 20px;
  height: 62px;
  border-top: 1px solid $light-grey;
  width: 100%;
}
</style>
