<template>
  <button class="button" :class="buttonStyle" v-bind="$attrs" v-on="$listeners">
    <slot />
  </button>
</template>

<script>
export default {
  name: "AppButton",
  props: {
    buttonStyle: {
      // type: String || Array,
      // default: () => []
    }
  }
};
</script>

<style scoped lang="scss">
.button {
  padding: 10px 30px;
  font: inherit;
  font-size: 1em;
  font-weight: bold;
  border-radius: 4px;
  color: $white;
  background-color: $black;
  cursor: pointer;
  position: relative;
  width: 120px;
  text-transform: uppercase;
  transition: 0.15s all ease-out;
}

.light {
  background-color: $white;
  border: 2px solid $grey;
  color: $grey;
  border-radius: 4px;
}

.dark {
  border: 2px solid $black;
  border-radius: 4px;
}

.small {
  padding: 0;
  font-size: 0.9em;
  width: 80px;
}

.medium {
  padding: 10px 30px;
  font-size: 0.9em;
  font-weight: 500;
}

.wide {
  width: 90%;
}

.full {
  padding: 15px 30px;
  width: 100%;
}

.cancel {
  background-color: red;
  color: white;
  border: 1px solid transparent;
}

.active {
  background-color: $primary;
  color: $white;
  border: 0;
}

.outline-secondary {
  border: 1.5px solid $dark-grey;
  background-color: $white;
  color: $dark-grey;
}

.cancel:hover,
.cancel:active {
  background-color: salmon;
  border: 1px solid transparent;
  color: white;
}
</style>
