<template>
  <div>
    <b-nav v-if="HAS_LOGO" class="app-header">
      <img class="logo" src="/fitchoo_logo.png" @click="goToHome" />
    </b-nav>

    <b-nav v-else class="app-header-no-logo">
      <i class="material-icons app-header-no-logo__back" @click="goToBackPage">
        arrow_back_ios
      </i>
      <h1 class="app-header-no-logo__title">{{ title }}</h1>
    </b-nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["HAS_LOGO"]),

    title() {
      return this.$store.getters.HEADER_TITLE;
    }
  },

  methods: {
    goToHome() {
      this.$router.push("/home");
    },

    goToBackPage() {

      if(this.$route.name.includes('exhibition')){
        if (localStorage.getItem('previousPage') == 'exhibition') {
         this.$router.push('/exhibition');
        }
        else if(localStorage.getItem('previousPage') == 'model') {
          this.$router.go(-1);
        }
        else {
          this.$router.go(-1);
        }
      }
      else if (this.$route.name.includes('product')) {

       if (localStorage.getItem("recentProductId") != 0) {
        // const recentProductId = JSON.parse(localStorage.recentProductId);
        
        // recentProductId.pop();

        // const newSetProduct = recentProductId[recentProductId.length -1];

        // this.$store.dispatch("setProductInfo", newSetProduct);
        // localStorage.setItem("product", JSON.stringify(newSetProduct));

        // if (this.$router.go(2) == "collection") {
        //   console.log("여기왔어?");
        //  const recentModelId = JSON.parse(localStorage.recentModelId);
        // const newSetModel = recentModelId[0];

        // this.$store.dispatch("setModel", newSetModel);
        // localStorage.setItem("model", JSON.stringify(newSetModel));
      
        // localStorage.setItem("backButton","1");

        // this.$router.go(-2);
        
        // }
        // else 
        // {
          console.log("응안갔어~");
        const recentModelId = JSON.parse(localStorage.recentModelId);
        const newSetModel = recentModelId[recentModelId.length -2];

        const recentProductId = JSON.parse(localStorage.recentProductId);
        const newSetProduct = recentProductId[recentProductId.length -2];

        if (newSetModel == '' ||
        newSetModel == null) {
          console.log("어디냐");
        localStorage.setItem("backButton","1");
        this.$router.go(-1);
        }
        else {
          console.log("어디이이야~");
        this.$store.dispatch("setModel", newSetModel);
        localStorage.setItem("model", JSON.stringify(newSetModel));
        this.$store.dispatch("setProductInfo", newSetProduct);
        localStorage.setItem("product", JSON.stringify(newSetProduct));
      
        localStorage.setItem("backButton","1");

        this.$router.go(-1);
        }
        // }
       }
       else {
          console.log("설마여기를?");
        const recentModelId = JSON.parse(localStorage.recentModelId);
        const newSetModel = recentModelId[recentModelId.length -2];

        this.$store.dispatch("setModel", newSetModel);
        localStorage.setItem("model", JSON.stringify(newSetModel));
      
        localStorage.setItem("backButton","1");

        
        this.$router.go(-1);
       }
      }
      else {
          console.log("여기는아닐거고");
          this.$router.go(-1);
      }
    }
  },

  beforeRouteEnter(to, from, next) {
    next();
  }
};
</script>

<style scoped lang="scss">
.app-header {
  padding: 8px 10px;
  background-color: $white;
  color: $white;
  position: fixed;
  overflow: hidden;
  height: 40px;
  width: 100%;
  max-width: 500px;
  box-shadow: none;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  z-index: 7;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.1);
}

.logo {
  width: 85px;
  height: auto;
}

.app-header-no-logo {
  padding: 8px 10px;
  border-bottom: solid 1px $light-grey;
  background-color: $white;
  color: $black;
  position: fixed;
  overflow: hidden;
  height: 40px;
  width: 100%;
  max-width: 500px;
  box-shadow: none;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  z-index: 4;

  &__back {
    font-size: 1.1em;
    position: absolute;
    left: 15px;
  }

  &__title {
    margin: 0;
    padding: 0;
    font-weight: 600;
    font-size: 1.1em;
  }
}
</style>
