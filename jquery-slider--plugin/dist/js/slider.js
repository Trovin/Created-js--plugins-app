(function( $ ) {
  $.fn.slider = function(params) {
  //declare global
  var slider, slide, options, slide_num, flag, timerId;


  //init extends options
  options = $.extend({}, defaults = {
    current_slide: '0',
    speed: 200,
    nav: true,
    dots: true,
    autoscroll: false,
    scrollSpeed: 1000,
    draggable: true,  
    animation: 'fade'   
  }, 
  options, params);


  //get global
  slider = this; 
  slide = $(this.children('.slide')); 
  slide_num = slide.length - 1; 
  flag = true;


  //on init 
  disableImageDragg();
  init_nav();
  init_dots();
  active_dot();
  autoScroll();
  slider_prev(); 
  slider_next(); 
  show_slide();
  draggable(); 
  slide_animation();


  //stop dragg image
  function disableImageDragg() {
  var currentImg = $('.slide img');
    currentImg.on('dragstart', function () {
      return false;
    });
  }; 


  //check navigation init
  function init_nav() {
    if(options.nav === true) {
      var nav_control = '<div class="slide_nav slide_prev"></div>' + '<div class="slide_nav slide_next"></div>'; 
      $(slider).append(nav_control);   
    } 
    return; 
  }; 


  //check dots init
  function init_dots() {
    if(options.dots === true) { 
      //create dots
      function create_dots() {
        var dotWrapper = document.createElement('div'); //create dots wrapper
        dotWrapper.className = ('dot-wrapper');
        for(var i = 0; i < slide.length; i++) {
          var dot = document.createElement('div'); //create dot
          dot.className = ('dot');
          dot.setAttribute('key', i);
          dotWrapper.appendChild(dot); 
        }  
        $(slider).append(dotWrapper);       
      }; create_dots();

      //bind action
      function bind_action() {
        $('.dot').on('click', function(e) {
          if(options.autoscroll === true) {
            clearInterval(autoscroll);  //stop autoscroll
          }
          var key = $(this).attr('key');  
          options.current_slide = key;  //change current slide  
          show_slide(); 
          $('.dot').removeClass('active-dot');
          $(this).addClass('active-dot'); 
        });         
      }; bind_action();
    } 
    return; 
  }; 


  //check active dots 
  function active_dot() {
    if (options.dots === true) {
      $('.dot').removeClass('active-dot');
      $('.dot').eq(options.current_slide).addClass('active-dot');         
    } 
    return; 
  }; 


  //check autoscroll
  function autoScroll() {
    if(options.autoscroll === true) {
      autoscroll = setInterval(function() {
        ++options.current_slide;
        //check current slide
        (options.current_slide > slide_num) ? options.current_slide = 0 : false;    
        show_slide(); 
        (options.dots === true) ? active_dot() : false;   
      }, options.scrollSpeed);
    } 
    return; 
  }; 


  //button prev action
  function slider_prev() {
    var prev;
    prev = $(slider.children('.slide_prev'));
    $(prev).on('click', function() {
      --options.current_slide;
      //check current slide
      (options.current_slide < 0) ? options.current_slide = slide_num : false;
      if(options.autoscroll === true) {
        clearInterval(autoscroll);  //stop autoscroll
      }
      show_slide(); 
      (options.dots === true) ? active_dot() : false;
    });
  };  


  //button next action
  function slider_next() {
    var next;
    next = $(slider.children('.slide_next'));
    $(next).on('click', function() {
      ++options.current_slide;
      //check current slide
      (options.current_slide > slide_num) ? options.current_slide = 0 : false;
      if(options.autoscroll === true) {
        clearInterval(autoscroll);  //stop autoscroll
      }
      show_slide(); 
      (options.dots === true) ? active_dot() : false;
    });
  };    


  //show current slide
  function show_slide() {
    slide.hide();
    //show first slide (after load document,without animation)
    if(flag === true) {
      slide.eq(options.current_slide).show();
      return flag = false;
    } else { slide_animation(); }
  }; 


  //draggable option
  function draggable() {
    var drag, clickCoord;
    
    slider.mousedown(function(e) {
      clickCoord = e.pageX;
      $( "span:first" ).text( "(move event.pageX) : " + clickCoord);
    });

    slider.mouseup(function(e) {
      dragCoord = e.pageX;
      $( "span:last" ).text( "(live click) : " + dragCoord);

      var maxVal = Math.max(dragCoord, clickCoord);
      var slideDrag = clickCoord - dragCoord;

      if(clickCoord > dragCoord) {
        var slideDrag = clickCoord - dragCoord;
        if(slideDrag < 20) {
          return;
        } else {
          --options.current_slide;
          //check current slide
          (options.current_slide < 0) ? options.current_slide = slide_num : false;
          if(options.autoscroll === true) {
            clearInterval(autoscroll);  //stop autoscroll
          }
          show_slide(); 
          (options.dots === true) ? active_dot() : false;
        }
      }

      if(clickCoord < dragCoord) {
        var slideDrag = dragCoord - clickCoord;
        if(slideDrag < 20) {
          return;
        } else {
          ++options.current_slide;
          //check current slide
          (options.current_slide > slide_num) ? options.current_slide = 0 : false;
          if(options.autoscroll === true) {
            clearInterval(autoscroll);  //stop autoscroll
          }
          show_slide(); 
          (options.dots === true) ? active_dot() : false;
        }
      }
    });

    slider.mouseout(function() {
      clickCoord = 0;
      dragCoord = 0;
      return;
    }); 
  
  }; 


  //slide animations
  function slide_animation() {
    slide.hide();  //hide all slides
    switch (options.animation) { 

      case 'default':
        slide.eq(options.current_slide).show();  //without animation
      break;

      case 'fade':
        slide.eq(options.current_slide).fadeIn(options.speed);  //fade animation
      break;

      case 'slide_right': 
        slide.eq(options.current_slide).show();  
        slide.css({'opacity': '', 'marginRight': ''});  //clear inline styles
        slide.eq(options.current_slide).addClass('slide_right');  //slide_right 
        slide.eq(options.current_slide).animate({
            opacity: 1,
            marginRight: '0%',
          }, options.speed)
      break;

      case 'slide_twitching':
        slide.eq(options.current_slide).show();
        slide.css({'opacity': '', 'marginRight': ''});  //clear inline styles
        slide.eq(options.current_slide).addClass('slide_right')   //slide_twitching      
        slide.eq(options.current_slide).animate({
            opacity: 0.5,
            marginRight: '20%',
          }, options.speed / 2)  //move slide to the left side
        slide.eq(options.current_slide).animate({
            opacity: 1,
            marginRight: '0%',
          }, options.speed)  //move slide to the center    
      break;

      default:
        throw new Error('invalid animation name'); //error name
    }   
  }
  }; 
})(jQuery); 
    

