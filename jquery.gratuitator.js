(function($) {
  var settings;
  
  $.fn.gratuitate = function(callerSettings) {
    settings = $.extend({
      backgroundColor: '#333, #111',
      contentAttr: 'title',
      tipPosition: 'above',
      tipOffset: 16,
      caretSize: '8'
    }, callerSettings || {});
    if (settings.backgroundColor.indexOf(",") != -1 ) {
      settings.backgroundColor1 = settings.backgroundColor.split(',')[0].trim();
      settings.backgroundColor2 = settings.backgroundColor.split(',')[1].trim();
    } else {
      settings.backgroundColor1 = settings.backgroundColor;
      settings.backgroundColor2 = settings.backgroundColor;
    }
    settings.caretSize = parseFloat(settings.caretSize);
    settings.tipOffset = parseFloat(settings.tipOffset);
    
    return this.each(function() {
      $(this).hover(
        function(event) {
          if ($(this).attr(settings.contentAttr) != undefined && 
            $(this).attr(settings.contentAttr) != null 
            && $(this).attr(settings.contentAttr) != '' ) {
            var link;
            link = $(this);
            link.attr('data-gratuitator-title', link.attr('title')).attr('title','');
            popUp(link);
            return drawTriangle();
          }
        }, function() {
          $(this).attr('title', $(this).attr('data-gratuitator-title'));          
          $('span.gratuitator-tip').unwrap().remove();
        });
        return $('a.null').live('click', function() {
          return false;
        });
      });
    }

  var popUp = function(link) {
    var content, height, width, xOffset, xPos, yOffset, yPos, gTip;
    if (settings.contentAttr == 'title') {
      content = link.attr('data-gratuitator-title')
    } else {
      content = link.attr(settings.contentAttr);
    }
    link.wrap("<span class='gratuitator-wrap'></span>").before("<span class='gratuitator-tip'>" + (content) + 
      "<canvas id='gratuitator-caret' height='" + settings.caretSize +"' width='" + settings.caretSize*2 + "'></canvas></span>");
    var gTip = $('.gratuitator-tip');
    width = link.outerWidth();
    height = gTip.outerHeight() + settings.caretSize + settings.tipOffset;
    xOffset = link.offset().left;
    yOffset = link.offset().top;
    xPos = (width / 2) - (gTip.outerWidth()/2);
    yPos = -height;
    $('.gratuitator-tip').css({
      'margin-left': xPos,
      'margin-top': yPos,
      'background-color': settings.backgroundColor1,
      'color': '#fff',
      'position': 'absolute',
      'width': 'auto',
      'padding': '.5em 1em',
      'text-align': 'center',
      'z-index': 100
    });
  };
  var drawTriangle = function() {
    var context, gradient, caret;
    caret = document.getElementById('gratuitator-caret');
    $(caret).css({
      'position': 'absolute',
      'z-index': 100,
      'top': '100%',
      'left': ($('.gratuitator-tip').width()/2)
    });
    if (caret && caret.getContext) {
      context = caret.getContext('2d');
      gradient = context.createLinearGradient(0, 0, 0, settings.caretSize);
      gradient.addColorStop(0, settings.backgroundColor1);
      gradient.addColorStop(1, settings.backgroundColor2);

      if (context) {
        context.fillStyle = gradient;
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(settings.caretSize*2, 0);
        context.lineTo(settings.caretSize, settings.caretSize);
        context.lineTo(0, 0);
        context.fill();
        return context.closePath();
      }
    }
  }  
})(jQuery);