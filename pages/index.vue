<template>
  <main class="size-input-container">

    <div class="canvas">
      <div class="bubble">
        <img
          style="width: 100%; height: 100%; border-radius: 50%;"
          src="kimehwa_small.jpg"
        />
      </div>
      <div class="bubble">
        <img
          style="width: 100%; height: 100%; border-radius: 50%;"
          src="/4xshop_small.JPG"
        />
      </div>
      <div class="bubble">
        <img
          style="width: 100%; height: 100%; border-radius: 50%;"
          src="/bammyshop_by_small.jpg"
        />
      </div>
      <div class="bubble">
        <img
          style="width: 100%; height: 100%; border-radius: 50%;"
          src="/moon_gm_small.JPG"
        />
      </div>
      <div class="bubble">
        <img
          style="width: 100%; height: 100%; border-radius: 50%;"
          src="/oineroi_small.jpg.JPG"
        />
      </div>
      <div class="bubble">
        <img
          style="width: 100%; height: 100%; border-radius: 50%;"
          src="/inpeachglow_small.jpg.JPG"
        />
      </div>
      
    </div>

    <main class="size-input">
      <div class="size-input__container">
        <h1 class="size-input__title">내 키를 입력해보세요.</h1>
        <h1 class="size-input__title">나와 비슷한 키의</h1>
        <h2 class="size-input__subtitle">쇼핑몰 모델을 추천해드려요.</h2>
      </div>

      <div class="input">
        <input
          v-model="height"
          class="input__bottom"
          type="text"
          maxlength="3"
          pattern="[0-9]*"
          @input="inputCheck"
          @keypress="isNumber($event)"
        />
        <b class="input__cm">cm</b>
      </div>

      <div class="button-container">
        <button
          class="button"
          :class="{ 'button--active': isActive }"
          @click="clickButton"
        >
          모델을 추천해주세요!
        </button>
      </div>

      <AppAlert
        ref="appAlert"
        :alert-message="'엇! 키 입력을 확인해주세요!'"
      ></AppAlert>
    </main>
  </main>
</template>

<script>
import AppAlert from "@/components/App/AppAlert";
export default {
  layout: "blank",

  components: {
    AppAlert
  },

  data() {
    return {
      height: "",
      isActive: false
    };
  },

  asyncData({ next }) {
    if (localStorage.getItem("height")) {
      next("/home");
    }
  },

  created() {
    this.$amplitude.getInstance().logEvent("page view model-search");
    setTimeout(() => {
      this.$store.dispatch("endLoading");
    }, 800);
  },

  methods: {
    inputCheck() {
      this.isActive =
        this.height.length === 3 &&
        !isNaN(this.height) &&
        this.height > 0 &&
        this.height < 300
          ? true
          : false;
    },

    isNumber: function(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();;
      } else {
        return true;
      }
    },

    clickButton() {
      if (this.isActive) {
        const userProperties = {
          userHeight: this.height
        };
        this.$amplitude.getInstance().setUserProperties(userProperties);

        localStorage.setItem("height", this.height);
        this.$store.dispatch("setHeight", this.height);
        this.$store.dispatch("sendHeight", this.height);

        location.replace(document.URL + "redirect");
      } else {
        this.$refs.appAlert.showAlert();
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
.size-input {
  padding: 14% 0 0 0;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  max-width: 500px;
  height: 100vh;
  overflow: hidden;

  &__container {
    padding: 0 5%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  &__title {
    margin: 5px 0;
    font-size: 1.7em;
    font-weight: 500;
    letter-spacing: -1px;
    color: $white;
  }

  &__subtitle {
    margin: 5px 0;
    font-size: 1.7em;
    font-weight: 700;
    letter-spacing: -1px;
    color: $white;
  }
}

.input {
  align-items: flex-end;
  display: flex;
  justify-content: center;
  padding: 50% 0 10% 0;
  border-radius: 0;
  color: $white;

  &__bottom {
    border: 0;
    border-bottom: 3px solid $white;
    border-radius: 0;
    padding: 0;
    background: transparent;
    font-weight: 600;
    font-size: 1.8em;
    outline: 0;
    width: 70px;
    margin-left: 3px;
    margin-top: 15px;
    text-align: center;
    color: $white;
  }

  &__cm {
    font-weight: 600;
    font-size: 2em;
    color: $black;
    margin-top: 15px;
    color: $white;
  }
}

.button-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.button {
  padding: 10px;
  width: 80%;
  border: 2px solid $white;
  border-radius: 25px;
  font-size: 1em;
  font-weight: 600;
  color: $white;

  &--active {
    border: 0;
    background-color: $white;
    color: $primary;
  }
}

.image-container {
  // position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 500px;
}

.image {
  width: 100%;
  opacity: 0.5;
}


.canvas {
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(to top, #eb3349, #f45c43);
  position: absolute;
  overflow: hidden;
  max-width:-webkit-fill-available;
}
.bubble {
  display: block;
  border-radius: 100%;
  opacity: 0.8;
  position: absolute;
}
.bubble:nth-child(1) {
  background: radial-gradient(
    ellipse at center,
    #b8c6c6 0%,
    #30b3d3 46%,
    #20628c 100%
  );
  width: 100px;
  height:100px;
  left: 10vw;
  bottom: 100vh;
  -webkit-animation: move1 infinite 5s;
  animation: move1 infinite 5s;
}
@-webkit-keyframes move1 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 100vh;
    -webkit-transform: translate(10px, 0);
    transform: translate(10px, 0);
    opacity: 0;
  }
}
@keyframes move1 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 100vh;
    -webkit-transform: translate(10px, 0);
    transform: translate(10px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(2) {
  background: radial-gradient(
    ellipse at top right,
    #b8c6c6 0%,
    #30b3d3 46%,
    #20628c 100%
  );
  width: 100px;
  height: 100px;
  left: 10vw;
  bottom: 100vh;
  -webkit-animation: move2 infinite 10s;
  animation: move2 infinite 10s;
}
@-webkit-keyframes move2 {
  0% {
    bottom: -50px;
  }
  100% {
    bottom: 100vh;
    -webkit-transform: translate(-150px, 0);
    transform: translate(-150px, 0);
    opacity: 0;
  }
}
@keyframes move2 {
  0% {
    bottom: -50px;
  }
  100% {
    bottom: 100vh;
    -webkit-transform: translate(-150px, 0);
    transform: translate(-150px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(3) {
  background: radial-gradient(
    ellipse at center,
    #b8c6c6 0%,
    #30b3d3 46%,
    #20628c 100%
  );
  width: 100px;
  height: 100px;
  left: 10vw;
  bottom: 100vh;
  -webkit-animation: move3 infinite 7s;
  animation: move3 infinite 7s;
}
@-webkit-keyframes move3 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 100vh;
    -webkit-transform: translate(150px, 0);
    transform: translate(150px, 0);
    opacity: 0;
  }
}
@keyframes move3 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 100vh;
    -webkit-transform: translate(150px, 0);
    transform: translate(150px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(4) {
  background: radial-gradient(
    ellipse at top right,
    #b8c6c6 0%,
    #30b3d3 46%,
    #20628c 100%
  );
  width: 100px;
  height: 100px;
  left: 50vw;
  bottom: 100vh;
  -webkit-animation: move4 infinite 9s;
  animation: move4 infinite 9s;
}
@-webkit-keyframes move4 {
  0% {
    bottom: -50px;
  }
  100% {
    bottom: 100vh;
    -webkit-transform: translate(125px, 0);
    transform: translate(125px, 0);
    opacity: 0;
  }
}
@keyframes move4 {
  0% {
    bottom: -50px;
  }
  100% {
    bottom: 100vh;
    -webkit-transform: translate(125px, 0);
    transform: translate(125px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(5) {
  background: radial-gradient(
    ellipse at center,
    #b8c6c6 0%,
    #30b3d3 46%,
    #20628c 100%
  );
  width: 90px;
  height: 90px;
  left: 70vw;
  bottom: 120vh;
  -webkit-animation: move5 infinite 8s;
  animation: move5 infinite 8s;
}
@-webkit-keyframes move5 {
  0% {
    bottom: -200px;
  }
  100% {
    bottom: 120vh;
    -webkit-transform: translate(1px, 0);
    transform: translate(1px, 0);
    opacity: 0;
  }
}
@keyframes move5 {
  0% {
    bottom: -200px;
  }
  100% {
    bottom: 120vh;
    -webkit-transform: translate(1px, 0);
    transform: translate(1px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(6) {
  background: radial-gradient(
    ellipse at top right,
    #b8c6c6 0%,
    #30b3d3 46%,
    #20628c 100%
  );
  width: 100px;
  height: 100px;
  left: 80vw;
  bottom: 100vh;
  -webkit-animation: move6 infinite 10s;
  animation: move6 infinite 10s;
}
@-webkit-keyframes move6 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 100vh;
    -webkit-transform: translate(-120px, 0);
    transform: translate(-120px, 0);
    opacity: 0;
  }
}
@keyframes move6 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 100vh;
    -webkit-transform: translate(-120px, 0);
    transform: translate(-120px, 0);
    opacity: 0;
  }
}
// .bubble:nth-child(7) {
//   background: radial-gradient(
//     ellipse at center,
//     #b8c6c6 0%,
//     #30b3d3 46%,
//     #20628c 100%
//   );
//   width: 100px;
//   height: 100px;
//   left: 40vw;
//   bottom: 80vh;
//   -webkit-animation: move7 infinite 10s;
//   animation: move7 infinite 10s;
// }
// @-webkit-keyframes move7 {
//   0% {
//     bottom: -200px;
//   }
//   100% {
//     bottom: 80vh;
//     -webkit-transform: translate(120px, 0);
//     transform: translate(120px, 0);
//     opacity: 0;
//   }
// }
// @keyframes move7 {
//   0% {
//     bottom: -200px;
//   }
//   100% {
//     bottom: 80vh;
//     -webkit-transform: translate(120px, 0);
//     transform: translate(120px, 0);
//     opacity: 0;
//   }
// }
// .bubble:nth-child(8) {
//   background: radial-gradient(
//     ellipse at top right,
//     #b8c6c6 0%,
//     #30b3d3 46%,
//     #20628c 100%
//   );
//   width: 90px;
//   height: 90px;
//   left: 80vw;
//   bottom: 100vh;
//   -webkit-animation: move8 infinite 10s;
//   animation: move8 infinite 10s;
// }
// @-webkit-keyframes move8 {
//   0% {
//     bottom: -180px;
//   }
//   100% {
//     bottom: 100vh;
//     -webkit-transform: translate(1px, 0);
//     transform: translate(1px, 0);
//     opacity: 0;
//   }
// }
// @keyframes move8 {
//   0% {
//     bottom: -180px;
//   }
//   100% {
//     bottom: 100vh;
//     -webkit-transform: translate(1px, 0);
//     transform: translate(1px, 0);
//     opacity: 0;
//   }
// }
// .bubble:nth-child(9) {
//   background: radial-gradient(
//     ellipse at center,
//     #b8c6c6 0%,
//     #30b3d3 46%,
//     #20628c 100%
//   );
//   width: 100px;
//   height: 100px;
//   left: 88vw;
//   bottom: 70vh;
//   -webkit-animation: move9 infinite 5s;
//   animation: move9 infinite 5s;
// }
// @-webkit-keyframes move9 {
//   0% {
//     bottom: -50px;
//   }
//   100% {
//     bottom: 70vh;
//     -webkit-transform: translate(-155px, 0);
//     transform: translate(-155px, 0);
//     opacity: 0;
//   }
// }
// @keyframes move9 {
//   0% {
//     bottom: -50px;
//   }
//   100% {
//     bottom: 70vh;
//     -webkit-transform: translate(-155px, 0);
//     transform: translate(-155px, 0);
//     opacity: 0;
//   }
// }
// .bubble:nth-child(10) {
//   background: radial-gradient(
//     ellipse at top right,
//     #b8c6c6 0%,
//     #30b3d3 46%,
//     #20628c 100%
//   );
//   width: 90px;
//   height: 90px;
//   left: 64vw;
//   bottom: 60vh;
//   -webkit-animation: move10 infinite 7s;
//   animation: move10 infinite 7s;
// }
// @-webkit-keyframes move10 {
//   0% {
//     bottom: -200px;
//   }
//   100% {
//     bottom: 60vh;
//     -webkit-transform: translate(10px, 0);
//     transform: translate(10px, 0);
//     opacity: 0;
//   }
// }
// @keyframes move10 {
//   0% {
//     bottom: -200px;
//   }
//   100% {
//     bottom: 60vh;
//     -webkit-transform: translate(10px, 0);
//     transform: translate(10px, 0);
//     opacity: 0;
//   }
// }
// .bubble:nth-child(11) {
//   background: radial-gradient(
//     ellipse at center,
//     #b8c6c6 0%,
//     #30b3d3 46%,
//     #20628c 100%
//   );
//   width: 70px;
//   height: 70px;
//   left: 41vw;
//   bottom: 70vh;
//   -webkit-animation: move11 infinite 13s;
//   animation: move11 infinite 13s;
// }
// @-webkit-keyframes move11 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 69vh;
//     -webkit-transform: translate(-54px, 0);
//     transform: translate(-54px, 0);
//     opacity: 0;
//   }
// }
// @keyframes move11 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 69vh;
//     -webkit-transform: translate(-54px, 0);
//     transform: translate(-54px, 0);
//     opacity: 0;
//   }
// }
// .bubble:nth-child(12) {
//   background: radial-gradient(
//     ellipse at top right,
//     #b8c6c6 0%,
//     #30b3d3 46%,
//     #20628c 100%
//   );
//   width: 70px;
//   height: 70px;
//   left: 18vw;
//   bottom: 8vh;
//   -webkit-animation: move12 infinite 7s;
//   animation: move12 infinite 7s;
// }
// @-webkit-keyframes move12 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 69vh;
//     -webkit-transform: translate(86px, 0);
//     transform: translate(86px, 0);
//     opacity: 0;
//   }
// }
// @keyframes move12 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 69vh;
//     -webkit-transform: translate(86px, 0);
//     transform: translate(86px, 0);
//     opacity: 0;
//   }
// }
// .bubble:nth-child(13) {
//   background: radial-gradient(
//     ellipse at center,
//     #b8c6c6 0%,
//     #30b3d3 46%,
//     #20628c 100%
//   );
//   width: 70px;
//   height: 70px;
//   left: 34vw;
//   bottom: 2vh;
//   -webkit-animation: move13 infinite 8s;
//   animation: move13 infinite 8s;
// }
// @-webkit-keyframes move13 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 40vh;
//     -webkit-transform: translate(93px, 0);
//     transform: translate(93px, 0);
//     opacity: 0;
//   }
// }
// @keyframes move13 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 40vh;
//     -webkit-transform: translate(93px, 0);
//     transform: translate(93px, 0);
//     opacity: 0;
//   }
// }
// .bubble:nth-child(14) {
//   background: radial-gradient(
//     ellipse at top right,
//     #b8c6c6 0%,
//     #30b3d3 46%,
//     #20628c 100%
//   );
//   width: 70px;
//   height: 70px;
//   left: 30vw;
//   bottom: 14vh;
//   -webkit-animation: move14 infinite 8s;
//   animation: move14 infinite 8s;
// }
// @-webkit-keyframes move14 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 26vh;
//     -webkit-transform: translate(107px, 0);
//     transform: translate(107px, 0);
//     opacity: 0;
//   }
// }
// @keyframes move14 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 26vh;
//     -webkit-transform: translate(107px, 0);
//     transform: translate(107px, 0);
//     opacity: 0;
//   }
// }
// .bubble:nth-child(15) {
//   background: radial-gradient(
//     ellipse at center,
//     #b8c6c6 0%,
//     #30b3d3 46%,
//     #20628c 100%
//   );
//   width: 70px;
//   height: 70px;
//   left: 100vw;
//   bottom: 41vh;
//   -webkit-animation: move15 infinite 10s;
//   animation: move15 infinite 10s;
// }
// @-webkit-keyframes move15 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 8vh;
//     -webkit-transform: translate(-50px, 0);
//     transform: translate(-50px, 0);
//     opacity: 0;
//   }
// }
// @keyframes move15 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 8vh;
//     -webkit-transform: translate(-50px, 0);
//     transform: translate(-50px, 0);
//     opacity: 0;
//   }
// }
// .bubble:nth-child(16) {
//   background: radial-gradient(
//     ellipse at top right,
//     #b8c6c6 0%,
//     #30b3d3 46%,
//     #20628c 100%
//   );
//   width: 41px;
//   height: 41px;
//   left: 72vw;
//   bottom: 64vh;
//   -webkit-animation: move16 infinite 13s;
//   animation: move16 infinite 13s;
// }
// @-webkit-keyframes move16 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 93vh;
//     -webkit-transform: translate(-70px, 0);
//     transform: translate(-70px, 0);
//     opacity: 0;
//   }
// }
// @keyframes move16 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 93vh;
//     -webkit-transform: translate(-70px, 0);
//     transform: translate(-70px, 0);
//     opacity: 0;
//   }
// }
// .bubble:nth-child(17) {
//   background: radial-gradient(
//     ellipse at center,
//     #b8c6c6 0%,
//     #30b3d3 46%,
//     #20628c 100%
//   );
//   width: 79px;
//   height: 79px;
//   left: 91vw;
//   bottom: 100vh;
//   -webkit-animation: move17 infinite 8s;
//   animation: move17 infinite 8s;
// }
// @-webkit-keyframes move17 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 82vh;
//     -webkit-transform: translate(145px, 0);
//     transform: translate(145px, 0);
//     opacity: 0;
//   }
// }
// @keyframes move17 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 82vh;
//     -webkit-transform: translate(145px, 0);
//     transform: translate(145px, 0);
//     opacity: 0;
//   }
// }
// .bubble:nth-child(18) {
//   background: radial-gradient(
//     ellipse at top right,
//     #b8c6c6 0%,
//     #30b3d3 46%,
//     #20628c 100%
//   );
//   width: 47px;
//   height: 47px;
//   left: 4vw;
//   bottom: 52vh;
//   -webkit-animation: move18 infinite 8s;
//   animation: move18 infinite 8s;
// }
// @-webkit-keyframes move18 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 25vh;
//     -webkit-transform: translate(173px, 0);
//     transform: translate(173px, 0);
//     opacity: 0;
//   }
// }
// @keyframes move18 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 25vh;
//     -webkit-transform: translate(173px, 0);
//     transform: translate(173px, 0);
//     opacity: 0;
//   }
// }
// .bubble:nth-child(19) {
//   background: radial-gradient(
//     ellipse at center,
//     #b8c6c6 0%,
//     #30b3d3 46%,
//     #20628c 100%
//   );
//   width: 45px;
//   height: 45px;
//   left: 95vw;
//   bottom: 11vh;
//   -webkit-animation: move19 infinite 7s;
//   animation: move19 infinite 7s;
// }
// @-webkit-keyframes move19 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 79vh;
//     -webkit-transform: translate(184px, 0);
//     transform: translate(184px, 0);
//     opacity: 0;
//   }
// }
// @keyframes move19 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 79vh;
//     -webkit-transform: translate(184px, 0);
//     transform: translate(184px, 0);
//     opacity: 0;
//   }
// }
// .bubble:nth-child(20) {
//   background: radial-gradient(
//     ellipse at top right,
//     #b8c6c6 0%,
//     #30b3d3 46%,
//     #20628c 100%
//   );
//   width: 30px;
//   height: 30px;
//   left: 83vw;
//   bottom: 2vh;
//   -webkit-animation: move20 infinite 5s;
//   animation: move20 infinite 5s;
// }
// @-webkit-keyframes move20 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 38vh;
//     -webkit-transform: translate(26px, 0);
//     transform: translate(26px, 0);
//     opacity: 0;
//   }
// }
// @keyframes move20 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 38vh;
//     -webkit-transform: translate(26px, 0);
//     transform: translate(26px, 0);
//     opacity: 0;
//   }
// }
// .bubble:nth-child(21) {
//   background: radial-gradient(
//     ellipse at center,
//     #b8c6c6 0%,
//     #30b3d3 46%,
//     #20628c 100%
//   );
//   width: 90px;
//   height: 90px;
//   left: 94vw;
//   bottom: 92vh;
//   -webkit-animation: move21 infinite 8s;
//   animation: move21 infinite 8s;
// }
// @-webkit-keyframes move21 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 0vh;
//     -webkit-transform: translate(-13px, 0);
//     transform: translate(-13px, 0);
//     opacity: 0;
//   }
// }
// @keyframes move21 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 0vh;
//     -webkit-transform: translate(-13px, 0);
//     transform: translate(-13px, 0);
//     opacity: 0;
//   }
// }
// .bubble:nth-child(22) {
//   background: radial-gradient(
//     ellipse at top right,
//     #b8c6c6 0%,
//     #30b3d3 46%,
//     #20628c 100%
//   );
//   width: 74px;
//   height: 74px;
//   left: 60vw;
//   bottom: 59vh;
//   -webkit-animation: move22 infinite 4s;
//   animation: move22 infinite 4s;
// }
// @-webkit-keyframes move22 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 81vh;
//     -webkit-transform: translate(27px, 0);
//     transform: translate(27px, 0);
//     opacity: 0;
//   }
// }
// @keyframes move22 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 81vh;
//     -webkit-transform: translate(27px, 0);
//     transform: translate(27px, 0);
//     opacity: 0;
//   }
// }
// .bubble:nth-child(23) {
//   background: radial-gradient(
//     ellipse at center,
//     #b8c6c6 0%,
//     #30b3d3 46%,
//     #20628c 100%
//   );
//   width: 86px;
//   height: 86px;
//   left: 59vw;
//   bottom: 27vh;
//   -webkit-animation: move23 infinite 10s;
//   animation: move23 infinite 10s;
// }
// @-webkit-keyframes move23 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 80vh;
//     -webkit-transform: translate(26px, 0);
//     transform: translate(26px, 0);
//     opacity: 0;
//   }
// }
// @keyframes move23 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 80vh;
//     -webkit-transform: translate(26px, 0);
//     transform: translate(26px, 0);
//     opacity: 0;
//   }
// }
// .bubble:nth-child(24) {
//   background: radial-gradient(
//     ellipse at top right,
//     #b8c6c6 0%,
//     #30b3d3 46%,
//     #20628c 100%
//   );
//   width: 15px;
//   height: 15px;
//   left: 52vw;
//   bottom: 7vh;
//   -webkit-animation: move24 infinite 15s;
//   animation: move24 infinite 15s;
// }
// @-webkit-keyframes move24 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 63vh;
//     -webkit-transform: translate(5px, 0);
//     transform: translate(5px, 0);
//     opacity: 0;
//   }
// }
// @keyframes move24 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 63vh;
//     -webkit-transform: translate(5px, 0);
//     transform: translate(5px, 0);
//     opacity: 0;
//   }
// }
// .bubble:nth-child(25) {
//   background: radial-gradient(
//     ellipse at center,
//     #b8c6c6 0%,
//     #30b3d3 46%,
//     #20628c 100%
//   );
//   width: 79px;
//   height: 79px;
//   left: 42vw;
//   bottom: 1vh;
//   -webkit-animation: move25 infinite 4s;
//   animation: move25 infinite 4s;
// }
// @-webkit-keyframes move25 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 0vh;
//     -webkit-transform: translate(148px, 0);
//     transform: translate(148px, 0);
//     opacity: 0;
//   }
// }
// @keyframes move25 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 0vh;
//     -webkit-transform: translate(148px, 0);
//     transform: translate(148px, 0);
//     opacity: 0;
//   }
// }
// .bubble:nth-child(26) {
//   background: radial-gradient(
//     ellipse at top right,
//     #b8c6c6 0%,
//     #30b3d3 46%,
//     #20628c 100%
//   );
//   width: 71px;
//   height: 71px;
//   left: 33vw;
//   bottom: 83vh;
//   -webkit-animation: move26 infinite 14s;
//   animation: move26 infinite 14s;
// }
// @-webkit-keyframes move26 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 100vh;
//     -webkit-transform: translate(39px, 0);
//     transform: translate(39px, 0);
//     opacity: 0;
//   }
// }
// @keyframes move26 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 100vh;
//     -webkit-transform: translate(39px, 0);
//     transform: translate(39px, 0);
//     opacity: 0;
//   }
// }
// .bubble:nth-child(27) {
//   background: radial-gradient(
//     ellipse at center,
//     #b8c6c6 0%,
//     #30b3d3 46%,
//     #20628c 100%
//   );
//   width: 80px;
//   height: 80px;
//   left: 5vw;
//   bottom: 13vh;
//   -webkit-animation: move27 infinite 7s;
//   animation: move27 infinite 7s;
// }
// @-webkit-keyframes move27 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 38vh;
//     -webkit-transform: translate(183px, 0);
//     transform: translate(183px, 0);
//     opacity: 0;
//   }
// }
// @keyframes move27 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 38vh;
//     -webkit-transform: translate(183px, 0);
//     transform: translate(183px, 0);
//     opacity: 0;
//   }
// }
// .bubble:nth-child(28) {
//   background: radial-gradient(
//     ellipse at top right,
//     #b8c6c6 0%,
//     #30b3d3 46%,
//     #20628c 100%
//   );
//   width: 82px;
//   height: 82px;
//   left: 59vw;
//   bottom: 88vh;
//   -webkit-animation: move28 infinite 3s;
//   animation: move28 infinite 3s;
// }
// @-webkit-keyframes move28 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 47vh;
//     -webkit-transform: translate(-91px, 0);
//     transform: translate(-91px, 0);
//     opacity: 0;
//   }
// }
// @keyframes move28 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 47vh;
//     -webkit-transform: translate(-91px, 0);
//     transform: translate(-91px, 0);
//     opacity: 0;
//   }
// }
// .bubble:nth-child(29) {
//   background: radial-gradient(
//     ellipse at center,
//     #b8c6c6 0%,
//     #30b3d3 46%,
//     #20628c 100%
//   );
//   width: 67px;
//   height: 67px;
//   left: 99vw;
//   bottom: 71vh;
//   -webkit-animation: move29 infinite 10s;
//   animation: move29 infinite 10s;
// }
// @-webkit-keyframes move29 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 78vh;
//     -webkit-transform: translate(-61px, 0);
//     transform: translate(-61px, 0);
//     opacity: 0;
//   }
// }
// @keyframes move29 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 78vh;
//     -webkit-transform: translate(-61px, 0);
//     transform: translate(-61px, 0);
//     opacity: 0;
//   }
// }
// .bubble:nth-child(30) {
//   background: radial-gradient(
//     ellipse at top right,
//     #b8c6c6 0%,
//     #30b3d3 46%,
//     #20628c 100%
//   );
//   width: 43px;
//   height: 43px;
//   left: 64vw;
//   bottom: 65vh;
//   -webkit-animation: move30 infinite 8s;
//   animation: move30 infinite 8s;
// }
// @-webkit-keyframes move30 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 79vh;
//     -webkit-transform: translate(-77px, 0);
//     transform: translate(-77px, 0);
//     opacity: 0;
//   }
// }
// @keyframes move30 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 79vh;
//     -webkit-transform: translate(-77px, 0);
//     transform: translate(-77px, 0);
//     opacity: 0;
//   }
// }
// .bubble:nth-child(31) {
//   background: radial-gradient(
//     ellipse at center,
//     #b8c6c6 0%,
//     #30b3d3 46%,
//     #20628c 100%
//   );
//   width: 24px;
//   height: 24px;
//   left: 100vw;
//   bottom: 14vh;
//   -webkit-animation: move31 infinite 14s;
//   animation: move31 infinite 14s;
// }
// @-webkit-keyframes move31 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 40vh;
//     -webkit-transform: translate(7px, 0);
//     transform: translate(7px, 0);
//     opacity: 0;
//   }
// }
// @keyframes move31 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 40vh;
//     -webkit-transform: translate(7px, 0);
//     transform: translate(7px, 0);
//     opacity: 0;
//   }
// }
// .bubble:nth-child(32) {
//   background: radial-gradient(
//     ellipse at top right,
//     #b8c6c6 0%,
//     #30b3d3 46%,
//     #20628c 100%
//   );
//   width: 88px;
//   height: 88px;
//   left: 70vw;
//   bottom: 100vh;
//   -webkit-animation: move32 infinite 15s;
//   animation: move32 infinite 15s;
// }
// @-webkit-keyframes move32 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 10vh;
//     -webkit-transform: translate(15px, 0);
//     transform: translate(15px, 0);
//     opacity: 0;
//   }
// }
// @keyframes move32 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 10vh;
//     -webkit-transform: translate(15px, 0);
//     transform: translate(15px, 0);
//     opacity: 0;
//   }
// }
// .bubble:nth-child(33) {
//   background: radial-gradient(
//     ellipse at center,
//     #b8c6c6 0%,
//     #30b3d3 46%,
//     #20628c 100%
//   );
//   width: 21px;
//   height: 21px;
//   left: 68vw;
//   bottom: 27vh;
//   -webkit-animation: move33 infinite 11s;
//   animation: move33 infinite 11s;
// }
// @-webkit-keyframes move33 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 100vh;
//     -webkit-transform: translate(52px, 0);
//     transform: translate(52px, 0);
//     opacity: 0;
//   }
// }
// @keyframes move33 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 100vh;
//     -webkit-transform: translate(52px, 0);
//     transform: translate(52px, 0);
//     opacity: 0;
//   }
// }
// .bubble:nth-child(34) {
//   background: radial-gradient(
//     ellipse at top right,
//     #b8c6c6 0%,
//     #30b3d3 46%,
//     #20628c 100%
//   );
//   width: 74px;
//   height: 74px;
//   left: 70vw;
//   bottom: 83vh;
//   -webkit-animation: move34 infinite 4s;
//   animation: move34 infinite 4s;
// }
// @-webkit-keyframes move34 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 84vh;
//     -webkit-transform: translate(50px, 0);
//     transform: translate(50px, 0);
//     opacity: 0;
//   }
// }
// @keyframes move34 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 84vh;
//     -webkit-transform: translate(50px, 0);
//     transform: translate(50px, 0);
//     opacity: 0;
//   }
// }
// .bubble:nth-child(35) {
//   background: radial-gradient(
//     ellipse at center,
//     #b8c6c6 0%,
//     #30b3d3 46%,
//     #20628c 100%
//   );
//   width: 51px;
//   height: 51px;
//   left: 7vw;
//   bottom: 37vh;
//   -webkit-animation: move35 infinite 14s;
//   animation: move35 infinite 14s;
// }
// @-webkit-keyframes move35 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 27vh;
//     -webkit-transform: translate(88px, 0);
//     transform: translate(88px, 0);
//     opacity: 0;
//   }
// }
// @keyframes move35 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 27vh;
//     -webkit-transform: translate(88px, 0);
//     transform: translate(88px, 0);
//     opacity: 0;
//   }
// }
// .bubble:nth-child(36) {
//   background: radial-gradient(
//     ellipse at top right,
//     #b8c6c6 0%,
//     #30b3d3 46%,
//     #20628c 100%
//   );
//   width: 99px;
//   height: 99px;
//   left: 57vw;
//   bottom: 29vh;
//   -webkit-animation: move36 infinite 14s;
//   animation: move36 infinite 14s;
// }
// @-webkit-keyframes move36 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 67vh;
//     -webkit-transform: translate(188px, 0);
//     transform: translate(188px, 0);
//     opacity: 0;
//   }
// }
// @keyframes move36 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 67vh;
//     -webkit-transform: translate(188px, 0);
//     transform: translate(188px, 0);
//     opacity: 0;
//   }
// }
// .bubble:nth-child(37) {
//   background: radial-gradient(
//     ellipse at center,
//     #b8c6c6 0%,
//     #30b3d3 46%,
//     #20628c 100%
//   );
//   width: 39px;
//   height: 39px;
//   left: 12vw;
//   bottom: 39vh;
//   -webkit-animation: move37 infinite 4s;
//   animation: move37 infinite 4s;
// }
// @-webkit-keyframes move37 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 45vh;
//     -webkit-transform: translate(69px, 0);
//     transform: translate(69px, 0);
//     opacity: 0;
//   }
// }
// @keyframes move37 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 45vh;
//     -webkit-transform: translate(69px, 0);
//     transform: translate(69px, 0);
//     opacity: 0;
//   }
// }
// .bubble:nth-child(38) {
//   background: radial-gradient(
//     ellipse at top right,
//     #b8c6c6 0%,
//     #30b3d3 46%,
//     #20628c 100%
//   );
//   width: 15px;
//   height: 15px;
//   left: 66vw;
//   bottom: 60vh;
//   -webkit-animation: move38 infinite 8s;
//   animation: move38 infinite 8s;
// }
// @-webkit-keyframes move38 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 52vh;
//     -webkit-transform: translate(90px, 0);
//     transform: translate(90px, 0);
//     opacity: 0;
//   }
// }
// @keyframes move38 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 52vh;
//     -webkit-transform: translate(90px, 0);
//     transform: translate(90px, 0);
//     opacity: 0;
//   }
// }
// .bubble:nth-child(39) {
//   background: radial-gradient(
//     ellipse at center,
//     #b8c6c6 0%,
//     #30b3d3 46%,
//     #20628c 100%
//   );
//   width: 31px;
//   height: 31px;
//   left: 84vw;
//   bottom: 37vh;
//   -webkit-animation: move39 infinite 14s;
//   animation: move39 infinite 14s;
// }
// @-webkit-keyframes move39 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 0vh;
//     -webkit-transform: translate(148px, 0);
//     transform: translate(148px, 0);
//     opacity: 0;
//   }
// }
// @keyframes move39 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 0vh;
//     -webkit-transform: translate(148px, 0);
//     transform: translate(148px, 0);
//     opacity: 0;
//   }
// }
// .bubble:nth-child(40) {
//   background: radial-gradient(
//     ellipse at top right,
//     #b8c6c6 0%,
//     #30b3d3 46%,
//     #20628c 100%
//   );
//   width: 53px;
//   height: 53px;
//   left: 21vw;
//   bottom: 37vh;
//   -webkit-animation: move40 infinite 10s;
//   animation: move40 infinite 10s;
// }
// @-webkit-keyframes move40 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 43vh;
//     -webkit-transform: translate(62px, 0);
//     transform: translate(62px, 0);
//     opacity: 0;
//   }
// }
// @keyframes move40 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 43vh;
//     -webkit-transform: translate(62px, 0);
//     transform: translate(62px, 0);
//     opacity: 0;
//   }
// }
// .bubble:nth-child(41) {
//   background: radial-gradient(
//     ellipse at center,
//     #b8c6c6 0%,
//     #30b3d3 46%,
//     #20628c 100%
//   );
//   width: 58px;
//   height: 58px;
//   left: 90vw;
//   bottom: 16vh;
//   -webkit-animation: move41 infinite 5s;
//   animation: move41 infinite 5s;
// }
// @-webkit-keyframes move41 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 49vh;
//     -webkit-transform: translate(15px, 0);
//     transform: translate(15px, 0);
//     opacity: 0;
//   }
// }
// @keyframes move41 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 49vh;
//     -webkit-transform: translate(15px, 0);
//     transform: translate(15px, 0);
//     opacity: 0;
//   }
// }
// .bubble:nth-child(42) {
//   background: radial-gradient(
//     ellipse at top right,
//     #b8c6c6 0%,
//     #30b3d3 46%,
//     #20628c 100%
//   );
//   width: 98px;
//   height: 98px;
//   left: 44vw;
//   bottom: 28vh;
//   -webkit-animation: move42 infinite 14s;
//   animation: move42 infinite 14s;
// }
// @-webkit-keyframes move42 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 30vh;
//     -webkit-transform: translate(62px, 0);
//     transform: translate(62px, 0);
//     opacity: 0;
//   }
// }
// @keyframes move42 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 30vh;
//     -webkit-transform: translate(62px, 0);
//     transform: translate(62px, 0);
//     opacity: 0;
//   }
// }
// .bubble:nth-child(43) {
//   background: radial-gradient(
//     ellipse at center,
//     #b8c6c6 0%,
//     #30b3d3 46%,
//     #20628c 100%
//   );
//   width: 77px;
//   height: 77px;
//   left: 41vw;
//   bottom: 6vh;
//   -webkit-animation: move43 infinite 15s;
//   animation: move43 infinite 15s;
// }
// @-webkit-keyframes move43 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 91vh;
//     -webkit-transform: translate(84px, 0);
//     transform: translate(84px, 0);
//     opacity: 0;
//   }
// }
// @keyframes move43 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 91vh;
//     -webkit-transform: translate(84px, 0);
//     transform: translate(84px, 0);
//     opacity: 0;
//   }
// }
// .bubble:nth-child(44) {
//   background: radial-gradient(
//     ellipse at top right,
//     #b8c6c6 0%,
//     #30b3d3 46%,
//     #20628c 100%
//   );
//   width: 40px;
//   height: 40px;
//   left: 7vw;
//   bottom: 40vh;
//   -webkit-animation: move44 infinite 15s;
//   animation: move44 infinite 15s;
// }
// @-webkit-keyframes move44 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 50vh;
//     -webkit-transform: translate(116px, 0);
//     transform: translate(116px, 0);
//     opacity: 0;
//   }
// }
// @keyframes move44 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 50vh;
//     -webkit-transform: translate(116px, 0);
//     transform: translate(116px, 0);
//     opacity: 0;
//   }
// }
// .bubble:nth-child(45) {
//   background: radial-gradient(
//     ellipse at center,
//     #b8c6c6 0%,
//     #30b3d3 46%,
//     #20628c 100%
//   );
//   width: 83px;
//   height: 83px;
//   left: 82vw;
//   bottom: 8vh;
//   -webkit-animation: move45 infinite 13s;
//   animation: move45 infinite 13s;
// }
// @-webkit-keyframes move45 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 90vh;
//     -webkit-transform: translate(17px, 0);
//     transform: translate(17px, 0);
//     opacity: 0;
//   }
// }
// @keyframes move45 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 90vh;
//     -webkit-transform: translate(17px, 0);
//     transform: translate(17px, 0);
//     opacity: 0;
//   }
// }
// .bubble:nth-child(46) {
//   background: radial-gradient(
//     ellipse at top right,
//     #b8c6c6 0%,
//     #30b3d3 46%,
//     #20628c 100%
//   );
//   width: 20px;
//   height: 20px;
//   left: 77vw;
//   bottom: 66vh;
//   -webkit-animation: move46 infinite 11s;
//   animation: move46 infinite 11s;
// }
// @-webkit-keyframes move46 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 66vh;
//     -webkit-transform: translate(21px, 0);
//     transform: translate(21px, 0);
//     opacity: 0;
//   }
// }
// @keyframes move46 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 66vh;
//     -webkit-transform: translate(21px, 0);
//     transform: translate(21px, 0);
//     opacity: 0;
//   }
// }
// .bubble:nth-child(47) {
//   background: radial-gradient(
//     ellipse at center,
//     #b8c6c6 0%,
//     #30b3d3 46%,
//     #20628c 100%
//   );
//   width: 40px;
//   height: 40px;
//   left: 81vw;
//   bottom: 43vh;
//   -webkit-animation: move47 infinite 8s;
//   animation: move47 infinite 8s;
// }
// @-webkit-keyframes move47 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 87vh;
//     -webkit-transform: translate(-65px, 0);
//     transform: translate(-65px, 0);
//     opacity: 0;
//   }
// }
// @keyframes move47 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 87vh;
//     -webkit-transform: translate(-65px, 0);
//     transform: translate(-65px, 0);
//     opacity: 0;
//   }
// }
// .bubble:nth-child(48) {
//   background: radial-gradient(
//     ellipse at top right,
//     #b8c6c6 0%,
//     #30b3d3 46%,
//     #20628c 100%
//   );
//   width: 21px;
//   height: 21px;
//   left: 73vw;
//   bottom: 9vh;
//   -webkit-animation: move48 infinite 3s;
//   animation: move48 infinite 3s;
// }
// @-webkit-keyframes move48 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 15vh;
//     -webkit-transform: translate(-2px, 0);
//     transform: translate(-2px, 0);
//     opacity: 0;
//   }
// }
// @keyframes move48 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 15vh;
//     -webkit-transform: translate(-2px, 0);
//     transform: translate(-2px, 0);
//     opacity: 0;
//   }
// }
// .bubble:nth-child(49) {
//   background: radial-gradient(
//     ellipse at center,
//     #b8c6c6 0%,
//     #30b3d3 46%,
//     #20628c 100%
//   );
//   width: 68px;
//   height: 68px;
//   left: 10vw;
//   bottom: 16vh;
//   -webkit-animation: move49 infinite 12s;
//   animation: move49 infinite 12s;
// }
// @-webkit-keyframes move49 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 64vh;
//     -webkit-transform: translate(198px, 0);
//     transform: translate(198px, 0);
//     opacity: 0;
//   }
// }
// @keyframes move49 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 64vh;
//     -webkit-transform: translate(198px, 0);
//     transform: translate(198px, 0);
//     opacity: 0;
//   }
// }
// .bubble:nth-child(50) {
//   background: radial-gradient(
//     ellipse at top right,
//     #b8c6c6 0%,
//     #30b3d3 46%,
//     #20628c 100%
//   );
//   width: 20px;
//   height: 20px;
//   left: 22vw;
//   bottom: 6vh;
//   -webkit-animation: move50 infinite 12s;
//   animation: move50 infinite 12s;
// }
// @-webkit-keyframes move50 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 80vh;
//     -webkit-transform: translate(-99px, 0);
//     transform: translate(-99px, 0);
//     opacity: 0;
//   }
// }
// @keyframes move50 {
//   0% {
//     bottom: -100px;
//   }
//   100% {
//     bottom: 80vh;
//     -webkit-transform: translate(-99px, 0);
//     transform: translate(-99px, 0);
//     opacity: 0;
//   }
// }
</style>
