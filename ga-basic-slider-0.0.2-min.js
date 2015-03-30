/*!
 * gaBasicSlider v0.0.2
 * Licensed under the MIT license - http://opensource.org/licenses/MIT
 *
 * Copyright (c) 2015 Greg Arutunyan
 */
(function(c){function b(v,i){function y(){D();G();f();s();h();k()}function G(){r.each(function(H){var I=c(this);I.on("mouseover",function(J){o()});I.on("mouseout",function(J){k()})});if(v[0].addEventListener){v[0].addEventListener("touchstart",z,false);v[0].addEventListener("touchmove",q,false);v[0].addEventListener("touchend",F,false)}}function f(){if(!B.indicators){return false}function H(J){c(this).on("click",{index:J},function(M){var L=c(this);var K=L.attr("data-gabs-bypass-url");if(K){window.location=K}else{l(M.data.index*-1);n()}M.preventDefault()}).css("cursor","pointer")}if(!B.indicators.children().length){for(var I=0;I<e;I++){B.indicators.append('<span class="gabs-indicator">&bull;</span>')}}t=B.indicators.children();t.each(H)}function s(){if(B.btnNext){B.btnNext.on("click",function(){l(x());n()});B.btnNext.on("mouseover",o);B.btnNext.on("mouseout",k)}if(B.btnPrevious){B.btnPrevious.on("click",function(){l(g());n()});B.btnPrevious.on("mouseover",o);B.btnPrevious.on("mouseout",k)}}function h(){if(B.indicators){t.removeClass("gabs-active");t.eq(d*-1).addClass("gabs-active")}if(B.btnNext){B.btnNext.addClass("gabs-active").css("cursor","pointer")}if(B.btnPrevious){if(m()){B.btnPrevious.addClass("gabs-active").css("cursor","pointer")}else{B.btnPrevious.removeClass("gabs-active").css("cursor","auto")}}}function w(){return d>((e-1)*-1)}function m(){return d<0}function x(H){var I=d-1;if(I<((e-1)*-1)){if(H){I=(e-1)*-1}else{I=0}}return I}function g(){var H=d+1;if(H>0){H=0}return H}function u(){var H=touchXCurrent-touchXStart;if(H>touchBounceBackThreshold){l(g(),true)}else{if(H<(touchBounceBackThreshold*-1)){l(x(true),true)}else{l(d,true)}}}function A(K){var I=touchXCurrent-touchXStart;var H=0;for(var J=0;J<K.childNodes.length;J++){node=K.childNodes[J];if(node.style){var L=I/docWidth;L=(L*100)+(H*100)+(d*100);node.style.webkitTransition="-webkit-transform 0ms";node.style.webkitTransform="translate3d("+L+"%, 0, 0)";H++}}}function E(){var I=touchXCurrent-touchXStart;var H=touchYCurrent-touchYStart;if(Math.abs(H)>Math.abs(I)){return false}else{return true}}function z(H){o();if(H.touches.length>1){u()}else{if(H.touches.length==1){touchXStart=H.targetTouches[0].pageX;touchXCurrent=touchXStart;touchYStart=H.targetTouches[0].pageY;touchYCurrent=touchYStart}}}function q(H){if(H.touches.length>1){u()}else{if(H.touches.length==1){touchXCurrent=H.targetTouches[0].pageX;touchYCurrent=H.targetTouches[0].pageY;if(E()){H.preventDefault();A(this)}else{u()}}}}function F(H){u();k()}function D(){v.css({position:"relative",overflow:"hidden",padding:"0"});r.css({width:"100%",display:"block",position:"absolute",top:"0",left:"0","-webkit-backface-visibility":"hidden"});r.eq(0).css("position","relative");if(a.transitions&&a.touch){r.each(function(H){c(this).css({"-webkit-transform":"translate3d("+H*100+"%, 0, 0)","-moz-transform":"translate3d("+H*100+"%, 0, 0)","-o-transform":"translateX("+H*100+"%)","-ms-transform":"translate3d("+H*100+"%, 0, 0)",transform:"translate3d("+H*100+"%, 0, 0)"})})}else{r.each(function(H){c(this).css({left:H*100+"%"})})}}function l(I,H){o();if(d==I&&!H){return false}r.each(function(K){var J=(K+I)*100;if(a.transitions&&a.touch){r.eq(K).css({"-webkit-transition":"-webkit-transform "+B.animationTime+"ms","-webkit-transform":"translate3d("+J+"% , 0, 0)","-moz-transition":"-moz-transform "+B.animationTime+"ms","-moz-transform":"translate3d("+J+"% , 0, 0)","-o-transition":"-o-transform "+B.animationTime+"ms","-o-transform":"translateX("+J+"%)","-ms-transition":"-ms-transform "+B.animationTime+"ms","-ms-transform":"translate3d("+J+"% , 0, 0)",transition:"transform "+B.animationTime+"ms",transform:"translate3d("+J+"% , 0, 0)"})}else{r.eq(K).stop().animate({left:J+"%"},B.animationTime)}});d=I;h();k()}function k(){if(B.animate){o();C=setInterval(function(){l(x())},B.animationDelay)}}function n(){o();p=setTimeout(k,B.animationDelay)}function o(){clearInterval(C);clearTimeout(p)}this.stop=o;this.start=function(){B.animate=true;k()};var B=c.extend({},c.fn.gaBasicSlider.defaults,i);var d=0;var j=null;var C=null;var p=null;touchXStart=null;touchXCurrent=null;touchYStart=null;touchYCurrent=null;docWidth=c(document).width();touchBounceBackThreshold=80;var r=v.children();var e=r.length;var t=null;y()}var a={addEventListener:!!window.addEventListener,touch:("ontouchstart" in window)||window.DocumentTouch&&document instanceof DocumentTouch,transitions:(function(d){var f=["transitionProperty","WebkitTransition","MozTransition","OTransition","msTransition"];for(var e in f){if(d.style[f[e]]!==undefined){return true}}return false})(document.createElement("swipe"))};c.fn.gaBasicSlider=function(d,f){var g=c(this);this.each(function(){if(!g.data("gaBasicSlider")){g.data("gaBasicSlider",new b(g,d))}});var e=g.data("gaBasicSlider");if(e){switch(d){case"start":e.start();break;case"stop":e.stop();break}}return this};c.fn.gaBasicSlider.defaults={animate:true,animationDelay:6000,animationTime:300,indicators:null,btnNext:null,btnPrevious:null}})(jQuery);