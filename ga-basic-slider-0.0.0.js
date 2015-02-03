/*!
 * gaBasicSlider v0.0.0
 * Licensed under the MIT license - http://opensource.org/licenses/MIT
 * 
 * Copyright (c) 2015 Greg Arutunyan
 */

/* 
 * @example
 *
 * initializing the plug-in
 *
 * $('#my-slider').gaBasicSlider({
 *     btnNext : $('#my-slider-next'),
 *     btnPrevious : $('#my-slider-previous'),
 *     indicators : $('#my-slider-indicators')
 * });
 *
 */

(function($) {

    function gaBasicSlider($parent, options) {

        var settings = $.extend({}, $.fn.gaBasicSlider.defaults, options);
        
        // track current index
        var currentIndex = 0;
        
        // animation variables
        var interval = null;
        var timeout = null;
        
        // touch variables
        touchXStart = null;
        touchXCurrent = null;
        touchYStart = null;
        touchYCurrent = null;
        docWidth = $(document).width();
        
        // children (ex. li's)
        var $children = $parent.children();
        
        // number of slider items
        var numChildren = $children.length;
  
        // indicator children
        var $indicatorChildren =  null;
        
        /**
         * init the slider
         */

        function init() {
            // setup the markup
            setup();
    
            // setup the indicators
            if (settings.indicators) {
                createIndicators();
                updateCurrentIndicator();
            }
    
            // add touch events
            sliderAddTouchEvents();
    
            // add click events to the next and previous buttons
            btnNextPreviousEvents();
    
            // start the animation
            animateSlider();
        }
        
        // check browser capabilities (taken from Brad Birdsall's Swipe 2.0)
        var browser = {
            addEventListener: !!window.addEventListener,
            touch: ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
            transitions: (function(temp) {
                var props = ['transitionProperty', 'WebkitTransition', 'MozTransition', 'OTransition', 'msTransition'];
                for ( var i in props ) if (temp.style[ props[i] ] !== undefined) return true;
                return false;
            })(document.createElement('swipe'))
        };
  
        /**
         * Create indicators for each item being animated
         */

        function createIndicators() {
  
            function indicatorAddClick(index) {
                $(this)
                    .on('click', { 'index' : index }, function(e){
                        var $this = $(this);
            
                        // bypass slide and goto indicator url if present
                        var indicatorUrl = $this.attr('data-ga-bs-bypass-url');
            
                        if (indicatorUrl) {
                            window.location = indicatorUrl;
                        } else {
                            // animationDelay the animation
                            animationDelayAnimation();
            
                            // goto the clicked index
                            slideToIndex(e.data.index * -1);
                        }
            
                        e.preventDefault();
                    })
                    .css('cursor', 'pointer');
            }

            // Create indicators or use existing if any are present

            if(!settings.indicators.children().length) {
                // Create the indicator html
                for (var i = 0; i < numChildren; i++) {
                    settings.indicators.append('<span class="ga-bs-indicator">&bull;</span>');
                }
            }
            
            $indicatorChildren = settings.indicators.children();
            $indicatorChildren.each(indicatorAddClick);
            
        }
  
        /**
         * Update current indicator
         */

        function updateCurrentIndicator() {
            if(settings.indicators) {
                // Remove the ga-bs-active class from all the children elements
                $indicatorChildren.removeClass('ga-bs-active');
            
                // Add the ga-bs-active class to the active child element
                $indicatorChildren.eq(currentIndex * -1).addClass('ga-bs-active');
            }
        }
  
        /**
         * Update next and previous button states
         */

        function updateBtnNextPrevious() {
            if (settings.btnNext) {
                settings.btnNext.addClass('ga-bs-active').css('cursor','pointer');
            }
    
            if (settings.btnPrevious) {
                if (hasPreviousIndex()) {
                    settings.btnPrevious.addClass('ga-bs-active').css('cursor','pointer');
                } else {
                    settings.btnPrevious.removeClass('ga-bs-active').css('cursor','auto');
                }
            }
        }
  
        /**
         * Add click events to the next and previous buttons
         */
         
        function btnNextPreviousEvents() {
          
            // Add click events to the next button
            if (settings.btnNext) {
                settings.btnNext.on('click', function(){
                    slideToIndex(getNextIndex());
                });
      
                settings.btnNext.on('mouseover', stopAnimation);
                settings.btnNext.on('mouseout', animateSlider);
            }
    
            // Add click events to the previous button
            if (settings.btnPrevious) {
                settings.btnPrevious.on('click', function(){
                    slideToIndex(getPreviousIndex());
                });
      
                settings.btnPrevious.on('mouseover', stopAnimation);
                settings.btnPrevious.on('mouseout', animateSlider);
            }
            
            // Update next and previous button states
            updateBtnNextPrevious();
        }
  
        /**
         * Returns true if currentIndex is not on the last
         */

        function hasNextIndex() {
            return currentIndex > ((numChildren - 1) * -1);
        }
  
        /**
         * Returns true if currentIndex is not on the first
         */

        function hasPreviousIndex() {
            return currentIndex < 0;
        }
  
        /**
         * Returns the next index
         *
         * @param {boolean} isTouch True when using touch gestures
         */

        function getNextIndex(isTouch) {
            var index = currentIndex - 1;
            
            // if we go passed the last index
            if(index < ((numChildren - 1) * -1)) {
                if (isTouch) {
                    index = (numChildren - 1) * -1;
                } else {
                    index = 0;
                }
            }
            
            return index;
        }
  
        /**
         * Returns the previous index
         */

        function getPreviousIndex() {
            var index = currentIndex + 1;
            
            // Stop if we go passed the first index
            if (index > 0) {
                index = 0;
            }
    
            return index;
        }
  
        /**
         * Abort swipe gesture
         */

        function gestureAbortSwipe() {
            var dx = touchXCurrent - touchXStart;
    
            if(dx > settings.touchBounceBackThreshold) {
                slideToIndex(getPreviousIndex(), true);
            } else if (dx < (settings.touchBounceBackThreshold * -1)) {
                slideToIndex(getNextIndex(true), true);
            } else {
                slideToIndex(currentIndex, true);
            }
    
            touchXStart = null;
            touchXCurrent = null;
            touchYStart = null;
            touchYCurrent = null;
            touchDirection = null;
    
            $parent[0].removeEventListener("touchmove", EventTouchMove);
            $parent[0].removeEventListener("touchend", EventTouchEnd);
            $parent[0].removeEventListener("touchstart", EventTouchStart);
    
            sliderAddTouchEvents();
        }
  
        /**
         * Continue Swipe gesture
         */

        function gestureContinueSwipe(theSlider) {
            var curX = touchXCurrent - touchXStart;
    
            var track = 0;
            for (var i = 0; i < theSlider.childNodes.length; i++) {
                node = theSlider.childNodes[i];
      
                if(node.style) {
                    var pos = curX / docWidth;
                    pos = (pos * 100) + (track * 100) + (currentIndex * 100);
        
                    node.style.webkitTransition = '-webkit-transform 0ms';
                    node.style.webkitTransform = 'translate3d(' + pos + '%, 0, 0)';
                    track++;
                }
            }
        }
  
        /**
         * Detect touch direction
         *
         * @return boolean Return true if the direction is mostly in the x-direction
         */

        function isTouchDirectionX() {
            var dx = touchXCurrent - touchXStart;
            var dy = touchYCurrent - touchYStart;
    
            if (Math.abs(dy) > Math.abs(dx)) {
                return false;
            } else {
                return true;
            }
        }
  
        /**
         * Touch start event
         */

        function EventTouchStart(e) {
            // animationDelay animation if it was set
            animationDelayAnimation();
    
            if (e.touches.length > 1) {
                gestureAbortSwipe();
            } else if (e.touches.length == 1) {
                touchXStart = e.targetTouches[0].pageX;
                touchYStart = e.targetTouches[0].pageY;
                touchXCurrent = touchXStart;
                touchYCurrent = touchYStart;
                $parent[0].addEventListener("touchmove", EventTouchMove, false);
                $parent[0].addEventListener("touchend", EventTouchEnd, false);
            }
        }
  
        /**
         * Touch move event
         */

        function EventTouchMove(e) {
            if (e.touches.length > 1) {
                gestureAbortSwipe();
            } else if (e.touches.length == 1) {
                touchXCurrent = e.targetTouches[0].pageX;
                touchYCurrent = e.targetTouches[0].pageY;
  
                if (isTouchDirectionX()) {
                    e.preventDefault();
                    gestureContinueSwipe(this);
                } else {
                    gestureAbortSwipe();
                }
            }
        }
  
        /**
         * Touch end event
         */

        function EventTouchEnd(e) {
            gestureAbortSwipe();
        }
  
        /**
         * Add touch event to the slider
         */

        function sliderAddTouchEvents() {
            if($parent[0].addEventListener) {
                $parent[0].addEventListener("touchstart", EventTouchStart, false);
            }
        }
  
        /**
         * Setup the markup
         */

        function setup() {
            // prepare the parent
            $parent.css({
                'position': 'relative',
                'overflow': 'hidden',
                'padding' : '0'
            });
    
            // children mouse events
            $children.each(function (index) {
                var $this = $(this);
      
                // stop animation on mouse enter
                $this.on('mouseover', function (e) {
                    stopAnimation();
                });
      
                // restart animation on mouse leave
                $this.on('mouseout', function (e) {
                    animateSlider();
                });
            });
    
            // children base css
            $children.css({
                'width' : '100%',
                'display' : 'block',
                'position' : 'absolute',
                'top' : '0',
                'left' : '0',
                '-webkit-box-sizing' : 'border-box',
                '-moz-box-sizing' : 'border-box',
                'box-sizing' : 'border-box',
                '-webkit-backface-visibility' : 'hidden'
            });
    
            // prevent slider from collapsing
            $children.eq(0).css('position' , 'relative');
    
            // set initial slide positions
            if(browser.transitions && browser.touch) {
                $children.each(function(index){
                    $(this).css({'-webkit-transform' : 'translate3d(' + index * 100 + '%, 0, 0)',
                                    '-moz-transform' : 'translate3d(' + index * 100 + '%, 0, 0)',
                                      '-o-transform' : 'translateX(' + index * 100 + '%)',
                                     '-ms-transform' : 'translate3d(' + index * 100 + '%, 0, 0)',
                                         'transform' : 'translate3d(' + index * 100 + '%, 0, 0)'});
                });
            } else {
                // Use javascript animation if transform is not supported
                $children.each(function(index){
                    $(this).css({'left' : index * 100 + '%'});
                });
            }
        }
  
        /**
         * Slide to the specified index
         * 
         * @param {number} index
         * @param {boolian} isGestureAbortSwipe True when slideToIndex is
         *                  called from gestureAbortSwipe touch event
         */

        function slideToIndex(toIndex, isGestureAbortSwipe) {
            // turn off animation when the current slide is the same as
            // the thumb clicked, ignore if it's touched as opposed to clicked. 
            if (currentIndex == toIndex && !isGestureAbortSwipe) return false;
    
            $children.css({
                'z-index': 1
            });
    
            $children.eq((currentIndex * -1)).css({
                'z-index': 2
            });
    
            // animate to the specified index
            $children.each(function(index) {
                var position = (index + toIndex) * 100;
                
                if (browser.transitions && browser.touch) {
                    $children.eq(index).css({
                        '-webkit-transition' : '-webkit-transform ' + settings.animationTime + 'ms', '-webkit-transform' : 'translate3d(' + position + '% , 0, 0)',
                           '-moz-transition' : '-moz-transform ' + settings.animationTime + 'ms', '-moz-transform' : 'translate3d(' + position + '% , 0, 0)',
                             '-o-transition' : '-o-transform ' + settings.animationTime + 'ms', '-o-transform' : 'translateX(' + position + '%)',
                            '-ms-transition' : '-ms-transform ' + settings.animationTime + 'ms', '-ms-transform' : 'translate3d(' + position + '% , 0, 0)',
                                'transition' : 'transform ' + settings.animationTime + 'ms', 'transform' : 'translate3d(' + position + '% , 0, 0)'});
                } else {
                    var animationDirection = '-100%';
      
                    if(currentIndex > toIndex) {
                        animationDirection = '100%';
                    }
      
                    if( (index * -1) == toIndex ) {
                        $children.eq(index).stop().css({
                            'z-index' : 3,
                            'left' : currentIndex > toIndex ? '100%' : '-100%'
                        }).animate({
                            'left' : '0%'
                        }, settings.animationTime);
                    }
                }
            });
  
            // Update the current index
            currentIndex = toIndex;
    
            // Update next and previous button states
            updateBtnNextPrevious();
            
            // Update indicator state
            updateCurrentIndicator();
        }
        
        /**
         * Animate the slider
         */

        function animateSlider() {
            if (settings.animate) {
                clearInterval(interval);
                clearTimeout(timeout);
              
                interval = setInterval(function(){
                    slideToIndex(getNextIndex());
                }, settings.animationDelay);
            }
        }
        
        /**
         * Stop animation and restart after animationDelay
         */

        function animationDelayAnimation() {
            clearInterval(interval);
            clearTimeout(timeout);
            timeout = setTimeout(animateSlider, settings.animationDelay * 2);
        }
        
        /**
         * Stop the animation
         */
        
        function stopAnimation() {
            clearInterval(interval);
            clearTimeout(timeout);
        }
        
        /**
         * Start or restart the animation
         */
        
        function startAnimation() {
            settings.animate = true;
            animateSlider();
        }
  
        /**
         * Expose stop and start animation methods
         */
  
        this.stop = stopAnimation;
        this.start = startAnimation;
  
        // Init the slider
        init();
    };

    $.fn.gaBasicSlider = function(options, value) {

        var $parent = $(this);

        this.each(function(){
                if(!$parent.data('gaBasicSlider')) {
                    $parent.data('gaBasicSlider', new gaBasicSlider($parent, options));
                }
            });

        var slider = $parent.data('gaBasicSlider');
          
        if (slider) {
            switch (options) {
                case 'start':
                    slider.start();
                break;
                case 'stop':
                    slider.stop();
                break;
            }
        }
        
        return this;
    };

    $.fn.gaBasicSlider.defaults = {
        animate: true,
        animationDelay: 6000, // milliseconds
        animationTime: 300, // milliseconds
        
        indicators: null,
        btnNext: null,
        btnPrevious: null,
        
        touchBounceBackThreshold: 80, // pixels
    };

})(jQuery);