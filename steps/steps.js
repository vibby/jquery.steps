



stepsDefaultTextboxOpacity = .9;
stepsMovingGap = 20;

function stepsAnim(i,previ) {
  $(".steps_controls>.steps_stepid").html(i+1);
  if (previ != -1) stepsHideSmooth(previ);
  //stepsHide(previ);
  stepsShowSmooth(i);
//stepsShow(i);
}

function stepsHideSmooth(previ){
  prevstate = states[previ];
  if (prevstate.screen.transformout) $(".steps_inset2").transition(prevstate.screen.transformout);
  if (prevstate.textboxes && prevstate.textboxes.length) {
    for (t in prevstate.textboxes)  {
      textbox = prevstate.textboxes[t];
      if (textbox.fixed) {
        $(".steps_textbox_"+previ+"_"+t).animate({
          "opacity": 0
        });
      } else{
        if (textbox.finalStyle) {
          finalStyle = textbox.finalStyle;
        } else {
          finalStyle = {
            "top":  textbox.style.top+stepsMovingGap,
            "left": textbox.style.left+stepsMovingGap
          }
        };
        finalStyle = $.extend(finalStyle , {
          "opacity": 0
        });
        $(".steps_textbox_"+previ+"_"+t).animate(finalStyle);
        
      }
    }
  }
}

function stepsShowSmooth(i) {
  state = states[i];
  if (state.screen && state.screen.style) $(".steps_inset").animate(state.screen.style);
  if (state.screen && state.screen.transformin) {
    $(".steps_inset2").transition(state.screen.transformin);
    console.log(state.screen.transformin);
  }
  
  if (state.mask) {
    maskStyle = state.mask.style
  } else {
    maskStyle = {
      "top": 0,
      "left": 0,
      "height": 600,
      "width": 800
    }
  }
  $(".steps_mask1").animate({
    "top":  maskStyle.top - 620
  });
  $(".steps_mask2").animate({
    "left": maskStyle.left + maskStyle.width,
    "top": maskStyle.top,
    "height": maskStyle.height
  });
  $(".steps_mask3").animate({
    "top": maskStyle.top + maskStyle.height
  });
  $(".steps_mask4").animate({
    "left": maskStyle.left - 820,
    "top": maskStyle.top,
    "height": maskStyle.height
  });
  
  if (state.textboxes && state.textboxes.length) {
    for (t in state.textboxes)  {
      textbox = state.textboxes[t];
      if (textbox.fixed) {
        $(".steps_textbox_"+i+"_"+t).animate({
          "opacity": stepsDefaultTextboxOpacity
        });

      } else {
        
        if (textbox.baseStyle) {
          baseStyle = textbox.baseStyle;
        } else {
          baseStyle = {
            "top":  textbox.style.top-stepsMovingGap,
            "left": textbox.style.left-stepsMovingGap
          }
        };
        
        baseStyle = $.extend(baseStyle , {
          "opacity": 0
        });

        if (textbox.style) {
          style = textbox.style;
        } else {
          style = {}
        };
        $(".steps_textbox_"+i+"_"+t)
        .html(textbox.content)
        .css(baseStyle)
        .animate($.extend({
          "opacity": stepsDefaultTextboxOpacity
        },textbox.style));

      }
    }
  }  
}

function stepsHide(previ) {
  prevstate = states[previ];
  if (prevstate.textboxes && prevstate.textboxes.length) {
    if (prevstate.textboxes && prevstate.textboxes.length) {
      for (t in prevstate.textboxes)  {
        $(".steps_textbox_"+previ+"_"+t).css({
          "opacity": 0
        });
      }
    }
  }
}
function stepsShow(i) {
  state = states[i];
  $(".steps_inset").css(state.screen.style);
  if (state.textboxes && state.textboxes.length) {
    for (t in state.textboxes)  {
      textbox = state.textboxes[t];
      if (textbox.fixed) {
        $(".steps_textbox_"+i+"_"+t).css({
          "opacity": stepsDefaultTextboxOpacity
        });
      } else {
        if (textbox.style) {
          style = textbox.style;
        } else {
          style = {}
        };
        style = $.extend({
          "opacity": stepsDefaultTextboxOpacity
        },textbox.style);
        $(".steps_textbox_"+i+"_"+t)
        .html(textbox.content)
        .css(style);

      }
    }
  }  

}

$(document).ready(function() {
  var previ=i=0;
  
  $(".steps_controls>.steps_first").click(function(){
    i=0;
    stepsAnim(i,previ);
    previ=i;
  });
  $(".steps_controls>.steps_prev").click(function(){
    i=i-1;
    if (i<0) i=states.length-1;
    stepsAnim(i,previ);
    previ=i;
  });
  $(".steps_controls>.steps_next").click(function(){
    i=i+1;
    if (i>=states.length) i=0;
    stepsAnim(i,previ);
    previ=i;
  });
  $(".steps_screen").click(function(e){
    //    e.preventDefault();
    $(".steps_controls>.steps_next").click();
  });
  $(document).keypress(function(e){
    //    e.preventDefault();
    var code = (e.keyCode ? e.keyCode : e.which);
    if(code == 39 || code == 40 || code == 32) $(".steps_controls>.steps_next").click();
    if(code == 37 || code == 38) $(".steps_controls>.steps_prev").click();
    if(code == 33 || code == 36) $(".steps_controls>.steps_first").click();
    if(code == 34 || code == 35) $(".steps_controls>.steps_last").click();
  });
  $(".steps_controls>.steps_last").click(function(){
    i=states.length-1;
    stepsAnim(i,previ);
    previ=i;
  });
  
  for (k in states)  {
    var state = states[k];
    if (state.textboxes && state.textboxes.length) {
      for (t in state.textboxes)  {
        var textbox = state.textboxes[t];
        var el = $("<div></div>")
        .addClass("steps_textbox")
        .addClass("steps_textbox_"+k)
        .addClass("steps_textbox_"+k+"_"+t)
        if (textbox.content) {
          el.html(textbox.content)
          }
        if (textbox.class) {
          el.addClass(textbox.class)
          }
        if (textbox.style) {
          el.css(textbox.style)
          }
        el.css("opacity", 0)
        $(".steps_inset").prepend(el);
      }
    }
  }
  el = $("<div></div>")
  .addClass("steps_mask steps_mask1");
  $(".steps_screen").prepend(el);
  el = $("<div></div>")
  .addClass("steps_mask steps_mask2");
  $(".steps_screen").prepend(el);
  el = $("<div></div>")
  .addClass("steps_mask steps_mask3");
  $(".steps_screen").prepend(el);
  el = $("<div></div>")
  .addClass("steps_mask steps_mask4");
  $(".steps_screen").prepend(el);
  stepsAnim(i, -1);
  previ=i;
});

