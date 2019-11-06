<template>
<div class="model-banner">
    <div class="model-banner-container">
        <div class="model-banner__image" id="model-banner1" @click="goToModel1"></div>
        <div class="model-banner__image" id="model-banner2" @click="goToModel2"></div>
        <div class="model-banner__image" id="model-banner3" @click="goToModel3"></div>
        <div class="model-banner__image" id="model-banner4" @click="goToModel4"></div>
        <div class="model-banner__image" id="model-banner5" @click="goToModel5"></div>
        <div class="model-banner__image" id="model-banner6" @click="goToModel6"></div>
        <div class="model-banner__image" id="model-banner7" @click="goToModel7"></div>
        <div class="model-banner__image" id="model-banner8" @click="goToModel8"></div>
    </div>
</div>
</template>

<script>
export default {
mounted() {
    $(".model-banner-container").html($(".model-banner-container .model-banner__image").sort(function(){
    return Math.random()-0.5;
}));
},
methods:{
     goToModel1() {
        this.$store.dispatch("setModel", 190);

        const thisModel = {"modelId":"190","name":"백민정","likePoint":"3","modelExp":"모델 민정은 심플하게. 분위기있게.","modelIntro":"\"저는 다리를 길어보이게하는 하이웨스트 바지에 <br/>다양한 상의를 코디해 입는 걸 좋아한답니다!\"","imgFaceFile":"/models/charmingup_small.jpg","imgTitleFile":"/models/charmingup_cover.jpg","height":"156","topValue":"44","bottomValue":"26","footValue":"225","shoulderCode":"s2","pelvisCode":"p3","uploadTime":"2019-10-10 16:19:41.0","isNew":"true","orderNum":"5","styleList":["20대","러블리","로맨틱","심플베이직","캠퍼스룩"],"imgList":[{"imgFile":"/models/190/190_1.jpg","priority":"1"},{"imgFile":"/models/190/190_2.jpg","priority":"2"},{"imgFile":"/models/190/190_3.jpg","priority":"3"},{"imgFile":"/models/190/190_10.jpg","priority":"4"},{"imgFile":"/models/190/190_9.jpg","priority":"4"},{"imgFile":"/models/190/190_8.jpg","priority":"4"},{"imgFile":"/models/190/190_7.jpg","priority":"4"},{"imgFile":"/models/190/190_6.jpg","priority":"4"},{"imgFile":"/models/190/190_5.jpg","priority":"4"},{"imgFile":"/models/190/190_4.jpg","priority":"4"}],"shopList":[{"shopId":"136","name":"챠밍업","linkUrl":"https://www.charmingup.co.kr"}]}
        localStorage.setItem("model", JSON.stringify(thisModel));
        
        const recentModelId = JSON.parse(localStorage.recentModelId);
        recentModelId.push(thisModel);
        localStorage.recentModelId = JSON.stringify(recentModelId);
        
        this.$router.push("/model/190");
     },
     
     goToModel2() {
        this.$store.dispatch("setModel", 188);

        const thisModel2 = {"modelId":"188","name":"소연","likePoint":"2","modelExp":"캐주얼부터 베이직한 데일리룩까지! 색감부자 소연","modelIntro":"\"상체에 비해 하체가 있는 편이라서, <br/>하체 커버 코디를 좋아합니다!\"","imgFaceFile":"/models/foryourday_small.jpg","imgTitleFile":"/models/foryourday_cover.jpg","height":"159","topValue":"44","bottomValue":"26","footValue":"230","shoulderCode":"s3","pelvisCode":"p1","uploadTime":"2019-10-10 16:19:41.0","isNew":"true","orderNum":"3","styleList":["20대","30대","러블리","심플베이직","캠퍼스룩"],"imgList":[{"imgFile":"/models/188/188_1.jpg","priority":"1"},{"imgFile":"/models/188/188_2.jpg","priority":"2"},{"imgFile":"/models/188/188_3.jpg","priority":"3"},{"imgFile":"/models/188/188_10.jpg","priority":"4"},{"imgFile":"/models/188/188_9.jpg","priority":"4"},{"imgFile":"/models/188/188_8.jpg","priority":"4"},{"imgFile":"/models/188/188_7.jpg","priority":"4"},{"imgFile":"/models/188/188_6.jpg","priority":"4"},{"imgFile":"/models/188/188_5.jpg","priority":"4"},{"imgFile":"/models/188/188_4.jpg","priority":"4"}],"shopList":[{"shopId":"134","name":"포유어데이","linkUrl":"https://smartstore.naver.com/foryourday/"}]}
        localStorage.setItem("model", JSON.stringify(thisModel2));
                
        const recentModelId = JSON.parse(localStorage.recentModelId);
        recentModelId.push(thisModel2);
        localStorage.recentModelId = JSON.stringify(recentModelId);
        
        this.$router.push("/model/188");
     },
      
    goToModel3() {
        this.$store.dispatch("setModel", 187);

        const thisModel3 = {"modelId":"187","name":"연두","likePoint":"51","modelExp":"예쁜 옷만 골라 입는 연두의 로맨틱한 매일매일","modelIntro":"\"아담한 키를 극복할 수 있는 <br/>스커트나 원피스 스타일링을 좋아해요~\"","imgFaceFile":"/models/romenish_small.jpg","imgTitleFile":"/models/romenish_cover.jpg","height":"159","topValue":"44","bottomValue":"26","footValue":"225","shoulderCode":"s2","pelvisCode":"p1","uploadTime":"2019-10-04 17:55:24.0","isNew":"false","orderNum":"1002","styleList":["20대","러블리","로맨틱","오피스룩","페미닌"],"imgList":[{"imgFile":"/models/187/187_01.jpg","priority":"1"},{"imgFile":"/models/187/187_02.jpg","priority":"2"},{"imgFile":"/models/187/187_03.jpg","priority":"3"},{"imgFile":"/models/187/187_10.jpg","priority":"4"},{"imgFile":"/models/187/187_09.jpg","priority":"4"},{"imgFile":"/models/187/187_08.jpg","priority":"4"},{"imgFile":"/models/187/187_07.jpg","priority":"4"},{"imgFile":"/models/187/187_06.jpg","priority":"4"},{"imgFile":"/models/187/187_05.jpg","priority":"4"},{"imgFile":"/models/187/187_04.jpg","priority":"4"}],"shopList":[{"shopId":"133","name":"로매니쉬","linkUrl":"http://romenish.com"}]}
        localStorage.setItem("model", JSON.stringify(thisModel3));

        const recentModelId = JSON.parse(localStorage.recentModelId);
        recentModelId.push(thisModel3);
        localStorage.recentModelId = JSON.stringify(recentModelId);
        
        this.$router.push("/model/187");
     },
    
    goToModel4() {
        this.$store.dispatch("setModel", 191);

        const thisModel4 = {"modelId":"191","name":"서재현","likePoint":"14","modelExp":"심플하지만 통통 튀는 키작녀 재현의 코디북","modelIntro":"\"좁은 어깨를 자연스럽게 커버할 수 있는 스타일링을 선호해요!\"","imgFaceFile":"/models/neulpumdaa_small.jpg","imgTitleFile":"/models/191_2_cover.jpg","height":"157","topValue":"44","bottomValue":"26","footValue":"225","shoulderCode":"s3","pelvisCode":"p3","uploadTime":"2019-10-10 16:44:38.0","isNew":"false","orderNum":"1043","styleList":["10대","20대","러블리","심플베이직","캠퍼스룩"],"imgList":[{"imgFile":"/models/191/191_11.jpg","priority":"1"},{"imgFile":"/models/191/191_22.jpg","priority":"2"},{"imgFile":"/models/191/191_3.jpg","priority":"3"},{"imgFile":"/models/191/191_55.jpg","priority":"4"},{"imgFile":"/models/191/191_444.jpg","priority":"4"},{"imgFile":"/models/191/191_44.jpg","priority":"4"},{"imgFile":"/models/191/191_10.jpg","priority":"4"},{"imgFile":"/models/191/191_9.jpg","priority":"4"},{"imgFile":"/models/191/191_8.jpg","priority":"4"},{"imgFile":"/models/191/191_7.jpg","priority":"4"}],"shopList":[{"shopId":"137","name":"늘품다","linkUrl":"https://smartstore.naver.com/neulpumdaa/"}]}
        localStorage.setItem("model", JSON.stringify(thisModel4));
        
        const recentModelId = JSON.parse(localStorage.recentModelId);
        recentModelId.push(thisModel4);
        localStorage.recentModelId = JSON.stringify(recentModelId);
        
        this.$router.push("/model/191");
     },

      goToModel5() {
        this.$store.dispatch("setModel", 182);

        const thisModel4 = {"modelId":"182","name":"제인","likePoint":"51","modelExp":"꾸안꾸 스타일의 제인언니, 모어제인!","modelIntro":"\"저는 골반이 없고 종아리가 있는 편이라, <br/>통바지핏의 바지를 자주 연출해줍니다 :)\"","imgFaceFile":"/models/모어제인_small.jpg","imgTitleFile":"/models/모어제인_cover.jpg","height":"158","topValue":"55","bottomValue":"26","footValue":"230","shoulderCode":"s2","pelvisCode":"p3","uploadTime":"2019-09-30 19:52:55.0","isNew":"false","orderNum":"1117","styleList":["20대","모던시크","심플베이직","유니크"],"imgList":[{"imgFile":"/models/182/182_1.jpg","priority":"1"},{"imgFile":"/models/182/182_2.jpg","priority":"2"},{"imgFile":"/models/182/182_3.jpg","priority":"3"},{"imgFile":"/models/182/182_10.jpg","priority":"4"},{"imgFile":"/models/182/182_9.jpg","priority":"4"},{"imgFile":"/models/182/182_8.jpg","priority":"4"},{"imgFile":"/models/182/182_7.jpg","priority":"4"},{"imgFile":"/models/182/182_6.jpg","priority":"4"},{"imgFile":"/models/182/182_5.jpg","priority":"4"},{"imgFile":"/models/182/182_4.jpg","priority":"4"}],"shopList":[{"shopId":"129","name":"모어제인","linkUrl":"https://smartstore.naver.com/morejane"}]}
        localStorage.setItem("model", JSON.stringify(thisModel4));
        
        const recentModelId = JSON.parse(localStorage.recentModelId);
        recentModelId.push(thisModel4);
        localStorage.recentModelId = JSON.stringify(recentModelId);
        
        this.$router.push("/model/191");
     },

     goToModel6() {
        this.$store.dispatch("setModel", 184);

        const thisModel = {"modelId":"184","name":"아영","likePoint":"218","modelExp":"154 실화야? 비율끝판왕 만들어주는 아영 코디","modelIntro":"\"저는 키에 비해 글래머러스한 편이라서, <br/>몸매를 살려주는 코디를 좋아해요~!\"","imgFaceFile":"/models/스몰라이크_small.jpg","imgTitleFile":"/models/스몰라이크_cover.jpg","height":"154","topValue":"44","bottomValue":"25","footValue":"225","shoulderCode":"s2","pelvisCode":"p2","uploadTime":"2019-09-30 19:52:55.0","isNew":"false","orderNum":"1003","styleList":["20대","30대","럭셔리","섹시글램","심플베이직"],"imgList":[{"imgFile":"/models/184/184_1.jpg","priority":"1"},{"imgFile":"/models/184/184_2.jpg","priority":"2"},{"imgFile":"/models/184/184_3.jpg","priority":"3"},{"imgFile":"/models/184/184_10.jpg","priority":"4"},{"imgFile":"/models/184/184_9.jpg","priority":"4"},{"imgFile":"/models/184/184_8.jpg","priority":"4"},{"imgFile":"/models/184/184_7.jpg","priority":"4"},{"imgFile":"/models/184/184_6.jpg","priority":"4"},{"imgFile":"/models/184/184_5.jpg","priority":"4"},{"imgFile":"/models/184/184_4.jpg","priority":"4"}],"shopList":[{"shopId":"130","name":"스몰라이크","linkUrl":"http://www.small-like.com/"}]}
        localStorage.setItem("model", JSON.stringify(thisModel));
        
        const recentModelId = JSON.parse(localStorage.recentModelId);
        recentModelId.push(thisModel);
        localStorage.recentModelId = JSON.stringify(recentModelId);
        
        this.$router.push("/model/184");
     },
     
     goToModel7() {
        this.$store.dispatch("setModel", 185);

        const thisModel = {"modelId":"185","name":"이유정","likePoint":"55","modelExp":"트렌디한 20대 오버핏 오버무드, 유정","modelIntro":"\"작은 체구이지만 아방한 오버핏을 좋아해요~ :)\"","imgFaceFile":"/models/aubermood_small.jpg","imgTitleFile":"/models/aubermood_cover.jpg","height":"158","topValue":"44","bottomValue":"25","footValue":"230","shoulderCode":"s3","pelvisCode":"p2","uploadTime":"2019-10-15 17:06:44.0","isNew":"false","orderNum":"1038","styleList":["10대","20대","모던시크","유니크"],"imgList":[{"imgFile":"/models/185/185_1.jpg","priority":"1"},{"imgFile":"/models/185/185_2.jpg","priority":"2"},{"imgFile":"/models/185/185_3.jpg","priority":"3"},{"imgFile":"/models/185/185_10.jpg","priority":"4"},{"imgFile":"/models/185/185_9.jpg","priority":"4"},{"imgFile":"/models/185/185_8.jpg","priority":"4"},{"imgFile":"/models/185/185_7.jpg","priority":"4"},{"imgFile":"/models/185/185_6.jpg","priority":"4"},{"imgFile":"/models/185/185_5.jpg","priority":"4"},{"imgFile":"/models/185/185_4.jpg","priority":"4"}],"shopList":[{"shopId":"131","name":"오버무드","linkUrl":"https://smartstore.naver.com/aubermood__"}]}
        localStorage.setItem("model", JSON.stringify(thisModel));
        
        const recentModelId = JSON.parse(localStorage.recentModelId);
        recentModelId.push(thisModel);
        localStorage.recentModelId = JSON.stringify(recentModelId);
        
        this.$router.push("/model/185");
     },
     
     
     goToModel8() {
        this.$store.dispatch("setModel", 186);

        const thisModel = {"modelId":"186","name":"이현주","likePoint":"102","modelExp":"멋스러운 꾸안꾸룩을 찾는다면? 현주언니!","modelIntro":"\"전체적으로 골격이 작은 편이지만, 골반은 살짝 있어요~\"","imgFaceFile":"/models/byjooo_small.jpg","imgTitleFile":"/models/byjooo_cover.jpg","height":"158","topValue":"44반","bottomValue":"25","footValue":"230","shoulderCode":"s2","pelvisCode":"p1","uploadTime":"2019-10-01 17:52:54.0","isNew":"false","orderNum":"1118","styleList":["20대","30대","모던시크","심플베이직","오피스룩"],"imgList":[{"imgFile":"/models/186/186_1.jpg","priority":"1"},{"imgFile":"/models/186/186_2.jpeg","priority":"2"},{"imgFile":"/models/186/186_3.jpeg","priority":"3"},{"imgFile":"/models/186/186_11.jpg","priority":"4"},{"imgFile":"/models/186/186_10.jpeg","priority":"4"},{"imgFile":"/models/186/186_9.jpeg","priority":"4"},{"imgFile":"/models/186/186_8.jpeg","priority":"4"},{"imgFile":"/models/186/186_7.jpeg","priority":"4"},{"imgFile":"/models/186/186_6.jpeg","priority":"4"},{"imgFile":"/models/186/186_5.jpeg","priority":"4"}],"shopList":[{"shopId":"132","name":"바이쥬","linkUrl":"https://smartstore.naver.com/byjooo"}]}
        localStorage.setItem("model", JSON.stringify(thisModel));
        
        const recentModelId = JSON.parse(localStorage.recentModelId);
        recentModelId.push(thisModel);
        localStorage.recentModelId = JSON.stringify(recentModelId);
        
        this.$router.push("/model/186");
     },
     
     
}
}
</script>

<style lang="scss" scoped>
@media all and (min-width : 400px){
    .model-banner{
        width:100%;
        max-width: 500px;
        padding: 3% 3% 0 3%;
        overflow-y: hidden;
        z-index: 5;

        &-container{
            overflow: -moz-scrollbars-none;
            width : 700% !important;
            display:flex;
            overflow-x: auto;
            overflow-y: hidden;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            &::-webkit-scrollbar {
            display : none;
            width:0px;
            }
        }
        &__image{
            width:320px;
            height:240px;
            background-size: cover;
            background-repeat: no-repeat;
            margin: 0 0.7% 0 0;
            border-radius: 10px;
        }
    }
}

@media all and (max-width : 330px){
    .model-banner{
        width:100%;
        max-width: 500px;
        padding: 0 3% !important;
        overflow-y: hidden;
        z-index: 5;

        &-container{
            overflow: -moz-scrollbars-none;
            width : 700% !important;
            display:flex;
            overflow-x: auto;
            overflow-y: hidden;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            &::-webkit-scrollbar {
            display : none;
            width:0px;
            }
        }
        &__image{
            width:320px;
            height:180px !important;
            background-size: cover;
            background-repeat: no-repeat;
            margin: 0 0.7% 0 0;
            border-radius: 10px;
        }
    }
}

  .model-banner{
        width:100%;
        max-width: 500px;
        padding: 3% 3% 0 3%;
        overflow-y: hidden;
        z-index: 5;

        &-container{
            overflow: -moz-scrollbars-none;
            width : 770%;
            display:flex;
            overflow-x: auto;
            overflow-y: hidden;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            &::-webkit-scrollbar {
            display : none;
            width:0px;
            }
        }
        &__image{
            width:320px;
            height:240px;
            background-size: cover;
            background-repeat: no-repeat;
            margin: 0 0.7% 0 0;
            border-radius: 10px; 
        }

    }

        #model-banner1 {
            animation-name : bannerFade1;
            animation-duration: 0.2s;
            animation-delay: 1s;
            animation-fill-mode: both;
            @keyframes bannerFade1 {
                0% {
            background-color:#ececec;
                }
                100% {      
            background-image:url('/modelBanner/modelBanner1.jpg');
            background-color:transparent;
                }
            }
        }
        #model-banner2 {
            animation-name : bannerFade2;
            animation-duration: 0.2s;
            animation-delay: 1s;
            animation-fill-mode: both;
            @keyframes bannerFade2 {
                0% {
            background-color:#ececec;
                }
                100% {      
            background-image:url('/modelBanner/modelBanner2.jpg');
            background-color:transparent;
                }
            }
        }
        #model-banner3 {
            animation-name : bannerFade3;
            animation-duration: 0.2s;
            animation-delay: 1s;
            animation-fill-mode: both;
            @keyframes bannerFade3 {
                0% {
            background-color:#ececec;
                }
                100% {      
            background-image:url('/modelBanner/modelBanner3.jpg');
            background-color:transparent;
                }
            }
        }
        #model-banner4 {
            animation-name : bannerFade4;
            animation-duration: 0.2s;
            animation-delay: 1s;
            animation-fill-mode: both;
            @keyframes bannerFade4 {
                0% {
            background-color:#ececec;
                }
                100% {      
            background-image:url('/modelBanner/modelBanner4.jpg');
            background-color:transparent;
                }
            }
        }        
        #model-banner5 {
            animation-name : bannerFade5;
            animation-duration: 0.2s;
            animation-delay: 1s;
            animation-fill-mode: both;
            @keyframes bannerFade5 {
                0% {
            background-color:#ececec;
                }
                100% {      
            background-image:url('/modelBanner/modelBanner5.jpg');
            background-color:transparent;
                }
            }
        }        
        #model-banner6 {
            animation-name : bannerFade6;
            animation-duration: 0.2s;
            animation-delay: 1s;
            animation-fill-mode: both;
            @keyframes bannerFade6 {
                0% {
            background-color:#ececec;
                }
                100% {      
            background-image:url('/modelBanner/modelBanner6.jpg');
            background-color:transparent;
                }
            }
        }        
        #model-banner7 {
            animation-name : bannerFade7;
            animation-duration: 0.2s;
            animation-delay: 1s;
            animation-fill-mode: both;
            @keyframes bannerFade7 {
                0% {
            background-color:#ececec;
                }
                100% {      
            background-image:url('/modelBanner/modelBanner7.jpg');
            background-color:transparent;
                }
            }
        }        
        #model-banner8 {
            animation-name : bannerFade8;
            animation-duration: 0.2s;
            animation-delay: 1s;
            animation-fill-mode: both;
            @keyframes bannerFade8 {
                0% {
            background-color:#ececec;
                }
                100% {      
            background-image:url('/modelBanner/modelBanner8.jpg');
            background-color:transparent;
                }
            }
        }
</style>