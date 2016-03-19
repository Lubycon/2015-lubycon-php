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
                textTool: true,
                colorTool: true
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
            slider: "fa fa-sliders",
            tag: "fa fa-tag",
            font: "fa fa-font",
            plus: "fa fa-plus",
            pencil: "fa fa-pencil",
            times: "fa fa-times",
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
            download: "fa fa-inbox"
        },
        keyCode = { //ascii
            a: 65,
            b: 66,
            c: 67,
            d: 68,
            e: 69,
            f: 70,
            g: 71,
            h: 72,
            i: 73,
            j: 74,
            k: 75,
            l: 76,
            m: 77,
            n: 78,
            o: 79,
            p: 80,
            q: 81,
            r: 82,
            s: 83,
            t: 84,
            u: 85,
            v: 86,
            w: 87,
            x: 88,
            y: 89,
            z: 90
        },
        d = {},
        pac = {
            init: function (option) {
                return d = $.extend({}, defaults, option), this.each(function () {
                    if (!$(this).hasClass("lubyPictoolKey")) $.error("The key for lubyPictool is not exist");
                    else {
                        console.log("lubyPictool is loaded");//function start
                        var $this = $(this),
                        //init object
                        $wrapper = $("<div/>",{"class" : "lubypic-wrapper"}).appendTo($this),
                        $header = $("<div/>",{"class" : "lubypic-header"}).appendTo($wrapper),
                        $body = $("<div/>",{"class" : "lubypic-body"}).appendTo($wrapper),
                        $aside = $("<div/>",{"class" : "lubypic-aside"}).height(d.height).appendTo($body),
                        $editingBack = $("<div/>",{"class" : "editing-background"}).appendTo($body),
                        //canvas
                        $editingArea = $("<div/>",{"class" : "editing-area"}).appendTo($body),
                        $canvas = $("<div/>",{"class" : "editing-canvas"}).appendTo($editingArea),
                        $objHeader = $("<div/>",{"class" : "canvas-obj obj-header"}).appendTo($canvas),
                        $objBody = $("<div/>",{"class" : "canvas-obj obj-body"}).appendTo($canvas),
                        $objFooter = $("<div/>",{"class" : "canvas-obj obj-footer"}).appendTo($canvas),

                        $placeHolder = $("<div/>",{
                            "class" : "canvas-obj canvas-content placeHolder",
                            "data-value" : "newImgUpload"
                        }).append($("<i/>",{"class" : icons.plus}))
                        .append($("<p/>",{"html" : "Click Here or Drag and Drop your file on here"}))
                        .appendTo($objBody)
                        .on("click",upload.imgUpTrigger),
                        //in header bt
                        $headerBtWrap = $("<div/>",{"class" : "header-btn-wrapper"}).appendTo($header),
                        $fileUpbtn = $("<div/>",{
                            "class" : "header-btn fileUpload",
                            "html" : "File",
                            "data-value" : "newImgUpload"
                        }).prepend($("<i/>",{"class":icons.upload}))
                        .appendTo($headerBtWrap).on("click",upload.imgUpTrigger),
                        $savebtn = $("<div/>",{
                            "class" : "header-btn savepc",
                            "html" : "Save"
                        }).prepend($("<i/>",{"class":icons.download}))
                        .appendTo($headerBtWrap).on("click",headerTool.downToPc),
                        //in header progress
                        $progressWrap = $("<div/>",{"class" : "header-prog-wrapper"}).appendTo($header),
                        $editProgress = $("<div/>",{
                            "class" : "header-btn edit prog current-prog",
                            "html" : "EDIT",
                            "data-value" : "edit"
                        }).prepend($("<i/>",{"class":icons.edit}))
                        .appendTo($progressWrap).on("click",pac.currentProg),
                        $thumbProgress = $("<div/>",{
                            "class" : "header-btn thumb prog",
                            "html" : "THUMBNAIL",
                            "data-value" : "thumbnail"
                        }).prepend($("<i/>",{"class":icons.image}))
                        .appendTo($progressWrap).on("click",pac.currentProg),
                        $setProgress = $("<div/>",{
                            "class" : "header-btn setting prog",
                            "html" : "SETTING",
                            "data-value" : "setting"
                        }).prepend($("<i/>",{"class":icons.setting}))
                        .appendTo($progressWrap).on("click",pac.currentProg),

                        //in toolbar
                        $textTool = d.toolbar.textTool ? $("<div/>",{
                            "class" : "btn",
                            "data-value" : "textTool"
                        }).append($("<i/>",{"class":icons.font}))
                        .appendTo($aside).on("click",pac.toggle).on("click",toolbar.toolbarToggle) : "";
                        $colorTool = d.toolbar.colorTool ? $("<div/>",{
                            "class" : "btn",
                            "data-value" : "colorTool"
                        }).append($("<i/>",{"class":icons.slider}))
                        .appendTo($aside).on("click",pac.toggle).on("click",toolbar.toolbarToggle) : "",

                        //input files
                        $inputFile = $("<input/>",{
                            "class":"fileUploader lubypic-hidden",
                            "name":"fileUploader",
                            "type":"file"
                        }).insertAfter($header),
                        $inputImage = $("<input/>",{
                            "class":"imgUploader lubypic-hidden",
                            "name":"imgUploader",
                            "type":"file"
                        }).insertAfter($header);
                        $(".btn").each(pac.toolbox);
                        pac.databind();//data binding
                    }
                })
            },
            databind: function(){
                //toolbar data bind start
                toolbar.textTool();
                //toolbar data bind end
            },
            toggle: function(){
                var $this = $(this),
                $btns = $(".btn");
                if($this.hasClass("selected")) $this.removeClass("selected");
                else {
                    $btns.removeClass("selected");
                    $this.addClass("selected");
                }
            },
            currentProg: function(){
                var $this = $(this),
                $btns = $(".prog");
                if(!$this.hasClass("selected")) {
                    $btns.removeClass("current-prog");
                    $this.addClass("current-prog");
                    console.log($this.data("value"));
                }
            },
            placeHolder: function(){
                var $this = $(this);
                console.log("placeHolder is clicked");
            },
            toolbox: function(){
                var $this = $(this),
                $aside = $this.parents(".lubypic-aside"),
                value = $this.data("value"),
                toolboxWrap = $("<div/>",{
                    "class" : "toolbox-wrap",
                    "data-value" : value,
                    "id" : value + "-toolbox"
                }).height(d.height).appendTo($aside).hide();
            },
            objMenu: function(selector){
                var $object = selector,
                $objectMenu = $("<div/>",{"class" : "obj-menu-btn"}).appendTo($object).hide(),
                $objectMenuIcon = $("<i/>",{"class" : icons.pencil}).appendTo($objectMenu),
                $menuWrap = $("<ul/>",{"class" : "obj-menu"}).appendTo($objectMenu).hide(),
                $replace = $("<li/>",{
                    "class" : "obj-menu-list",
                    "html" : "Replace",
                    "data-value" : "replace"
                }).on("click",upload.imgUpTrigger).appendTo($menuWrap),
                $Copy = $("<li/>",{
                    "class" : "obj-menu-list",
                    "html" : "Copy",
                    "data-value": "copy"
                }).appendTo($menuWrap),
                $delete = $("<li/>",{
                    "class" : "obj-menu-list",
                    "html" : "Delete",
                    "data-value" : "delete"
                }).appendTo($menuWrap).on("click",canvasTool.deleteObj);
                $object.hover(
                    function(){ $objectMenu.show(); },
                    function(){ $objectMenu.hide(); }
                );
                $objectMenu.hover(
                    function(){ $menuWrap.show(); },
                    function(){ $menuWrap.hide(); }
                );
            }
        },
        upload = {
            fileUpTrigger: function(){
                var $this = $(this),
                inputFile = $(document).find(".fileUploader");
                inputFile.click();
            },
            imgUpTrigger: function(){
                var $this = $(this),
                inputFile = $(document).find(".imgUploader"),
                dataValue = $this.data("value");
                inputFile.click();

                if(dataValue == "newImgUpload") inputFile.off("change").on("change",upload.imgUpload);
                else if(dataValue == "replace"){
                    inputFile.off("change").on("change",upload.imgReplace);
                    $this.addClass("uploading");
                }  
                else $.error("This button can't upload to lubyPictool");
            },
            imgUpload: function(event){
                var $this = $(this),
                $canvas = $(document).find(".editing-canvas"),
                $target = $canvas.find(".obj-body"),
                $footer = $canvas.find(".obj-footer"),
                $placeHolder = $target.find(".placeHolder"),
                $objectWrap = $("<div/>",{"class" : "canvas-obj canvas-content object-img"}).appendTo($target),
                $devider = $("<div/>",{"class" : "canvas-obj canvas-devider"}),
                index = $(document).find(".object-img").size(),
                $object = event.target.files;

                if($placeHolder.length!=0) $placeHolder.hide();

                $.each($object, function(i,file){
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function(event){
                        var img = $("<img/>",{ "src":event.target.result}).appendTo($objectWrap);
                    };
                });
                $this.val(null);
                $devider.insertAfter($objectWrap);
                $objectWrap.attr("data-index",index);
                pac.objMenu($objectWrap);
                console.log("The new image is uploaded");
            },
            imgReplace: function(event){
                var $this = $(this),
                $button = $(document).find(".uploading")
                $target = $button.parents(".obj-menu-btn").siblings("img"),
                $object = event.target.files;
                $.each($object, function(i,file){
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function(event){
                        $target.attr("src",event.target.result);
                        $button.removeClass("uploading");
                    };
                });
                $this.val(null);
                console.log("this image is replaced");
            }
        },
        headerTool = {
            downToPc: function(){
                var $this = $(this);
                console.log("Download to pc");
            }
        },
        canvasTool = {
            deleteObj: function(){
                var $this = $(this),
                images = $(document).find(".object-img").size(),
                $target = $this.parents(".object-img"),
                $devider = $target.next(".canvas-devider"),
                $placeHolder = $(document).find(".placeHolder");
                $target.remove();
                $devider.remove();
                if(images == 1) $placeHolder.show();
            }
        },
        toolbar = {
            toolbarToggle: function(){
                var $this = $(this),
                value = $this.data("value"),
                toolBoxes = $(document).find(".toolbox-wrap"),
                toolBox = $(".toolbox-wrap[data-value=" + value + "]");
                if($this.hasClass("selected")) {
                    toolBoxes.hide();
                    toolBox.show();
                }
                else toolBox.hide();
            },
            textTool: function(){
                var $this = $(document).find("#textTool-toolbox"),
                $fontSize = $("<div/>",{"class" : "toolbox-inner", "id" : "fontSize-tool"}).appendTo($this),
                $label = $("<div/>",{ "class":"toolbox-label", "html" : "Font-Size" }).appendTo($fontSize),
                $input = $("<input/>",{
                    "type" : "range",
                    "class" : "sliderKey",
                    "value" : 12,
                    "min" : 0,
                    "max" : 100
                }).appendTo($fontSize).slider({ 
                    textbox:true ,
                    callback: function(val,selector){
                        console.log(val);
                    }
                });
            },
            textFn: {
                fontSize: function(){

                },
                fontColor: function(){

                },
                fontFamily: function(){

                },
                fontDeco: function(){

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