<template>
  <div class="category-container__first"
  ref="categoryContainerFirst">
    <div
      ref="horizontalCategory"
      class="category-container"
      :class="{ fix: isCollection }"
      id="category__container__top"
    >
      <label
        v-for="category in activeCategories"
        :key="category.code"
        class="category"
        :class="{ 'category--active': FIRST_CATEGORY == category.code }"
        @click="changeCategory(category)"
        id="category__label"
      >
        <span>{{ category.name }}</span>
      </label>
    </div>
    <div class="category-space"
    ref="categorySpace"
    id="categorySpace"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "Vuex";

export default {
  data() {
    return {
      activeCategories: [],
      isCollection: true,
      blah: [],
      categories: [
        { code: "000", name: "전체" },
        { code: "001", name: "아우터" },
        { code: "002", name: "상의" },
        { code: "005", name: "드레스" },
        { code: "004", name: "스커트" },
        { code: "003", name: "바지" },
        { code: "006", name: "신발" },
        { code: "007", name: "가방" },
        { code: "008", name: "잡화" },
        { code: "009", name: "쥬얼리" },
        { code: "010", name: "비치웨어" },
        { code: "011", name: "란제리/파자마" }
      ],

      all: [{ code: "000", name: "전체" }],

      outer: [
        {
          code: "000",
          name: "전체"
        },
        {
          code: "001",
          name: "코트"
        },
        {
          code: "002",
          name: "자켓"
        },
        {
          code: "003",
          name: "점퍼"
        },
        {
          code: "004",
          name: "가디건"
        }
      ],

      upper: [
        {
          code: "000",
          name: "전체"
        },
        {
          code: "001",
          name: "티셔츠"
        },
        {
          code: "002",
          name: "니트"
        },
        {
          code: "003",
          name: "블라우스/셔츠"
        },
        {
          code: "004",
          name: "후드/맨투맨"
        },
        {
          code: "005",
          name: "나시"
        }
      ],

      pants: [
        {
          code: "000",
          name: "전체"
        },
        {
          code: "001",
          name: "청바지"
        },
        {
          code: "002",
          name: "슬랙스"
        },
        {
          code: "003",
          name: "숏팬츠"
        },
        {
          code: "004",
          name: "레깅스"
        },
        {
          code: "005",
          name: "롱팬츠"
        }
      ],

      skirt: [{ code: "000", name: "전체" }],

      dress: [{ code: "000", name: "전체" }],

      shoes: [{ code: "000", name: "전체" }],

      bag: [{ code: "000", name: "전체" }],

      accesories: [{ code: "000", name: "전체" }],

      jewelry: [
        { code: "000", name: "전체" },
        {
          code: "001",
          name: "귀걸이"
        },
        {
          code: "002",
          name: "목걸이/팔찌"
        },
        {
          code: "003",
          name: "반지"
        },
        {
          code: "004",
          name: "기타"
        }
      ],

      beachwear: [{ code: "000", name: "전체" }],

      lingerie: [{ code: "000", name: "전체" }]
    };
  },

  computed: {
    ...mapGetters(["FIRST_CATEGORY", "ACTIVE_FIRST_CATEGORY"])
  },

  created() {
    if (process.browser && this.$route.name.includes("model")) {
      window.addEventListener("scroll", this.handleSticky);
    }

    if (this.$route.name == "collection" ||
       this.$route.name == "collection1" ) {
      this.activeCategories = this.categories;
    }
    else {
      this.isCollection = false;

      const categories = this.categories;
      const activeCategories = this.$store.getters.ACTIVE_FIRST_CATEGORY;

      activeCategories.push({ cat1: "000", cat2: null });
      categories.forEach(category => {
        this.rearrangeActiveCategories(category, activeCategories);
      });
    }
  },

  methods: {
    ...mapActions(["setFirstCategory"]),

    handleSticky() {
      if (this.$route.name.includes("model")) {

        if (document.body.contains(document.getElementById('category__label'))) {
          
        if ( window.scrollY >= 900 ) {
          this.$refs.horizontalCategory.style.position = "fixed";
          this.$refs.horizontalCategory.style.top = "0px";
          this.$refs.horizontalCategory.style.zIndex = "4";
        } 
        else {
          this.$refs.horizontalCategory.style.position = "absolute";
          this.$refs.horizontalCategory.style.top = null;
        }
      }
      else {
          this.$refs.categorySpace.style.height = "0px";
          this.$refs.horizontalCategory.style.border = "0px";
        }
      }
    },

    rearrangeActiveCategories(category, activeCategories) {
      activeCategories.forEach(activeCategory => {
        if (category.code == activeCategory.cat1) {
          this.activeCategories.push(category);
        }
      });
    },

    async changeCategory(category) {
      
      this.$store.dispatch("setOffset", 0);
      this.$store.dispatch("setHasMoreData", true);
      await this.$store.dispatch("setFirstCategory", category.code);

      switch (category.code) {
        case "000":
          await this.$store.dispatch("setActiveSecondCategory", this.all);
          await this.$store.dispatch("setSecondCategory", this.all[0]);
          break;
        case "001":
          await this.$store.dispatch("setActiveSecondCategory", this.outer);
          await this.$store.dispatch("setSecondCategory", this.outer[0]);
          break;
        case "002":
          await this.$store.dispatch("setActiveSecondCategory", this.upper);
          await this.$store.dispatch("setSecondCategory", this.upper[0]);
          break;
        case "003":
          await this.$store.dispatch("setActiveSecondCategory", this.pants);
          await this.$store.dispatch("setSecondCategory", this.pants[0]);
          break;
        case "004":
          await this.$store.dispatch("setActiveSecondCategory", this.skirt);
          await this.$store.dispatch("setSecondCategory", this.skirt[0]);
          break;
        case "005":
          await this.$store.dispatch("setActiveSecondCategory", this.dress);
          await this.$store.dispatch("setSecondCategory", this.dress[0]);
          break;
        case "006":
          await this.$store.dispatch("setActiveSecondCategory", this.shoes);
          await this.$store.dispatch("setSecondCategory", this.shoes[0]);
          break;
        case "007":
          await this.$store.dispatch("setActiveSecondCategory", this.bag);
          await this.$store.dispatch("setSecondCategory", this.bag[0]);
          break;
        case "008":
          await this.$store.dispatch(
            "setActiveSecondCategory",
            this.accesories
          );
          await this.$store.dispatch("setSecondCategory", this.accesories[0]);
          break;
        case "009":
          await this.$store.dispatch("setActiveSecondCategory", this.jewelry);
          await this.$store.dispatch("setSecondCategory", this.jewelry[0]);
          break;
        case "010":
          await this.$store.dispatch("setActiveSecondCategory", this.beachwear);
          await this.$store.dispatch("setSecondCategory", this.beachwear[0]);
          break;
        case "011":
          await this.$store.dispatch("setActiveSecondCategory", this.lingerie);
          await this.$store.dispatch("setSecondCategory", this.lingerie[0]);
          break;
      }

      if (this.$route.name.includes("model")) {
        
         if(window.scrollY < 830) {
           const category = document.getElementById("category__label");
         category.scrollIntoView(true);
         }
         else { 
          document.getElementById('categorySpace').scrollIntoView();
           
        }
        }
        else{
          window.scrollTo(0,0);
        }

      if (this.$store.getters.ACTIVE_SECOND_CATEGORY.length == 1) {
        this.$store.dispatch("setDropdownInactive", true);
      } else {
        this.$store.dispatch("setDropdownInactive", false);
      }

      if (this.$route.name.includes("collection")) {
        await this.$store.dispatch("getCollectionProducts");
      } else if (this.$route.name.includes("model")) {
        await this.$store.dispatch("getModelProducts");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.category-container {
  margin: 0;
  padding: 0;
  border-top: 1px solid $light-grey;
  border-bottom: 1px solid $light-grey;
  white-space: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  position: absolute;
  left: auto;
  right: auto;
  width: 100%;
  max-width: 500px;
  text-align: left;
  background-color: $white;

  &::-webkit-scrollbar {
    display: none;
  }
}

.fix {
  position: fixed;
  z-index: 6;
}

.fix-model {
  position: fixed;
  z-index: 6;
}

.category {
  margin: 0 15px;
  padding: 13px 0;
  border: none;
  width: auto;
  font-size: 0.8em;
  font-weight: 600;
  background: transparent;
  color: $grey;
  box-shadow: none;
  z-index: 2;

  &:visited,
  &:hover,
  &:active,
  &:focus {
    color: $primary;
  }

  &--active {
    color: $primary;
    border-bottom: 2px solid $primary;
  }
}

.category-space {
  height: 50px;
}
</style>
