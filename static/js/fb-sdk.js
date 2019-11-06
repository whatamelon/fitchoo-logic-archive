/* eslint-disable no-undef */
window.fbAsyncInit = () => {
  FB.init({
    appId: "2349007131981083",
    autoLogAppEvents: true,
    xfbml: true,
    version: "v3.3"
  });
  FB.AppEvents.logPageView();
};

((d, s, id) => {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/ko_KR/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");
