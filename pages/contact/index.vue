<template>
<transition name="slideRight">
  <main class="contact-container">

    <h1 class="contact-title">이용문의 혹은 개선사항이 있으세요?</h1>
    <div class="subtitle-container">
      <h2 class="contact-subtitle ">
        무엇이든 괜찮아요! 인스타그램 DM을 보내주세요.
      </h2>
      <h2 class="contact-subtitle ">빠른 시간 내에 답변드릴 거에요!</h2>
    </div>

    <img class="image" src="instagram.png" />
    <h1 class="instagram-id">@fitchoo_style</h1>
    <button class="button" @click="clickInstagram">
      FITCHOO 인스타그램 계정 바로가기
    </button>
  </main>
</transition>
</template>

<script>
export default {
          transition: 'slideRight',
  mounted() {
    this.$store.dispatch("setHeaderTitle", "이용문의");
    this.$store.dispatch("hideLogo");
    this.$store.dispatch("setCurrentRoute", this.$route.path);
  },

  methods: {
    clickInstagram() {
      window.open("https://www.instagram.com/fitchoo_style/");
    }
  },

  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("showLogo");
    next();
  }
};
</script>

<style lang="scss" scoped>
.contact-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  // min-height: 90vh;
  height: 90vh;
  justify-content: flex-start;
  align-items: center;
}

.contact-title {
  text-align: center;
  margin: 80px 0 20px 0;
  font-size: 1.5em;
  font-weight: 600;
  letter-spacing: -0.05em;
}

.subtitle-container {
  margin: 10px 0;
  text-align: center;
}

.contact-subtitle {
  font-size: 0.9em;
  color: $grey;
}

.image {
  margin-top: 20px;
  width: 50px;
}

.instagram-id {
  margin: 10px 0 30px 0;
  font-size: 1em;
  font-weight: 600;
}

.button {
  margin-top: 20px;
  padding: 10px 50px;
  border-radius: 4px;
  background-color: $dark-grey;
  color: $white;
  font-weight: 600;
  font-size: 0.9em;
}
</style>
