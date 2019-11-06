<template>
  <div class="alert-container">
    <b-alert
      ref="appAlert"
      class="app-alert"
      :class="{ 'app-alert--inverse': isInverse }"
      :show="dismissCountDown"
      variant="light"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
    >
      {{ alertMessage }}
    </b-alert>
  </div>
</template>

<script>
export default {
  props: {
    alertMessage: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      dismissSecs: 2,
      dismissCountDown: 0,
      isInverse: false
    };
  },

  mounted() {
    if (this.alertMessage === "엇! 키 입력을 확인해주세요!") {
      this.isInverse = true;
    }
  },

  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },

    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    }
  }
};
</script>

<style lang="scss" scoped>
.alert-container {
  margin: 5px 0;
  width: 100%;
  display: flex;
  justify-content: center;
}

.app-alert {
  color: $primary;
  width: 100%;
  text-align: center;
  font-weight: 600;

  word-break: keep-all;
  word-wrap: break-word;

  &--inverse {
    border: 0;
    color: $white;
    background-color: $primary;
  }
}
</style>
