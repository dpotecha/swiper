const swiper = new Swiper(".swiper", {
  speed: 1000,
  shift: 50,
  virtualTranslate: true,
  watchSlidesProgress: true,
  touchStartPreventDefault: false,
  preventClicks: false,
  on: {
    init: function () {
      let slides = this.slides;
      for (let i = 0; i < slides.length; i++) {
        let elSlide = slides[i];
        elSlide.style.opacity = 0;
        elSlide.style.transitionProperty = "opacity, transform";

        if (i == this.activeIndex) {
          elSlide.style.opacity = 1;
        }
      }
    },
    setTranslate: function setTranslate() {
      let slides = this.slides;

      for (let i = 0; i < slides.length; i++) {
        let elSlide = slides[i];
        let offset = elSlide.swiperSlideOffset;
        let tx = -offset - elSlide.progress * this.params.shift;

        let slideOpacity = Math.max(1 - Math.abs(elSlide.progress), 0);
        elSlide.style.opacity = slideOpacity;
        elSlide.style.transform = `translate3d(${tx}px, 0px, 0px)`;
      }
    },
    setTransition: function setTransition(swiper, transition) {
      let slides = this.slides;
      for (let i = 0; i < slides.length; i++) {
        let elSlide = slides[i];
        elSlide.style.transitionDuration = transition + "ms";
      }
    },
  },
});
