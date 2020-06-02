(function() {
  $(document).foundation();
})();

(function() {
  $('.fancybox').fancybox({
    helpers: {
      overlay: {
        locked: false
      }
    }
  });
})();

(function() {
  $('.carousel__list').slick({
    dots: true
  })
})();

(function() {
  var $navLink = $('.nav__link');
  var $navList = $('.nav__list')

  $navLink.on('click', function() {
    var wWidth = $(window).width();

    if (wWidth < 1024) {
      $navList.hide();
    }
  });
})();

(function() {
  var headerHeight = $('.header').height();
  var $nav = $('.nav');
  var navHeight = $nav.outerHeight();
  var $sections = $('section');
  var FIXED_CLASS = 'nav--fixed';
  var ACTIVE_CLASS = 'nav__item--active'

  $(window).scroll(function() {
    var currScroll = $(this).scrollTop();

    fixedWrap(currScroll);

    $sections.each(function() {
      var top = $(this).offset().top - navHeight,
          bottom = top + $(this).outerHeight()/2;

      if (currScroll >= top && currScroll <= bottom) {
        $nav
          .find('li')
          .removeClass(ACTIVE_CLASS)
          .find('a[href="#'+$(this).attr('id')+'"]')
          .parent()
          .addClass(ACTIVE_CLASS);
      }
    });
  });

  function fixedWrap(currScroll) {
    if (currScroll > headerHeight) {
      return $nav.addClass(FIXED_CLASS);
    }

    return $nav.removeClass(FIXED_CLASS);
  }
})();
