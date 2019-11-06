<template>

  <div class="app-bottom-nav">

    <button
      class="app-bottom-nav__button"
      :class="{ 'app-bottom-nav--active': isActive('/home', CURRENT_ROUTE) }"
      @click="goToRoute('/home')"
    >
      <span class="material-icons app-bottom-nav__icon">
      home
      </span>
      <span class="app-bottom-nav__name">홈</span>
    </button>

<button
      class="app-bottom-nav__button"
      :class="{
        'app-bottom-nav--active': isActive('/collection', CURRENT_ROUTE)
      }"
      @click="goToRoute('/collection')"
    >
      <span class="material-icons app-bottom-nav__icon">
        dashboard
      </span>
      <span class="app-bottom-nav__name">내키의상품</span>
    </button>

    <button
      class="app-bottom-nav__button"
      :class="{ 'app-bottom-nav--active': isActive('/model', CURRENT_ROUTE) }"
      @click="goToRoute('/model')"
    >
      <span class="material-icons app-bottom-nav__icon">
        format_align_left
      </span>
      <span class="app-bottom-nav__name">모델 찾기</span>
    </button>
    
    <button
      class="app-bottom-nav__button"
      :class="{
        'app-bottom-nav--active': isActive('/exhibition', CURRENT_ROUTE)
      }"
      @click="goToRoute('/exhibition')"
    >
      <i class="material-icons app-bottom-nav__icon">
        star_border
      </i>
      <span class="app-bottom-nav__name">체형별기획전</span>
    </button>

    <button
      class="app-bottom-nav__button"
      :class="{ 'app-bottom-nav--active': isActive('/myPage', CURRENT_ROUTE) }"
      @click="goToRoute('/myPage')"
    >
      <span class="material-icons app-bottom-nav__icon">
        person
      </span>

      <span class="app-bottom-nav__name">마이</span>
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  
  computed: {
    ...mapGetters(["CURRENT_ROUTE"]),


    isMyPageActive() {
      return this.$route.name.includes("myPage") ||
        this.$route.name.includes("login") ||
        this.$route.name.includes("privacy") ||
        this.$route.name.includes("terms") ||
        this.$route.name.includes("contact") ||
        this.$route.name.includes("follow") ||
        this.$route.name.includes("recentProduct") ||
        this.$route.name.includes("saved")
        ? true
        : false;
    }
  },

  methods: {
    isActive(route, currentRoute) {
      if( currentRoute == null) {

      }
      else if (
        currentRoute.includes("login") ||
        currentRoute.includes("privacy") ||
        currentRoute.includes("terms") ||
        currentRoute.includes("contact") ||
        currentRoute.includes("follow")||
        currentRoute.includes("recentProduct")||
        currentRoute.includes("saved")
      ) {
        currentRoute = "/myPage";
      }

      return currentRoute.includes(route) ? true : false;
    },

    goToRoute(path) {
      this.$store.dispatch("setCurrentRoute", path);
      this.$router.push(path);
    }
  }
};
</script>

<style lang="scss" scoped>

.inactiveLogo{
  width:19px;
}

.activeLogo{
  width:19px;
}

.app-bottom-nav {
  margin: 0;
  border: 0;
  border-radius: 0;
  width: 100%;
  max-width: 500px;
  height: 55px;
  position: fixed;
  bottom: 0;
  background: #fff;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  align-content: center;
  z-index: 101;
box-shadow: 0px -8px 24px -5px rgba(0, 0, 0, 0.1);

  &__button {
    width: 25%;
    height: 45px;
    font-size: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    color: #222222;
  }

  &__icon {
    padding-bottom: 2px;
    font-size: 1.3em;
    width: 20px;
    height: auto;
  }

  &__name {
    // font-weight: 600;
    font-size: 0.7em;
  }

  &--active {
    color: $primary;
    font-weight: 600;
  }

  a {
    text-decoration: none;
    color: $white;
    font-weight: 600;
  }
}

.fa-f:before {
  font-weight: bold;
  content:'F';
}

</style>
