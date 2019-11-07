export default ({ app, store }) => {
  store.dispatch("setCurrentDevice");

  // for snslogin
  function callbackAppType(type){
    window.AppType = type;
    // alert("call callbackAppType 5: " + window.AppType);
  }

  function callbackAuthToken(token){
    window.AuthToken = token;
    localStorage.setItem("accessToken", token);
    store.dispatch("setIsLoggedIn", true);
    // alert("call callbackAuthToken: " + window.AuthToken);
    // alert("call isLoggedIn:" + store.getters.IS_LOGGED_IN);
  }

  function callbackHeight(height){
    if(height == null || height === ""){
      // alert("call callbackHeight: " + height);
    }
    else{
      localStorage.setItem("height", height);
      // store.dispatch("setHeight", height);
      // alert("call callbackHeight 1:" + store.getters.USER_HEIGHT);
    }
  }

  window.callbackAppType = callbackAppType;
  window.callbackAuthToken = callbackAuthToken;
  window.callbackHeight = callbackHeight;
  //

  function callbackOsType(type) {
    window.OsType = type;
    // by shlee for test
    // alert("call callbackOsType:" + window.OsType);
  }

  function callbackPushToken(token) {
    window.PushToken = token;
    // by shlee for test
    // alert("call callbackPushToken:" + window.PushToken);
  }

  window.callbackOsType = callbackOsType;
  window.callbackPushToken = callbackPushToken;

  if (!localStorage.recentProducts) {
    localStorage.setItem("recentProducts", "[]");
  }

  if (!localStorage.recentModelId) {
    localStorage.setItem("recentModelId", "[]");
  }

  if (!localStorage.recentProductId) {
    localStorage.setItem("recentProductId", "[]");
  }

  app.router.beforeEach(async (to, from, next) => {
    if (from.name != null) {
      localStorage.setItem("previousPage", from.name);
    }

    store.dispatch("setPreviousPage", localStorage.getItem("previousPage"));

    const token = localStorage.getItem("accessToken");
    if (token && !store.getters.IS_LOGGED_IN) {
      store.dispatch("setIsLoggedIn", true);
    }

    if (localStorage.getItem("height")) {
      store.dispatch("setHeight", localStorage.getItem("height"));
    }

    if (localStorage.getItem("model")) {
      const model = JSON.parse(localStorage.getItem("model"));
      store.dispatch("setModel", model);
      console.log("새로운모델세팅함");
    }

    if (localStorage.getItem("random_model") ) {
      const model = JSON.parse(localStorage.getItem("random_model"));
      console.log("랜덤모델세팅함");
      store.dispatch("setModel", model);
    }

    // if (localStorage.getItem("modelId")) {
    //   const modelId = JSON.parse(localStorage.getItem("modelId"));
    //   console.log("겟모델함.");
    //   console.log(modelId);
    //   await store.dispatch("getModelInfo", modelId);
    // }


    // if (localStorage.getItem("product")) {
    //   const product = JSON.parse(localStorage.getItem("product"));
    //   store.dispatch("setProductInfo", product);
    //   console.log("새로운상품세팅함");
    // }

    next();
  });
};
