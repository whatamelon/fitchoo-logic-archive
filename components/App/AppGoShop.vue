<template>
    <div class="pass-container">
        <div class="pass-gif">
        </div>
        <div class="pass-sentence">
            쇼핑몰로 이동중이에요!
        </div>
    </div>
</template>
<style scoped lang="scss">
.pass-container{
    width:100%;
    height:100%;
    position:fixed;
    background-color:#fff;
    text-align: center;
      animation-name : fadePass;
      animation-duration: 1s;
      animation-delay: 1s;
      animation-fill-mode: both;
      @keyframes fadePass {
        0% {
          background-color : #fff;
          z-index: 50;  
          opacity: 1;
        }
        100% {      
          background-color : transparent;
          z-index: 0;  
          opacity: 0;
        }
      }
}

.pass-sentence{
    margin-top:100px;
    display: inline-block;
}
</style>