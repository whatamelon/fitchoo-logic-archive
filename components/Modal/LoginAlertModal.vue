<template>
  <b-modal
    v-model="SHOW_LOGIN_ALERT_MODAL"
    centered
    hide-header
    hide-footer
    no-close-on-backdrop
  >
    <div class="login-alert">
      <div class="login-image-container">
        <img class="login-image" src="/login.png" alt="/login.png" />
      </div>
      <p class="login-alert__title"><span>로그인</span>이 필요해요~</p>
      <p class="login-alert__subtitle">
        로그인하고 마음껏 팔로우하고 찜하고!
      </p>
    </div>

    <div class="login-button-container">
      <button
        class="modal-button modal-button--unfocused"
        @click="closeLoginAlertModal"
      >
        지금 안 할래요
      </button>
      <button class="modal-button" @click="goToLogin">
        로그인하러 가기
      </button>
    </div>
  </b-modal>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      alertMessage: "로그인하고 나한테 딱 맞는 바지를 찾아보세요."
    };
  },

  computed: {
    ...mapGetters(["SHOW_LOGIN_ALERT_MODAL"])
  },

  created() {
    if (this.$route.name.includes("model")) {
      this.alertMessage = "로그인하고 마음에 드는 모델을 팔로우해보세요.";
    }
  },

  methods: {
    ...mapActions(["closeLoginAlertModal"]),

    goToLogin() {
      this.$store.dispatch("closeLoginAlertModal");
      this.$router.push("/myPage");
      localStorage.setItem("wantLogin" , "1");

      if ( this.$route.name.includes("myPage")) {
        window.location.reload(true);
        localStorage.setItem("wantLogin" , "1");
      }
    }
  }
};
</script>
<style scoped lang="scss">
.login-alert {
  text-align: center;

  &__title {
    margin: 20px 0 10px 0;
    font-size: 1.5em;
    font-weight: 800;
    color: $black;
    word-break: keep-all;

    span {
      color: $primary;
    }
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

.login-image-container {
  width: 100%;
}

.login-image {
  width: 200px;
}

.login-button-container {
  display: flex;
  justify-content: space-between;
}

.modal-button {
  width: 48%;
  color: $white;
  background-color: $dark-grey;
  height: 45px;
  border: 0;
  border-radius: 4px;
  font-size: 1em;
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
