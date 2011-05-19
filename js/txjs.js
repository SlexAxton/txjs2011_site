(function(a){function f(a){b.push(a.which),b.join(",").indexOf(c)>-1&&($(d).unbind("keydown",f),function(){if(!window||!window.history||!window.history.replaceState)return!1;var a=0,b=e("nIpeeD' edoC nopuoC esU oT elpoeP 05 tsriF ehT---")+e("---.elas no og stekcit nehw tnuocsid a teg lliw 'traeHehT"),c=setInterval(function(){var d=b.substring(a)+b.substring(0,a);d=d.replace(/ /g,"-"),window.history.replaceState("","scroller","/"+d),a++,a===b.length&&clearInterval(c)},100)}())}function e(a){return a.split("").reverse().join("")}var b=[],c="38,38,40,40,37,39,37,39,66,65",d=document;$(d).keydown(f)})(this);
jQuery.easing['jswing'] = jQuery.easing['swing'];
jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
        easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	}
});
(function(b,c){var $=b.jQuery||b.Cowboy||(b.Cowboy={}),a;$.throttle=a=function(e,f,j,i){var h,d=0;if(typeof f!=="boolean"){i=j;j=f;f=c}function g(){var o=this,m=+new Date()-d,n=arguments;function l(){d=+new Date();j.apply(o,n)}function k(){h=c}if(i&&!h){l()}h&&clearTimeout(h);if(i===c&&m>e){l()}else{if(f!==true){h=setTimeout(i?k:l,i===c?e-m:e)}}}if($.guid){g.guid=j.guid=j.guid||$.guid++}return g};$.debounce=function(d,e,f){return f===c?a(d,e,false):a(d,f,e!==false)}})(this);
(function($){
  var outTimer, inTimer, out = false, bound = false;
  // Tooltip
  $(function(){
    tip = $("<div id='txtip' class='ui-tooltip ui-widget ui-widget-content'></div>").appendTo("body");
    $("#schedule td:has(aside)")
    .each(function() {
      var t = $(this),
      tooltip = t.find("aside").addClass("ui-tooltip-content").detach();
      t.hover(function(e) {
        var that = this;
        if ( inTimer && that === out ) {
          clearTimeout( inTimer );
        }
        outTimer = setTimeout(function () {
          if ( ! out ) {
            tip.width(t.outerWidth()-1);
            t.addClass('hover');
            out = that;
            var pos = t.position();
            pos.left = pos.left - (( 'MozAppearance' in document.body.style ) ? 1 : 0 );
            pos.top += t.outerHeight() - ( $(that).hasClass('doubleshot') ? 60 : 1 );
            tip.stop(1,1).html(tooltip).css(pos).animate({
              height:"show"
            },200,"easeInCirc");
          }
        }, 100);
      },function(e) {
        if ( outTimer ) {
          clearTimeout( outTimer );
        }
        inTimer = setTimeout( function () {
          if ( out ) {
            $(out).removeClass( 'hover' );
          }
          out = false;
          tip.stop(1,1).animate({
            height:"hide"
          },200,"easeOutCirc");
        }, 100);
      });

      if( !bound ) {
        bound = true;
        tip.hover(function(){
          if ( inTimer ) {
            clearTimeout( inTimer );
          }
        }, function () {
          inTimer = setTimeout( function () {
            if ( out ) {
              $(out).removeClass( 'hover' );
            }
            out = false;
            tip.stop(1,1).animate({
              height:"hide"
            },200,"easeOutCirc");
          }, 100);
        });
      }
    });

    var nav    = $('#follow-nav'),
        btns   = nav.children('ul').children('li'),
        slider = $('<div class="navSlider"></div>'),
        mark   = $('<div class="navMark"></div>');

    // Put one in the other
    slider.append( mark );

    // Default to position 0;
    slider.data( 'pos', 0 );
    nav.append( slider );

    var w       = slider.width(),
        count   = btns.length,
        singleW = w / count,
        offW    = singleW / 2,
        markOff = mark.outerWidth() / 2;

    function setNavPos( pos ) {
      slider.data( 'pos', pos );
      mark.animate({
        'margin-left' : ( ( ( pos * singleW ) + offW ) - ( markOff ) ) + 'px',
      }, 300, 'swing' );
    }

    // Use the first element that is "scrollable"  (cross-browser fix?)
    function scrollableElement(els) {
      for (var i = 0, argLength = arguments.length; i <argLength; i++) {
        var el = arguments[i],
        $scrollElement = $(el);
        if ($scrollElement.scrollTop()> 0) {
          return $scrollElement;
        } else {
          $scrollElement.scrollTop(1);
          var isScrollable = $scrollElement.scrollTop()> 0;
          $scrollElement.scrollTop(0);
          if (isScrollable) {
            return $scrollElement;
          }
        }
      }
      return [];
    }
    

    var positions = [],
        pHash = {},
        $scrollElem = scrollableElement( 'body', 'html' );

    btns.find( 'a' ).each(function ( i ) {
      $( this ).data( 'pos', i );
      var coid = $( this ).data( 'coid' ),
          off = $( coid ).offset().top;
      positions.push( { top: off, id: coid } );
      pHash[ coid ] = off;
    }).click(function () {
      var $this = $( this );
      setNavPos( $this.data( 'pos' ) );
      $scrollElem.animate({
        scrollTop : (pHash[ $this.data( 'coid' ) ] - 100) + 'px'
      }, 300, 'swing');
      return false;
    });

    setNavPos( 0 );

    var win = $( window ),
        doc = $( document ),
        winH = win.height();

    function pickSpot() {
      var pos = win.scrollTop(),
          best = 0,
          tote = doc.height() - win.height();

      if ( pos === tote ) {
        best = positions.length - 1;
      }
      else {
        $.each( positions, function ( i , pObj ) {
          if ( pos > ( pObj.top - 100 ) ) {
            best = i;
          }
        });
      }
      setNavPos( best );
    }

    win.scroll($.debounce( 50, pickSpot));
    pickSpot();
  });
})( jQuery );
