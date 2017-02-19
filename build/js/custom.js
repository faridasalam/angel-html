jQuery(document).ready(function(){
  
  //============================== MENU SCROLL =========================
   $(window).load(function(){
    $('.body-wrapper').each(function(){
      var header_area = $('.header');
      var main_area = header_area.children('.nav-wrapper');

      var logo = main_area.find('.navbar-header');
      var navigation = main_area.find('.navbar-collapse');        
      var original = {
        nav_top: navigation.css('margin-top')
      };
        
      $(window).scroll(function(){
        if( main_area.hasClass('bb-fixed-header') && ($(this).scrollTop() == 0 || $(this).width() < 750)){
          main_area.removeClass('bb-fixed-header').appendTo(header_area);
          navigation.animate({'margin-top': original.nav_top}, {duration: 300, queue: false, complete: function(){
            header_area.css('height', 'auto');
          }});                
        }else if( !main_area.hasClass('bb-fixed-header') && $(this).width() > 750 &&
          $(this).scrollTop() > header_area.offset().top + header_area.height() - parseInt($('html').css('margin-top')) ){
          
          header_area.css('height', header_area.height());
          main_area.css({'opacity': '0'}).addClass('bb-fixed-header');
          main_area.appendTo($('body')).animate({'opacity': 1});
            
          navigation.css({'margin-top': '0px'});
        }       
      });
    });     
    
    $(window).trigger('resize');
    $(window).trigger('scroll');
  });

  //============================== SELECT BOX =========================
  $('.select-drop').selectbox();

  //============================== header =========================

  $('.navbar a.dropdown-toggle').on('click', function(e) {
      var elmnt = $(this).parent().parent();
      if (!elmnt.hasClass('nav')) {
          var li = $(this).parent();
          var heightParent = parseInt(elmnt.css('height').replace('px', '')) / 2;
          var widthParent = parseInt(elmnt.css('width').replace('px', '')) - 10;
          
          if(!li.hasClass('open')) {
            li.addClass('open');
          } else {
            li.removeClass('open');
          }
          $(this).next().css('top', heightParent + 'px');
          $(this).next().css('left', widthParent + 'px');
          
          return false;
      }
  });

  //============================== ALL DROPDOWN ON HOVER =========================
  jQuery(document).ready(function(){
    if($('.navbar').width() > 1007)
    {
      $('.nav .dropdown').hover(function() {
            $(this).addClass('open');
        },
        function() {
            $(this).removeClass('open');
        });
    }
  });

  //============================== BACK TO TOP =========================
  $(document).ready(function(){ 
    $(window).scroll(function(){ 
      if ($(this).scrollTop() > 10) { 
        $('.backToTop').css('opacity', 1); 
      } else { 
        $('.backToTop').css('opacity', 0); 
      } 
    }); 
  });

  //============================== BACK TO TOP SMOOTH SCROLL=========================
  $('.backToTop').on('click', function (event) {
    event.preventDefault();
    $(document).off('scroll');

    var target = this.hash,
    menu = target;
    $target = $(target);

    $('html, body').stop().animate({
      'scrollTop': $target.offset().top+2
    }, 1500, 'swing', function () {
      window.location.hash = target;
      $(document).on('scroll');
    });
  });

  //============================== MAIN SLIDER ========================= 
 
  var $heroSlider = $( '.main-slider .inner' );
  if ( $heroSlider.length > 0 ) {
    $heroSlider.each( function () {

    var loop = $(this).parent().data('loop'),
        autoplay = $(this).parent().data('autoplay'),
        interval = $(this).parent().data('interval') || 3000;

      $(this).owlCarousel({
        items: 1,
        loop: loop,
        margin: 0,
        nav: true,
        dots: true,
        navText: [ , ],
        autoplay: autoplay,
        autoplayTimeout: interval,
        autoplayHoverPause: true,
        smartSpeed:700
      });
    });
  } 

  //============================== OWL-CAROUSEL =========================


  var owl = $('.owl-carousel.partnersLogoSlider');
    owl.owlCarousel({
      loop:true,
      margin:28,
      autoplay:true,
      autoplayTimeout:6000,
      autoplayHoverPause:true,
      nav:true,
      dots: false,
      smartSpeed:500,
      responsive:{
        320:{
          slideBy: 1,
          items:1
        },
        768:{
          slideBy: 1,
          items:3
        },
        992:{
          slideBy: 1,
          items:4
        }
      }
    });

  //============================== EXPERT SLIDER =========================
    $(document).ready(function() {
      $('#myCarousel').carousel({ interval: 3000, cycle: true });
    });

  //============================== SMOOTH SCROLLING TO SECTION =========================
  $(document).ready(function () {
    $('.scrolling  a[href*="#"]').on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var target = $(this).attr('href');
      $(target).velocity('scroll', {
        duration: 800,
        offset: -150,
        easing: 'easeOutExpo',
        mobileHA: false
      });
    });
  });

  //============================== DATE-PICKER =========================
  $(document).ready(function () {
    $('.datepicker').datepicker({
      startDate: 'dateToday',
      autoclose: true
    });
  });

  //============================== SLIDER RESIZE =========================

  if ($(window).width() < 768) {
    function resizeContent() {
      $height = $(window).height() - 119;
      $('.slideResize').height($height);
    }
  }
  else {
    function resizeContent() {
      $height = $(window).height() - 159;
      $('.slideResize').height($height);
    }
  }

  $(document).ready(function(){
    resizeContent();

    $(window).resize(function() {
      resizeContent();
    });
  });

  //============================== COUNT DOWN =========================
  $('#simple_timer').syotimer({
    year: 2018,
    month: 5,
    day: 9,
    hour: 20,
    minute: 30
  });

  //============================== SIDE TAB / NAV MENU TOGGLE =========================
  //Single Service Page
  $('.nav-stacked li a').click(function() {
    $('.nav-stacked li a i').removeClass('fa fa-angle-up');
    $('.nav-stacked li a i').addClass('fa fa-angle-down');
    $(this).find('i').toggleClass('fa fa-angle-down fa fa-angle-up');
  });

  $('.productSide li a').click(function() {
    $(this).find('i').toggleClass('fa fa-minus fa fa-plus');
  });

  //============================== PRICE RANGER SLIDER =========================
  var minimum = 12;
  var maximum = 300;

  $( '#price-range' ).slider({
    range: true,
    min: minimum,
    max: maximum,
    values: [ minimum, maximum ],
    slide: function( event, ui ) {
      $( '#price-amount-1' ).val( '$' + ui.values[ 0 ] );
      $( '#price-amount-2' ).val( '$' + ui.values[ 1 ] );
    }
  });

  $( '#price-amount-1' ).val( '$' + $( '#price-range' ).slider( 'values', 0 ));
  $( '#price-amount-2' ).val( '$' + $( '#price-range' ).slider( 'values', 1 ));


  //============================== BOOTSTRA CAROUSEL SWIEP =========================
  $('#productSlider, #thubmnailTeamSlider').on('touchstart', function(event){
      var xClick = event.originalEvent.touches[0].pageX;
      $(this).one('touchmove', function(event){
          var xMove = event.originalEvent.touches[0].pageX;
          if( Math.floor(xClick - xMove) < -5 ){
              $('#productSlider, #thubmnailTeamSlider').carousel('prev');
          }
          else if( Math.floor(xClick - xMove) > 5 ){
              $('#productSlider, #thubmnailTeamSlider').carousel('next');
          }
      });
      $('.carousel').on('touchend', function(){
              $(this).off('touchmove');
      });
  });

  //============================== BOOTSTRA THUMBNAIL SLIDER =========================
  (function(){
    $('#thubmnailTeamSlider').carousel({ interval: 3000 });
  }());

  (function(){
    $('.thumbnailCarousel .item').each(function(){
      var itemToClone = $(this);

      for (var i=1;i<4;i++) {
        itemToClone = itemToClone.next();

            if (!itemToClone.length) {
              itemToClone = $(this).siblings(':first');
            }

            itemToClone.children(':first-child').clone()
            .addClass('cloneditem-'+(i))
            .appendTo($(this));
          }
        });
  }());

  //============================== FANCY BOX =========================
  $(document).ready(function() {
    
    $('a.group').fancybox({
      'transitionIn'  : 'elastic',
      'transitionOut' : 'elastic',
      'speedIn'   : 600, 
      'speedOut'    : 200, 
      'overlayShow' : false
    });
    
  });

  //============================== SINGLE SERVICE LEFT TAB ========================= 
  $(document).ready(function($) {
    $('#singleServiceTab a').click(function (e) {
      e.preventDefault();
      $(this).tab('show');
    });

    $('.nav-stacked li a').click(function() {
      $('.tabList').removeClass('active openTab');
      $(this).parent('.tabList').addClass('active openTab');
    });
    $('.nav-stacked li .dropdown-menu li a').click(function(e) {
      $('.tabList').removeClass('active openTab');
      $(this).closest('.nav-stacked li.tabList').addClass('active openTab');
    });
  });

  //============================== ACCRODION ========================= 

  $('.content-collapse li').click(function () {
      $(this).toggleClass("active").siblings().removeClass("active");
    });

});