<template>
  <main class="login-container">

    <AppSpinner v-if="IS_LOADING" />

    <LoginAlertModal
      :show-login-alert-modal="showLoginAlertModal"
      @closeModal="hideModal"
    />

    <b-modal
      ref="exitAlertModal"
      v-model="showExitModal"
      centered
      hide-header
      hide-footer
    >
      <div class="exit-alert">
        <p class="exit-alert__title">
          저장되지 않은 정보가 있어요!
        </p>
        <p class="exit-alert__subtitle">
          그래도 나가시겠어요?
        </p>
      </div>

      <div class="exit-button-container">
        <button
          class="modal-button modal-button--unfocused"
          @click="exitModal()"
        >
          예
        </button>
        <button class="modal-button" @click="hideModal">
          아니오
        </button>
      </div>
    </b-modal>

    <div class="fc-title">
      <img class="fc-title__logo" src="/dark_logo.png" />
      <h4>딱 맞는 온라인 쇼핑</h4>
    </div>

    <form v-if="status == 'login'" class="login-form">
      <!-- <h5 class="form__status">
        로그인
      </h5> -->

      <input
        v-model="form.email"
        class="login-form__input"
        type="email"
        required
        placeholder="이메일"
      />
      <span class="login-form--border-bottom"></span>
      <input
        v-model="form.passwd"
        class="login-form__input"
        type="password"
        required
        placeholder="비밀번호"
      />
      <span class="login-form--border-bottom"></span>
      <!-- <b-form-group v-if="status == 'login'" class="form__check">
        <b-form-checkbox-group v-model="form.saveLogin">
          <b-form-checkbox value="true">
            <span> 자동 로그인</span>
          </b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group> -->
    </form>

    <form v-if="status == 'register'" class="login-form">
      <!-- <h5 class="form__status">
        회원가입
      </h5> -->

      <input
        v-model="form.email"
        class="login-form__input"
        type="email"
        required
        placeholder="이메일"
      />
      <span class="login-form--border-bottom"></span>
      <input
        v-model="form.passwd"
        class="login-form__input"
        type="password"
        required
        placeholder="비밀번호 (6자리 이상)"
      />
      <span class="login-form--border-bottom"></span>
      <input
        v-model="form.passwordConfirm"
        class="login-form__input"
        type="password"
        required
        placeholder="비밀번호 재입력"
      />
      <span class="login-form--border-bottom"></span>
    </form>

    <b-alert
      class="login-alert"
      :show="dismissCountDown"
      variant="light"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
    >
      {{ alertMessage }}
    </b-alert>
    <TermsOfService />

    <div class="button-container">
      <button
        v-if="status == 'login'"
        class="login-button login-button--primary"
        @click="clickLoginButton"
      >
        로그인
      </button>
      <button
        v-if="status == 'register'"
        class="login-button login-button--primary"
        @click="clickSignUpButton"
      >
        회원가입
      </button>
    </div>

    <p v-if="status == 'register'" class="terms">
      가입시 FITCHOO의
      <a v-b-modal.termsOfService>이용약관</a>과
      <a v-b-modal.personalInfo>개인정보처리방침</a>에 동의합니다.
    </p>
    <div class="bottom-container">
      <div class="bottom-container__right">
        <a
          v-if="status == 'login'"
          class="register"
          @click="switchStatus('register')"
          >회원가입하기</a
        >
        <a v-if="status == 'register'" @click="switchStatus('login')"
          >로그인하기</a
        >
      </div>
    </div>

    <PersonalInfoPolicy />
  </main>
</template>

<script>
import AppSpinner from "@/components/App/AppSpinner";
import LoginAlertModal from "@/components/Modal/LoginAlertModal";
import PersonalInfoPolicy from "@/components/Modal/PersonalInfoPolicy";
import TermsOfService from "@/components/Modal/TermsOfService";

import { mapGetters, mapActions } from "vuex";

import { signUpAPI } from "@/api/auth";

export default {
  layout: "noBottom",

  components: {
    AppSpinner,
    LoginAlertModal,
    PersonalInfoPolicy,
    TermsOfService
  },

  data() {
    return {
      status: "login",
      form: {
        appType: window.OsType || "web",
        email: "",
        passwd: "",
        pushKey: window.PushToken || "",
        snsId: "",
        snsType: "local"
      },
      alertMessage: "",
      dismissSecs: 3,
      dismissCountDown: 0,
      showLoginAlertModal: false,
      showExitModal: false
    };
  },

  computed: {
    ...mapGetters(["IS_LOADING"])
  },

  asyncData({ next }) {
    if (!localStorage.getItem("height")) {
      next("/index");
    }
  },

  created() {
    this.$store.dispatch("setCurrentRoute", this.$route.path);
    setTimeout(() => {
      this.$store.dispatch("endLoading");
    }, 800);
  },

  mounted() {
    this.$store.dispatch("setHeaderTitle", "로그인/회원가입");
    this.$store.dispatch("hideLogo");
  },

  methods: {
    ...mapActions(["login"]),
    hideModal() {
      this.showLoginAlertModal = false;
      this.showExitModal = false;
    },

    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },

    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },

    switchStatus(status) {
      if (
        (status == "login" && this.form.email != "") ||
        (status == "login" && this.form.passwd != "") ||
        (status == "login" && this.form.passwordConfirm != "")
      ) {
        this.showExitModal = true;
        return;
      }

      this.form.email = "";
      this.form.passwd = "";
      this.form.passwordConfirm = "";
      // this.form.saveLogin = true;
      this.status = status;
    },

    exitModal() {
      this.showExitModal = false;
      this.form = {
        email: "",
        passwd: "",
        passwordConfirm: ""
      };
      this.status = "login";
    },

    clickSignUpButton() {
      const signUpForm = this.form;

      signUpForm.snsType = "local";

      if (signUpForm.passwd !== signUpForm.passwordConfirm) {
        this.alertMessage = "비밀번호가 일치하지 않습니다.";
        this.showAlert();
        return;
      } else if (signUpForm.passwd.length < 6) {
        this.alertMessage = "6자리 이상의 비밀번호를 사용해주세요.";
        this.showAlert();
        return;
      } else if (
        !signUpForm.email.includes("@") ||
        !signUpForm.email.includes(".")
      ) {
        this.alertMessage = "이메일 형태의 아이디를 사용해주세요.";
        this.showAlert();
        return;
      }

      signUpAPI(signUpForm).then(async res => {
        if (res.status == 200) {
          this.$amplitude
            .getInstance()
            .logEvent("complete sign-up", { signUpMethod: "email" });

          await this.$store.dispatch("sendHeight", localStorage.height);
          await this.$store.dispatch("setUserInfo");
          localStorage.showAppDownload = 1;
          this.$router.push("/model");
        } else if (res.message == "email collision") {
          this.alertMessage = "이미 사용중인 이메일입니다.";
          this.showAlert();
          return;
        } else {
          this.alertMessage = res.message;
          this.showAlert();
          return;
        }
      });
    },

    async clickLoginButton() {
      const loginForm = this.form;

      if (loginForm.email.length < 1) {
        this.alertMessage = "이메일을 입력해주세요.";
        this.showAlert();
        return;
      } else if (loginForm.passwd.length < 1) {
        this.alertMessage = "비밀번호를 입력해주세요.";
        this.showAlert();
        return;
      }

      const response = await this.$store.dispatch("login", loginForm);

      if (response.status === 200) {
        this.$router.push("/model");
      } else if (response.message === "there is no user") {
        this.alertMessage = "가입하지 않은 사용자입니다.";
        this.showAlert();
        return;
      } else if (response.message === "wrong password") {
        this.alertMessage = "틀린 비밀번호입니다.";
        this.showAlert();
        return;
      } else {
        this.alertMessage = "이메일 또는 비밀번호를 확인해주세요.";
        this.showAlert();
        return;
      }
    }
  },

  async beforeRouteLeave(to, from, next) {
    await this.$store.dispatch("startLoading");
    this.$store.dispatch("showLogo");

    next();
  }
};
</script>

<style scoped lang="scss">
.login-container {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  height: 100%;
}

.login-alert {
  color: $primary;
  position: absolute;
  width: 100%;
  text-align: center;
  left: 50%;
  transform: translate(-50%, -50%);
  word-break: keep-all;
  word-wrap: break-word;
}

.exit-alert {
  text-align: center;

  &__title {
    margin: 20px 0 10px 0;
    font-size: 1.5em;
    font-weight: 800;
    color: $black;
    word-break: keep-all;
  }

  &__subtitle {
    margin: 10px 0;
    padding-bottom: 10px;
    font-size: 1em;
    font-weight: normal;
    color: gray;
    word-break: keep-all;
  }
}

.exit-button-container {
  display: flex;
  justify-content: space-between;
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

.fc-title {
  width: 100%;
  padding: 50px 10px 0 10px;
  text-align: center;

  &__logo {
    width: 50%;
    height: auto;
  }

  h4 {
    padding-top: 0.7em;
    font-size: 1em;
    // color: $grey;
  }
}

.login-form {
  padding: 10px 0 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  &__input {
    width: 100%;
    margin: 10px 0 0 0;
    padding: 0px 20px !important;
    height: 40px;
    max-width: 500px;
    padding: 10px 5px;
    // border-bottom: 1px solid $grey;
    // border-radius: 5px;
    font-size: 16px;
  }

  &__check {
    margin: 10px 20px;
    padding: 0.5em 0;
    display: flex;
    align-items: center;
    align-content: center;
  }

  &__status {
    margin: 10px 20px;
    text-align: left;
    font-size: 1em;
    font-weight: 600;
  }

  &--border-bottom {
    margin: 0 20px 10px 20px;
    border-bottom: 1px solid $grey;
  }
}

.button-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.login-button {
  margin: 20px;
  padding: 10px;
  width: 100%;
  border: 1px solid $black;
  border-radius: 4px;
  color: $white;
  font: 1em;
  font-weight: 600;

  &--primary {
    background-color: $black;
  }

  &--facebook {
    border: 1px solid $facebook;
    background-color: $facebook;
  }

  &--image {
    width: 200px;
  }
}

.bottom-container {
  padding: 20px;

  &__left {
    float: left;
  }

  &__right {
    float: right;
    font-weight: 600;
  }
}

.terms {
  padding: 20px 40px;
  font-size: 0.9em;
  text-align: center;

  a {
    text-decoration-line: underline;
    color: $primary;
  }
}
</style>
