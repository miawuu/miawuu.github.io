// Debounce
function debounce(a,b,c){var d;return function(){var e=this,f=arguments;clearTimeout(d),d=setTimeout(function(){d=null,c||a.apply(e,f)},b),c&&!d&&a.apply(e,f)}}

var SlideShow = function() {
  
  var
    slider,
    slide,
    nextButton,
    prevButton,
    slideAmount,
    sliderWidth,
    title,
    subTitle,
    clickCounter,
    slideCounter;
  
  var _init = function () {
    slider        = document.getElementsByClassName('slideShow__container')[0];
    slide         = document.getElementsByClassName('slideShow__slide');
    slideAmount   = slide.length;
    nextButton    = document.getElementsByClassName('slideShow__next')[0];
    prevButton    = document.getElementsByClassName('slideShow__prev')[0];    
    title         = document.getElementsByClassName('slideShow__slideTitle');    
    subTitle      = document.getElementsByClassName('slideShow__slideSubTitle');    
    sliderWidth   = parseInt(getComputedStyle(slider).width);
    clickCounter  = 0;  
    slideCounter  = 0;  
    
    _eventHandlers();
    _navButtons();
    _animateSlideIn(slideCounter);
  }
  
  var _eventHandlers = function() {
    nextButton.addEventListener('click', _slideNext, false);
    prevButton.addEventListener('click', _slidePrev, false);
    window.addEventListener('resize', _resize, false);
  } 
  
  var _navButtons = function () {
    if (clickCounter === 0 ) {
      prevButton.classList.add('is-inactive')
    } else {
      prevButton.classList.remove('is-inactive')
    }
  }  
  
  var _slideNext = function() {  
    clickCounter++;    
    slideCounter = clickCounter-1;
    if(clickCounter >= slideAmount) {
      clickCounter = 0;
      slideCounter = slideAmount - 1;
    }  
    var tl = new TimelineLite();
    tl 
      .add(_animateSlideOut(slideCounter))
      .to(slider, .9, {x:-clickCounter*sliderWidth, ease: Power2.easeOut})  
      .add(_animateSlideIn(clickCounter))
    _navButtons();    
  }
  
  var _slidePrev = function() {
    if(clickCounter > 0 ) {
      clickCounter--;
      
      // _getPreviousSlide(clickCounter +1)
      var tl = new TimelineLite();
      tl
      .add(_animateSlideOut(clickCounter+1))
      .to(slider, .9, {x:'+='+sliderWidth, ease: Power2.easeOut}, '-=0.2')
      .add(_animateSlideIn(clickCounter));
      
    }    
    _navButtons();    
  }
  
  var _animateSlideIn = function(index) {
    var currentSlide  = slide[index];
    var title         =  currentSlide.children[1].children[0];
    var subTitle      =  currentSlide.children[1].children[1];
    var image         =  currentSlide.children[0];
    
    var splitTitle = new SplitText(title);
    var revertTitle = function() {
      splitTitle.revert(); 
    }
    
    TweenLite.set(title, {perspective:400});
    
    var tl            = new TimelineLite({onComplete:revertTitle });    
    tl      
      .set(title, {opacity: 1})
      .staggerFrom(splitTitle.chars, 0.8, {
        opacity:0, 
        scale:0, 
        y:80, 
        rotationX:180, 
        transformOrigin:"0% 50% -50",  
        ease:Back.easeOut
      }, 0.03)
      .fromTo(subTitle, 0.6, {y:50, opacity: 0},{y:0, opacity:1}, '-=0.3')  
      .to(image, 0.4, {scale: 1, ease:Power2.easeOut},'-=0.6' )
    return tl;
  }
  
  var _animateSlideOut = function(index) {
    var currentSlide = slide[index];
    var title         =  currentSlide.children[1].children[0];
    var subTitle      =  currentSlide.children[1].children[1];
    var image         =  currentSlide.children[0];
    
    var tl = new TimelineLite();
    tl
      .to(title, 0.3, {opacity: 0})
      .to(subTitle, 0.3, {y:50, opacity: 0}, '-=0.3')
      .to(image, 0.4, {scale: 0.8, ease:Power2.easeIn}, '-=0.3' )
    return tl;      
  }
  
  var _resize = debounce(function() {    
    sliderWidth   = parseInt(getComputedStyle(slider).width);
    sliderOffset = sliderWidth * clickCounter;
    slider.style.transform = 'matrix(1, 0, 0, 1, -'+ sliderOffset + ', 0)'
  }, 50)
  
   return {
    init: _init
  }
  
}();

SlideShow.init();