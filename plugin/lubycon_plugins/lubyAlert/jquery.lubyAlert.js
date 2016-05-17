/* ===========================================================
 *
 *  Name:          lubyAlert.min.js
 *  Updated:       2016-03-09
 *  Version:       0.1.0
 *  Created by:    DART, Lubycon.co
 *
 *  Copyright (c) 2016 Lubycon.co
 *
 * =========================================================== */

(function($){
	$.fn.lubyAlert = function(option){
        var defaults = { 
            width: 170,
            height: 170,
            kind: "custom",//bookmark,like,success,cancel,confirm,prompt,custom
            inSpeed: 500,
            stoptime: 500,
            outSpeed: 700,
            customIcon: "",//font awesome
            customText: "",
            customAnimation: "",
            textSize: 30,
            toggle: false,
            okButton: true,
            cancelButton: true,
            okAlert: true,
            cancelAlert: true,
            callback: null
        },
        d = {},
        pac = {
            create: function (option) {
                return d = $.extend({}, defaults, option), this.each(function () {
                    if (!$(this).hasClass("alertKey")) $.error("lubyAlert : There is no lubyAlert object");
                    else {      
                        var $this = $(this),
                        toggleSetup = d.toggle ? 
                        $this.on("click touchend", pac.toggleOn) && $this.on("click touchend", pac.init): 
                        $this.on("click touchend", pac.init);
                    }
                })
            },
            init: function() {
                var $this = $(this),
                windowHeight = $(window).height(),
                width = (typeof d.width === "number") ? d.width : "auto",
                height = (typeof d.height === "number") ? d.height : "auto",
                kind = d.kind,
                text = (kind=="custom"||"confirm"||"prompt") ? d.customText : "",
                icon = (kind=="custom"||"confirm"||"prompt") ? (d.customIcon +" "+ d.customAnimation) : "",

                alertBody = $("<div/>",{
                    "class" : "lubyAlert " + d.kind,
                }).css({
                    "width":d.width,
                    "height":d.height,
                    "margin-top" : (height+100)*0.5*-1,
                    "margin-left" : width*0.5*-1
                }).insertBefore("body").hide().stop().fadeIn(d.inSpeed,function(event){
                    pac.destroyAlert(alertBody,kind);
                }),
                alertInner = $("<div/>",{"class":"lubyWrapper"}).appendTo(alertBody),
                alertIcon = $("<i/>",{"class":"lubyAlertIcon " + icon}).appendTo(alertInner),
                alertText = $("<p/>",{"class":"lubyAlertText","html":text}).css({ "font-size" : d.textSize+"px" }).appendTo(alertInner),
                
                okBt = $("<div/>",{"class":"lubyOk lubyButton","html":"OK"}).on("click",pac.okCallBack),
                cancelBt = $("<div/>",{"class":"lubyCancel lubyButton","html":"CANCEL"}).on("click",pac.cancelCallBack),
                
                alertInput = d.kind==="prompt" ? 
                $("<input/>",{"type":"text","class":"lubyAlertInput"}).appendTo(alertInner).on("keydown",pac.keyEvent).focus() : alertInner.focus();

                pac.preset(kind,alertIcon,alertText);
                buttonChecker();

                function buttonChecker(){
                    var kind = d.kind;
                    if(kind === "confirm" || "prompt"){
                        if(d.okButton) okBt.appendTo(alertBody);
                        if(d.cancelButton) cancelBt.appendTo(alertBody);
                    }
                }
            },
            preset: function(kind,icon,text) {
                switch(kind){
                    case "bookmark" :
                        icon.addClass("fa fa-star bounce animated");
                        text.text("Saved :)");
                    break;
                    case "like" :
                        icon.addClass("fa fa-heart bounceIn animated");
                        text.text("Liked :)");
                    break;
                    case "success" :
                        icon.addClass("fa fa-check-circle rotateIn animated");
                        text.text("Completed");
                    break;
                    case "cancel" :
                        icon.addClass("fa fa-times tada animated");
                        text.text("Cancelled")
                    break;
                    default : return; break;
                }
            },
            okCallBack: function(){
                var $this = $(this).parents(".lubyAlert"),
                windowHeight = $(window).height(),
                objectY = ((windowHeight*0.5) - (170*0.5)),
                objectX = ((170*0.5)*-1),
                alertBody = d.okAlert ? $("<div/>",{
                    "class" : "lubyAlert success"
                }).css({
                    "width": 170,
                    "height": 170,
                    "top": objectY,
                    "left": "50%",
                    "margin-left": objectX
                }).insertBefore("body").hide().stop().fadeIn(d.inSpeed,function(event){
                    pac.destroyAlert(alertBody,"success");
                }) : "",
                alertInner = $("<div/>",{"class":"lubyWrapper"}).appendTo(alertBody),
                alertIcon = $("<i/>",{"class":"lubyAlertIcon fa fa-check-circle rotateIn animated"}).appendTo(alertInner),
                alertText = $("<p/>",{"class":"lubyAlertText","html":"Completed"}).appendTo(alertInner);
                pac.destroyAlert($this);
                console.log("OK");
            },
            cancelCallBack: function(){
                var $this = $(this).parents(".lubyAlert"),
                windowHeight = $(window).height(),
                objectY = ((windowHeight*0.5) - (170*0.5)),
                objectX = ((170*0.5)*-1),
                alertBody = d.cancelAlert ? $("<div/>",{
                    "class" : "lubyAlert cancel"
                }).css({
                    "width": 170,
                    "height": 170,
                    "top": objectY,
                    "left": "50%",
                    "margin-left": objectX
                }).insertBefore("body").hide().stop().fadeIn(d.inSpeed,function(event){
                    pac.destroyAlert(alertBody,"cancel");
                }) : "",
                alertInner = $("<div/>",{"class":"lubyWrapper"}).appendTo(alertBody),
                alertIcon = $("<i/>",{"class":"lubyAlertIcon fa fa-times tada animated"}).appendTo(alertInner),
                alertText = $("<p/>",{"class":"lubyAlertText","html":"Cancelled"}).appendTo(alertInner);
                pac.destroyAlert($this);
                console.log("CANCEL");
            },
            destroyAlert: function(selector,kind) {
                var $this = selector,
                kind = kind;
                if(kind=="prompt"||kind=="confirm"){
                    return;
                }
                else if(kind === null){
                    $this.blur().fadeOut(d.outSpeed,function(){$this.remove();});
                }
                else{ 
                    setTimeout(function(){ 
                        $this.blur().fadeOut(d.outSpeed,function(){
                            $this.remove();
                            if (d.callback !== null) d.callback();
                        })
                    },d.stoptime);
                    console.log("destroyAlert");
                } 
            },
            toggleOn: function() {
                var $this = $(this);
                if(!$this.hasClass("toggle")){
                    $this.addClass("toggle");
                    $this.off("click touchend", pac.init);
                    console.log("toggleOn");
                }
                else{
                    $this.removeClass("toggle");
                    $this.on("click touchend", pac.init);
                    console.log("toggleOff");
                }
            },
            keyEvent: function() {
                var $this = $(this),
                kind = d.kind,
                okBt = $this.parents(".lubyAlert").find(".lubyOk"),
                cancelBt = $this.parents(".lubyAlert").find(".lubyCancel");
                if(event.which == 13) {
                    if($this.val()==""){ cancelBt.click(); }
                    else{ okBt.click(); }
                }
                else if(event.which==27) {
                    cancelBt.click();
                }
                else{ return; }
                console.log("keyEvent");
            }
        },
        start = {
            test: function () {
                return this.each(function () {
                    console.log("tested");
                })
            }
        }

        return start[option] ? 
        start[option].apply(this, Array.prototype.slice.call(arguments, 1)) : 
        "object" != typeof option && option ? 
            ($.error('No such method "' + option + '" for the lubyAlert instance'), void 0) : 
            pac.create.apply(this, arguments);
    };
})(jQuery);
