import {
  addToSavedProductsAPI,
  deleteFromSavedProductsAPI,
  getSavedProductsAPI,
  getCollectionProductsAPI,
  getExhibitionProductsAPI,
  getCarouselProductsAPI
} from "@/api/product";

const product = {
  state() {
    return {
      PRODUCT_LIST: [],
      PRODUCT_INFO: null,
      COLLECTION_PRODUCTS: [],
      EXHIBITION_PRODUCTS: [],
      CAROUSEL_PRODUCTS:[],
      SAVED_PRODUCTS: [],
      OFFSET: 0,
      OFFSET_HOME_PRODUCTS: 0,
      OFFSET_HOME_PRODUCTS2: 0,
      OFFSET_HOME_PRODUCTS3: 0,
      RECENT_PRODUCTS: [],
      HOME_PRODUCTS: [],
      HOME_PRODUCTS2: [],
      HOME_PRODUCTS3: []
    };
  },

  getters: {
    PRODUCT_LIST: state => {
      return state.PRODUCT_LIST;
    },

    PRODUCT_INFO: state => {
      return state.PRODUCT_INFO;
    },

    COLLECTION_PRODUCTS: state => {
      return state.COLLECTION_PRODUCTS;
    },

    EXHIBITION_PRODUCTS: state => {
      return state.EXHIBITION_PRODUCTS;
    },

    CAROUSEL_PRODUCTS: state => {
      return state.CAROUSEL_PRODUCTS;
    },

    SAVED_PRODUCTS: state => {
      return state.SAVED_PRODUCTS;
    },

    OFFSET: state => {
      return state.OFFSET;
    },

    OFFSET_HOME_PRODUCTS: state => {
      return state.OFFSET_HOME_PRODUCTS;
    },

    OFFSET_HOME_PRODUCTS2: state => {
      return state.OFFSET_HOME_PRODUCTS2;
    },

    OFFSET_HOME_PRODUCTS3: state => {
      return state.OFFSET_HOME_PRODUCTS3;
    },

    HOME_PRODUCTS: state => {
      return state.HOME_PRODUCTS;
    },

    HOME_PRODUCTS2: state => {
      return state.HOME_PRODUCTS2;
    },

    HOME_PRODUCTS3: state => {
      return state.HOME_PRODUCTS3;
    }
  },

  mutations: {
    SET_PRODUCT_LIST(state, payload) {
      state.PRODUCT_LIST = payload;
    },

    SET_PRODUCT_INFO(state, payload) {
      state.PRODUCT_INFO = payload;
    },

    SET_COLLECTION_PRODUCTS(state, payload) {
      state.COLLECTION_PRODUCTS = payload;
    },

    ADD_COLLECTION_PRODUCTS(state, payload) {
      state.COLLECTION_PRODUCTS = state.COLLECTION_PRODUCTS.concat(payload);
    },

    SET_SAVED_PRODUCTS(state, payload) {
      state.SAVED_PRODUCTS = payload;
    },

    SET_EXHIBITION_PRODUCTS(state, payload) {
      state.EXHIBITION_PRODUCTS = payload;
    },

    ADD_EXHIBITION_PRODUCTS(state, payload) {
      state.EXHIBITION_PRODUCTS = state.EXHIBITION_PRODUCTS.concat(payload);
    },

    SET_CAROUSEL_PRODUCTS(state, payload) {
      state.CAROUSEL_PRODUCTS = payload;
    },

    ADD_SAVED_PRODUCTS(state, payload) {
      state.SAVED_PRODUCTS = state.SAVED_PRODUCTS.concat(payload);
    },

    ADD_TO_SAVED_PRODUCTS(state, payload) {
      state.SAVED_PRODUCTS.push(payload);
    },

    DELETE_FROM_SAVED_PRODUCTS(state, payload) {
      const index = state.SAVED_PRODUCTS.findIndex(
        item => item.itemId === payload
      );
      state.SAVED_PRODUCTS.splice(index, 1);
    },

    SET_OFFSET(state, payload) {
      state.OFFSET = payload;
    },

    SET_OFFSET_HOME_PRODUCTS(state, payload) {
      state.OFFSET_HOME_PRODUCTS = payload;
    },

    SET_OFFSET_HOME_PRODUCTS2(state, payload) {
      state.OFFSET_HOME_PRODUCTS2 = payload;
    },

    SET_OFFSET_HOME_PRODUCTS3(state, payload) {
      state.OFFSET_HOME_PRODUCTS3 = payload;
    },

    SET_HOME_PRODUCTS(state, payload) {
      state.HOME_PRODUCTS = payload;
    },

    ADD_HOME_PRODUCTS(state, payload) {
      state.HOME_PRODUCTS = state.HOME_PRODUCTS.concat(payload);
    },

    SET_HOME_PRODUCTS2(state, payload) {
      state.HOME_PRODUCTS2 = payload;
    },

    ADD_HOME_PRODUCTS2(state, payload) {
      state.HOME_PRODUCTS2 = state.HOME_PRODUCTS2.concat(payload);
    },

    SET_HOME_PRODUCTS3(state, payload) {
      state.HOME_PRODUCTS3 = payload;
    },

    ADD_HOME_PRODUCTS3(state, payload) {
      state.HOME_PRODUCTS3 = state.HOME_PRODUCTS3.concat(payload);
    },

  },

  actions: {
    setProductList({ commit }, productList) {
      commit("SET_PRODUCT_LIST", productList);
    },

    resetProductList({ commit }) {
      commit("SET_PRODUCT_LIST", []);
    },

    setProductInfo({ commit }, product) {
      commit("SET_PRODUCT_INFO", product);
      console.log(product);
    },

    resetCollectionProducts({ commit }) {
      commit("SET_COLLECTION_PRODUCTS", []);
    },

    getCollectionProducts: ({ getters, commit, dispatch }) =>
      new Promise(async (resolve, reject) => {
        const categories = {
          firstCategory: getters.FIRST_CATEGORY,
          secondCategory: getters.SECOND_CATEGORY.code
        };

        const params = {
          offset: getters.OFFSET,
          height: getters.USER_HEIGHT,
          limit: getters.LIMIT,
          heightRange: getters.HEIGHT_RANGE,
          sortOrder: getters.SORT_ORDER,
          priceRange: getters.PRICE_RANGE
        };

        try {
          const response = await getCollectionProductsAPI(categories, params);
          if (response.status === 200) {
            dispatch("setActiveFirstCategory", response.result.catList);
            commit("SET_COLLECTION_PRODUCTS", response.result.itemList);
          }

          resolve(response);
        } catch (error) {
          reject(error);
        }
      }),

    addCollectionProducts: ({ getters, commit }) =>
      new Promise(async (resolve, reject) => {
        const categories = {
          firstCategory: getters.FIRST_CATEGORY,
          secondCategory: getters.SECOND_CATEGORY.code
        };

        const params = {
          offset: getters.OFFSET,
          height: getters.USER_HEIGHT,
          limit: getters.LIMIT,
          heightRange: getters.HEIGHT_RANGE,
          sortOrder: getters.SORT_ORDER,
          priceRange: getters.PRICE_RANGE
        };

        try {
          const response = await getCollectionProductsAPI(categories, params);
          if (response.status === 200) {
            commit("ADD_COLLECTION_PRODUCTS", response.result.itemList);
          }

          resolve(response);
        } catch (error) {
          reject(error);
        }
      }),

    getExhibitionProducts: ({ commit }, code) =>
      new Promise(async (resolve, reject) => {
        const params = {
          offset: 0,
          limit: 30
        };

        try {
          const response = await getExhibitionProductsAPI(code, params);
          if (response.status === 200) {
            commit("SET_EXHIBITION_PRODUCTS", response.result.itemList);
          }

          resolve(response);
        } catch (error) {
          reject(error);
        }
      }),

    addExhibitionProducts: ({ getters, commit }, code) =>
      new Promise(async (resolve, reject) => {
        const params = {
          offset: getters.OFFSET,
          limit: getters.LIMIT
        };

        try {
          const response = await getExhibitionProductsAPI(code, params);
          if (response.status === 200) {
            commit("ADD_EXHIBITION_PRODUCTS", response.result.itemList);
          }

          resolve(response);
        } catch (error) {
          reject(error);
        }
      }),

    resetSavedProducts({ commit }) {
      commit("SET_SAVED_PRODUCTS", []);
    },

    getSavedProducts: ({ commit, getters, dispatch }) =>
      new Promise(async (resolve, reject) => {
        const params = {
          offset: getters.OFFSET,
          limit: 30
        };
        try {
          const response = await getSavedProductsAPI(params);
          if (response.status === 200) {
            commit("SET_SAVED_PRODUCTS", response.result.itemList);
          }

          resolve(response);
        } catch (error) {
          if (error.message.includes("403")) {
            dispatch("logout");
          }
          reject(error);
        }
      }),

    addSavedProducts: ({ getters, commit, dispatch }) =>
      new Promise(async (resolve, reject) => {
        const params = {
          offset: getters.OFFSET,
          limit: 30
        };

        try {
          const response = await getSavedProductsAPI(params);
          if (response.status === 200) {
            commit("ADD_SAVED_PRODUCTS", response.result.itemList);
          }

          resolve(response);
        } catch (error) {
          if (error.message.includes("403")) {
            dispatch("logout");
          }
          reject(error);
        }
      }),

    addToSavedProducts: ({ commit, dispatch }, product) =>
      new Promise(async (resolve, reject) => {
        try {
          const response = await addToSavedProductsAPI(product.itemId);
          if (response.status === 200) {
            commit("ADD_TO_SAVED_PRODUCTS", product);
          }
          resolve(response);
        } catch (error) {
          if (error.message.includes("403")) {
            dispatch("logout");
          }
          reject(error);
        }
      }),

    deleteFromSavedProducts: ({ dispatch }, product) =>
      new Promise(async (resolve, reject) => {
        try {
          const response = await deleteFromSavedProductsAPI(product.itemId);

          if (response.status === 200) {
            await dispatch("resetOffset");
            await dispatch("resetSavedProducts");
            await dispatch("getSavedProducts");
          }
          resolve(response);
        } catch (error) {
          if (error.message.includes("403")) {
            dispatch("logout");
          }
          reject(error);
        }
      }),

    setOffset({ commit }, payload) {
      commit("SET_OFFSET", payload);
    },

    setOffsetHomeProducts({ commit }, payload) {
      commit("SET_OFFSET_HOME_PRODUCTS", payload);
    },

    setOffsetHomeProducts2({ commit }, payload) {
      commit("SET_OFFSET_HOME_PRODUCTS2", payload);
    },

    setOffsetHomeProducts3({ commit }, payload) {
      commit("SET_OFFSET_HOME_PRODUCTS3", payload);
    },
    
    resetOffsetHomeProducts({ commit }) {
      commit("SET_OFFSET_HOME_PRODUCTS", 0);
    },

    resetOffsetHomeProducts2({ commit }) {
      commit("SET_OFFSET_HOME_PRODUCTS2", 0);
    },

    resetOffsetHomeProducts3({ commit }) {
      commit("SET_OFFSET_HOME_PRODUCTS3", 0);
    },

    resetOffset({ commit }) {
      commit("SET_OFFSET", 0);
    },

    getHomeProducts: ({ getters, commit, dispatch }) =>
    new Promise(async (resolve, reject) => {
      const categories = {
        firstCategory: "001",
        secondCategory: "001"
      };

      const params = {
        offset: getters.OFFSET_HOME_PRODUCTS,
        height: getters.USER_HEIGHT,
        limit: 10,
        heightRange: getters.HEIGHT_RANGE,
        sortOrder: "dh",
        priceRange: getters.PRICE_RANGE
      };

      try {
        const response = await getCollectionProductsAPI(categories, params);
        if (response.status === 200) {
          dispatch("setActiveFirstCategory", response.result.catList);
          commit("SET_HOME_PRODUCTS", response.result.itemList);
        }

        resolve(response);
      } catch (error) {
        reject(error);
      }
    }),

  addHomeProducts: ({ getters, commit }) =>
    new Promise(async (resolve, reject) => {
      const categories = {
        firstCategory: "001",
        secondCategory: "001"
      };

      const params = {
        offset: getters.OFFSET_HOME_PRODUCTS,
        height: getters.USER_HEIGHT,
        limit: 10,
        heightRange: getters.HEIGHT_RANGE,
        sortOrder: "dh",
        priceRange: getters.PRICE_RANGE
      };

      try {
        const response = await getCollectionProductsAPI(categories, params);
        if (response.status === 200) {
          commit("ADD_HOME_PRODUCTS", response.result.itemList);
        }

        resolve(response);
      } catch (error) {
        reject(error);
      }
    }),

    
    getHomeProducts2: ({ getters, commit, dispatch }) =>
    new Promise(async (resolve, reject) => {
      const categories = {
        firstCategory: "003",
        secondCategory: "000"
      };

      const params = {
        offset: getters.OFFSET_HOME_PRODUCTS2,
        height: getters.USER_HEIGHT,
        limit: 12,
        heightRange: getters.HEIGHT_RANGE,
        sortOrder: "dh",
        priceRange: getters.PRICE_RANGE
      };

      try {
        const response = await getCollectionProductsAPI(categories, params);
        if (response.status === 200) {
          dispatch("setActiveFirstCategory", response.result.catList);
          commit("SET_HOME_PRODUCTS2", response.result.itemList);
        }

        resolve(response);
      } catch (error) {
        reject(error);
      }
    }),

  addHomeProducts2: ({ getters, commit }) =>
    new Promise(async (resolve, reject) => {
      const categories = {
        firstCategory: "003",
        secondCategory: "000"
      };

      const params = {
        offset: getters.OFFSET_HOME_PRODUCTS2,
        height: getters.USER_HEIGHT,
        limit: 12,
        heightRange: getters.HEIGHT_RANGE,
        sortOrder: "dh",
        priceRange: getters.PRICE_RANGE
      };

      try {
        const response = await getCollectionProductsAPI(categories, params);
        if (response.status === 200) {
          commit("ADD_HOME_PRODUCTS2", response.result.itemList);
        }

        resolve(response);
      } catch (error) {
        reject(error);
      }
    }),

    getHomeProducts3: ({ getters, commit, dispatch }) =>
    new Promise(async (resolve, reject) => {
      const categories = {
        firstCategory: "005",
        secondCategory: "000"
      };

      const params = {
        offset: getters.OFFSET_HOME_PRODUCTS3,
        height: getters.USER_HEIGHT,
        limit: 12,
        heightRange: getters.HEIGHT_RANGE,
        sortOrder: "dh",
        priceRange: getters.PRICE_RANGE
      };

      try {
        const response = await getCollectionProductsAPI(categories, params);
        if (response.status === 200) {
          dispatch("setActiveFirstCategory", response.result.catList);
          commit("SET_HOME_PRODUCTS3", response.result.itemList);
        }

        resolve(response);
      } catch (error) {
        reject(error);
      }
    }),

  addHomeProducts3: ({ getters, commit }) =>
    new Promise(async (resolve, reject) => {
      const categories = {
        firstCategory: "005",
        secondCategory: "000"
      };

      const params = {
        offset: getters.OFFSET_HOME_PRODUCTS3,
        height: getters.USER_HEIGHT,
        limit:12,
        heightRange: getters.HEIGHT_RANGE,
        sortOrder: "dh",
        priceRange: getters.PRICE_RANGE
      };

      try {
        const response = await getCollectionProductsAPI(categories, params);
        if (response.status === 200) {
          commit("ADD_HOME_PRODUCTS3", response.result.itemList);
        }

        resolve(response);
      } catch (error) {
        reject(error);
      }
    })

    
  }
};

export default product;
