<template>
  <div
    class="app-bottom-sheet"
    :class="{
      'app-bottom-sheet--show': SHOW_BOTTOM_SHEET,
      'app-bottom-sheet--hide': !SHOW_BOTTOM_SHEET
    }"
  >
    <div class="header">
      <span class="header__title">필터</span>
      <i class="material-icons close" @click="closeBottomSheet">
        close
      </i>
    </div>

    <div class="filter">
      <h5 class="filter__name">정렬</h5>

      <div class="button-container">
        <button
          v-for="sortOrder in sortOrders"
          :key="sortOrder.sortOrder"
          class="button"
          :class="{
            'button--active': TEMPORARY_SORT_ORDER === sortOrder.sortOrder
          }"
          @click="setTemporarySortOrder(sortOrder.sortOrder)"
        >
          {{ sortOrder.name }}
        </button>
      </div>
    </div>

    <div class="filter">
      <h5 class="filter__name">가격대</h5>
      <AppSlider></AppSlider>
    </div>

    <div class="bottom-container">
      <button class="bottom-button bottom-button--secondary" @click="reset">
        초기화
      </button>
      <button class="bottom-button" @click="applyChanges">
        <span>적용</span>
      </button>
    </div>
  </div>
</template>

<script>
import AppSlider from "@/components/App/AppSlider";

import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    AppSlider
  },

  data() {
    return {
      height: this.$store.getters.USER_HEIGHT,
      heightRanges: [],
      sortOrders: [
        { sortOrder: "dr", name: "최신순" },
        { sortOrder: "pl", name: "가격 낮은순" },
        { sortOrder: "ph", name: "가격 높은순" }
      ],
      priceRanges: [
        { priceRange: "전체" },
        { priceRange: "10,000이하" },
        { priceRange: "10,000~20,000" },
        { priceRange: "20,000~30,000" }
      ]
    };
  },

  computed: {
    ...mapGetters([
      "SHOW_BOTTOM_SHEET",
      "USER_HEIGHT",
      "ACTIVE_FILTER",
      "TEMPORARY_HEIGHT_RANGE",
      "TEMPORARY_SORT_ORDER",
      "TEMPORARY_PRICE_RANGE"
    ])
  },

  mounted() {
    this.heightRanges = [
      {
        heightRange: this.heightRangeCalculator(0, this.height),
        text: "나와 똑같은 키의 모델 상품만 보고 싶어요!"
      },
      {
        heightRange: this.heightRangeCalculator(1, this.height),
        text: "1cm 차이는 같은 키라고 봐야죠!"
      },
      {
        heightRange: this.heightRangeCalculator(3, this.height),
        text: "3cm 차이까지는 괜찮아요!"
      },
      {
        heightRange: this.heightRangeCalculator(5, this.height),
        text: "5cm 차이도 상관없어요!"
      }
    ];
  },

  methods: {
    ...mapActions([
      "openBottomSheet",
      "setTemporaryHeightRange",
      "setTemporarySortOrder",
      "setTemporaryPriceRange"
    ]),

    // heightButtonOut() {

    //   var t1 = document.getElementById("heightFilterButton");
    //   var t2 = document.getElementById("heightFilterName");
    //   if (this.$route.name.includes("collection1")) {
    //     heightFilterButton.classList.add("noShow");
    //     heightFilterName.classList.add("noShow");
    //     this.$refs.heightFilterButton.style.display = "none !important";
    //     this.$refs.heightFilterName.style.display = "none !important";
    // }
    // },

    heightRangeCalculator(range = 0, height = 0) {
      const min = parseInt(height) - range;
      const max = parseInt(height) + range;
      const heightRange = min + "r" + max;

      return heightRange;
    },

    reset() {
      this.$store.dispatch(
        "setTemporaryHeightRange",
        this.heightRangeCalculator(3, this.height)
      );
      this.$store.dispatch("setTemporarySortOrder", "de");
      this.$store.dispatch("setTemporaryPriceRange", "0r100000");
    },

    closeBottomSheet() {
      this.$store.dispatch(
        "setTemporaryHeightRange",
        this.$store.getters.HEIGHT_RANGE
      );
      this.$store.dispatch(
        "setTemporarySortOrder",
        this.$store.getters.SORT_ORDER
      );
      this.$store.dispatch(
        "setTemporaryPriceRange",
        this.$store.getters.PRICE_RANGE
      );

      this.$store.dispatch("closeBottomSheet");
    },

    async applyChanges() {
      this.$amplitude.getInstance().logEvent("click apply");

      await this.$store.dispatch("resetOffset");
      await this.$store.dispatch(
        "setHeightRange",
        this.$store.getters.TEMPORARY_HEIGHT_RANGE
      );
      await this.$store.dispatch(
        "setSortOrder",
        this.$store.getters.TEMPORARY_SORT_ORDER
      );
      await this.$store.dispatch(
        "setPriceRange",
        this.$store.getters.TEMPORARY_PRICE_RANGE
      );
      await this.$store.dispatch("getCollectionProducts");
      await this.$store.dispatch("closeBottomSheet");
    }
  }
};
</script>

<style lang="scss" scoped>
.noShow {
  display: none;
}

.app-bottom-sheet {
  padding: 10px 25px;
  width: 100%;
  max-width: 500px;
  height: 100vh;
  position: absolute;
  top: 100vh;
  display: flex;
  flex-direction: column;
  background-color: $white;
  z-index: 11;
  transition: 0.4s;
  overflow: hidden;
  overflow-y: scroll !important;
  position: fixed;
  width: 100%;

  &--show {
    top: 0;
  }

  &--hide {
    top: 100vh;
  }
}

.filter {
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: flex-start;

  &__box {
    padding: 5px 0;
  }

  &__name {
    margin: 10px 0;
    font-size: 1.1em;
    font-weight: 600;
  }

  &__subtitle {
    font-size: 0.8em;
    color: $grey;
  }
}

.header {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;

  &__title {
    margin: 0;
    text-align: center;
    font-size: 1em;
    font-weight: 700;
    letter-spacing: -1px;
  }
}

.close {
  font-size: 1.4em;
  position: absolute;
  right: 25px;
}

.button-container {
  padding-top: 5px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.button {
  margin-bottom: 10px;
  padding: 5px 10px;
  border: 1.2px solid $dark-grey;
  border-radius: 4px;
  width: 32%;
  height: 3em;
  font-size: 0.8em;
  font-weight: 600;
  word-break: keep-all;
  word-wrap: break-word;

  &--active {
    background-color: $dark-grey;
    color: $white;
  }

  &--full {
    width: 100%;
  }
}

.bottom-container {
  // width: 100%;
  // max-width: 500px;
  // position: absolute;
  // bottom: 0;
  // left: 0;
  // display: flex;
  // z-index: 6;

  width: 100%;
  max-width: 500px;
  padding: 20px;
  position: relative;
  // bottom: 0;
  // left: 0;
  display: flex;
  justify-content: space-between;
  z-index: 6;
}

.bottom-button {
  // width: 50%;
  // height: 50px;
  padding: 10px 50px;
  border-radius: 4px;
  font-weight: 600;
  background-color: $primary;
  color: $white;

  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;

  &--secondary {
    background-color: $grey;
  }
}
</style>
