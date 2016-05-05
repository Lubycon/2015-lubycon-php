//This file is only one separate classification codes associated with the UI of the Lubycon.
//0. lubySelector
//1. lubyAlert
//2. go to top button
//3. tooltip
//4. hideAnywhere
//5. modal
//6. toggle
/////////////////////////////////////////////////////////
//      lubySelector enable
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
//      lubySelector enable
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//      lubyAlert enable
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
//      lubyAlert enable
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
//      tooltip start
/////////////////////////////////////////////////////////
$.fn.tooltip = function(option){ //parent obejct must has "data-tip" attribute!!!!
    var defaults = { top: 0, left: 0 },
    d = $.extend({}, defaults, option);

    this.each(function(){
        var $this = $(this),
        data = $this.data("tip");

        var tooltipBody = $("<div/>",{"class" : "tooltip tip-body"}).css({ "top" : d.top, "left" : d.left }),
        tooltipWrap = $("<div/>",{"class" : "tooltip tip-wrapper"}).appendTo(tooltipBody),
        tooltipContent = $("<p/>",{"class" : "tooltip tip-content","html" : data}).appendTo(tooltipWrap);
        
        $this.on("mouseenter",showTooltip).on("mouseleave",hideTooltip);

        function showTooltip(){
            var $this = $(this);
            tooltipBody.appendTo($this).stop().fadeIn(300);
        }
        function hideTooltip(){
            var $this = $(this);
            tooltipBody.hide().remove();
        }
    });
    return this;
}
/////////////////////////////////////////////////////////
//      toottip_end
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//      hideAnywhere start
/////////////////////////////////////////////////////////
$.fn.hideAnywhere = function(){
    this.each(function(){
        var $menu = $(this),
        $button = $menu.parents(".selected").length == 0 ? $menu.siblings(".selected") : $menu.parents(".selected");

        $("html").off("click").on("click",hideMenu);

        function hideMenu(event){
            event.stopPropagation();
            var $this = $(event.target),
            checkElement = !$this.is($menu) && !$this.is($button) && $button.has($this).length == 0;

            console.log(checkElement);
            if(checkElement) {
                $menu.fadeOut(200);
                $button.removeClass("selected");
            }
        }
    });
    return this;
};
/////////////////////////////////////////////////////////
//      hideAnywhere end
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//      modalAction start
/////////////////////////////////////////////////////////
$(function(){
    $(document).ready(function(){
        var $modal = $(document).find(".modal"),
        $darkOverlay = $(document).find(".dark_overlay");

        $darkOverlay.on("click",modalHide);
        $("body").on("click",".modal-closebt",modalHide);
        $("body").on("click",".modal-bt",modalHide);

        function modalHide(){
            var $this = $(this),
            data = $this.data("value");

            if(data === "dark_overlay"){
                if($modal.length !== 0){
                    $modal.find(".modal-closebt").trigger("click");
                    $this.stop().fadeOut(200);
                }
                else{
                    $this.stop().fadeOut(200);
                }
            }
            else if(data === "modal-closebt"){
                $this.parents(".modal").stop().fadeOut(200);
                if(!$this.hasClass("cc-setting")){
                    $darkOverlay.stop().fadeOut(200);
                }
            }
            else if(data === "modal-cancelbt"){
                $this.parent(".modal").stop().fadeOut(200);
            }
        }
    })
})
/////////////////////////////////////////////////////////
//      modalAction end
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//      toogle action start
/////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////
//      toogle action end
/////////////////////////////////////////////////////////
