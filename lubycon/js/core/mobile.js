/////////////////////////////////////////////////////////
//      touch dragging check start
/////////////////////////////////////////////////////////
var MOBILE_DRAGGING = false;
$(function(){
    $(window).on("touchmove", function(){
        MOBILE_DRAGGING = true;
    });
    $(window).on("touchstart", function(){
        MOBILE_DRAGGING = false;
    });
});
/////////////////////////////////////////////////////////
//      touch dragging check end
/////////////////////////////////////////////////////////

$(window).on("load resize",function(){
    if(($(window).width() <= 1024) && ($("#mb-menu_panel").length != 0)){
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
//      mobile search action start
/////////////////////////////////////////////////////////
$(window).on("load resize",function(){
    if(($(window).width() <= 1024) && ($("#mb-menu_panel").length != 0)){
        var searchBt = $("#mb-search"),
            searchInBt = $("#main_search_btn"),
            searchBox = $("#main_search_bar"),
            searchText = $("#main_search_text"),
            searchTextWidth = ($(window).width() - searchInBt.outerWidth(true) - 25).toString(),
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
//      main index contents viewmore start(mobile)
/////////////////////////////////////////////////////////
$(function(){
    if($(window).width() < 1025){//It will be activate in only mobile
        $(".mb-view_more").on("click touchend",function(event){
            eventHandler(event,$(this));
            if(!MOBILE_DRAGGING){
                var id = $(this).attr("id"),
                hostURL = location.host,
                url = "";
                switch(id){
                    case "mb-artwork_bt" : 
                        url = 'http://' + hostURL + '/Lubycon_Website/0.current_lubycon/index.php?1=contents&2=contents_page&3=artwork';
                        location.href = url;
                    break;
                    case "mb-vector_bt" :
                        url = 'http://' + hostURL + '/Lubycon_Website/0.current_lubycon/index.php?1=contents&2=contents_page&3=vector';
                        location.href = url;
                    break;
                    case "mb-3d_bt" :
                        url = 'http://' + hostURL + '/Lubycon_Website/0.current_lubycon/index.php?1=contents&2=contents_page&3=3d';
                        location.href = url;
                    break;
                    default: return; break;
                }
            }
            else if(MOBILE_DRAGGING){
                return;
            } 
        });
    }else{
        return;
    }
});
/////////////////////////////////////////////////////////
//      main index contents viewmore end(mobile)
/////////////////////////////////////////////////////////