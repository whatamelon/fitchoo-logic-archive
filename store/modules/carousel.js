const carousel = {
    state() {
      return {
        CAROUSELS: [
          {
            code: "00sh17",
            thumbnail: "/exhibition/vNeck.jpg"
          },
          {
            code: "00sh17",
            thumbnail: "/exhibition/vNeck.jpg"
          },
          {
            code: "00sh17",
            thumbnail: "/exhibition/vNeck.jpg"
          },
          {
            code: "00sh17",
            thumbnail: "/exhibition/vNeck.jpg"
          },
          {
            code: "00sh17",
            thumbnail: "/exhibition/vNeck.jpg"
          }
        ]
      };
    },
  
    getters: {
      CAROUSELS: state => {
        return state.CAROUSELS;
      }
    },
  
    mutations: {
      SET_CAROUSELS(state, payload) {
        state.CAROUSELS= payload;
      }
    },
  
    actions: {}
  };
  
  export default carousel;
  