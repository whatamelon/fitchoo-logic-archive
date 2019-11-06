<template>

        <div class="home-footer">
          <div class="home-footer__top">

                <img class="home-footer__logo" src="/fitchoo_logo.png" />

                <!-- <div class="home-footer__instagram"
                        @click="goToInstagram">
                    <i class="fab fa-instagram"></i>
                    <span class="home-footer__instagram__name">인스타그램</span>
                </div> -->

                <div class="home-footer__registerStore"
                        @click="goToRegisterStore">
                    입점문의
                </div>

          </div>

          <div class="home-footer__bottom">

                <div class="home-footer__bottom1">
                    (주)마들렌메모리 | 대표이사 유재원
                </div>

                <div class="home-footer__bottom2">
                    사업자등록번호: 705-87-01046
                </div>

                <div class="home-footer__bottom3">
                    개인정보관리책임: 유재원(won@fitchoo.kr)
                </div>

                <div class="home-footer__bottom4">
                    주소: 서울특별시 강남구 영동대로85길 34 스파크플러스 삼성2호점
                </div>

                <div class="home-footer__bottom5">
                    <span class="home-footer__terms"
                                @click="goToTerms">이용약관 | </span>
                    <span class="home-footer__privacy"
                                @click="goToPrivacy">개인정보처리방침</span>
                </div>

          </div>
        </div>
    
    
</template>

<script>
export default {
    methods: {

        goToInstagram() {
            window.open("https://www.instagram.com/fitchoo_style/");
        },

        goToRegisterStore() {
            window.open(
                "https://docs.google.com/forms/d/e/1FAIpQLScYAJi1qkBJZRFbs0zOachwXMJQNCQ2aiFqLk-KRDbryaJ-aA/viewform?usp=sf_link"
            );
        },

        goToTerms() {
            this.$router.push("/terms");
        },

        goToPrivacy() {
            this.$router.push("/privacy");
        }

    }
    
}
</script>

<style lang="scss" scoped>

.home-footer{
    background-color: #ececec;
    padding: 8% 4% 10% 4%;

    &__top{
        display:inline-block;
        width: 100%;
    }

    &__logo{
        width: 100px;
        height: 20px;
        margin-top:1.2%;
        float: left;
    }

    &__instagram{
        padding : 1.3% 0 0 9%;
        display: flex;
        width:110px;
    }

    &__instagram__name{
        font-size:0.8em;
        font-weight: 800;
        padding: 1.4% 0 0 7%;
    }

    &__registerStore{
        background-color: #000000;
        border-radius: 3px;
        color:#ffffff;
        font-weight: 800;
        width:70px;
        font-size: 0.9em;
        text-align:center;
        line-height: 2.3;
        height:30px;
        float: right;
    }

    &__bottom {
        padding-top:4%;
    }

    &__bottom1 , &__bottom2 , &__bottom3 , &__bottom4{
        padding-top:1%;
        font-size:0.8em;
        color:#757575;
        font-weight: 400;
        letter-spacing: -0.5px;
    }

    &__bottom5{
        padding-top:3%;
    }

    &__terms , &__privacy{
        font-size: 0.8em;
        font-weight: 800;
    }
}

.fa-instagram{
    font-size:1.3em;
}


</style>