export default () => {
  history.pushState({}, "", location.hash.substring(2));
};
