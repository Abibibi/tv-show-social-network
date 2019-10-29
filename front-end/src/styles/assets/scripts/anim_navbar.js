$(window).on('scroll', () => {
  if ($(window).scrollTop()) {
    $('.navbar').addClass('navbar-moving');
  }
  else {
    $('.navbar').removeClass('navbar-moving');
  }
});
