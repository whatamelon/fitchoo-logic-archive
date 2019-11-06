<template>
  <div class="slider-container">
    <div class="price-container">
      <span class="slider-price">{{ priceRange }}</span>
    </div>

    <div style="padding: 5px 15px 0 15px">
      <v-range-slider
        ref="slider"
        v-model="price"
        class="app-slider"
        :max="100000"
        :min="0"
        :step="1000"
        :color="'#ec3e39'"
        thumb-label
        :thumb-size="42"
        @change="onChange($event)"
      >
      </v-range-slider>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slider: 45,
      volume: 20
      // price: [20000, 80000]
    };
  },

  computed: {
    priceRange() {
      let priceRange =
        this.separateThousand(this.price[0]) +
        " ~ " +
        this.separateThousand(this.price[1]);

      if (this.price[1] == 100000) {
        return priceRange + " 이상";
      }
      return priceRange;
    },

    price() {
      return [
        this.$store.getters.TEMPORARY_PRICE_RANGE.substring(
          0,
          this.$store.getters.TEMPORARY_PRICE_RANGE.indexOf("r")
        ),
        this.$store.getters.TEMPORARY_PRICE_RANGE.substring(
          this.$store.getters.TEMPORARY_PRICE_RANGE.indexOf("r") + 1,
          this.$store.getters.TEMPORARY_PRICE_RANGE.length
        )
      ];
    }
  },

  mounted() {
    const leftThumb = this.$refs.slider.$el.children[0].children[0].children[0]
      .children[3].children[0];

    const rightThumb = this.$refs.slider.$el.children[0].children[0].children[0]
      .children[4].children[0];

    leftThumb.style.width = "36px";
    leftThumb.style.height = "36px";
    rightThumb.style.width = "36px";
    rightThumb.style.height = "36px";
  },

  created() {
    const priceRange = this.$store.getters.TEMPORARY_PRICE_RANGE;
    const minimumPrice = priceRange.substring(0, priceRange.indexOf("r"));
    const maximumPrice = priceRange.substring(
      priceRange.indexOf("r") + 1,
      priceRange.length
    );

    this.price[0] = minimumPrice;
    this.price[1] = maximumPrice;
  },

  methods: {
    separateThousand(price) {
      price = price.toString();
      let index;
      if (price.length == 6) {
        index = 3;
      } else if (price.length == 5) {
        index = 2;
      } else if (price.length == 4) {
        index = 1;
      } else {
        return price;
      }
      return price.substring(0, index) + "," + price.substring(index);
    },

    onChange(value) {
      const temporaryPriceRange = value[0] + "r" + value[1];
      this.$store.dispatch("setTemporaryPriceRange", temporaryPriceRange);
    }
  }
};
</script>
<style lang="scss">
.slider-container {
  border: 0;
  background-color: $white;
  position: relative;
}

.app-slider {
  margin: 0;
  padding: 0;
  border: 0;
  height: 50px;
  min-height: 0;
  background-color: $white;
}

.justify-center {
  display: flex;
  justify-content: center;
}

.price-container {
  display: flex;
  justify-content: flex-end;
}

.slider-price {
  width: auto;
  font-size: 0.8em;
}
</style>
