<template>
  <slider ref="slider" :options="options">
          <slideritem v-for="(item,index) in someList" :key="index" >
            <img :src="item.image" @click="goToRoute(item.code)"/>
          </slideritem>
      </slider>
</template>

<script>
import { slider, slideritem } from 'vue-concise-slider';

export default {

 components: {
      slider,
      slideritem,
    },
    

  data() {
    return {
      someList:[
          {
            image : '/carousel/slideWideSlacks.jpg',
            code : '00pe29'
          },
          {
            image : '/carousel/slideShortJacket.jpg',
            code : '16re28'
          },
          {
            image : '/carousel/slideLongCoat.jpg',
            code : '15re27'
          },
          {
            image : '/carousel/slideAnimal.jpg',
            code : '15re24'
          },
          {
            image : '/carousel/slideHiWaist.jpg',
            code : '15re22'
          },
        ],
        options: {
          currentPage: 0,
          autoplay:'3000',
          loop : true,
          timingFunction: 'ease-out',
          thresholdDistance:'10'
        }
    };
  },

  mounted() {},

  created() {
  },

  methods: {
    goToRoute(code)
     {
        this.$amplitude.getInstance().logEvent("click slides");
        this.$router.push("/exhibition/" + code);
      
    }
  }
};
</script>

<style lang="scss" scoped>
.app-card {
  padding: 0;
  border: 0;
  height: 450px;
  width:600px;
}
img {
  width:100%;
}

</style>
