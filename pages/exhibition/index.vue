<template>
<transition>
  <main class="exhibition">
<!-- <noscript style="
    display: none;
    visibility: hidden;
    height: 0px;
    width: 0px;
    max-width: 0px;
    max-height: 0px;
    border: none;
">
  <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5KW535K"
  height="0" width="0" left="0" top="0"
  style="visibility:hidden;display:none;border:none;height:0px;width:0px;max-width: 0px;max-height: 0px;">
  </iframe>
</noscript> -->

    <div class="exhibition__title-container">
      <!-- <h2 class="exhibition__title">FITCHOO의 체형별</h2> -->
      <span class="exhibition__title">체형별</span>
      <span class="exhibition__subtitle">맞춤 상품 기획전</span>
    </div>
    <div v-for="exhibition in exhibitions" :key="exhibition.code">
      <AppCard :exhibition="exhibition" class="app-card"></AppCard>
    </div>
  </main>
</transition>
</template>

<script>
import AppCard from "@/components/App/AppCard";

export default {
  components: {
    AppCard
  },

  transition ( to, from  ) {
    if (localStorage.getItem("previousPage")=="exhibition-id" ) {
      return 'slideLeft'
    }
    else {
      return 'nothing'
    }
  },

  asyncData({ store }) {
    return {
      exhibitions: store.getters.EXHIBITIONS
    };
  },

  created() {
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
  
        const recentModelId = JSON.parse(localStorage.recentModelId);
        recentModelId.length = 0;
        localStorage.recentModelId = JSON.stringify(recentModelId);

         const recentProductId = JSON.parse(localStorage.recentProductId);
        recentProductId.length = 0;
        localStorage.recentProductId = JSON.stringify(recentProductId);
    
  
    this.$amplitude.getInstance().logEvent("page view exhibition");

    this.$store.dispatch("setCurrentRoute", this.$route.path);

    if (!this.$store.getters.USER_HEIGHT) {
      this.$router.push("/");
    }
    setTimeout(() => {
      this.$store.dispatch("endLoading");
    }, 500);
  },

  async beforeRouteLeave(to, from, next) {
    await this.$store.dispatch("startLoading");
    localStorage.setItem("routerStack",this.$route.path);

    next();
  }
};
</script>

<style lang="scss" scoped>
.exhibition {
  margin: 0;
  padding: 20px 20px 20% 20px;
  height: 100%;
  min-height: 100vh;

  &__title-container {
    margin-bottom: 20px;
    display: flex;
    // flex-direction: column;
  }

  &__title {
    margin-right: 7px;
    font-size: 1.8em;
    color: $primary;
    font-weight: 600;
  }

  &__subtitle {
    font-size: 1.8em;
    color: $dark-grey;
    font-weight: 600;
  }
}

.app-card {
  margin-bottom: 20px;
}
</style>
