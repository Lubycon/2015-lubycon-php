//This file is only one separate classification codes associated with the UI of the Lubycon.
//0. lubySelector
//1. lubyAlert
//2. hover action
//3. tooltip box action
//4. hideAnywhere
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
//      hideAnywhere end
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//      modalAction start
/////////////////////////////////////////////////////////
$(function(){
    $(document).ready(function(){
        var $modal = $(document).find(".modal"),
        $cancelBt = $modal.find(".modal-closebt"),
        $darkOverlay = $(document).find(".dark_overlay");

        $darkOverlay.on("click",modalHide);
        $cancelBt.on("click",modalHide);

        function modalHide(){
            console.log("close modal in ui.js");
            var $this = $(this),
            $target = $modal,
            data = $this.data("value");

            if(data == "dark_overlay"){
                if($modal.length !== 0){
                    $modal.find(".modal-closebt").trigger("click");
                    $this.stop().fadeOut(200);
                }
                else{
                    $this.stop().fadeOut(200);
                }
            }
            else if(data == "modal-closebt"){
                $this.parents(".modal").stop().fadeOut(200);
                console.log($this.parents(".modal"));
                if($modal.length === 1){
                    $darkOverlay.stop().fadeOut(200);
                }
            }
        }
    })
})
/////////////////////////////////////////////////////////
//      modalAction end
/////////////////////////////////////////////////////////
