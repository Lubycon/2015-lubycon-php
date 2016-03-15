/* ===========================================================
 *
 *  Name:          lubyPictool.min.js
 *  Updated:       2016-03-13
 *  Version:       0.1.0
 *  Created by:    DART, Lubycon.co
 *
 *  Copyright (c) 2016 Lubycon.co
 *
 * =========================================================== */

(function($){
    $.fn.lubyPictool = function(option){
        var defaults = { 
            height: $(window).height(),
            minHeight: null,
            fileUpload: true,
            imageUpload: true,
            toolbar: {
                a: true
            }
        },
        icons = {
            basic: "fa fa-filter",
            cc: "fa fa-creative-commons",
            charge: "fa fa-credit-card",
            usd: "fa fa-usd",
            crop: "fa fa-crop",
            edit: "fa fa-edit",
            eraser: "fa fa-eraser",
            code: "fa fa-code",
            setting: "fa fa-cog",
            image: "fa fa-image",
            sort: "fa fa-sort-amount-desc",
            slider: "fa fa-slider",
            alignCenter: "fa fa-align-center",
            alignLeft: "fa fa-align-left",
            alignRight: "fa fa-align-right",
            bold: "fa fa-bold",
            italic: "fa fa-italic",
            underline: "fa fa-underlien",
            strike: "fa fa-strikethrough",
            arrowUp: "fa fa-caret-up",
            arrowDown: "fa fa-caret-down",
            arrowLeft: "fa fa-caret-left",
            arrowRight: "fa fa-caret-right",

            upload: "fa fa-cloud-upload",
            download: "fa fa-cloud-download"
        },
        d = {},
        pac = {
            init: function (option) {
                return d = $.extend({}, defaults, option), this.each(function () {
                    if (!$(this).hasClass("lubyPictoolKey")) $.error("lubySelector is already exists");
                    else {
                        console.log("lubyPictool is loaded");//function start
                        var $this = $(this),
                        $wrapper = $("<div/>",{"class" : "lubypic-wrapper"}).appendTo($this),
                        $header = $("<div/>",{"class" : "lubypic-header"}).appendTo($wrapper),
                        $body = $("<div/>",{"class" : "lubypic-body"}).appendTo($wrapper),
                        $aside = $("<div/>",{"class" : "lubypic-aside"}).height(d.height).appendTo($body),
                        $editingBack = $("<div/>",{"class" : "editing-background"}).appendTo($body),
                        $editingArea = $("<div/>",{"class" : "editing-area"}).appendTo($body),
                        $canvas = $("<div/>",{"class" : "editing-canvas"}).appendTo($editingArea),
                        //in header
                        $fileUpbtn = $("<div/>",{
                            "class" : "header-btn fileUpload",
                            "html" : "File"
                        }).prepend($("<i/>",{"class":icons.upload}))
                        .appendTo($header).on("click",headerTool.fileUpload),
                        $realFile = $("<input/>",{"class":"fileUpload hidden","type":"file"}).insertAfter($fileUpbtn),
                        //in toolbar
                        $btnA = d.toolbar.a ? $("<div/>",{"class" : "btn"}).append($("<i/>",{"class":icons.basic}))
                        .appendTo($aside).on("click",pac.toggle).on("click",tool.btnA) : "";

                        pac.databind();
                    }
                })
            },//init end
            databind: function(){
                console.log("databind");
            },
            toggle: function(){
                var $this = $(this);
                if($this.hasClass("selected")) $this.removeClass("selected");
                else $this.addClass("selected");
            }
        },
        headerTool = {
            fileUpload: function(){
                var $this = $(this),
                inputFile = $this.next("input[type='file']");
                inputFile.click();
            }
        },
        tool = {
            btnA: function(){
                var $this = $(this);
                if($this.hasClass("selected")){
                    alert(true);
                }
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
            ($.error('No such method "' + option + '" for the lubyPictool instance'), void 0) : 
            pac.init.apply(this, arguments);
};
})(jQuery);