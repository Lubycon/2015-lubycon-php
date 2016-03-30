/////////////////////////////////////////////////////////
//      sticky start
/////////////////////////////////////////////////////////
$(document).ready(function(){
    var $mainHeader = $(".main_header"),
    $figure = $(".main_figure_wrap"),
    $navsel = $(".navsel"),
    $conWrap = $(".con_wrap"),
    $conMain = $(".con_main"),
    $conAside = $(".con_aside"),
    $navGuide = $(document).find(".nav_guide"),

    headerHeight = $mainHeader.length==0 ? 0 : $mainHeader.outerHeight(true),
    figureHeight = $figure.length==0 ? 0 : $figure.outerHeight(true),
    navselHeight = $navsel.length==0 ? 0 : $navsel.height(),
    stickyStart = figureHeight + navselHeight,
    objectY = $navGuide.length==0 ? 0 : $navGuide.outerHeight(true);
    lubySticky(stickyStart,objectY);
});
function lubySticky(start,objectY){
    var $document = $(document),
    $navGuide = $(".nav_guide"),
    $object = $navGuide.next(),
    $aside = $object.find(".con_aside");
    $document.on("scroll",function(){
        var scrollTop = $(document).scrollTop();
        navGuideSticky(
            start,//sticky start value
            scrollTop,//document.scrollTop
            $navGuide,//object
            $object,//object
            $aside,//object
            objectY//object.marginTop,top
        );
    });
}
function navGuideSticky(start,scrollTop,nav,object,aside,objectY){
    if(start <= scrollTop){
        nav.addClass("stickyHeader").css({
            "position":"fixed",
            "margin-top": 50,
            "top": 0
        });
        object.addClass("stickyObject").css({
            "top": objectY,
        });
        objectY = $("#contents_aside").length==0 ? objectY+50 : objectY;
        aside.addClass("stickyAside").css({
            "position":"fixed",
            "top": objectY,
        });
    }
    else{
        nav.removeClass("stickyHeader").css({
            "position":"relative",
            "margin-top": 0,
            "top": 0
        });
        object.removeClass("stickyObject").css({
            "top": 0
        });
        aside.removeClass("stickyAside").css({
            "position":"absolute",
            "top": 0,
            "margin-top": 0
        })
    }
}
/////////////////////////////////////////////////////////
//      sticky end
/////////////////////////////////////////////////////////