$(window).on("load resize",function(event){
    if(isMobile()){
        initMobileMenu.call($("#mb-menu-panel"));
        initMobileSearchBox.call($("#mb-search"));
        if(event.type === "load" )initMobileIndexTab.call($(".mb-contents-tab"));
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
        buttons = $this.find(".tab-bt");
        buttons.first().addClass("selected");

        buttons.each(function(){
            $(this).on("click touchend",toggle.group).on("click touchend",tabAction);
        });

        function tabAction(event){
            eventHandler(event,$(this));

            var target = $(document).find(".mb-contents-wrapper");
            var data = $(this).data("target");

            target.removeClass("selected");

            target.each(function(){
                if($(this).data("value") === data) $(this).addClass("selected");
            })
        }
    }
});



