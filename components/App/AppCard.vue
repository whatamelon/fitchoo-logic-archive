<template>
  <div class="app-card" @click="goToRoute(exhibition.code)">
    <div class="card__skeleton"></div>
    <div v-if="!isCardTypeC" class="app-card__image" :style="styleObject">
      <div class="app-card__info" :class="{ 'app-card__info--B': isCardTypeB }">
        <div class="app-card__title">
          <h2>{{ exhibition.subtitle }}</h2>
          <h1>{{ exhibition.title }}</h1>
        </div>
        <div
          class="app-card__hashtag"
          :class="{ 'app-card__hashtag--B': isCardTypeB }"
        >
          <h2 v-for="hashtag in exhibition.hashtags" :key="hashtag">
            <span>#</span>{{ hashtag }}
          </h2>
        </div>
      </div>
    </div>

    <div v-else class="app-card--C">
      <div class="app-card--C__image" :style="styleObject"></div>
      <div class="app-card--C__info">
        <div class="app-card--C__title">
          <h2>{{ exhibition.subtitle }}</h2>
          <h1>{{ exhibition.title }}</h1>
        </div>
        <div class="app-card--C__hashtag">
          <h2 v-for="hashtag in exhibition.hashtags" :key="hashtag">
            <span>#</span>{{ hashtag }}
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    exhibition: {
      required: true,
      type: Object
    }
  },

  data() {
    return {
      styleObject: {
        backgroundImage: `url(${this.exhibition.thumbnail})`
      },
      isCardTypeB: this.exhibition.cardType === "B" ? true : false,
      isCardTypeC: this.exhibition.cardType === "C" ? true : false
    };
  },

  mounted() {},

  created() {},

  methods: {
    goToRoute(code) {
      this.$amplitude.getInstance().logEvent("click exhibition-img");

      this.$router.push("/exhibition/" + code);
    }
  }
};
</script>

<style lang="scss" scoped>
.card__skeleton {
      top:-3px;
      left:-2px;
      width:101%;
      height: 365px;
      position: absolute;
      margin-bottom: 20px;
      animation-name : cardFade;
      animation-duration: 0.2s;
      animation-delay: 1s;
      animation-fill-mode: both;
      @keyframes cardFade {
        0% {
          background-color : #ececec;
          z-index: 2;  
        }
        100% {      
          background-color : transparent;
          z-index: 0;  
        }
      }
}

.app-card {
  position: relative;
  padding: 0;
  border: 0;
  border-radius: 10px;
  height: 360px;
  overflow: hidden;
  box-shadow: 0 0px 20px rgba(0, 0, 0, 0.2);

    :active {
    background-color : #ececec;
  }

  &__image {
    height: inherit;
    overflow: hidden;
    background-position: center;
    background-size: cover;
  }

  &__image--C {
    height: 100%;
    background-color: grey;
    overflow: hidden;
    background-position: center;
    background-size: cover;
  }

  &__info {
    padding: 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    z-index: 2;
  }

  &__info--B {
    padding: 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 1;
  }

  &__title {
    padding: 5px 0;
    display: flex;
    flex-direction: column;
    align-content: center;
    z-index: 1;

    h1 {
      margin: 10px 0 5px 0;
      font-size: 2.2em;
      font-weight: 700;
      letter-spacing: -0.9px;
      color: $white;
    }
    h2 {
      margin: 0;
      font-size: 1.2em;
      font-weight: 600;
      color: $white;
    }
  }

  &__hashtag {
    padding: 0;
    display: flex;
    align-content: center;
    z-index: 1;

    span {
      margin: 0;

      color: $primary;
      font-size: 1em;
      margin-right: 3px;
    }

    h2 {
      margin: 5px 5px 0 0;
      font-size: 1em;
      color: $white;
      font-weight: 600;
    }
  }

  &__hashtag--B {
    display: flex;
    flex-direction: column;
    z-index: 1;
  }
}

.app-card--C {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 360px;

    :active {
    background-color : #ececec;
  }

  &__image {
    height: 230px;
    background-color: grey;
    overflow: hidden;
    background-position: center;
    background-size: cover;
 
  }

  &__info {
    padding: 20px;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    z-index: 2;
    background-color: #ffffff;
  }

  &__title {
    padding: 5px 0;
    display: flex;
    flex-direction: column;
    align-content: center;
    z-index: 1;

    h1 {
      margin: 0;
      padding: 10px 0 5px 0;
      font-size: 2.2em;
      font-weight: 700;
      letter-spacing: -0.9px;
      color: $black;
    }

    h2 {
      margin: 0;
      padding: 0;
      font-size: 1.2em;
      font-weight: 600;
      color: $grey;
    }
  }

  &__hashtag {
    padding: 0;
    display: flex;
    align-content: center;
    z-index: 1;

    span {
      margin: 0;
      padding: 0;
      color: $primary;
      font-size: 1em;
      margin-right: 3px;
    }

    h2 {
      margin: 0;
      padding: 5px 5px 0 0;
      font-size: 1em;
      color: $black;
      font-weight: 600;
    }
  }
}
</style>
