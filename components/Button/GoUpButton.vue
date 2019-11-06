<template>
  <button class="GoUp-button" @click="GoUp" ref="hello" id="upButton">
    <i class="fas fa-arrow-up"></i>
    <span>위로</span>
  </button>
</template>

<script>
export default {

    created() {
      window.addEventListener("scroll", this.hello);
      window.addEventListener("wheel", this.hello);
    },

    methods:{

    hello() {

      var lastY;
        $(document).bind('touchmove', function (e){
            var currentY = e.originalEvent.touches[0].clientY;
            if(currentY > lastY){
                // moved down
                if (window.scrollY < 1500) {
                  upButton.classList.add("fadeOut");
                }
                else {
             upButton.classList.remove("fadeOut");
            upButton.classList.add("fadeIn");
                }
            }else if(currentY < lastY){
                // moved up
            upButton.classList.remove("fadeIn");
             upButton.classList.add("fadeOut");
            }
            lastY = currentY;
        });
          var delta;
          var detect = document.getElementById("upButton");
        	// if (event.wheelDelta){
          //   	delta = event.wheelDelta;
          //   }else{
          //   	delta = -1 *event.deltaY;
          //   }
        	// if (delta < 0){
          //   upButton.classList.remove("fadeIn");
          //    upButton.classList.add("fadeOut");
          //   }else if (delta > 0){
          //     upButton.classList.remove("fadeOut");
          //     upButton.classList.add("fadeIn");
          //   }

        if ( window.scrollY == 0) {
            upButton.classList.remove("fadeIn");
             upButton.classList.add("fadeOut");
        }
      
    },
    GoUp() {
       window.scroll( {
         top : 0,
         left : 0,
         behavior : 'smooth'
       });
      upButton.classList.remove("fadeIn");
             upButton.classList.add("fadeOut");
}
    },

    beforeRouteLeave(to, from, next) {
    
    this.$store.dispatch("startLoading");
    if (process.browser) {
      window.removeEventListener("scroll", this.hello);
      window.removeEventListener("wheel", this.hello);
    }
    next();
  }
};


</script>

<style lang="scss" scoped>
button {
  padding: 5px 15px;
  border: 1px solid #ec3e39;
  border-radius: 4px;
  color: #FFFFFF;
  font-size: 1.0em;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index:4;
  // bottom:0px;
  left:0;
  right:0;
  margin: 0px auto;
  width:100px;
  background-color:#ec3e39;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 3px 3px;
  opacity:0;

}

i {
  font-size: 1.1em;
  margin-right: 5px;
}

.fadeIn {
  visibility : visible;
  bottom : -20px;
  -webkit-transition : opacity 2s ease-out , -webkit-transform 2s ease, transform 2s ease;
  transition : opacity 2s ease-out ,transform 2s ease;
  opacity : 1;
  transform : translate3d(0,-100px,0);
  -webkit-transform : translate3d(0,-100px,0);

  // animation : fadeUp 2s ease ;

  // @keyframes fadeUp {
  //   from {
  //       bottom : 0px;
  //       transform: translate3d(0,140px,0);
  //       opacity:0;
  //   }
  // }
}

.fadeOut {
  visibility : hidden;
  bottom : -20px;
  -webkit-transition : visibility 0s 2s, opacity 2s ease-in ,-webkit-transform 2s ease, transform 2s ease;
  transition : visibility 0s 2s, opacity 2s ease-in,transform 2s ease;
  opacity : 1;
  transform : translate3d(0,200px,0);
  -webkit-transform : translate3d(0,200px,0);

  // animation : fadeDown 2s ease;

  // @keyframes fadeDown {
  //   from {
  //     bottom:0px;
  //       transform: translate3d(0,-120px,0);
  //   }
  //   to {
  //     opacity:0;
  //   }
  // }

}

</style>
