$(window).on("load resize",function(){
    if(isMobile()){
        initMobileMenu.call($("#mb-menu-panel"));
        initMobileSearchBox();
    }
    
    function initMobileMenu(){
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
    function initMobileSearchBox(){
        var searchBt = $("#mb-search"),
            searchInBt = $("#main_search_btn"),
            searchBox = $("#main_search_bar"),
            searchText = $("#main_search_text"),
            searchTextWidth = ($(window).width() - searchInBt.outerWidth(true) - 25).toString(),
            darkOverlay = $(".dark_overlay"),
            mainHeader = $("#main_header"),
            btIcon = $("#mb-search").find(".fa");
        searchText.css("width",searchTextWidth + "px");
        searchBt.on("click touchend",toggle.single).on("click touchend",searchBoxToggle);

        function searchBoxToggle(event){
            event.stopPropagation();
            eventHandler(event,$(this));
            var $this = $(this);

            if($this.hasClass("selected")){
                console.log("open");
                btIcon.attr("class","fa fa-times");
                searchBox.stop().slideDown(300,function(){
                    searchBox.find("input").stop().fadeIn(500);
                });
                mainHeader.css("border-bottom", "0px solid #111");
            }
            else {
                console.log("close");
                searchBox.find("input").stop().fadeOut(500,function(){
                    searchBox.stop().slideUp(300);
                    btIcon.attr("class","fa fa-search");
                });
                mainHeader.css("border-bottom", "1px solid #111");
            }
        }
    }
});