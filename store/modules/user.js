import { signInAPI, signOutAPI, signUpAPI } from "@/api/auth";
import { getUserInfoAPI, setUserHeightAPI } from "@/api/user";

const USER = {
  state() {
    return {
      USER_EMAIL: "",
      USER_HEIGHT: "",
      USER_TOTAL: "",
      USER_WAIST: "",
      USER_THIGH: "",
      LIKED_PRODUCTS: [],
      IS_LOGGED_IN: false
    };
  },

  getters: {
    USER_EMAIL: state => {
      return state.USER_EMAIL;
    },

    USER_HEIGHT: state => {
      return state.USER_HEIGHT;
    },

    USER_TOTAL: state => {
      return state.USER_TOTAL;
    },

    USER_WAIST: state => {
      return state.USER_WAIST;
    },

    USER_THIGH: state => {
      return state.USER_THIGH;
    },

    LIKED_PRODUCTS: state => {
      return state.LIKED_PRODUCTS;
    },

    IS_LOGGED_IN: state => {
      return state.IS_LOGGED_IN;
    }
  },

  mutations: {
    SET_USER_EMAIL(state, payload) {
      state.USER_EMAIL = payload;
    },

    SET_USER_HEIGHT(state, payload) {
      state.USER_HEIGHT = payload;
    },

    SET_USER_TOTAL: (state, payload) => {
      state.USER_TOTAL = payload;
    },

    SET_USER_WAIST: (state, payload) => {
      state.USER_WAIST = payload;
    },

    SET_USER_THIGH: (state, payload) => {
      state.USER_THIGH = payload;
    },

    SET_LIKED_PRODUCTS(state, payload) {
      state.LIKED_PRODUCTS = payload;
    },

    SET_IS_LOGGED_IN: (state, payload) => {
      state.IS_LOGGED_IN = payload;
    }
  },

  actions: {
    signUp: ({ commit, dispatch, getters }, loginForm) =>
      new Promise(async (resolve, reject) => {
        try {
          const response = await signUpAPI(loginForm);

          if (response.status === 200) {
            await setUserHeightAPI(getters.USER_HEIGHT);
            await dispatch("setUserInfo");

            localStorage.setItem("accessToken", response.accessToken);
            commit("SET_IS_LOGGED_IN", true);

            if (window.fc_android) {
              window.fc_android.setAuthToken(response.accessToken);
            }
          }

          resolve(response);
        } catch (error) {
          console.error(error);
          reject(error);
        }
      }),

    login: ({ commit, dispatch, getters }, loginForm) =>
      new Promise(async (resolve, reject) => {
        try {
          const response = await signInAPI(loginForm);
          if (response.status === 200) {
            await setUserHeightAPI(getters.USER_HEIGHT);
            await dispatch("setUserInfo");

            localStorage.setItem("accessToken", response.accessToken);
            commit("SET_IS_LOGGED_IN", true);

            if (window.fc_android) {
              window.fc_android.setAuthToken(response.accessToken);
            }
          }

          resolve(response);
        } catch (error) {
          console.error(error);
          reject(error);
        }
      }),

    snsLogin: ({ commit, dispatch, getters }, loginForm) =>
      new Promise(async (resolve, reject) => {
        try {
          const response = await signInAPI(loginForm);
          if (response.status === 200) {
            await setUserHeightAPI(getters.USER_HEIGHT);
            await dispatch("setUserInfo");

            localStorage.setItem("accessToken", response.accessToken);
            commit("SET_IS_LOGGED_IN", true);

            if (window.fc_android) {
              window.fc_android.setAuthToken(response.accessToken);
            }
          }
          resolve(response);
        } catch (error) {
          reject(error);
        }
      }),

    // for snslogin org code
    // logout: ({ commit }) => 
    //   new Promise(async (resolve, reject) => {
    //     try {
    //       await signOutAPI();

    //       localStorage.clear();
    //       commit("SET_USER_HEIGHT", null);
    //       commit("SET_IS_LOGGED_IN", false);
    //       commit("SET_MODELS", []);
    //       commit("SET_FOLLOWING_MODELS", []);
    //       window.$nuxt.$router.push("/");
    //       resolve();
    //     } catch (error) {
    //       localStorage.clear();
    //       commit("SET_USER_HEIGHT", null);
    //       commit("SET_IS_LOGGED_IN", false);
    //       commit("SET_MODELS", []);
    //       commit("SET_FOLLOWING_MODELS", []);
    //       window.$nuxt.$router.push("/");
    //       reject(error);
    //     }
    //   }),
    // by shlee for snslogin
    logout: ({ commit }) => {
      if (window.AppType == "android") {
        // alert("logout");
        window.fcjs_if.doSignout();
      }
      else if(window.AppType == "ios2") {
        window.webkit.messageHandlers.doSignout.postMessage("");
      }
      else{
        new Promise(async (resolve, reject) => {
          try {
            await signOutAPI();

            localStorage.clear();
            commit("SET_USER_HEIGHT", null);
            commit("SET_IS_LOGGED_IN", false);
            commit("SET_MODELS", []);
            commit("SET_RANDOM_MODEL", []);
            commit("SET_FOLLOWING_MODELS", []);
            window.$nuxt.$router.push("/");
            resolve();
          } catch (error) {
            localStorage.clear();
            commit("SET_USER_HEIGHT", null);
            commit("SET_IS_LOGGED_IN", false);
            commit("SET_MODELS", []);
            commit("SET_RANDOM_MODEL", []);
            commit("SET_FOLLOWING_MODELS", []);
            window.$nuxt.$router.push("/");
            reject(error);
          }
        })
      }
    },

    setIsLoggedIn: ({ commit }, payload) =>
      new Promise((resolve, reject) => {
        try {
          commit("SET_IS_LOGGED_IN", payload);
          resolve();
        } catch (error) {
          reject(error);
        }
      }),

    setEmail({ commit }, payload) {
      commit("SET_USER_EMAIL", payload);
    },

    setHeight({ commit }, payload) {
      commit("SET_USER_HEIGHT", payload);
    },

    sendHeight: ({ commit }, payload) =>
      new Promise(async (resolve, reject) => {
        try {
          await setUserHeightAPI(payload);
          commit("SET_USER_HEIGHT", payload);
          localStorage.height = payload;
          resolve();
        } catch (error) {
          reject(error);
        }
      }),

    setUserTotal: ({ commit }, payload) => {
      commit("SET_USER_TOTAL", payload);
    },

    setUserInfo: ({ commit, dispatch }) =>
      new Promise(async (resolve, reject) => {
        try {
          const response = await getUserInfoAPI();
          const { result } = response;
          const { email } = result;
          const { height, leg, waist, thigh } = result.userSize;

          commit("SET_USER_EMAIL", email);
          localStorage.height = height;
          commit("SET_USER_HEIGHT", height);
          commit("SET_USER_TOTAL", leg);
          commit("SET_USER_WAIST", waist);
          commit("SET_USER_THIGH", thigh);

          resolve(result);
        } catch (error) {
          if (error.message.includes("403")) {
            dispatch("logout");
          }
          reject(error);
        }
      })
  }
};

export default USER;
