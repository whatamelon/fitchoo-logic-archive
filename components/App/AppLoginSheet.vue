<template>
  <div
    ref="loginSheet"
    class="app-login-sheet"
    :class="{
      'app-login-sheet--show': SHOW_LOGIN_SHEET,
      'app-login-sheet--hide': !SHOW_LOGIN_SHEET
    }"
  >
    <div class="header">
      <i class="material-icons close" @click="closeLoginSheet">
        close
      </i>
    </div>

    <div class="login">
      <img class="login__logo" src="/dark_logo.png" />
      <p class="login__title">
        간편가입 / 로그인
      </p>
      <p class="login__subtitle">
        핏츄를 통해 딱 맞는 상품을 쇼핑해보세요.
      </p>
    </div>

    <div class="login-button-container">

      <!-- by shlee -->
      <!-- <div
        v-if="!isIOS"
        class="login-button login-button--facebook"
        @click="loginWithFacebook"
      >
        <img
          class="facebook-button"
          src="/facebook_logo.svg"
          alt="/facebook_logo.png"
        />
        페이스북 아이디로 로그인
      </div> -->

      <div id="naverIdLogin" style="display: none;"></div>
      <div
        class="login-button login-button--naver"
        onclick="document.getElementById('naverIdLogin_loginButton').click();"
      >
        <img class="naver-button" src="/naver_logo.svg" alt="/naver_logo.svg" />
        네이버 아이디로 로그인
      </div>

      <!-- <div
        class="login-button login-button--google g-signin2"
        data-onsuccess="onSignIn"
      >
        <i class="fab fa-google"></i>
        구글 아이디로 로그인
      </div> -->

      <div class="login-button login-button--email" @click="goToRoute">
        이메일로 로그인
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  head() {
    return {
      script: []
    };
  },

  // by shlee
  data: {
    isIOS: false
  },
  beforeCreate() {
    if (window.OsType == "ios") {
      this.isIOS = true;
    }
    else{
      this.isIOS = false;
    }
  },
  // by shlee

  computed: {
    ...mapGetters(["SHOW_LOGIN_SHEET"])
  },

  methods: {
    ...mapActions(["closeLoginSheet"]),

    applyChanges() {
      this.$store.dispatch("closeLoginSheet");
    },

    loginWithFacebook() {
      this.$store.dispatch("startLoading");
      window.FB.login(
        function() {
          const fbUserId = window.FB.getUserID();

          window.FB.api(
            `/${fbUserId}/`,
            {
              fields: "id,name,email"
            },
            async response => {
              if (response && !response.error) {
                const email = response.email;
                const loginForm = {
                  appType: window.OsType || "web",
                  pushKey: window.PushToken || "",
                  email,
                  passwd: "",
                  snsType: "fbook",
                  snsId: response.id
                };

                const snsResponse = await window.$nuxt.$store.dispatch(
                  "snsLogin",
                  loginForm
                );

                window.$nuxt.$store.dispatch("closeLoginSheet");

                if (snsResponse.status == 200) {
                  this.$amplitude
                    .getInstance()
                    .logEvent("complete sign-up", { signUpMethod: "SNS" });

                  await window.$nuxt.$store.dispatch("setIsLoggedIn", true);
                  await window.$nuxt.$store.dispatch("setEmail", email);
                } else if (snsResponse.message === "email collision") {
                  alert("이 이메일로 이미 가입된 적이 있습니다.");
                }

                await window.$nuxt.$store.dispatch("endLoading");
                window.$nuxt.$router.push("/model");
              }
            }
          );
        },
        {
          scope: "email",
          return_scopes: true
        }
      );
    },

    goToRoute() {
      this.$router.push("/login");
    }
  },

  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("closeLoginModal");

    next();
  }
};
</script>

<style lang="scss" scoped>
.app-login-sheet {
  padding: 10px 25px;
  width: 100%;
  max-width: 500px;
  height: 100vh;
  position: absolute;
  top: 100vh;
  display: flex;
  flex-direction: column;
  background-color: $white;
  z-index: 6;

  transition: 0.3s;

  overflow: hidden;
  overflow-y: scroll !important;
  position: fixed;
  width: 100%;

  &--show {
    top: 0;
  }

  &--hide {
    top: 100vh;
  }
}

.header {
  display: flex;
  justify-content: flex-end;
  align-content: center;
  align-items: center;
}

.close {
  font-size: 1.4em;
}

.login {
  padding-top: 25%;
  text-align: center;

  &__logo {
    width: 200px;
  }

  &__title {
    margin: 20px 0 10px 0;
    font-size: 1.3em;
    font-weight: 800;
    color: $black;
    word-break: keep-all;
  }

  &__subtitle {
    margin: 10px 0;
    padding-bottom: 10px;
    font-size: 0.9em;
    font-weight: normal;
    color: gray;
    word-break: keep-all;
  }
}

.login-button-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.facebook-button {
  width: 20px;
  height: 20px;
  background-color: transparent;
  color: $white;
  margin-right: 10px;
}

.naver-button {
  width: 16px;
  height: 16px;
  margin-right: 10px;
}

.login-button {
  margin: 5px 0;
  padding: 15px 10px;
  border-radius: 5px;
  width: 100%;
  text-align: center;
  color: $white;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;

  &--facebook {
    background-color: $facebook;
  }

  &--naver {
    background-color: $naver;
  }

  &--google {
    background-color: $white;
  }

  &--email {
    background-color: $black;
  }
}

.modal-button {
  width: 48%;
  color: $white;
  background-color: $dark-grey;
  height: 45px;
  border: 0;
  border-radius: 0;
  font-size: 1.1em;
  font-weight: bold;
  display: block;
  margin: 0 auto;

  &--unfocused {
    color: #8d8d8d;
    background-color: #d9d9d9;
  }

  &:focus,
  &:hover {
    border: 2px solid inherit;
  }
}
</style>
