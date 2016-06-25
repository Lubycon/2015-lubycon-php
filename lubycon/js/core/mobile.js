$(window).on("load resize",function(){
    if(isMobile()){
        initMobileMenu.call($("#mb-menu-panel"));
    }
    
    function initMobileMenu(){
        console.log(2);
        var $menu = $(this),
            $body = $("body"),
            $wrapper = $(document).find("#wrapper"),
            $menuBt = $(document).find("#mb-menu"),
            $cancelLayer = $(document).find("#cancel_layer");
        var distance = $("#mb-menu-panel").outerWidth();

        $cancelLayer.css({
            "width": window.screen.width.toString(),
            "height": window.screen.height.toString(),
            "background": "transparent",
            "position": "absolute",
            "top": "0",
            "left": "0",
            "z-index": "100000",
            "cursor": "pointer"
        });

        $menuBt.on("click touchend",showMobileMenu);
        $cancelLayer.on("click touchedn",hideMobileMenu);

        function showMobileMenu(event){
            console.log(1);
            eventHandler(event,$(this));
            if(!TOUCHMOVING){
                $cancelLayer.show();
                $wrapper.css("left",distance + "px");
                $menu.css("left", 0);
                $body.css({
                    "position" : "fixed",
                    "height" : window.screen.height.toString(),
                    "overflow" : "hidden"
                });
            }
            else return false;
        }
        function hideMobileMenu(event){
            eventHandler(event,$(this));
            if(!TOUCHMOVING){
                $cancelLayer.hide();
                $wrapper.css("left", 0);
                $menu.css("left", distance * -1 + "px");
                $body.css({
                    "position" : "relative",
                    "height" : "auto",
                    "overflow" : "auto",
                    "overflow-x" : "hidden"
                });
            }
            else return false;
        }
    }
});

/////////////////////////////////////////////////////////
//      mobile search action start
/////////////////////////////////////////////////////////
$(window).on("load resize",function(){
    if(isMobile() && ($("#mb-menu-panel").length != 0)){
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
        searchBt.on("click touchend",function(event){
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
    if(isMobile()){//It will be activate in only mobile
        $(".mb-view_more").on("click touchend",function(event){
            eventHandler(event,$(this));
            if(!TOUCHMOVING){
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
            else if(TOUCHMOVING){
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