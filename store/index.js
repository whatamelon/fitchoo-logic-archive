import Vuex from "vuex";

import app from "@/store/modules/app";
import carousel from "@/store/modules/carousel";
import filter from "@/store/modules/filter";
import exhibition from "@/store/modules/exhibition";
import model from "@/store/modules/model";
import navigation from "@/store/modules/navigation";
import product from "@/store/modules/product";
import user from "@/store/modules/user";

const store = () => {
  return new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    modules: {
      app,
      carousel,
      exhibition,
      filter,
      model,
      navigation,
      product,
      user
    }
  });
};

export default store;
