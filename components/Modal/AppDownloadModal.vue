<template>
  <b-modal
    ref="appDownloadModal"
    :value="SHOW_APP_DOWNLOAD_MODAL"
    hide-header
    hide-footer
    no-close-on-backdrop
    class="app-download-modal"
  >
    <div class="modal-info">
      <div class="modal-info__image-container">
        <img
          class="modal-info__image"
          src="/app_download_modal.png"
          alt="/app_download_modal.png"
        />
      </div>
      <p class="modal-info__title">
        <span>FITCHOO 모바일 앱</span>으로 편하게 이용하세요!
      </p>
      <p class="modal-info__subtitle">
        내 스타일과 키에 딱 맞는 모델을 찾고 <br/>효과적으로 쇼핑해보세요!
      </p>
    </div>

    <div class="modal-button-container">

      <button
        class="modal-button-ios"
        @click="goToIosDownload"
      >
        <i class="fab fa-apple"></i> IOS
      </button>

      <button class="modal-button-android" @click="goToAppDownload">
        <i class="fab fa-google-play"></i> Google Play
      </button>
      
    </div>

    <div class="outside-container">
      <span class="outside-message" @click="closeAppDownloadModal"
        >그냥 모바일 웹으로 볼래요</span
      >
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
    ...mapGetters(["SHOW_APP_DOWNLOAD_MODAL"])

  },

  mounted() {
    const modalHeader = this.$refs.appDownloadModal.$el.children[0].children[0]
      .children[0].children[0].children[0];
    modalHeader.style.borderBottom = "0";
  },

  created() {
    if (this.$route.name.includes("model")) {
      this.alertMessage = "로그인하고 마음에 드는 모델을 팔로우해보세요.";
    }
    if (localStorage.getItem("showAppDownload") ) {
        this.$store.dispatch("openAppDownloadModal",true);
    }
    else if (!localStorage.getItem("showAppDownload") ) {
      // this.$refs.appDownloadModal.style.display = "none !important";
      // this.$refs.appDownloadModal.style.visibility = "hidden !important";
      this.$store.dispatch("openAppDownloadModal",false);
    }
   if ( this.$store.dispatch("openAppDownloadModal")) {
        localStorage.removeItem("showAppDownload");
    }
  },

  methods: {
    ...mapActions(["closeAppDownloadModal"]),

    goToAppDownload() {
      if (this.$store.getters.IS_LOGGED_IN) {
        this.$amplitude
          .getInstance()
          .logEvent("click download", { downloadPage: "회원가입 후" });
      } else {
        this.$amplitude
          .getInstance()
          .logEvent("click download", { downloadPage: "첫 검색 시" });
      }

      this.$store.dispatch("closeAppDownloadModal");
      window.open(
        "https://play.google.com/store/apps/details?id=com.memory.and.fitchoo"
      );
    },

     goToIosDownload() {
      if (this.$store.getters.IS_LOGGED_IN) {
        this.$amplitude
          .getInstance()
          .logEvent("click download", { downloadPage: "회원가입 후" });
      } else {
        this.$amplitude
          .getInstance()
          .logEvent("click download", { downloadPage: "첫 검색 시" });
      }

      this.$store.dispatch("closeAppDownloadModal");
      window.open(
        "https://apps.apple.com/us/app/%ED%95%8F%EC%B8%84-fitchoo/id1476347043?l=ko&ls=1"
      );
    }
    

  }
};
</script>
<style scoped lang="scss">
i{
  padding-right:5px;
}

.modal-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &__title {
    margin: 10px 0;
    font-size: 1.3em;
    font-weight: 800;
    color: $black;
    word-break: keep-all;
    width: 200px;

    span {
      color: $primary;
    }
  }

  &__subtitle {
    margin: 5px 0;
    padding-bottom: 10px;
    font-size: 0.8em;
    font-weight: 600;
    color: gray;
    word-break: keep-all;
    width: 200px;
  }

  &__image-container {
    width: 100%;
  }

  &__image {
    width: 100%;
  }
}

.login-button-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.modal-button {
  // margin-top: 1rem;
  // width: 48%;
  // color: $white;
  // background-color: #000000;
  // height: 40px;
  // border: 0;
  // border-radius: 4px;
  // font-size: 0.9em;
  // font-weight: bold;
  // display: block;

  &--unfocused {
    color: #8d8d8d;
    background-color: #d9d9d9;
  }

  &-ios {
    margin-right:2%;
    margin-top: 1rem;
  width: 48%;
  color: $white;
  background-color: #000000;
  height: 40px;
  border: 0;
  border-radius: 4px;
  font-size: 0.9em;
  font-weight: 500;
  display: block;
  }

  &-android {
    margin-left:2%;
    margin-top: 1rem;
  width: 48%;
  color: $white;
  background-color: #000000;
  height: 40px;
  border: 0;
  border-radius: 4px;
  font-size: 0.9em;
  font-weight: 500;
  display: block;
  }

  &-container {
    display:flex;
  }

  &:focus,
  &:hover {
    border: 2px solid inherit;
  }
}

.outside-container {
  width: 92%;
  bottom: -30px;
  max-width: 500px;
  // background-color: aqua;
  display: flex;
  justify-content: center;
  position: absolute;
}

.outside-message {
  color: $white;
  border-bottom: 1px solid $white;
  font-weight: 600;
}
</style>
