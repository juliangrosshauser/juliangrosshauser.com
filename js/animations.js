$(function() {
  $(".quote blockquote").velocity("transition.slideUpIn", { duration: 1500, visibility: "visible" });
  $(".quote span").velocity("transition.slideUpIn", { duration: 1500, delay: 700, visibility: "visible", complete: function() {
    $(".header").velocity("transition.fadeIn", { duration: 2000, visibility: "visible" });
  }});
});
