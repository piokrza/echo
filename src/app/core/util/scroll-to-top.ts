export const scrollToTop = (behavior: ScrollBehavior = 'smooth') => {
  window.scroll({
    top: 0,
    left: 0,
    behavior,
  });
};
