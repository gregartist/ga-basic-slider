/*!
 * gaBasicSlider v0.0.2
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

 /*
  * @todo
  *
  * - add normalize height as an option
  * - make stoping animation on hover an option
  * - change touchBounceBackThreshold to percentage from pixels
  * - learn about setting up automatic tests
  * - change animations so they're the same for touch and mouse
  * - API initiated stop animation should not start up on mouseover
  * - Make infinite looping slider navigation an option
  */

(function($) {
    
    function gaBasicSlider($parent, options) {
        
        /**
         * Start the slider up
         */
        
        function init() {
            // setup the slider CSS
            setupSliderCSS();
            
            // add slider event handlers
            addSliderEventHandlers();
            
            // add indicators
            addIndicators();
            
            // add next and previous buttons
            addNextPreviousBtns();
            
            // update active states 
            updateActiveStates();
            
            // start animation
            startAnimation();
        }
        
        /**
         * Add slider event handlers
         */
        
        function addSliderEventHandlers() {
            // children mouse events
            $children.each(function (index) {
                var $this = $(this);
      
                // stop animation on mouse enter
                $this.on('mouseover', function (e) {
                    stopAnimation();
                });
      
                // restart animation on mouse leave
                $this.on('mouseout', function (e) {
                    startAnimation();
                });
            });
            
            // add touch events
            if($parent[0].addEventListener) {
                $parent[0].addEventListener("touchstart", EventTouchStart, false);
                $parent[0].addEventListener("touchmove", EventTouchMove, false);
                $parent[0].addEventListener("touchend", EventTouchEnd, false);
            }
        }
        
        /**
         * Create indicators for each item being animated
         */
        
        function addIndicators() {
            if (!settings.indicators) return false;
            
            // adds event handlers to the indicators
            function indicatorAddClick(index) {
                $(this)
                    .on('click', { 'index' : index }, function(e){
                        var $this = $(this);
            
                        // save indicator url
                        var indicatorUrl = $this.attr('data-gabs-bypass-url');
                        
                        if (indicatorUrl) {
                            // bypass slide and goto indicator url if present
                            window.location = indicatorUrl;
                        } else {
                            // goto the clicked index
                            slideToIndex(e.data.index * -1);

                            // delay the animation
                            delayAnimation();
                        }
                        
                        // stop click from doing anything else
                        e.preventDefault();
                    })
                    .css('cursor', 'pointer');
            }

            // create indicators or use existing if any are present
            
            if(!settings.indicators.children().length) {
                for (var i = 0; i < numChildren; i++) {
                    // create the indicator html
                    settings.indicators.append('<span class="gabs-indicator">&bull;</span>');
                }
            }
            
            // save the indicatorsd for global use
            $indicatorChildren = settings.indicators.children();
            
            // add event handlers to the indicators
            $indicatorChildren.each(indicatorAddClick);
        }
        
        /**
         * Add next and previous buttons
         */
        
        function addNextPreviousBtns() {
            // Add click events to the next button
            if (settings.btnNext) {
                settings.btnNext.on('click', function(){
                    slideToIndex(getNextIndex());
                    delayAnimation();
                });
      
                settings.btnNext.on('mouseover', stopAnimation);
                settings.btnNext.on('mouseout', startAnimation);
            }
    
            // Add click events to the previous button
            if (settings.btnPrevious) {
                settings.btnPrevious.on('click', function(){
                    slideToIndex(getPreviousIndex());
                    delayAnimation();
                });
      
                settings.btnPrevious.on('mouseover', stopAnimation);
                settings.btnPrevious.on('mouseout', startAnimation);
            }
        }
        
        /**
         * Update active states
         */
        
        function updateActiveStates() {
            // update current indicator
            
            if(settings.indicators) {
                // Remove the gabs-active class from all the children elements
                $indicatorChildren.removeClass('gabs-active');
            
                // Add the gabs-active class to the active child element
                $indicatorChildren.eq(currentIndex * -1).addClass('gabs-active');
            }
            
            // update next and previous button states
            
            if (settings.btnNext) {
                settings.btnNext.addClass('gabs-active').css('cursor','pointer');
            }
    
            if (settings.btnPrevious) {
                if (hasPreviousIndex()) {
                    settings.btnPrevious.addClass('gabs-active').css('cursor','pointer');
                } else {
                    settings.btnPrevious.removeClass('gabs-active').css('cursor','auto');
                }
            }
        }
        
        /**
         * Returns true if currentIndex is not last
         */

        function hasNextIndex() {
            return currentIndex > ((numChildren - 1) * -1);
        }
  
        /**
         * Returns true if currentIndex is not first
         */

        function hasPreviousIndex() {
            return currentIndex < 0;
        }
  
        /**
         * Returns the next index
         *
         *  0 is the first slide
         * -1 is the second slide
         * -2 is the third slide
         *
         * @param {boolean} isTouch should be True when using touch gestures
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
    
            if(dx > touchBounceBackThreshold) {
                slideToIndex(getPreviousIndex(), true);
            } else if (dx < (touchBounceBackThreshold * -1)) {
                slideToIndex(getNextIndex(true), true);
            } else {
                slideToIndex(currentIndex, true);
            }
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
            stopAnimation();
    
            if (e.touches.length > 1) {
                gestureAbortSwipe();
            } else if (e.touches.length == 1) {
                touchXStart = e.targetTouches[0].pageX;
                touchXCurrent = touchXStart;
                touchYStart = e.targetTouches[0].pageY;
                touchYCurrent = touchYStart;
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
            startAnimation();
        }
        
        /**
         * Setup the slider CSS
         */

        function setupSliderCSS() {
            // prepare the parent
            $parent.css({
                'position': 'relative',
                'overflow': 'hidden',
                'padding' : '0'
            });
            
            // children base css
            $children.css({
                                   'width' : '100%',
                                 'display' : 'block',
                                'position' : 'absolute',
                                     'top' : '0',
                                    'left' : '0',
             '-webkit-backface-visibility' : 'hidden'
            });
            
            // prevent slider from collapsing
            $children.eq(0).css({
                'position' : 'relative'
            });
            
            // set initial slide positions
            
            if(browser.transitions && browser.touch) {
                // if the browser supports touch and css animation
                $children.each(function(index){
                    $(this).css({'-webkit-transform' : 'translate3d(' + index * 100 + '%, 0, 0)',
                                    '-moz-transform' : 'translate3d(' + index * 100 + '%, 0, 0)',
                                      '-o-transform' : 'translateX('  + index * 100 + '%)',
                                     '-ms-transform' : 'translate3d(' + index * 100 + '%, 0, 0)',
                                         'transform' : 'translate3d(' + index * 100 + '%, 0, 0)'
                    });
                });
            } else {
                // else every other browser
                $children.each(function(index){
                    $(this).css({'left' : index * 100 + '%'});
                });
            }
        }
        
        /**
         * Slide to the specified index
         * 
         * @param {number} index
         * @param {boolian} isTouch True when slideToIndex is called
         *                  from gestureAbortSwipe touch event
         */
         
        function slideToIndex(toIndex, isTouch) {
            stopAnimation();
            
            // abort when the current slide is the same as the thumb clicked,
            // ignore if it's touched as opposed to clicked. 
            if (currentIndex == toIndex && !isTouch) return false;
    
            // animate to the specified index
            $children.each(function(index) {
                var position = (index + toIndex) * 100;
                
                if (browser.transitions && browser.touch) {
                    $children.eq(index).css({
                        '-webkit-transition' : '-webkit-transform ' + settings.animationTime + 'ms', '-webkit-transform' : 'translate3d(' + position + '% , 0, 0)',
                           '-moz-transition' : '-moz-transform '    + settings.animationTime + 'ms', '-moz-transform'    : 'translate3d(' + position + '% , 0, 0)',
                             '-o-transition' : '-o-transform '      + settings.animationTime + 'ms', '-o-transform'      : 'translateX('  + position + '%)',
                            '-ms-transition' : '-ms-transform '     + settings.animationTime + 'ms', '-ms-transform'     : 'translate3d(' + position + '% , 0, 0)',
                                'transition' : 'transform '         + settings.animationTime + 'ms', 'transform'         : 'translate3d(' + position + '% , 0, 0)'
                    });
                } else {
                    
                    $children.eq(index).stop().animate({
                        'left' : position + '%'
                    }, settings.animationTime);
                }
            });
  
            // Update the current index
            currentIndex = toIndex;
    
            // Update active states
            updateActiveStates();
            
            startAnimation();
        }
        
        /**
         * Animate the slider
         */
        
        function startAnimation() {
            if (settings.animate) {
                stopAnimation();
                interval = setInterval(function(){
                    slideToIndex(getNextIndex());
                }, settings.animationDelay);
            }
        }
        
        /**
         * Stop animation and restart after animationDelay
         */

        function delayAnimation() {
            stopAnimation();
            timeout = setTimeout(startAnimation, settings.animationDelay);
        }
        
        /**
         * Stop the animation
         */
        
        function stopAnimation() {
            clearInterval(interval);
            clearTimeout(timeout);
        }
        
        /**
         * Expose stop and start animation methods
         */
  
        this.stop = stopAnimation;
        this.start = function() {
                // Start or restart the animation
                settings.animate = true;
                startAnimation();
            };
        
        // Private instance variables
        
            var settings = $.extend({}, $.fn.gaBasicSlider.defaults, options);
            
            // track current index
            var currentIndex = 0;
            
            // animation variables
            var animationID = null;
            var interval = null;
            var timeout = null;
            
            // touch variables
            touchXStart = null;
            touchXCurrent = null;
            touchYStart = null;
            touchYCurrent = null;
            docWidth = $(document).width();
            touchBounceBackThreshold = 80; // pixels
            
            // children (ex. li's)
            var $children = $parent.children();
            
            // number of slider items
            var numChildren = $children.length;
      
            // indicator children
            var $indicatorChildren =  null;
        
        // Start the slider up
        init();
    }
    
    /**
     * Check browser capabilities (Brad Birdsall's Swipe 2.0)
     */
    
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
     * Create jQuery plugin
     */
    
    $.fn.gaBasicSlider = function(options, value) {
        var $parent = $(this);
        
        // instantiate the gaBasicSlider class to a jQuery data object
        this.each(function(){
            if(!$parent.data('gaBasicSlider')) {
                $parent.data('gaBasicSlider', new gaBasicSlider($parent, options));
            }
        });
        
        // save the gaBasicSlider class to a variable for later use
        var slider = $parent.data('gaBasicSlider');
        
        // create plugin api
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
        
        // maintain jQuery chainability
        return this;
    };
    
    /**
     * Plugin defaults
     */
     
    $.fn.gaBasicSlider.defaults = {
        animate: true,
        animationDelay: 6000, // milliseconds
        animationTime: 300, // milliseconds
        indicators: null,
        btnNext: null,
        btnPrevious: null
    };
    
})(jQuery);