function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  // var user_name = profile.getName();
  var user_email = profile.getEmail();

  window.googleUserEmail = user_email;
}
