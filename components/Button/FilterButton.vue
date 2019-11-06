<template>
  <button class="filter-button" @click="openFilter">
    <i class="material-icons filter-button__icon">
      tune
    </i>
    <span>필터</span>
  </button>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["openBottomSheet"]),

    openFilter(event) {
      event.preventDefault();
      event.stopPropagation();
      this.$store.dispatch("openBottomSheet");
    }
  }
};
</script>

<style lang="scss" scoped>
.filter-button {
  padding: 5px 15px;
  border: 1px solid $dark-grey;
  border-radius: 4px;
  color: $dark-grey;
  font-size: 0.8em;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;

  &__icon {
    font-size: 1.3em;
    margin-right: 5px;
  }
}
</style>
