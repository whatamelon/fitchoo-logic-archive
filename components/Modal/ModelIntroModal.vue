<template>
  <b-modal
    v-model="SHOW_INTRO_MODAL"
    centered
    hide-header
    hide-footer
    no-close-on-backdrop
    @click="openIntroModal"
  >

      <div class="modal-image" style="background-image: url('modelPopUpModal.jpg');">
      </div>

      <div class="modal-ex">
        <span class="modal-ex__bold">
          나한테 꼭 맞는 모델을 찾아보세요.
        </span>
        <span class="modal-ex__light">
          패션 쇼핑이 훨씬 쉬워져요!
        </span>
      </div>

      <button class="modal-button modal-button--unfocused" @click="closeIntroModal">
        시작하기
      </button>
  </b-modal>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {

  data() {
    return {};
  },

  computed: {
    ...mapGetters(["SHOW_INTRO_MODAL"])
  },
  methods: {
    ...mapActions(["openIntroModal", "closeIntroModal"])
  }
};
</script>
<style scoped lang="scss">
.modal-image {
  width:100%;
  height:180px;
  background-size: contain;
  background-repeat: no-repeat;
}

.modal-ex{
  display:grid;
  justify-content: center;
  line-height: 2.1em;
  margin: 1% 0 5% 0;
  &__bold{
    text-align: center;
    font-size: 1.2em;
    font-weight: 800;
  }
  &__light{
    text-align: center;
    font-size: 1.1em;
    font-weight: 500;
  }
}

.modal-button {
  
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: $white;
  background-color: $dark-grey;
  height: 45px;
  border: 0;
  border-radius: 4px;
  font-size: 1em;
  font-weight: bold;
  display: block;
  margin: 0 auto;

  &--unfocused {
    color: #8d8d8d;
    background-color: #d9d9d9;
  }

  &:focus,
  &:hover {
    border: 2px solid inherit;
  }
}
</style>
