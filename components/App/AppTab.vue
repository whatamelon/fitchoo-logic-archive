<template>
  <div>
    <div class="tab">
      <div
        class="tab__title"
        :class="{ 'tab--active': activeTab === 'leftTab' }"
        @click="switchTab('leftTab')"
        id="leftTabTab"
      >
        {{ leftTab }}
      </div>
      <div
        class="tab__title"
        :class="{ 'tab--active': activeTab === 'rightTab' }"
        @click="switchTab('rightTab')"
        id="rightTabTab"
      >
        {{ rightTab }}
      </div>
    </div>
    <div class="tab-space"></div>
  </div>
</template>

<script>
export default {
  props: {
    leftTab: {
      type: String,
      required: true
    },

    rightTab: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      activeTab: "leftTab"
    };
  },
  methods: {
    switchTab(tab) {
      this.activeTab = tab;
      this.$emit("switched", tab);
      window.scrollTo(0, 0);
      
    }

  }
};
</script>

<style lang="scss" scoped>
.tab {
  margin: 0;
  width: 100%;
  max-width: 500px;
  position: fixed;
  display: flex;
  text-align: center;
  background-color: $white;
  z-index: 2;

  &__title {
    padding: 15px 10px;
    border-bottom: solid 1px $light-grey;
    width: 50%;
    font-size: 0.9em;
    font-weight: 600;
    color: $grey;
  }

  &--active {
    color: $primary;
    border-bottom: solid 3px $primary;
  }

}

.tab-space {
  height: 51px;
}
</style>
