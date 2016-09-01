
$(function(event){
    console.log("MOBILE JS");
    if(isMobile()){
        initMobileMenu.call($(document).find("#mb-menu-panel"));
        initMobileSearchBox.call($("#mb-search"));
        if(event.type === "load" ) initMobileIndexTab.call($("#mb-main-tab"));
    }

    function initMobileMenu(){
        var $menu = $(this),
            $body = $("body"),
            $wrapper = $(document).find("#wrapper"),
            $menuBt = $(document).find("#mb-menu"),
            $cancelLayer = $(document).find("#cancel_layer");
        var distance = $("#mb-menu-panel").outerWidth();
        console.log($(this));

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
            eventHandler(event,$(this));
            if(!TOUCHMOVING){
                console.log("CLICKED");
                $cancelLayer.show();
                $wrapper.css("left",distance + "px");
                $menu.css("left", 0);
                $body.css({
                    "position" : "fixed",
                    "height" : window.screen.height.toString(),
                    "overflow" : "hidden"
                });
                console.log($menu);
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
    function initMobileSearchBox(){
        var searchBt = $(this),
            searchBox = $(document).find("#main_search_bar"),
            searchText = searchBox.find(".search-bar-text"),
            mainHeader = $("#main_header");

        searchBt.on("click touchend",toggle.single).on("click touchend",searchBoxToggle);
        function searchBoxToggle(event){
            eventHandler(event,$(this));
            var $this = $(this),
                btIcon = $this.find("i");
            console.log(btIcon);

            if($this.hasClass("selected")){
                console.log("open");
                btIcon.attr("class","fa fa-times");
                searchBox.stop().slideDown(200,function(){
                    searchBox.find("input").stop().fadeIn(400);
                });
                mainHeader.css("border-bottom", "0px solid #111");
            }
            else {
                console.log("close");
                searchBox.find("input").stop().fadeOut(400,function(){
                    searchBox.stop().slideUp(200);
                    btIcon.attr("class","fa fa-search");
                });
                mainHeader.css("border-bottom", "1px solid #111");
            }
        }
    }
    function initMobileIndexTab(){
        var $this = $(this),
            buttons = $this.find(".mb-main-tab-bt");
            buttons.first().addClass("selected");

        buttons.on("click",dbClickAction).on("click",toggleAction).on("click",toggle.group);

        function toggleAction(){
            var selected = $(this).hasClass("selected"),
                data = $(this).data("target"),
                panels = $(this).parents(".mb-wrapper-main").find(".mb-main-img-wrapper"),
                target = $(this).parents(".mb-wrapper-main").find(".mb-main-img-wrapper[data-value='" + data + "']"),

                allButtons = $(document).find(".mb-main-tab-bt > span"),
                thisButton = $(this).find("span");

            if(!selected){
                panels.hide();
                target.stop().fadeIn(500);
            }
        }

        function dbClickAction(){
            if($(this).hasClass("selected")) $('html, body').animate({scrollTop : 0},500);
            else return false;
        }
    }
});
