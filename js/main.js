/* =================================
------------------------------------
	Cryptocurrency - Landing Page Template
	Version: 1.0
 ------------------------------------ 
 ====================================*/

'use strict';

$(window).on('load', function () {
  /*------------------
    Preloder
  --------------------*/
  $(".loader").fadeOut();
  $("#preloder").delay(400).fadeOut("slow");

});

(function ($) {

  /*------------------
    Navigation
  --------------------*/
  $('.responsive-bar').on('click', function (event) {
    $('.main-menu').slideToggle(400);
    event.preventDefault();
  });

  /*------------------
    Background set
  --------------------*/
  $('.set-bg').each(function () {
    var bg = $(this).data('setbg');
    $(this).css('background-image', 'url(' + bg + ')');
  });

  /*------------------
    Review
  --------------------*/
  var review_meta = $(".review-meta-slider");
  var review_text = $(".review-text-slider");

  review_text.on('changed.owl.carousel', function (event) {
    review_meta.trigger('next.owl.carousel');
  });

  review_meta.owlCarousel({
    loop: true,
    nav: false,
    dots: true,
    items: 3,
    center: true,
    margin: 20,
    autoplay: true,
    mouseDrag: false,
  });

  review_text.owlCarousel({
    loop: true,
    nav: true,
    dots: false,
    items: 1,
    margin: 20,
    autoplay: true,
    navText: ['<i class="ti-angle-left"><i>', '<i class="ti-angle-right"><i>'],
    animateOut: 'fadeOutDown',
    animateIn: 'fadeInDown',
  });

  /*------------------
   Contact Form
 --------------------*/
  $(".check-form").focus(function () {
    $(this).next("span").addClass("active");
  });
  $(".check-form").blur(function () {
    if ($(this).val() === "") {
      $(this).next("span").removeClass("active");
    }
  });

  $.ajax({
    crossOrigin: true,
    type: "POST",
    url: "http://www.llload.com:9995/rank",
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Content-type", "application/json");
    },
    dataType: "json",
    // data: "",
    success: function (data) {

      console.log(data);
      for (var i = 0; i < data.length; i++) {
        var key = Object.keys(data[i]);
        var tag = "";
        tag += "<div class=\"carousel-cell\">\n";
        tag += "<h4>" + key + "</h4>\n";
        tag += "<hr>\n"
        
        if( data[i][Object.keys(data[i])].length == 0){
          tag += "<p>데이터가 없습니다.</p>\n";
        }else{
          for (var j = 0; j < data[i][Object.keys(data[i])].length; j++) {
            var jo = data[i][Object.keys(data[i])][j];
            tag += "<p>" + (j + 1) + ". " + jo.run_file + "&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;" + jo.run_sec
                + "</p>\n";
          }  
        }
        
        
        tag += "</div>\n"
        var $cellElems = $(tag);
        $('.carousel').flickity( 'insert', $cellElems, i);
      }
    },
    error: function (request, status, error) {
      console.log(error);

      var tag = "";
      tag += "<div class=\"carousel-cell\">\n";
      tag += "<h4> 서버와 연결 준비중입니다 </h4>\n";
      tag += "<hr>\n"
      tag += "<br><br><br><br><br>\n";
      tag += "<p>잠시 후 다시 접속해주세요</p>\n";
      tag += "</div>\n"
      var $cellElems = $(tag);
      $('.carousel').html(tag);
    }
  });

  // slide
  $('.carousel').flickity({
    // options
    cellAlign: 'center',
    percentPosition: false
    // autoPlay: 5000
  });

  //자동 새로고침
  setTimeout("location.reload()",60000);

})(jQuery);

