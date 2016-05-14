$(window).on("load",function(){
    var aboutus_nav = $("#aboutus_nav"),
        aboutus_section = $(".aboutus_section"),
        aboutus_main_img = $("#aboutus_figure , .aboutus_photo");

    var windowHeight = $(window).height(),
        navHeight= aboutus_nav.height(),
        descriptHeight = $("#descript_lubycon").height(),
        focusHeight = $("#focus_wrap").height() + $(".focus_div").height(),
        contactHeight = $("#contactus_wrap").height();


    heightMatch(aboutus_section, windowHeight);
    heightMatch(aboutus_main_img, windowHeight);

    aboutus_nav.css("top",verticalAlign(windowHeight,navHeight));
    $("#descript_lubycon").css("padding-top",verticalAlign(windowHeight,descriptHeight));
    $("#focus_wrap").css("padding-top",verticalAlign(windowHeight,focusHeight));
    $("#contactus_wrap").css("padding-top",verticalAlign(windowHeight,contactHeight));

    $(".nav_circle").on("click",function(event){
        var data = $(event.target).attr("data");
        moveNav(data);
    });
    $(document).scroll(function(){
        var data;
        var scrollTop = $(document).scrollTop();
        if((scrollTop >= 0) && (scrollTop < windowHeight)){
            data = "aboutus_main";
        }
        else if((scrollTop >= windowHeight) && (scrollTop < windowHeight*2)){
            data = "focus_section";
        }
        else{
            data = "contactus_section";
        }
        detectNav(data);
    });
});


function heightMatch(selector,windowHeight){ 
    selector.css("height",windowHeight.toString() + "px");
};
function verticalAlign(windowHeight,objectHeight){
    return ((windowHeight*0.5) - (objectHeight*0.5)).toString() + "px";
};
function moveNav(data){
    var object = "#" + data.toString();
    var destination = ($(object).offset().top);
    $('html, body').animate({scrollTop : destination},400);
    return;
};
function detectNav(data){
    var datavalue = data.toString(),
        object = ".nav_circle[data="+datavalue+"]";
    $(".nav_circle").removeClass("selected");
    $(object).addClass("selected");
};

$(document).on('mouseenter','.contactus_mailbt', function (){
    $(this).stop().animate({ "padding" : "0px 10px" },200);
});
$(document).on('mouseleave', '.contactus_mailbt', function () {
    $(this).stop().animate({ "padding": "0px" }, 200);
});
