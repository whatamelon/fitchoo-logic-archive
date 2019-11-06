const filter = {
  state() {
    return {
      FIRST_CATEGORY: "000",
      SECOND_CATEGORY: { code: "000", name: "전체" },
      ACTIVE_FIRST_CATEGORY: [],
      ACTIVE_SECOND_CATEGORY: [
        {
          code: "000",
          name: "전체"
        },
        {
          code: "001",
          name: "코트"
        },
        {
          code: "002",
          name: "자켓"
        },
        {
          code: "003",
          name: "점퍼"
        },
        {
          code: "004",
          name: "가디건"
        }
      ],
      ONLY_FIRST_CATEGORY_ACTIVE: false,
      PRICE_RANGE: "0r100000",
      HEIGHT_RANGE: "",
      SORT_ORDER: "de",
      TEMPORARY_PRICE_RANGE: "0r100000",
      TEMPORARY_HEIGHT_RANGE: "",
      TEMPORARY_SORT_ORDER: "de",
      LIMIT: 30,
      HAS_MORE_DATA: true,
      DROPDOWN_INACTIVE: false
    };
  },

  getters: {
    FIRST_CATEGORY: state => {
      return state.FIRST_CATEGORY;
    },

    SECOND_CATEGORY: state => {
      return state.SECOND_CATEGORY;
    },

    ACTIVE_FIRST_CATEGORY: state => {
      return state.ACTIVE_FIRST_CATEGORY;
    },

    ACTIVE_SECOND_CATEGORY: state => {
      return state.ACTIVE_SECOND_CATEGORY;
    },

    ONLY_FIRST_CATEGORY_ACTIVE: state => {
      return state.ONLY_FIRST_CATEGORY_ACTIVE;
    },

    PRICE_RANGE: state => {
      return state.PRICE_RANGE;
    },

    HEIGHT_RANGE: state => {
      return state.HEIGHT_RANGE;
    },

    SORT_ORDER: state => {
      return state.SORT_ORDER;
    },

    TEMPORARY_PRICE_RANGE: state => {
      return state.TEMPORARY_PRICE_RANGE;
    },

    TEMPORARY_HEIGHT_RANGE: state => {
      return state.TEMPORARY_HEIGHT_RANGE;
    },

    TEMPORARY_SORT_ORDER: state => {
      return state.TEMPORARY_SORT_ORDER;
    },

    LIMIT: state => {
      return state.LIMIT;
    },

    HAS_MORE_DATA: state => {
      return state.HAS_MORE_DATA;
    },

    DROPDOWN_INACTIVE: state => {
      return state.DROPDOWN_INACTIVE;
    }
  },

  mutations: {
    SET_FIRST_CATEGORY(state, payload) {
      state.FIRST_CATEGORY = payload;
    },

    SET_SECOND_CATEGORY(state, payload) {
      state.SECOND_CATEGORY = payload;
    },

    SET_ACTIVE_FIRST_CATEGORY(state, payload) {
      state.ACTIVE_FIRST_CATEGORY = payload;
    },

    SET_ACTIVE_SECOND_CATEGORY(state, payload) {
      state.ACTIVE_SECOND_CATEGORY = payload;
    },

    SET_ONLY_FIRST_CATEGORY_ACTIVE(state, payload) {
      state.ONLY_FIRST_CATEGORY_ACTIVE = payload;
    },

    SET_PRICE_RANGE(state, payload) {
      state.PRICE_RANGE = payload;
    },

    SET_HEIGHT_RANGE(state, payload) {
      state.HEIGHT_RANGE = payload;
    },

    SET_SORT_ORDER(state, payload) {
      state.SORT_ORDER = payload;
    },

    SET_TEMPORARY_PRICE_RANGE(state, payload) {
      state.TEMPORARY_PRICE_RANGE = payload;
    },

    SET_TEMPORARY_HEIGHT_RANGE(state, payload) {
      state.TEMPORARY_HEIGHT_RANGE = payload;
    },

    SET_TEMPORARY_SORT_ORDER(state, payload) {
      state.TEMPORARY_SORT_ORDER = payload;
    },

    SET_HAS_MORE_DATA(state, payload) {
      state.HAS_MORE_DATA = payload;
    },

    SET_DROPDOWN_INACTIVE(state, payload) {
      state.DROPDOWN_INACTIVE = payload;
    }
  },

  actions: {
    setFirstCategory: ({ commit }, payload) =>
      new Promise(resolve => {
        commit("SET_FIRST_CATEGORY", payload);
        resolve();
      }),

    setSecondCategory: ({ commit }, payload) =>
      new Promise(resolve => {
        commit("SET_SECOND_CATEGORY", payload);
        resolve();
      }),

    setActiveFirstCategory: ({ commit }, activeFirstCategories) =>
      new Promise(resolve => {
        commit("SET_ACTIVE_FIRST_CATEGORY", activeFirstCategories);
        resolve();
      }),

    setActiveSecondCategory: ({ commit }, payload) =>
      new Promise(resolve => {
        commit("SET_ACTIVE_SECOND_CATEGORY", payload);
        resolve();
      }),

    setOnlyFirstCategoryActive({ commit }, payload) {
      commit("SET_ONLY_FIRST_CATEGORY_ACTIVE", payload);
    },

    setPriceRange: ({ commit }, payload) =>
      new Promise(resolve => {
        const minimumPrice = payload.substring(0, payload.indexOf("r"));
        let maximumPrice = payload.substring(
          payload.indexOf("r") + 1,
          payload.length
        );
        if (maximumPrice == 100000) {
          maximumPrice = 4000000;
        }
        const priceRange = minimumPrice + "r" + maximumPrice;
        commit("SET_PRICE_RANGE", priceRange);
        resolve();
      }),

      setHeightRange: ({ commit }, payload) =>
      new Promise(resolve => {
        commit("SET_HEIGHT_RANGE", payload);
        resolve();
      }),
      
      
    setSortOrder: ({ commit }, payload) =>
      new Promise(resolve => {
        commit("SET_SORT_ORDER", payload);
        resolve();
      }),

    setTemporaryPriceRange: ({ commit }, payload) =>
      new Promise(resolve => {
        commit("SET_TEMPORARY_PRICE_RANGE", payload);
        resolve();
      }),

      setTemporaryHeightRange: ({ commit }, payload) =>
      new Promise(resolve => {
        commit("SET_TEMPORARY_HEIGHT_RANGE", payload);
        resolve();
      }),

    setTemporarySortOrder: ({ commit }, payload) =>
      new Promise(resolve => {
        commit("SET_TEMPORARY_SORT_ORDER", payload);
        resolve();
      }),

    resetFilter({ commit }) {
      commit("SET_FIRST_CATEGORY", "002");
      commit("SET_SECOND_CATEGORY", { code: "000", name: "전체" });
      commit("SET_PRICE_RANGE", "0r100000");
      commit("SET_HEIGHT_RANGE", "");
      commit("SET_SORT_ORDER", "de");
    },

    setHasMoreData: ({ commit }, payload) =>
      new Promise(resolve => {
        commit("SET_HAS_MORE_DATA", payload);
        resolve();
      }),

    setDropdownInactive: ({ commit }, payload) =>
      new Promise(resolve => {
        commit("SET_DROPDOWN_INACTIVE", payload);
        resolve();
      })
  }
};

export default filter;
