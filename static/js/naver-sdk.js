var naverLogin = new window.naver.LoginWithNaverId({
  clientId: "v74W_3qvJkpO5WE36LaO",
  callbackUrl: "https://fitchoo.kr/naver-callback.html",
  isPopup: false /* 팝업을 통한 연동처리 여부 */,
  loginButton: {
    color: "green",
    type: 3,
    height: 60
  } /* 로그인 버튼의 타입을 지정 */
});

/* 설정정보를 초기화하고 연동을 준비 */

naverLogin.init();
