!function(t){function n(n,a){function e(){p(),i(),r(),s(),c(),w()}function i(){x.each(function(){var n=t(this);n.on("mouseover",function(){S()}),n.on("mouseout",function(){w()})}),n[0].addEventListener&&(n[0].addEventListener("touchstart",v,!1),n[0].addEventListener("touchmove",b,!1),n[0].addEventListener("touchend",g,!1))}function r(){function n(n){t(this).on("click",{index:n},function(n){var o=t(this),a=o.attr("data-gabs-bypass-url");a?window.location=a:(T(-1*n.data.index),k()),n.preventDefault()}).css("cursor","pointer")}if(!X.indicators)return!1;if(!X.indicators.children().length)for(var o=0;Y>o;o++)X.indicators.append('<span class="gabs-indicator">&bull;</span>');N=X.indicators.children(),N.each(n)}function s(){X.btnNext&&(X.btnNext.on("click",function(){T(l()),k()}),X.btnNext.on("mouseover",S),X.btnNext.on("mouseout",w)),X.btnPrevious&&(X.btnPrevious.on("click",function(){T(d()),k()}),X.btnPrevious.on("mouseover",S),X.btnPrevious.on("mouseout",w))}function c(){X.indicators&&(N.removeClass("gabs-active"),N.eq(-1*C).addClass("gabs-active")),X.btnNext&&X.btnNext.addClass("gabs-active").css("cursor","pointer"),X.btnPrevious&&(u()?X.btnPrevious.addClass("gabs-active").css("cursor","pointer"):X.btnPrevious.removeClass("gabs-active").css("cursor","auto"))}function u(){return 0>C}function l(t){var n=C-1;return-1*(Y-1)>n&&(n=t?-1*(Y-1):0),n}function d(){var t=C+1;return t>0&&(t=0),t}function h(){var t=touchXCurrent-touchXStart;t>touchBounceBackThreshold?T(d(),!0):t<-1*touchBounceBackThreshold?T(l(!0),!0):T(C,!0)}function f(t){for(var n=touchXCurrent-touchXStart,o=0,a=0;a<t.childNodes.length;a++)if(node=t.childNodes[a],node.style){var e=n/docWidth;e=100*e+100*o+100*C,node.style.webkitTransition="-webkit-transform 0ms",node.style.webkitTransform="translate3d("+e+"%, 0, 0)",o++}}function m(){var t=touchXCurrent-touchXStart,n=touchYCurrent-touchYStart;return Math.abs(n)>Math.abs(t)?!1:!0}function v(t){S(),t.touches.length>1?h():1==t.touches.length&&(touchXStart=t.targetTouches[0].pageX,touchXCurrent=touchXStart,touchYStart=t.targetTouches[0].pageY,touchYCurrent=touchYStart)}function b(t){t.touches.length>1?h():1==t.touches.length&&(touchXCurrent=t.targetTouches[0].pageX,touchYCurrent=t.targetTouches[0].pageY,m()?(t.preventDefault(),f(this)):h())}function g(){h(),w()}function p(){n.css({position:"relative",overflow:"hidden",padding:"0"}),x.css({width:"100%",display:"block",position:"absolute",top:"0",left:"0","-webkit-backface-visibility":"hidden"}),x.eq(0).css({position:"relative"}),x.each(o.transitions&&o.touch?function(n){t(this).css({"-webkit-transform":"translate3d("+100*n+"%, 0, 0)","-moz-transform":"translate3d("+100*n+"%, 0, 0)","-o-transform":"translateX("+100*n+"%)","-ms-transform":"translate3d("+100*n+"%, 0, 0)",transform:"translate3d("+100*n+"%, 0, 0)"})}:function(n){t(this).css({left:100*n+"%"})})}function T(t,n){return S(),C!=t||n?(x.each(function(n){var a=100*(n+t);o.transitions&&o.touch?x.eq(n).css({"-webkit-transition":"-webkit-transform "+X.animationTime+"ms","-webkit-transform":"translate3d("+a+"% , 0, 0)","-moz-transition":"-moz-transform "+X.animationTime+"ms","-moz-transform":"translate3d("+a+"% , 0, 0)","-o-transition":"-o-transform "+X.animationTime+"ms","-o-transform":"translateX("+a+"%)","-ms-transition":"-ms-transform "+X.animationTime+"ms","-ms-transform":"translate3d("+a+"% , 0, 0)",transition:"transform "+X.animationTime+"ms",transform:"translate3d("+a+"% , 0, 0)"}):x.eq(n).stop().animate({left:a+"%"},X.animationTime)}),C=t,c(),void w()):!1}function w(){X.animate&&(S(),y=setInterval(function(){T(l())},X.animationDelay))}function k(){S(),B=setTimeout(w,X.animationDelay)}function S(){clearInterval(y),clearTimeout(B)}this.stop=function(){X.animate=!1,S()},this.start=function(){X.animate=!0,w()};var X=t.extend({},t.fn.gaBasicSlider.defaults,a),C=0,y=null,B=null;touchXStart=null,touchXCurrent=null,touchYStart=null,touchYCurrent=null,docWidth=t(document).width(),touchBounceBackThreshold=80;var x=n.children(),Y=x.length,N=null;e()}var o={addEventListener:!!window.addEventListener,touch:"ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch,transitions:function(t){var n=["transitionProperty","WebkitTransition","MozTransition","OTransition","msTransition"];for(var o in n)if(void 0!==t.style[n[o]])return!0;return!1}(document.createElement("swipe"))};t.fn.gaBasicSlider=function(o){var a=t(this);this.each(function(){a.data("gaBasicSlider")||a.data("gaBasicSlider",new n(a,o))});var e=a.data("gaBasicSlider");if(e)switch(o){case"start":e.start();break;case"stop":e.stop()}return this},t.fn.gaBasicSlider.defaults={animate:!0,animationDelay:6e3,animationTime:300,indicators:null,btnNext:null,btnPrevious:null}}(jQuery);