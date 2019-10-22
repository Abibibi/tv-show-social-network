
$(window).on('scroll', function(){
  if($(window).scrollTop()) {
    $('.navbar, .navbar-responsive-top').addClass('navbar-moving');
  }
  else {
    $('.navbar, .navbar-responsive-top').removeClass('navbar-moving');
  }
})

