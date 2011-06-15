(function($) {
  var settings;
  
  $.fn.gratuitate = function(callerSettings) {
    settings = $.extend({
      caretColor: '#333, #111',
      contentAttr: 'title',
      tipYPosition: 'above',
      tipXPosition: 'left',
      tipOffset: 0,
      caretSize: '8'
    }, callerSettings || {});
    if (settings.caretColor.indexOf(",") != -1 ) {
      settings.caretColor1 = settings.caretColor.split(',')[0].trim();
      settings.caretColor2 = settings.caretColor.split(',')[1].trim();
    } else {
      settings.caretColor1 = settings.caretColor;
      settings.caretColor2 = settings.caretColor;
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
            return drawTriangle(link);
          }
        }, function() {
          $(this).attr('title', $(this).attr('data-gratuitator-title'));          
          $('span.gratuitator-tip').unwrap().remove();
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
    link.wrap("<span class='gratuitator-wrap'></span>").before("<span class='gratuitator-tip xPosition-" + 
      settings.tipXPosition + " yPosition-" + settings.tipYPosition + "'>" + (content) + 
      "<canvas id='gratuitator-caret' height='" + settings.caretSize +"' width='" + settings.caretSize*1.5 + "'></canvas></span>");
    var gTip = $('.gratuitator-tip');
    width = link.outerWidth();
    xOffset = link.offset().left;
    yOffset = link.offset().top;
    if ( settings.tipYPosition == 'below' ) {
      height = gTip.outerHeight() + settings.caretSize;
      yPos = settings.tipOffset + link.height() + settings.caretSize;
    } else if ( settings.tipYPosition == 'inline' ) {
      yPos = -5;
    } else {
      height = gTip.outerHeight() + settings.caretSize + settings.tipOffset;
      yPos = -height;
    }
    
    
    if ( settings.tipXPosition == 'left' &&  settings.tipYPosition == 'above') {
      xPos = 0;                                   // left
    } else if ( settings.tipXPosition == 'right' && settings.tipYPosition == 'above' ) {
      xPos = link.outerWidth() - (settings.caretSize + 10);
    } else if ( settings.tipXPosition == 'right' && settings.tipYPosition == 'below' ) {
      xPos = link.outerWidth() + settings.caretSize + settings.tipOffset;
    } else if ( settings.tipXPosition == 'right' && settings.tipYPosition == 'inline' ) {
      xPos = link.outerWidth() + settings.caretSize + settings.tipOffset;
    } else if ( settings.tipXPosition == 'left' && settings.tipYPosition == 'inline' ) {
      xPos =  -(gTip.outerWidth() + settings.caretSize + settings.tipOffset);
    } else {
      xPos = (link.width()/2) - (gTip.outerWidth()/2) + ((settings.caretSize * 1.5)/2);
    }
    
    $('.gratuitator-tip').css({
      'margin-left': xPos,
      'margin-top': yPos
    });
  };
  var drawTriangle = function(link) {
    var context, gradient, caret, leftPos, yPos, link, outerEdge, centerPoint;
    caret = document.getElementById('gratuitator-caret');
    outerEdge = settings.caretSize * 1.5;
    centerPoint = outerEdge / 2;
    pointOffset = 4;
    if ( settings.tipYPosition == 'below' ) {
      yPos = -(settings.caretSize)
    } else {
      yPos = "100%"
    }
    if ( settings.tipXPosition == 'left' && settings.tipYPosition == 'above' ) {
      leftPos = pointOffset;
    } else if ( settings.tipXPosition == 'right' && settings.tipYPosition == 'above' ) {
      yPos = "100%";
      leftPos = pointOffset;
    } else if ( settings.tipXPosition == 'right' && settings.tipYPosition == 'inline' ) {
      leftPos = -(settings.caretSize);
      yPos = $('.gratuitator-tip').outerHeight()/2 - (centerPoint);
    } else if ( settings.tipXPosition == 'left' && settings.tipYPosition == 'inline') {
      leftPos = "100%";
      yPos = $('.gratuitator-tip').outerHeight()/2 - (centerPoint);  
    } else {
      leftPos = ($('.gratuitator-tip').outerWidth()/2) - (outerEdge);
    }
    $(caret).css({
      'position': 'absolute',
      'z-index': 100,
      'top': yPos,
      'left': leftPos,
    }).attr('height', outerEdge).attr('width', outerEdge*2);
    if (caret && caret.getContext) {
      context = caret.getContext('2d');
      
      if ( settings.tipYPosition == 'below') {
        gradient = context.createLinearGradient(0, 0, 0, settings.caretSize);
        gradient.addColorStop(1, settings.caretColor1);
        gradient.addColorStop(0, settings.caretColor2);
      } else if ( settings.tipYPosition == 'above' ){
        gradient = context.createLinearGradient(0, 0, 0, settings.caretSize);
        gradient.addColorStop(0, settings.caretColor1);
        gradient.addColorStop(1, settings.caretColor2);
      } else if ( settings.tipYPosition == 'inline' && settings.tipXPosition == 'right' ) {
        gradient = context.createLinearGradient(0, 0, settings.caretSize, 0);
        gradient.addColorStop(0, settings.caretColor2);
        gradient.addColorStop(1, settings.caretColor1);
      } else if ( settings.tipYPosition == 'inline' && settings.tipXPosition == 'left' ) {
        gradient = context.createLinearGradient(0, 0, settings.caretSize, 0);
        gradient.addColorStop(0, settings.caretColor1);
        gradient.addColorStop(1, settings.caretColor2);
      }
      
      if (context) {
        context.fillStyle = gradient;
        context.beginPath();
        if ( settings.tipYPosition == 'below') {
          context.moveTo(centerPoint, 0);
          context.lineTo(outerEdge, settings.caretSize);
          context.lineTo(0, settings.caretSize);
          context.lineTo(centerPoint, 0);
        } else if ( settings.tipYPosition == 'inline' && settings.tipXPosition == 'right') {
          context.moveTo(0, centerPoint);
          context.lineTo(settings.caretSize, outerEdge);
          context.lineTo(settings.caretSize, 0);
          context.lineTo(0, centerPoint);
        } else if ( settings.tipYPosition == 'inline' && settings.tipXPosition == 'left') {
          context.moveTo(settings.caretSize, centerPoint);
          context.lineTo(0, outerEdge);
          context.lineTo(0, 0);
          context.lineTo(settings.caretSize, centerPoint);
        } else {
          context.moveTo(centerPoint, settings.caretSize);
          context.lineTo(0, 0);
          context.lineTo(outerEdge, 0);
          context.lineTo(centerPoint, settings.caretSize);
        }
        context.fill();
        return context.closePath();
      }
    }
  }  
})(jQuery);