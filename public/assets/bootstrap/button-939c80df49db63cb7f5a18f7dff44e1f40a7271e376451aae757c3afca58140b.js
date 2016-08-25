/* ========================================================================
 * Bootstrap: button.js v3.3.6
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(e){"use strict";function t(t){return this.each(function(){var n=e(this),o=n.data("bs.button"),r="object"==typeof t&&t;o||n.data("bs.button",o=new i(this,r)),"toggle"==t?o.toggle():t&&o.setState(t)})}var i=function(t,n){this.$element=e(t),this.options=e.extend({},i.DEFAULTS,n),this.isLoading=!1};i.VERSION="3.3.6",i.DEFAULTS={loadingText:"loading..."},i.prototype.setState=function(t){var i="disabled",n=this.$element,o=n.is("input")?"val":"html",r=n.data();t+="Text",null==r.resetText&&n.data("resetText",n[o]()),setTimeout(e.proxy(function(){n[o](null==r[t]?this.options[t]:r[t]),"loadingText"==t?(this.isLoading=!0,n.addClass(i).attr(i,i)):this.isLoading&&(this.isLoading=!1,n.removeClass(i).removeAttr(i))},this),0)},i.prototype.toggle=function(){var e=!0,t=this.$element.closest('[data-toggle="buttons"]');if(t.length){var i=this.$element.find("input");"radio"==i.prop("type")?(i.prop("checked")&&(e=!1),t.find(".active").removeClass("active"),this.$element.addClass("active")):"checkbox"==i.prop("type")&&(i.prop("checked")!==this.$element.hasClass("active")&&(e=!1),this.$element.toggleClass("active")),i.prop("checked",this.$element.hasClass("active")),e&&i.trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active")),this.$element.toggleClass("active")};var n=e.fn.button;e.fn.button=t,e.fn.button.Constructor=i,e.fn.button.noConflict=function(){return e.fn.button=n,this},e(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(i){var n=e(i.target);n.hasClass("btn")||(n=n.closest(".btn")),t.call(n,"toggle"),e(i.target).is('input[type="radio"]')||e(i.target).is('input[type="checkbox"]')||i.preventDefault()}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(t){e(t.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(t.type))})}(jQuery);