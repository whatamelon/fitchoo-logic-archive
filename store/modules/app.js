const app = {
  state() {
    return {
      IMAGE_URL: "https://s3.ap-northeast-2.amazonaws.com/image.fitchoo",
      IS_LOADING: false,
      SHOW_MODAL: false,
      SHOW_INTRO_MODAL:false,
      SHOW_LOGIN_ALERT_MODAL: false,
      SHOW_APP_DOWNLOAD_MODAL: false,
      SHOW_LOGIN_MODAL: false,
      SHOW_BOTTOM_SHEET: false,
      SHOW_LOGIN_SHEET: false,
      HAS_LOGO: true,
      HEADER_TITLE: "",
      CURRENT_DEVICE: "",
      ACTIVE_FILTER: {
        heightRange: 3,
        sortOrder: "recent",
        priceRange: "all"
      }
    };
  },

  getters: {
    IMAGE_URL: state => {
      return state.IMAGE_URL;
    },

    IS_LOADING: state => {
      return state.IS_LOADING;
    },

    SHOW_MODAL: state => {
      return state.SHOW_MODAL;
    },

    SHOW_INTRO_MODAL: state => {
      return state.SHOW_INTRO_MODAL;
    },

    SHOW_APP_DOWNLOAD_MODAL: state => {
      return state.SHOW_APP_DOWNLOAD_MODAL;
    },

    SHOW_LOGIN_ALERT_MODAL: state => {
      return state.SHOW_LOGIN_ALERT_MODAL;
    },

    SHOW_LOGIN_MODAL: state => {
      return state.SHOW_LOGIN_MODAL;
    },

    SHOW_BOTTOM_SHEET: state => {
      return state.SHOW_BOTTOM_SHEET;
    },

    SHOW_LOGIN_SHEET: state => {
      return state.SHOW_LOGIN_SHEET;
    },

    HAS_LOGO: state => {
      return state.HAS_LOGO;
    },

    HEADER_TITLE: state => {
      return state.HEADER_TITLE;
    },

    CURRENT_DEVICE: state => {
      return state.CURRENT_DEVICE;
    },

    ACTIVE_FILTER: state => {
      return state.ACTIVE_FILTER;
    }
  },

  mutations: {
    SET_IS_LOADING(state, payload = false) {
      state.IS_LOADING = payload;
    },

    SET_SHOW_MODAL(state, payload) {
      state.SHOW_MODAL = payload;
    },

    SET_SHOW_INTRO_MODAL(state, payload) {
      state.SHOW_INTRO_MODAL = payload;
    },

    SET_SHOW_APP_DOWNLOAD_MODAL(state, payload) {
      state.SHOW_APP_DOWNLOAD_MODAL = payload;
    },

    SET_SHOW_LOGIN_ALERT_MODAL(state, payload) {
      state.SHOW_LOGIN_ALERT_MODAL = payload;
    },

    SET_SHOW_LOGIN_MODAL(state, payload) {
      state.SHOW_LOGIN_MODAL = payload;
    },

    SET_SHOW_BOTTOM_SHEET(state, payload) {
      state.SHOW_BOTTOM_SHEET = payload;
    },

    SET_SHOW_LOGIN_SHEET(state, payload) {
      state.SHOW_LOGIN_SHEET = payload;
    },

    SET_HAS_LOGO(state, payload) {
      state.HAS_LOGO = payload;
    },

    SET_HEADER_TITLE(state, payload) {
      state.HEADER_TITLE = payload;
    },

    SET_CURRENT_DEVICE(state, payload) {
      state.CURRENT_DEVICE = payload;
    },

    SET_ACTIVE_FILTER(state, payload) {
      state.ACTIVE_FILTER = payload;
    }
  },

  actions: {
    nuxtClientInit() {},

    startLoading({ commit }) {
      commit("SET_IS_LOADING", true);
    },

    endLoading({ commit }) {
      commit("SET_IS_LOADING", false);
    },

    openModal({ commit }) {
      commit("SET_SHOW_MODAL", true);
    },

    closeModal({ commit }) {
      commit("SET_SHOW_MODAL", false);
    },
    
    openIntroModal({ commit }) {
      commit("SET_SHOW_INTRO_MODAL", true);
    },

    closeIntroModal({ commit }) {
      commit("SET_SHOW_INTRO_MODAL", false);
    },
    
    openAppDownloadModal({ commit }, payload) {
      commit("SET_SHOW_APP_DOWNLOAD_MODAL", payload);
    },

    // openAppDownloadModalNone({ commit }) {
    //   commit("SET_SHOW_APP_DOWNLOAD_MODAL", false);
    // },

    closeAppDownloadModal({ commit }) {
      const now = new Date().getTime();
        localStorage.setItem("lastTime", now);
      commit("SET_SHOW_APP_DOWNLOAD_MODAL", false);
    },

    openLoginAlertModal({ commit }) {
      commit("SET_SHOW_LOGIN_ALERT_MODAL", true);
    },

    closeLoginAlertModal({ commit }) {
      commit("SET_SHOW_LOGIN_ALERT_MODAL", false);
    },

    openLoginModal({ commit }) {
      commit("SET_SHOW_LOGIN_MODAL", true);
    },

    closeLoginModal({ commit }) {
      commit("SET_SHOW_LOGIN_MODAL", false);
    },

    openBottomSheet({ commit }) {
      commit("SET_SHOW_BOTTOM_SHEET", true);
    },

    closeBottomSheet({ commit }) {
      commit("SET_SHOW_BOTTOM_SHEET", false);
    },

    openLoginSheet({ commit }) {
      commit("SET_SHOW_LOGIN_SHEET", true);
    },

    closeLoginSheet({ commit }) {
      commit("SET_SHOW_LOGIN_SHEET", false);
    },

    showLogo({ commit }) {
      commit("SET_HAS_LOGO", true);
    },

    hideLogo({ commit }) {
      commit("SET_HAS_LOGO", false);
    },

    setHeaderTitle({ commit }, payload) {
      commit("SET_HEADER_TITLE", payload);
    },

    setCurrentDevice({ commit }) {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;

      let device;

      if (/windows phone/i.test(userAgent)) {
        device = "Windows Phone";
      } else if (/android/i.test(userAgent)) {
        device = "android";
      } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        device = "ios";
      } else {
        device = "web";
      }

      commit("SET_CURRENT_DEVICE", device);
    },

    setActiveFilter({ commit }, payload) {
      commit("SET_ACTIVE_FILTER", payload);
    }
  }
};

export default app;
