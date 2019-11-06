<template>
  <div class="text-xs-center app-dropdown">
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
          ref="dropdownButton"
          :disabled="inactive"
          class="my-btn__content app-dropdown-button"
          v-on="on"
        >
          <span>
            {{ SECOND_CATEGORY.name }}
          </span>
          <i class="material-icons app-dropdown-icon">
            keyboard_arrow_down
          </i>
        </v-btn>
      </template>
      <v-list>
        <v-list-tile
          v-for="(item, index) in items"
          ref="dropdownItem"
          :key="index"
          class="small-font"
          @click="selectItem(item)"
        >
          <span class="small-font">{{ item.name }}</span>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "DropDown",

  computed: {
    ...mapGetters(["FIRST_CATEGORY", "SECOND_CATEGORY"]),

    items() {
      return this.$store.getters.ACTIVE_SECOND_CATEGORY;
    },

    inactive() {
      return this.$store.getters.DROPDOWN_INACTIVE;
    }
  },

  mounted() {
    const dropdownButton = this.$refs.dropdownButton.$el.children[0];
    dropdownButton.style.width = "20px";
    dropdownButton.style.display = "flex";
    dropdownButton.style.justifyContent = "flex-start";
    this.$refs.dropdownButton.$el.style.borderRadius = "0";
    this.$refs.dropdownButton.$el.style.border = "0";
  },

  methods: {
     selectItem(secondCategory) {
       this.$store.dispatch("setSecondCategory", secondCategory);
       this.$store.dispatch("getCollectionProducts");
     const stringSec= JSON.stringify(secondCategory);
      localStorage.setItem("selectCat2",stringSec);
    }
  }
};
</script>

<style lang="scss" scoped>
.text-xs-center {
  margin: 0 !important;
}

.no-margin {
  margin: 0 !important;
  padding: 0 !important;
}

.app-dropdown {
  margin: 0 !important;
  padding: 0 !important;
  // border: 1px solid $dark-grey;
  background-color: $white;
  border: 0;
  // border-radius: 4px;
  color: $dark-grey !important;
  box-shadow: 0 !important;
  font-size: 0.8em;
  font-weight: 600;
  display: flex;
  align-content: flex-start;
  justify-content: flex-start;
  align-items: flex-start;
  width: 15% !important;
  min-width: 50px;
}

.app-dropdown-button {
  margin: 0 5px !important;
  padding: 5px 10px !important;
  display: flex;
  align-items: center;
  background-color: $white;
  background: $white !important;
  justify-content: flex-start;
  color: $black;
  box-shadow: 0px 0px !important;
  opacity: 1;
  transition: 0;
  opacity: 1;
  font-size: 1em;
  font-weight: 600;
  border: 0;
  // border-radius: 4px;
  // width: 0 !important;
  min-width: 100%;
  // min-height: 20px;
  height: auto;

  button {
    width: 20px !important;
    padding: 0;
    margin: 0;
    border: 0 !important;
  }

  &::before {
    border: 0;
    border-radius: 0;
    // margin: 0 !important;
    // padding: 0 !important;
    box-shadow: 0 !important;
    text-decoration: none;
    // width: 20% !important;

    // width: 20px !important;
  }
}

.v-btn__content {
  margin: 0 !important;
  padding: 0 !important;
  justify-content: flex-start !important;
  width: 0;
}

.my-btn__content {
  margin: 0;
  border: 0;
  display: flex;
  justify-content: flex-start !important;
  width: 0;
}

.small-font {
  font-size: 11px !important;
}

.app-dropdown-icon {
  margin-left: 5px;
  font-size: 1em;
  font-weight: 600;
}

.dropdown-item {
  display: block;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;

  div {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }
}
</style>
