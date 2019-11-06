<template>
<div>
<div class="model-header">
        <div class="model-header__filter"
                :class="{ '__active': divideHeight === 'myHeight' }"
                @click="switchTab('myHeight')"
                >{{ myHeight }}
          </div>
        <div class="model-header__filter"
                :class="{ '__active': divideHeight === 'lowHeight' }"
                @click="switchTab('lowHeight')"
                >{{ lowHeight }}
          </div>
        <div class="model-header__filter"
                :class="{ '__active': divideHeight === 'meanHeight' }"
                @click="switchTab('meanHeight')"
                >{{ meanHeight }}
          </div>
        <div class="model-header__filter"
                :class="{ '__active': divideHeight === 'highHeight' }"
                @click="switchTab('highHeight')"
                >{{ highHeight }}
          </div>
    </div>
    
    <div class="model-header-space">
    </div>
</div>
</template>

<script>
export default {
  props: {
    myHeight: {
      type: String,
      required: true
    },

    lowHeight: {
      type: String,
      required: true
    },

    meanHeight: {
      type: String,
      required: true
    },

    highHeight: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      divideHeight: "myHeight"
    };
  },

  created() {
    
    if(this.$route.name == "model") {
      this.divideHeight = "myHeight";
      console.log("내탭");
    }
    else if(this.$route.name == "modelLow") {
      this.divideHeight = "lowHeight";
      console.log("작은탭");
    }
    else if(this.$route.name == "modelMean") {
      this.divideHeight = "meanHeight";
      console.log("평균탭");
    }    
    else if(this.$route.name == "modelHigh") {
      this.divideHeight = "highHeight";
      console.log("큰탭");
    } 
  },
  methods: {
    switchTab(height) {
      this.divideHeight = height;
      this.$emit("switched", height);
      window.scrollTo(0,0);
    }

  }
};
</script>

<style lang="scss" scoped>
.model-header{
  width : 100%;
  display:flex;
  justify-content: center;
  padding:3% 3%;
  z-index: 5;
  background-color: #ffffff;
  position: fixed;

  &__filter{
    text-align: center;
    border : 2px solid #000000;
    border-radius: 7px;
    font-size: 0.8em;
    font-weight: 600;
    width: 25%;
    padding: 2% 0;
    margin: 0 0.5%;

    &.__active {
        color: #ffffff;
        background-color: $primary;
        border: 2px solid $primary;
    }
  }

  &-space{
    height:60px;
  }

}


@media all and (min-width : 500px){
.model-header{
  width : 100%;
  display:flex;
  justify-content: center;
  padding:3% 3%;
  z-index: 5;
  background-color: #ffffff;
  position: fixed;
  max-width: 500px;

  &__filter{
    text-align: center;
    border : 2px solid #000000;
    border-radius: 7px;
    font-size: 0.8em;
    font-weight: 600;
    width: 25%;
    padding: 2% 0;
    margin: 0 0.5%;

    &.__active {
        color: #ffffff;
        background-color: $primary;
        border: 2px solid $primary;
    }
  }

  &-space{
    height:100px !important;
  }

}
}
</style>