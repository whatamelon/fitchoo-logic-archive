const navigation = {
  state() {
    return {
      CURRENT_ROUTE: "/index",
      PRODUCTS_PAGE: 1,
      activeCategory: "0",
      ACTIVE_CATEGORY: "0",
      PREVIOUS_PAGE: "/"
    };
  },

  getters: {
    CURRENT_ROUTE: state => {
      return state.CURRENT_ROUTE;
    },

    PRODUCTS_PAGE: state => {
      return state.PRODUCTS_PAGE;
    },

    activeCategory: state => {
      return state.activeCategory;
    },

    ACTIVE_CATEGORY: state => {
      return state.ACTIVE_CATEGORY;
    },

    PREVIOUS_PAGE: state => {
      return state.PREVIOUS_PAGE;
    }
  },

  mutations: {
    SET_CURRENT_ROUTE(state, payload) {
      state.CURRENT_ROUTE = payload;
    },

    SET_PRODUCTS_PAGE(state, payload) {
      state.PRODUCTS_PAGE = payload;
    },

    SET_ACTIVE_CATEGORY(state, payload) {
      state.ACTIVE_CATEGORY = payload;
    },

    setActiveCategory(state, payload) {
      state.activeCategory = payload;
    },

    SET_PREVIOUS_PAGE(state, payload) {
      state.PREVIOUS_PAGE = payload;
    }
  },

  actions: {
    setCurrentRoute: ({ commit }, payload) =>
      new Promise((resolve, reject) => {
        try {
          commit("SET_CURRENT_ROUTE", payload);
          resolve();
        } catch (error) {
          reject(error);
        }
      }),

    setProductsPage({ commit }, payload) {
      commit("SET_PRODUCTS_PAGE", payload);
    },

    setActiveCategory({ commit }, payload) {
      commit("SET_ACTIVE_CATEGORY", payload);
    },

    setPreviousPage({ commit }, payload) {
      commit("SET_PREVIOUS_PAGE", payload);
    }
  }
};

export default navigation;
