<template>
  <b-modal
    v-model="SHOW_MODAL"
    centered
    hide-header
    hide-footer
    no-close-on-backdrop
    @click="openModal"
  >
    <div class="login-alert">
      <p class="login-alert__title">
        {{ title }}
      </p>
    </div>

    <div class="input">
      <input
        v-model="inputValue"
        class="input__bottom"
        type="text"
        maxlength="3"
        pattern="[0-9]*"
        @input="inputCheck"
        @keypress="isNumber($event)"
      />
      <b class="input__cm">cm</b>
    </div>

    <div class="login-button-container">
      <button class="modal-button modal-button--unfocused" @click="closeModal">
        취소
      </button>
      <button class="modal-button" @click="setHeight(inputValue)">
        수정
      </button>
    </div>
  </b-modal>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    title: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      inputValue: null
    };
  },

  computed: {
    ...mapGetters(["SHOW_MODAL"]),

    height: {
      get: function() {
        return this.$store.getters.USER_HEIGHT;
      },
      set: function(inputValue) {
        this.$store.dispatch("setHeight", inputValue);
      }
    }
  },
  methods: {
    ...mapActions(["openModal", "closeModal"]),

     isNumber: function(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();;
      } else {
        return true;
      }
    },

    async setHeight(height) {
      if (!height) {
        this.$store.dispatch("closeModal");
        return;
      }
      localStorage.setItem("height", height);

      if (this.$store.getters.IS_LOGGED_IN) {
        await this.$store.dispatch("sendHeight", height);
      } else {
        await this.$store.dispatch("setHeight", height);
      }

      await this.$store.dispatch("getModels", height);
      
        const userProperties = {
          userHeight: this.height
        };
        this.$amplitude.getInstance().setUserProperties(userProperties);
        console.log(userProperties)

      this.$store.dispatch("closeModal");

      window.scrollTo(0, 0);
    },
    inputCheck() {}
  }
};
</script>
<style scoped lang="scss">
.login-alert {
  text-align: center;

  &__title {
    margin: 20px 0 10px 0;
    font-size: 1.5em;
    font-weight: 800;
    color: $black;
    word-break: keep-all;
  }

  &__subtitle {
    margin: 10px 0;
    padding-bottom: 10px;
    font-size: 0.9em;
    font-weight: normal;
    color: gray;
    word-break: keep-all;
  }
}

.input {
  align-items: flex-end;
  display: flex;
  justify-content: center;
  padding: 10px 0 50px 0;
  border-radius: 0;

  &__bottom {
    border: 0;
    border-bottom: 5px solid $black;
    border-radius: 0;
    padding: 0;
    background: transparent;
    font-weight: bold;
    font-size: 2em;
    color: $black;
    outline: 0;
    width: 70px;
    margin-left: 3px;
    margin-top: 15px;
    color: $black;
    text-align: center;
  }

  &__cm {
    font-weight: 700;
    font-size: 2em;
    color: $black;
    margin-top: 15px;
  }
}

.login-button-container {
  display: flex;
  justify-content: space-between;
}

.modal-button {
  width: 48%;
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
