//This file is only one separate classification codes associated with the UI of the Lubycon.
//0. lubySelector
//1. lubyAlert
//2. sticky
//3. hover action
//4. tooltip box action
//5. mb-panel_menu
//6. hideAnywhere
/////////////////////////////////////////////////////////
//      lubySelector start
/////////////////////////////////////////////////////////
$(document).ready(function(){
    if($(".nav_guide").length!=0){
        var navGuide = $(".nav_guide"),
        preferFilter = navGuide.find(".preferFilter"),
        copyrightFilter = navGuide.find(".copyrightFilter"),
        languageFilter = navGuide.find(".languageFilter")
        locationFilter = navGuide.find(".locationFilter"),
        jobFilter = navGuide.find(".jobFilter"),
        userFilter = navGuide.find(".userFilter"),
        categoryFilter = navGuide.find(".categoryFilter"),

        preferFilter.lubySelector({
            id: "preferFilter"
        });
        copyrightFilter.lubySelector({
            id: "copyrightFilter",
            icon: "fa fa-copyright"
        });
        languageFilter.lubySelector({
            id: "languageFilter",
            icon: "fa fa-globe"
        });
        locationFilter.lubySelector({
            id: "locationFilter",
            icon: "fa fa-globe"
        });
        jobFilter.lubySelector({
            id: "jobFilter",
            icon: "fa fa-suitcase"
        });
        userFilter.lubySelector({
            id: "userFilter",
            icon: "fa fa-user"
        });
        categoryFilter.lubySelector({
            id:"categoryFilter",
            width: 300,
            float: "left",
            icon: "fa fa-bars",
            searchBar: true,
            optGroup: true
        });
    }
    else{
        return;
    }
    var searchFilter = $("body").find(".searchFilter");
    searchFilter.lubySelector({
        width: 100,
        theme: "transparent",
        icon: ""
    });
});
/////////////////////////////////////////////////////////
//      lubySelector end
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//      lubyAlert start
///////////////////////////////////////////////////////// 
$(document).ready(function(){
    $(".bookmark_bt").lubyAlert({
        kind: "bookmark",
        toggle: true
    });
    $(".like_bt").lubyAlert({
        kind: "like",
        toggle: true
    });
    $("#delete_bt").lubyAlert({
        width: 430,
        height: 180,
        kind: "confirm",
        customText: "Are you sure?"
    });
});
/////////////////////////////////////////////////////////
//      lubyAlert end
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//      sticky start
/////////////////////////////////////////////////////////
$(document).ready(function(){
    var $mainHeader = $("#main_header"),
    $figure = $(".main_figure_wrap"),
    $navsel = $("#navsel"),
    $conWrap = $(".con_wrap"),
    $conMain = $(".con_main"),
    $conAside = $(".con_aside"),
    $navGuide = $(".nav_guide"),

    headerHeight = $mainHeader.length==0 ? 0 : $mainHeader.outerHeight(true),
    figureHeight = $figure.length==0 ? 0 : $figure.outerHeight(true) - headerHeight,
    navselHeight = $navsel.length==0 ? 0 : $navsel.height(),
    stickyStart = figureHeight + navselHeight,
    objectY = $navGuide.length==0 ? 0 : $navGuide.outerHeight(true);
    console.log(stickyStart);
    console.log("figure:"+figureHeight);
    console.log("navsel:"+navselHeight);
    console.log(objectY)
    lubySticky(stickyStart,objectY);
})
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
/////////////////////////////////////////////////////////
//      add hover animations start
/////////////////////////////////////////////////////////
$(function(){   
    $('.animate_scale').hover(function (e){
        $(this).stop().animate({ width: "+=3", height: "+=3", right: "-=1.5", top: "-=1.5" }, 150);
    }, function(){
         $(this).stop().animate({ width: "-=3", height: "-=3", right: "+=1.5", top: "+=1.5" }, 150);
    });
});//scale animation end
$(function(){
    $('.animate_width').hover(function (e){
        $(this).stop().animate({ width: "+=4", right: "-=2"}, 150);
    }, function(){
        $(this).stop().animate({ width: "-=4", right: "+=2"},150);
    })
})
$(function(){
    $(".animate_opacity").hover(function (e){
        $(this).stop().animate({ opacity: 0.8 },200);
    },function(){
        $(this).stop().animate({ opacity: 1 },200);
    });
});//opacity animation end

/////////////////////////////////////////////////////////
//      add hover animations end
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//      tooltip start
/////////////////////////////////////////////////////////
$(function(){
   $(document).ready(function(){
        var tip_parent = $(document).find(".tooltip_bt").prev();
        //if you want use tooltip, just add "tootip_bt" class to object
        tip_parent.hover(function() {
            $(this).next(".tooltip_bt").stop().fadeIn(300);
        }, function() {
            $(this).next(".tooltip_bt").stop().fadeOut(300);
        });
    });
});
/////////////////////////////////////////////////////////
//      toottip_end
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//      mobile menu action start
/////////////////////////////////////////////////////////
$(window).on("load resize",function(){
    if((windowWidth <= 1024) && ($("#mb-menu_panel").length != 0)){
        $("#mb-menu_panel").height = window.screen.height;
        var mb_menu = $("#mb-menu");
        var mb_menu_toggle = 0;
        var distance = $("#mb-menu_panel").outerWidth();
        mb_menu.on("click touchend", function(){
            if(!dragging){
                eventHandler(event, $(this));
                remove_mb_menu();
                return;
            }
            else if(dragging){
                return;
            }
        });//click end
        $("#cancel_layer").on("click touchend",function(){
            remove_mb_menu();
            return;
        });
        function remove_mb_menu(){
            switch(mb_menu_toggle){
                case 0 : 
                    $("#wrapper").stop().animate({ left: distance.toString() }, 200);
                    $("#mb-menu_panel").stop().animate({ left: "0"}, 200);
                    $("#cancel_layer").css({
                        "width": window.screen.width.toString(),
                        "height": window.screen.height.toString(),
                        "background": "transparent",
                        "position": "absolute",
                        "top": "0",
                        "left": "0",
                        "z-index": "100000",
                        "cursor": "pointer"
                    });
                    $("#cancel_layer").show();
                    $("body").css({
                        "position":"fixed",
                        "height":window.screen.height.toString(),
                        "overflow":"hidden"
                    });
                    mb_menu_toggle = 1;
                    console.log(mb_menu_toggle);
                    return;
                break;
                case 1 :
                    $("#cancel_layer").hide();
                    $("#wrapper").stop().animate({ left: "0" }, 200);
                    $("#mb-menu_panel").stop().animate({ left: (distance*-1).toString()}, 200);
                    $("body").css({
                        "position":"relative",
                        "height":"auto",
                        "overflow":"auto"
                    });
                    $("body").css("overflow-x", "hidden");
                    mb_menu_toggle = 0;
                    console.log(mb_menu_toggle);
                    return;
                break;
                default: return; break;
            };//swtich end
        }//remove_function end
    }//if end
    else{
        return; 
    }
});
/////////////////////////////////////////////////////////
//      mobile menu action end
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//      mobile search action start
/////////////////////////////////////////////////////////
$(window).on("load resize",function(){
    if((windowWidth <= 1024) && ($("#mb-menu_panel").length != 0)){
        var searchBt = $("#mb-search"),
            searchInBt = $("#main_search_btn"),
            searchBox = $("#main_search_bar"),
            searchText = $("#main_search_text"),
            searchTextWidth = (windowWidth - searchInBt.outerWidth(true) - 25).toString(),
            darkOverlay = $(".dark_overlay"),
            mainHeader = $("#main_header"),
            icon1 = $("#mb-search .icon1"),
            icon2 = $("#mb-search .icon2"),
            toggle_count = 0;
        searchText.css("width",searchTextWidth+"px");
        searchBt.on("click touchend",function(){
            eventHandler(event, $(this));
            switch(toggle_count){
                case 0 :  
                    icon1.fadeOut(500);
                    icon2.fadeIn(500);
                    searchBox.stop().slideDown(300,function(){
                        searchBox.find("input").stop().fadeIn(500);
                    });
                    darkOverlay.css("z-index","10");
                    mainHeader.css("border-bottom", "0px solid #111");
                    toggle_count = 1;
                break;
                case 1 : 
                    
                    searchBox.find("input").stop().fadeOut(500,function(){
                        searchBox.stop().slideUp(300);
                        icon1.fadeIn(500);
                        icon2.fadeOut(500);
                    });
                    darkOverlay.css("z-index","50");
                    mainHeader.css("border-bottom", "1px solid #111");
                    toggle_count = 0;
                break;
                default: return; break;
            }
        });
    }
});
/////////////////////////////////////////////////////////
//      mobile search action end
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//      visible goToTheTop button start
/////////////////////////////////////////////////////////
$(window).on("load resize", function(){
    var host = hostURL = location.host,
    page = document.location.href == ("http://"+host+"/Lubycon_Website/0.current_lubycon/index.php");
    if($("#gotop_bt").length != 0 && page){
        var goTopBt = $(document).find("#gotop_bt");
        $(document).on("touchmove scroll", function (event){
            if($(document).scrollTop() > 500){
                goTopBt.stop().show();
                return;
            }
            else{
                goTopBt.stop().hide();
                return;
            }
        });
        $("#gotop_bt").on("click touchend", function(event){
            eventHandler(event,$(this));
            $('html, body').animate({scrollTop : 0},500);
            return;
        });
    }
    else{
        return;
    }
})
/////////////////////////////////////////////////////////
//      visible goToTheTop button end
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//      share toggle button start
/////////////////////////////////////////////////////////
$(document).ready(function(){
    if($(".share_bt_wrap").length != 0){
        var toggle_count = 0;
        $(this).find(".share_bt").on("click touchend", function(event){
            if(!dragging){
                console.log(toggle_count);
                eventHandler(event, $(this));
                switch(toggle_count){
                    case 0 : 
                        $(".sharing_bt_box").fadeIn(200);
                        $(".share_list").on("click touchend", function(event){
                            eventHandler(event, $(this));
                            toggle_count = showAlert($(this),toggle_count);
                            $(this).parents(".sharing_bt_box").fadeOut(200);
                            toggle_count = 0;
                            return;
                        });
                        toggle_count = 1;
                    break;
                    case 1 :
                        $(this).next(".sharing_bt_box").fadeOut(200);
                        toggle_count = 0;
                    break;
                    default : return; break;
                }
            }
            else if(dragging){
                return;
            }   
        });
    }
});
/////////////////////////////////////////////////////////
//      share toggle button end
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//      hideAnywhere start
/////////////////////////////////////////////////////////
$.fn.hideAnywhere = function(selector,button,list,target){
    this.each(function(){
        var $this = selector,//event.target
        $button = button,
        $list = list,
        defaults = {
            a:"",
            b:"",
            c:"",
            d:"",
            e:"",
            f:""
        },
        d = $.extend({}, defaults, target),
        bool = $this.is(d.a)||$this.is(d.b)||$this.is(d.c)||$this.is(d.d)||$this.is(d.e)||$this.is(d.f);
        if(bool==false){
            $button.removeClass("opened");
            $list.fadeOut(200);
        } 
        return this;
    }); 
};
/////////////////////////////////////////////////////////
//      hideAnywhere start
/////////////////////////////////////////////////////////