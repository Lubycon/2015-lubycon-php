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
            paint: "fa fa-paint-brush",
            pencil: "fa fa-pencil",
            times: "fa fa-times",
            alignCenter: "fa fa-align-center",
            alignLeft: "fa fa-align-left",
            alignRight: "fa fa-align-right",
            bold: "fa fa-bold",
            italic: "fa fa-italic",
            underline: "fa fa-underline",
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
            z: 90,
            enter: 13
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
                        $aside = $("<div/>",{"class" : "lubypic-aside"}).appendTo($body),
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
                        $(".btn").each(pac.toolbox),

                        //modal windows
                        $modal = $("<div/>",{"class" : "modal"}),

                        $embedWindow = $modal.clone().addClass("embed-window").appendTo($this).hide(), //embed window
                        $embedWrap = $("<div/>",{ "class" : "embed-wrapper modal-wrapper" }).appendTo($embedWindow),
                        $embedTitle = $("<div/>",{
                            "class" : "embed-title modal-title",
                            "html" : "Embed Media"
                        }).appendTo($embedWrap),
                        $embedInput = $("<textarea/>",{ "class" : "embed-input" }).appendTo($embedWrap),
                        $embedHelp = $("<p/>",{ 
                            "class" : "embed-help",
                            "html" : "What can I embed?"
                        }).on("click",pac.dbToggle).on("click",modalTool.embedHelp).appendTo($embedWrap),
                        $embedError = $("<p/>",{ 
                            "class" : "embed-error",
                            "html" : "Please insert iframe tag only."
                        }).appendTo($embedWrap).hide(),
                        $embedBtWrap = $("<div/>",{ "class" : "embed-bt-wrapper" }).appendTo($embedWrap),       
                        $embedCancel = $("<div/>",{
                            "class" : "modal-bt modal-cancelbt",
                            "html" : "Cancel"
                        }).on("click",modalTool.cancel).appendTo($embedBtWrap),
                        $embedOk = $("<div/>",{
                            "class" : "modal-bt modal-okbt",
                            "id" : "embed-okbt",
                            "html" : "Embed"
                        }).on("click",modalTool.confirm).appendTo($embedBtWrap);

                        //thumbnail windows
                        $thumbWindow = $modal.clone().addClass("thumbnail-window").appendTo($this).hide(),
                        $thumbWrap = $("<div/>",{ "class" : "thumb-wrapper modal-wrapper" }).appendTo($thumbWindow),
                        $thumbTitle = $("<div/>",{
                            "class" : "thumb-title modal-title",
                            "html" : "Edit Thumbnail Image"
                        }).appendTo($thumbWrap),
                        
                        //setting windows
                        $settingWindow = $modal.clone().addClass("setting-window").appendTo($this).hide(),
                        $settingWrap = $("<div/>",{ "class" : "thumb-wrapper modal-wrapper" }).appendTo($settingWindow),
                        $settingTitle = $("<div/>",{
                            "class" : "setting-title modal-title",
                            "html" : "Content Setting"
                        }).appendTo($settingWrap),

                        pac.databind();//data binding
                        pac.modalAlign($(".modal"));
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
            dbToggle: function(){
                var $this = $(this);
                if($this.hasClass("selected")) $this.removeClass("selected");
                else $this.addClass("selected");
            },
            currentProg: function(){
                var $this = $(this),
                $modals = $(document).find(".modal"),
                $btns = $(".prog"),
                data = $(this).data("value"),
                $target = $("." + data + "-window");
                if(!$this.hasClass("selected")) {
                    $btns.removeClass("current-prog");
                    $this.addClass("current-prog");
                }
                if(data == "edit") $modals.fadeOut(200);
                else {
                    $modals.hide();
                    $target.fadeIn(200);
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
                }).appendTo($aside).hide();
            },
            objMenu: function(selector){
                var $object = selector,
                img = !$object.is(".object-img"),
                $objectMenu = $("<div/>",{"class" : "obj-menu-btn"}).appendTo($object).hide(),
                $objectMenuIcon = $("<i/>",{"class" : icons.pencil}).appendTo($objectMenu),
                $menuWrap = $("<ul/>",{"class" : "obj-menu"}).appendTo($objectMenu).hide(),
                $replace = img ? "" : 
                $("<li/>",{
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
            },
            modalAlign: function(selector){
                $this = selector,
                width = $this.outerWidth(true),
                height = $this.outerHeight(true),
                windowWidth = $(window).width(),
                windowHeight = $(window).height(),
                hrAlign = (width/2)*-1,
                vtAlign = windowHeight/2 - height/2;

                $this.css({ "top" : vtAlign+"px", "margin-left" : hrAlign+"px" });
            },
            keyEvent: function(event){
                $this = $(this),
                $confirm = $this.parent().find(".modal-okbt"),
                inKeyCode = event.which;
                switch(inKeyCode){
                   case keyCode.enter : $confirm.trigger("click"); break;
                }
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
                $inputFile = $(document).find(".imgUploader"),
                dataValue = $this.data("value"),
                $uploading = $(document).find(".uploading");
                
                if(dataValue == "replace"){
                    $inputFile.off("change").on("change",upload.imgReplace);
                    if($uploading.length!=0) $uploading.removeClass(".uploading");
                    $this.addClass("uploading");
                }
                else{
                    $inputFile.off("change").on("change",upload.imgUpload);
                    if($uploading.length!=0) $uploading.removeClass(".uploading");
                    $this.addClass("uploading");
                };
                $inputFile.trigger("click");
                console.log("Trigger On");
            },
            fileUpload: function(){
                //do nothing
            },
            imgUpload: function(event){
                var $this = $(".uploading"),
                $canvas = $(document).find(".editing-canvas"),
                $header = $(".obj-header"),
                $body = $(".obj-body"),
                $footer = $(".obj-footer"),
                $placeHolder = $body.find(".placeHolder"),
                $objectWrap = $("<div/>",{"class" : "canvas-obj canvas-content object-img", "data-index" : ""}),
                $inputFile = $(document).find(".imgUploader"),
                $object = event.target.files;

                if($placeHolder.length!=0) $placeHolder.hide();

                $.each($object, function(i,file){
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function(event){
                        var img = $("<img/>",{ "src":event.target.result});
                        upload.insertPosition($this,$objectWrap,img);
                        $(".uploading").removeClass("uploading") // init target object  
                        $inputFile.val(null); // init input value
                    };
                });  
                pac.objMenu($objectWrap);
                         
                console.log("The new image is uploaded");
            },
            imgReplace: function(event){
                var $this = $(this),
                $button = $(document).find(".uploading"),
                $target = $button.parents(".obj-menu-btn").siblings("img"),
                $inputFile = $(document).find(".imgUploader"),
                $object = event.target.files;
                $.each($object, function(i,file){
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function(event){
                        $target.attr("src",event.target.result);
                        $button.removeClass("uploading");
                        $inputFile.val(null);
                    };
                });
                console.log("this image is replaced");
            },
            textUpload: function(event){
                var $this = $(this),
                $body = $(".obj-body"),
                $placeHolder = $body.find(".placeHolder"),
                $textWrap = $("<div/>",{"class" : "canvas-obj canvas-content object-text", "data-index" : ""})
                .on("focusin",toolbar.textFn.focusAction),
                $input = $("<p/>",{"class" : "canvas-input", "contenteditable" : "true"});

                if($placeHolder.length!=0) $placeHolder.hide();
                upload.insertPosition($this,$textWrap,$input);
                pac.objMenu($textWrap);
                console.log("text area is added");
            },
            embedUpload: function(val){
                var $this = $(".uploading"),
                $body = $(".obj-body"),
                $placeHolder = $body.find("placeHolder"),
                $mediaWrap = $("<div/>",{"class" : "canvas-obj canvas-content object-embed", "data-index" : ""}),
                $media = val;

                if($placeHolder.length!=0) $placeHolder.hide();
                upload.insertPosition($this,$mediaWrap,$media);
                $this.removeClass(".uploading");
                pac.objMenu($mediaWrap);
                console.log("meida link is added");
            }, 
            setIndex: function(){
            	var $contents = $(document).find(".canvas-content");
            	$contents.each(function(){
            		var $this = $(this),
            		index = $this.index(".canvas-content");
            		if(!$this.is(".placeHolder")) $this.attr("data-index",index);
            	});
            },
            insertPosition: function(selector,wrap,object){
                var $this = selector,
                $placeHolder = $(document).find(".placeHolder"),
                $body = $(".obj-body"),
                $deviderWrap = $("<div/>",{"class" : "canvas-obj canvas-devider-wrap"}),
                $devider = $("<div/>",{"class" : "canvas-devider"}).appendTo($deviderWrap),
                contentSize = $(document).find(".canvas-content").size() > 1;

                if($this.parents().is(".obj-header")) {
                    wrap.insertAfter($placeHolder).append(object);
                    if(contentSize) $deviderWrap.clone().insertAfter(wrap);
                    console.log(0);
                }
                else if($this.parents().is(".canvas-devider-wrap")) {
                    wrap.insertBefore($this.parents(".canvas-devider-wrap")).append(object);
                    if(contentSize) $deviderWrap.clone().insertBefore(wrap);
                    console.log(1);
                }
                else {
                    wrap.appendTo($body).append(object);
                    if(contentSize) $deviderWrap.clone().insertBefore(wrap);
                    console.log(2);
                }
                canvasTool.addObjBt();
                upload.setIndex();
            }
        },
        modalTool = {
            modalShow: function(){
                $this = $(this),
                data = $this.data("value"),
                $uploading = $(document).find(".uploading"),
                $target = $(document).find("."+data),
                $input = $target.find("textarea");
                $target.fadeIn(200);
                $input.focus().on("keydown",pac.keyEvent);
                if($uploading.length!=0) $uploading.removeClass(".uploading");

                $this.addClass("uploading");
            },
            confirm: function(){
                var $this = $(this),
                $window = $this.parents(".modal"),
                $input = $this.parent().siblings("textarea"),
                $errorMsg = $this.parent().siblings(".embed-error"),
                value = $input.val() || 0;
                valTest = value.indexOf("</iframe>") == -1;
                if(value != 0 && !valTest) {
                    upload.embedUpload(value);
                    $input.val(null); 
                    $window.stop().fadeOut(200);
                }
                else {
                    $input.addClass("error").on("blur",function(){
                        $input.removeClass("error");
                    });
                    $errorMsg.fadeIn(200)
                    setTimeout(function(){
                        $errorMsg.fadeOut(200);
                    },1500);
                }
            },
            cancel: function(){
                var $this = $(this),
                $window = $this.parents(".modal"),
                $input = $this.parent().siblings("textarea");
                $input.val(null);
                $window.stop().fadeOut(200);
                console.log($window);
            },
            embedHelp: function(){
                var $this = $(this),
                selected = $this.hasClass("selected");
                if(selected) $this.text("Embeds from: Vimeo, YouTube, Adobe TV, Adobe Voice, Blip.tv, Dailymotion, SoundCloud, Mixcloud, Bandcamp, Scribd, Google Maps, Wufoo, SlideShare, Giphy, Prezi, Sketchfab, Issuu, Vine, Spotify").hide().stop().fadeIn(300);
                else $this.text("What can I embed?").hide().stop().fadeIn(300);
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
                objects = $(document).find(".canvas-content").size(),
                $target = $this.parents(".canvas-content"),
                $placeHolder = $(document).find(".placeHolder"),
                $ObjBts = $(document).find(".canvas-uploader-wrap");

                if($target.index() == 1) {
                	$target.next(".canvas-devider-wrap").remove();
                	$target.remove();
                }
                else {
                	$target.prev(".canvas-devider-wrap").remove();
                	$target.remove();
                }
                if(objects == 2) $placeHolder.show() && $ObjBts.remove();
                upload.setIndex();
                console.log("image was deleted");
            },
            addObjBt: function(selector){
                var $wrapper = $("<div/>",{ "class" : "canvas-uploader-wrap" }),
                $insertBt = $("<div/>",{ "class" : "canvas-uploader-bt"}).appendTo($wrapper).hide(),
                $text = $("<span/>",{ "class" : "canvas-uploader-text", "html" : "Insert Content:"}).appendTo($insertBt),
                $imgBt = $("<i/>",{ "class" : icons.upload, "data-value" : "insertImg"}).appendTo($insertBt),
                $textBt = $("<i/>",{ "class" : icons.font, "data-value" : "inserText"}).appendTo($insertBt),
                $embed = $("<i/>",{ "class" : icons.code, "data-value" : "embed-window"}).appendTo($insertBt),

                $target = $(document).find(".canvas-devider-wrap"),
                $header = $(document).find(".obj-header"),
                $footer = $(document).find(".obj-footer"),
                contents = $(document).find(".canvas-content").size();
                
                if(contents > 2) {
                    $target.children(".canvas-uploader-wrap").remove();
                    $wrapper.clone().appendTo($target);
                }
                else{
                    $header.children(".canvas-uploader-wrap").remove();
                    $footer.children(".canvas-uploader-wrap").remove();
                    $wrapper.clone().appendTo($header);
                    $wrapper.clone().appendTo($footer);
                }
                $(".canvas-uploader-wrap").hover(
                    function(){ $(this).find(".canvas-uploader-bt").stop().fadeIn(200); },
                    function(){ $(this).find(".canvas-uploader-bt").stop().fadeOut(200); }
                );
                $(".canvas-uploader-bt").find(".fa-cloud-upload").off("click").on("click",upload.imgUpTrigger);
                $(".canvas-uploader-bt").find(".fa-font").off("click").on("click",upload.textUpload);
                $(".canvas-uploader-bt").find(".fa-code").off("click").on("click",modalTool.modalShow);
                console.log("add object button is added to canvas");
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
                
                $fontSize = $("<div/>",{ ///////////////////////font size start
                    "class" : "toolbox-inner", 
                    "id" : "fontSize-tool", 
                    "data-value" : "font-size"
                }).appendTo($this),
                $fsLabel = $("<div>",{
                    "class" : "toolbox-label",
                    "html" : "Font Size"
                }).appendTo($fontSize),
                $sizeInput = $("<input/>",{ //input
                    "type" : "range",
                    "class" : "sliderKey",
                    "value" : 20,
                    "min" : 0,
                    "max" : 100
                }).appendTo($fontSize).slider({ 
                    callback: toolbar.textFn.fontSize
                }),
                
                $fontColor = $("<div/>",{ ////////////////////font color start
                    "class" : "toolbox-inner", 
                    "id" : "fontColor-tool",
                    "data-value" : "font-color"
                }).appendTo($this),
                $fcLabel = $("<div>",{
                    "class" : "toolbox-label",
                    "html" : "Font Color"
                }).appendTo($fontColor),
                $colorInput = $("<input/>",{ //input
                    "type" : "text",
                    "id" : "fontColorKey"
                }).appendTo($fontColor).spectrum({
                    color: "#ffffff",
                    showInput: true,
                    showAlpha: true,
                    showInitial: true,
                    preferredFormat: "hex3",
                    showPalette: true,
                    palette: [],
                    showSelectionPalette: true, // true by default
                    selectionPalette: [],
                    move: toolbar.textFn.fontColor,
                    change: toolbar.textFn.fontColor
                });

                $fontDeco = $("<div/>",{//////////////////// font deco
                    "class" : "toolbox-inner",
                    "id" : "fontDeco-tool",
                    "data-value" : "font-deco"
                }).appendTo($this),
                $fdLabel = $("<div/>",{
                    "class" : "toolbox-label",
                    "html" : "Font Decorations"
                }).appendTo($fontDeco),
                $btWrap = $("<ul/>",{ "class" : "toolbox-btns" }).appendTo($fontDeco),
                $boldBt = $("<div/>",{ "class" : "btn boldbt", "data-value" : "bold" }).append($("<i/>",{"class" : icons.bold}))
                .on("click",pac.dbToggle).on("click",toolbar.textFn.fontDeco).appendTo($btWrap),
                $italicBt = $("<div/>",{ "class" : "btn italbt", "data-value" : "italic" }).append($("<i/>",{"class" : icons.italic}))
                .on("click",pac.dbToggle).on("click",toolbar.textFn.fontDeco).appendTo($btWrap),
                $underBt = $("<div/>",{ "class" : "btn underbt", "data-value" : "underline" }).append($("<i/>",{"class" : icons.underline}))
                .on("click",pac.dbToggle).on("click",toolbar.textFn.fontDeco).appendTo($btWrap),
                $strikeBt = $("<div/>",{ "class" : "btn strikebt", "data-value" : "strike" }).append($("<i/>",{"class" : icons.strike}))
                .on("click",pac.dbToggle).on("click",toolbar.textFn.fontDeco).appendTo($btWrap);
            },
            textFn: {
                focusAction: function(){
                    var $this = $(this),
                    $textInput = $(this).find(".canvas-input"),
                    fontSize = parseInt($textInput.css("font-size")),
                    fontColor = $textInput.css("color"),
                    $fontSizeTool = $("#fontSize-tool"),
                    $fontColorTool = $("#fontColor-tool"),
                    $fontDecoTool = $("#fontDeco-tool");                    

                    if($(".focused").size() == 1) $(".focused").removeClass("focused");
                    $this.addClass("focused");

                    var //data reset
                    $changeSize = $fontSizeTool.find(".slider-text").val(fontSize).trigger("change"),
                    $changeColor = $("#fontColorKey").spectrum("set", fontColor);
                    $boldbt = $this.find("b").length > 0 ? 
                    	$fontDecoTool.find(".boldbt").addClass("selected") : 
                    	$fontDecoTool.find(".boldbt").removeClass("selected"),
                    $italbt = $this.find("em").length > 0 ? 
                    	$fontDecoTool.find(".italbt").addClass("selected") : 
                    	$fontDecoTool.find(".italbt").removeClass("selected"),
                    $underbt = $this.find("u").length > 0 ? 
                    	$fontDecoTool.find(".underbt").addClass("selected") : 
                    	$fontDecoTool.find(".underbt").removeClass("selected"),
                    $strikebt = $this.find("strike").length > 0 ? 
                    	$fontDecoTool.find(".strikebt").addClass("selected") : 
                    	$fontDecoTool.find(".strikebt").removeClass("selected");

                    $("html").on("click",toolbar.textFn.blurAction);
                    console.log("focusin text");
                },
                blurAction: function(event){
                    var $this = $(".focused"),
                    $target = $(event.target),
                    $fontDecoTool = $("#fontDeco-tool"),
        			inputChild = $target.is("b") || $target.is("em") || $target.is("u") || $target.is("strike"),
                    input = $target.is(".canvas-input") || inputChild,
                    aside = $target.parents().is(".lubypic-aside");
                    if(aside || input) {
                        console.log("This is aside or input");
                    }
                    else {
                        $this.removeClass("focused");
                        $fontDecoTool.find(".btn").removeClass("selected");
                        $("html").off("click");
                        console.log("This is not aside or input");
                    }
                },
                fontSize: function(val,selector){
                    var $this = selector,
                    $target = $(document).find(".focused > .canvas-input");
                    $target.css("font-size", val + "px");
                },
                fontColor: function(color){
                    var color = color.toHexString(),
                    $target = $(document).find(".focused > .canvas-input");
                    $target.css("color", color);
                },
                fontFamily: function(){

                },
                fontDeco: function(){
                    var $this = $(this),
                    $target = $(document).find(".focused > .canvas-input"),
                    bold = $("<b/>"),
                    italic = $("<em/>"),
                    underline = $("<u/>"),
                    strike = $("<strike/>"),
                    selected = $this.hasClass("selected"),
                    value = $this.data("value");
                    if(selected){
                        switch(value){
                            case "bold" : $target.wrapInner(bold); break;
                            case "italic" : $target.wrapInner(italic); break;
                            case "underline" : $target.wrapInner(underline); break;
                            case "strike" : $target.wrapInner(strike); break;
                            default : return; break;
                        }
                    }
                    else{
                    	var bold = $target.find("b"),
                    	italic = $target.find("em"),
                    	underline = $target.find("u"),
                    	strike = $target.find("strike"),
                    	boldText = $target.find("b").children()[0] || $target.find("b").text(),
                    	italText = $target.find("em").children()[0] || $target.find("em").text(),
                    	underText = $target.find("u").children()[0] || $target.find("u").text(),
                    	strikeText = $target.find("strike").children()[0] || $target.find("strike").text();
                    	console.log("bold--------------------------");
                    	console.log(boldText);
                    	console.log("ital--------------------------");
                    	console.log(italText);
                    	console.log("under--------------------------");
                    	console.log(underText);
                    	console.log("str--------------------------");
                    	console.log(strikeText);

                        switch(value){
                            case "bold" : bold.parent().html(boldText); bold.remove(); break;
                            case "italic" : italic.parent().html(italText); italic.remove(); break;
                            case "underline" : underline.parent().html(underText); underline.remove(); break;
                            case "strike" : strike.parent().html(strikeText); strike.remove(); break;
                            default : return; break;
                        }
                    }

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