<template>
  <transition>
  <div class="layout-container">
    <div class="mobile-container">
      <AppHeader />
      <div class="header-space"></div>

      <!-- <div v-if="$nuxt.isOffline" class="offline">
        <h1>오프라인이시네요!</h1>
        <h3>인터넷 연결을 확인해주세요.</h3>
      </div> -->

      <AppBottomNav></AppBottomNav>
      <v-app>
        <nuxt/>
      </v-app>
    </div>
  </div>
  </transition>
</template>

<script>
import AppHeader from "@/components/App/AppHeader";
import AppBottomNav from "@/components/App/AppBottomNav";

export default {
  components: {
    AppHeader,
    AppBottomNav
  },

    transition ( to, from  ) {
    if (localStorage.getItem("previousPage")=="model-id" ||
        this.route.name.includes("model") ) {
      return 'slideLeft'
    }
    else {
      return 'nothing'
    }
  },
};
</script>

<style lang="scss" scoped>
.layout-container {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  background-color: #f1f1f1;
  height: 100%;
}

.mobile-container {
  width:-webkit-fill-available;
  max-width: 500px;
  // width: 500px;
  background-color: white;
  min-height: 100%;
}

.header-space {
  height: 40px;
}

.offline {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-align: center;
  height: 100vh;
  color: $primary;
}
</style>
