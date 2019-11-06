<template>
  
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  //  transition: 'slideRight',

  data() {
    return {
      category : localStorage.getItem('productCategory'),
      // style_models : this.$store.getters.STYLE_MODELS,
      // height_models : this.$store.getters.HEIGHT_MODELS,
      // model_products_new : this.$store.getters.MODEL_PRODUCTS_NEW,
      // model_same_products: this.$store.getters.MODEL_SAME_PRODUCTS,
      model_info: this.$store.getters.MODEL_INFO
    };
  },
  scrollToTop: true,

//   scrollBehavior (to, from, savedPosition) {
//   return { x: 0, y: 0 }
// },

  computed: {
    ...mapGetters([
      "IMAGE_URL",
      "MODEL_PRODUCTS",
      // "MODELS",
      "PRODUCT_INFO",
      // "STYLE_MODELS",
      // "HEIGHT_MODELS",
      // "MODEL_PRODUCTS_NEW",
      // "MODEL_SAME_PRODUCTS",
      "MODEL_INFO"
    ])
  },

  async asyncData({ store, params }) {
    var productInfo = JSON.parse(localStorage.getItem('product'));
    var category1 = productInfo.cat1;
    var category2 = productInfo.cat2;

    console.log(productInfo);
    console.log(category1);
    console.log(category2);

 switch (category1) {
        case "001":
          if(category2 == "000") {
            localStorage.setItem('productCategory', '아우터');
          }
          else if (category2 == "001") {
            localStorage.setItem('productCategory', '코트');
          }
          else if (category2 == "002") {
            localStorage.setItem('productCategory', '자켓');
          }
          else if (category2 == "003") {
            localStorage.setItem('productCategory', '점퍼');
          }
          else {
            localStorage.setItem('productCategory', '가디건');
          }
          break;
        case "002":
          if(category2 == "000") {
            localStorage.setItem('productCategory', '상의');
          }
          else if (category2 == "001") {
            localStorage.setItem('productCategory', '티셔츠');
          }
          else if (category2 == "002") {
            localStorage.setItem('productCategory', '니트');
          }
          else if (category2 == "003") {
            localStorage.setItem('productCategory', '블라우스/셔츠');
          }
          else if (category2 == "004") {
            localStorage.setItem('productCategory', '후드/맨투맨');
          }
          else {
            localStorage.setItem('productCategory', '나시');
          }
          break;
        case "003":
          if(category2 == "000") {
            localStorage.setItem('productCategory', '하의');
          }
          else if (category2 == "001") {
            localStorage.setItem('productCategory', '청바지');
          }
          else if (category2 == "002") {
            localStorage.setItem('productCategory', '슬랙스');
          }
          else if (category2 == "003") {
            localStorage.setItem('productCategory', '숏팬츠');
          }
          else if (category2 == "004") {
            localStorage.setItem('productCategory', '레깅스');
          }
          else {
            localStorage.setItem('productCategory', '롱팬츠');
          }
          break;
        case "004":
            localStorage.setItem('productCategory', '스커트');
          break;
        case "005":
            localStorage.setItem('productCategory', '원피스');
          break;
        case "006":
            localStorage.setItem('productCategory', '신발');
          break;
        case "007":
            localStorage.setItem('productCategory', '가방');
          break;
        case "008":
            localStorage.setItem('productCategory', '악세서리');
          break;
        case "009":
          if(category2 == "000") {
            localStorage.setItem('productCategory', '쥬얼리');
          }
          else if (category2 == "001") {
            localStorage.setItem('productCategory', '귀걸이');
          }
          else if (category2 == "002") {
            localStorage.setItem('productCategory', '목걸이/팔찌');
          }
          else if (category2 == "003") {
            localStorage.setItem('productCategory', '반지');
          }
          else {
            localStorage.setItem('productCategory', '기타');
          }
          break;
        case "0010":
            localStorage.setItem('productCategory', '비치웨어');
          break;
        case "0011":
            localStorage.setItem('productCategory', '란제리');
          break;
 }

    
    // await store.dispatch("getModelProductsNew");
    // await store.dispatch("getModelSameProducts");
    // await store.dispatch("getStyleModels", params);
    // await store.dispatch("getHeightModels", params);
    await store.dispatch("setModel",store.getters.MODEL_INFO);
    console.log("야 그래서 셋모델 했어?")
    console.log(store.getters.MODEL_INFO);

    

    return {
      category: localStorage.getItem('productCategory'),
      // models : store.getters.MODELS,
      productList: store.getters.MODEL_PRODUCTS,
      model: store.getters.MODEL,
      product: store.getters.PRODUCT_INFO,
      // style_models : store.getters.STYLE_MODELS,
      // height_models : store.getters.HEIGHT_MODELS,
      // model_products_new : store.getters.MODEL_PRODUCTS_NEW,
      // model_same_products : store.getters.MODEL_SAME_PRODUCTS,
      model_info : store.getters.MODEL_INFO
    };
  },

  created() {
      console.log(localStorage.getItem('product_id'));
      console.log(this.$store.getters.MODEL_INFO);

  },
    
  mounted() {
    
      const recentProductId1 = JSON.parse(localStorage.recentProductId);
      recentProductId1.push(this.$store.getters.PRODUCT_INFO);
      localStorage.recentProductId = JSON.stringify(recentProductId1);

      const recentModelId1 = JSON.parse(localStorage.recentModelId);
      recentModelId1.push(this.$store.getters.MODEL_INFO);
      localStorage.recentModelId = JSON.stringify(recentModelId1);

          if (localStorage.getItem('product_id')) {
          this.$router.push('/product/' + localStorage.getItem('product_id'));
    
    }
      

    this.$store.dispatch("setHeaderTitle", "상품상세");
    this.$store.dispatch("hideLogo");
    this.$store.dispatch("setCurrentRoute", this.$route.path);
  },


  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("showLogo");
    next();
  }
  };
</script>