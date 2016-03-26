/* ===========================================================
 *
 *  Name:          lubyPictool.min.js
 *  Updated:       2016-03-25
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
                colorTool: true,
                gridTool: true,
                selectTool: true
            }
        },
        icons = {
            basic: "fa fa-filter",

            ccIcon: "fa fa-creative-commons",
            ccImg: "img/cc_w.png",
            by: "img/by_w.png",
            nc: "img/nc_w.png",
            nd: "img/nd_w.png",
            share: "img/share_w.png",

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
            alignJustify: "fa fa-align-justify",
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
            refresh: "fa fa-refresh",
            grid: "fa fa-th-large",
            layer: "fa fa-object-ungroup",

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
            enter: 13,
            space: 32,
            delete: 8
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
                            "class" : "header-btn thumbnail prog",
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
                        .appendTo($aside).on("click",pac.toggle).on("click",toolbar.toolbarToggle) : "",
                        $colorTool = d.toolbar.colorTool ? $("<div/>",{
                            "class" : "btn",
                            "data-value" : "colorTool"
                        }).append($("<i/>",{"class":icons.paint}))
                        .appendTo($aside).on("click",pac.toggle).on("click",toolbar.toolbarToggle) : "",
                        $gridTool = d.toolbar.gridTool ? $("<div/>",{
                            "class" : "btn",
                            "data-value" : "gridTool"
                        }).append($("<i/>",{"class":icons.grid}))
                        .appendTo($aside).on("click",pac.toggle).on("click",toolbar.toolbarToggle) : "",
                        $selectTool = d.toolbar.selectTool ? $("<div/>",{
                            "class" : "btn",
                            "data-value" : "selectTool"
                        }).append($("<i/>",{"class":icons.layer}))
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
                        $modal = $("<div/>",{ "class" : "modal" }),
                        $modalClose = $("<div/>",{ "class" : "modal-closebt" }).on("click",modalTool.cancel),

                        $embedWindow = $modal.clone().addClass("embed-window").append($modalClose.clone(true)).appendTo($this).hide(), //embed window
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
                        $embedBtWrap = $("<div/>",{ "class" : "embed-bt-wrapper modal-bt-wrapper" }).appendTo($embedWrap),       
                        $embedCancel = $("<div/>",{
                            "class" : "modal-bt modal-cancelbt",
                            "html" : "Cancel"
                        }).on("click",modalTool.cancel).appendTo($embedBtWrap),
                        $embedOk = $("<div/>",{
                            "class" : "modal-bt modal-okbt",
                            "id" : "embed-okbt",
                            "html" : "Embed"
                        }).on("click",modalTool.embed).appendTo($embedBtWrap),

                        //thumbnail windows
                        $thumbWindow = $modal.clone().addClass("thumbnail-window prog").append($modalClose.clone(true)).appendTo($this).hide(),
                        $thumbWrap = $("<div/>",{ "class" : "thumb-wrapper modal-wrapper" }).appendTo($thumbWindow),
                        $thumbTitle = $("<div/>",{
                            "class" : "thumb-title modal-title",
                            "html" : "Edit Thumbnail Image"
                        }).appendTo($thumbWrap),
                        $thumbInnerWrap = $("<div/>",{ "class" : "thumb-inner-wrapper" }).appendTo($thumbWrap),
                        $thumbPreview = $("<div/>",{ "class" : "thumb-preview-wrapper" }).appendTo($thumbInnerWrap),
                        $thumbEditWrap = $("<div/>", { "class" : "thumb-editor-wrapper" }).appendTo($thumbInnerWrap),
                        $thumbPlaceHolder = $("<div/>", { 
                            "class" : "thumb-placeHolder",
                            "html" : "Click and upload your thumbnail Image",
                            "data-value" : "thumbnail"
                        }).on("click",upload.imgUpTrigger).appendTo($thumbEditWrap),
                        $thumbimg = $("<img/>", { 
                            "class" : "thumb-origin-img",
                            "src" : "#"
                        }).appendTo($thumbEditWrap).hide(),
                        $thumbBtWrap = $("<div/>",{ "class" : "thumb-bt-wrapper modal-bt-wrapper" }).appendTo($thumbWrap),
                        $thumbCancel = $("<div/>",{
                            "class" : "modal-bt modal-cancelbt",
                            "html" : "Cancel"
                        }).on("click",modalTool.cancel).appendTo($thumbBtWrap),
                        $thumbOk = $("<div/>",{
                            "class" : "modal-bt modal-okbt",
                            "id" : "Thumb-okbt",
                            "html" : "Next",
                            "data-value" : "setting"
                        }).on("click",pac.currentProg).on("click",modalTool.cropped).appendTo($thumbBtWrap),
                        $changeThumb = $("<span/>",{
                            "class" : "thumb-img-change",
                            "html" : "<i class='fa " + icons.refresh + "'></i>Change Image",
                            "data-value" : "thumb-replace"
                        }).on("click",upload.imgUpTrigger).appendTo($thumbInnerWrap).hide();

                        //setting windows
                        $settingWindow = $modal.clone().addClass("setting-window prog").append($modalClose.clone(true)).appendTo($this).hide(),
                        $settingWrap = $("<div/>",{ "class" : "setting-wrapper modal-wrapper" }).appendTo($settingWindow),
                        $settingTitle = $("<div/>",{
                            "class" : "setting-title modal-title",
                            "html" : "Content Setting"
                        }).appendTo($settingWrap),
                        $settingInnerWrap = $("<div/>",{ "class" : "setting-inner-wrapper" }).appendTo($settingWrap),
                        $settingInnerLeft= $("<div/>",{ "class" : "setting-inner-left" }).appendTo($settingInnerWrap),
                        $settingInnerRight = $("<div/>",{ "class" : "setting-inner-right" }).appendTo($settingInnerWrap),
                        
                        $settingInputWrap = $("<div/>", { "class" : "setting-input-wrapper"}),
                        $settingInputInner = $("<div/>",{ "class" : "setting-input" }),
                        $settingLabel = $("<p/>",{ "class" : "setting-input-label"}),
                        $settingInput = $("<input>", { "class" : "setting-input", "type" : "text" }),
                        $settingSelect = $("<select>", { "class" : "setting-select" }),
                        $settingOption = $("<option/>",{"class" : "select-option"})

                        $contentName = $settingInputWrap.clone()
                        .append($settingLabel.clone().html("Content Name"))
                        .append($settingInput.clone()).appendTo($settingInnerLeft),

                        $categoryName = $settingInputWrap.clone()
                        .append($settingLabel.clone().html("Categories"))
                        .append($settingSelect.clone().addClass("chosen-select category").attr({
                            "data-placeholder" : "Choose your contents categories",
                            "multiple" : "",
                            "tabindex" : "8",
                        })).appendTo($settingInnerLeft),
                        $chosenOptions = ["Apple","Banana","Caramel","Diamond","Element","Fedex","Glory","Hive","Iframe","Jelly","Key","Lion","Mom","Nurse"],
                        insertOption = function(){
                            var categoryBox = $(document).find(".chosen-select.category");
                            for(i in $chosenOptions){
                                var option = $settingOption.clone().html($chosenOptions[i]).attr("data-index",i);
                                option.appendTo(categoryBox);
                            }
                            categoryBox.chosen({ 
                                max_selected_options: 3
                            });
                        }(),

                        $hashtagName = $settingInputWrap.clone()
                        .append($settingLabel.clone().html("Hash Tag"))
                        .append($settingInputInner.clone().addClass("hashTag-input-wrap")).appendTo($settingInnerLeft),
                        $hashTagInput = $("<input/>",{ "class" : "hashTag-input" }).on("keydown",modalTool.detectTag).appendTo(".hashTag-input-wrap"),

                        $descriptName = $settingInputWrap.clone()
                        .append($settingLabel.clone().html("Description"))
                        .append($("<textarea/>",{ "class" : "descript-input" })).appendTo($settingInnerLeft),

                        $ccName = $settingInputWrap.clone()
                        .append($settingLabel.clone().html("Creative Commons"))
                        .append($settingInputInner.clone().addClass("cc-inner-wrapper"))
                        .append($("<p/>",{ 
                            "class" : "cc-setting-bt", 
                            "html" : "<i class='fa " + icons.refresh + "'></i>Change your license" 
                        }).on("click",pac.dbToggle)).on("click",modalTool.showCCsetting)
                        .appendTo($settingInnerRight),
                        $ccIconWrap = $("<ul/>",{ "class" : "cc-list-wrapper"}),
                        $getLink = $("<a/>",{ "class" : "cc-list-link", "href" : "http://creativecommons.org/licenses/by-nc-nd/4.0", "target" : "_blank" })
                        .append($ccIconWrap).appendTo(".cc-inner-wrapper"), //LINK
                        
                        ccIconDefault = function(){
                            var ccIconLi = $("<li/>",{ "class" : "cc-list"}),
                            $target = $(document).find(".cc-list-wrapper"),
                            $img = $("<img/>",{ "src" : "#" }),
                            $cc = ccIconLi.clone().attr("data-value","cc").append($img.clone().attr("src",icons.ccImg)).appendTo(".cc-list-wrapper"),
                            $by = ccIconLi.clone().attr("data-value","by").append($img.clone().attr("src",icons.by)).appendTo(".cc-list-wrapper"),
                            $nc = ccIconLi.clone().attr("data-value","nc").append($img.clone().attr("src",icons.nc)).appendTo(".cc-list-wrapper"),
                            $nd = ccIconLi.clone().attr("data-value","nd").append($img.clone().attr("src",icons.nd)).appendTo(".cc-list-wrapper"),
                            $share = ccIconLi.clone().attr("data-value","sa").append($img.clone().attr("src",icons.share)).appendTo(".cc-list-wrapper").hide();
                        }(),

                        
                        $settingBtWrap = $("<div/>",{ "class" : "setting-bt-wrapper modal-bt-wrapper" }).appendTo($settingWrap),
                        $settingCancel = $("<div/>",{
                            "class" : "modal-bt modal-cancelbt",
                            "html" : "Cancel"
                        }).on("click",modalTool.cancel).appendTo($settingBtWrap),
                        $settingOk = $("<div/>",{
                            "class" : "modal-bt modal-okbt",
                            "id" : "Thumb-okbt",
                            "html" : "Submit",
                            "data-value" : "submit",
                            "disabled" : "disabled"
                        }).on("click",pac.currentProg).on("click",modalTool.submit).appendTo($settingBtWrap);

                        // right : {project team}
                        pac.databind();//data binding    
                    }
                })
            },
            databind: function(){
                //toolbar data bind start
                toolbar.textTool();
                toolbar.colorTool();
                toolbar.gridTool();
                toolbar.selectTool();
                //toolbar data bind end
                $(".modal").each(function(){
                    pac.modalAlign($(this));
                });
            },
            toggle: function(){
                var $this = $(this),
                $btns = $this.siblings(".btn");
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
                $progress = $("." + data);
                $target = $("." + data + "-window");
                if(!$this.hasClass("selected")) {
                    $btns.removeClass("current-prog");
                    $progress.addClass("current-prog");
                }
                if(data == "edit") $modals.fadeOut(200);
                else {
                    $modals.hide();
                    pac.modalAlign($target);
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
                $toolboxWrap = $("<div/>",{
                    "class" : "toolbox-wrap",
                    "data-value" : value,
                    "id" : value + "-toolbox"
                }).appendTo($aside).hide();
                if(value == "gridTool") $toolboxWrap.addClass("modal");
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
                    "html" : "Select",
                    "data-value": "select"
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
                width = $this.width(),
                height = $this.height(),
                windowWidth = $(window).width(),
                windowHeight = $(window).height(),
                hrAlign = (width/2)*-1,
                vtAlign = (windowHeight/2 - height/2) - 30;
                $this.css({ "top" : vtAlign+"px", "margin-left" : hrAlign+"px", "left" : "50%"});
                //console.log("modalAlign : "); console.log($this[0]); 
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
                $document = $("body"),
                $inputFile = $(document).find(".imgUploader"),
                dataValue = $this.data("value"),
                $uploading = $(document).find(".uploading");
                
                if(dataValue == "replace"){
                    $inputFile.off("change").on("change",upload.imgReplace);
                    if($uploading.length!=0) $uploading.removeClass(".uploading");
                    $this.addClass("uploading");
                }
                else if(dataValue == "thumbnail"){
                    $inputFile.off("change").on("change",upload.thumbUpload);
                }
                else if(dataValue == "thumb-replace"){
                    $inputFile.off("change").on("change",upload.thumbReplace);
                }
                else{
                    $inputFile.off("change").on("change",upload.imgUpload);
                    if($uploading.length!=0) $uploading.removeClass(".uploading");
                    $this.addClass("uploading");
                };
                $inputFile.trigger("click")
                console.log("Trigger On");
            },
            thumbUpload: function(event){
                var $this = $(".thumb-editor-wrapper"),
                $inputFile = $(this),
                $placeHolder = $this.find(".thumb-placeHolder"),
                $target = $this.find(".thumb-origin-img"),
                $previewer = $this.siblings(".thumb-preview-wrapper"),
                $object = event.target.files,
                $changeThumb = $(document).find(".thumb-img-change");

                $placeHolder.hide();
                $.each($object, function(i,file){
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function(event){
                        var img = $(".thumb-origin-img").attr("src", event.target.result)
                        .cropper({
                            minContainerWidth: 420,
                            minContainerHeight: 300,
                            aspectRatio: 250/215,
                            autoCropArea: 0.6,
                            viewMode: 3,
                            responsive: true,
                            zoomable: false,
                            preview: ".thumb-preview-wrapper",
                            dragMode: "crop"
                        }).show();
                        $inputFile.val(null);
                        $changeThumb.show();
                    }
                });
                setTimeout(function(){
                    pac.modalAlign($(".thumbnail-window"));
                },200);
            },
            thumbReplace: function(event){
                var $this = $(this);
                $inputFile = $(document).find(".imgUploader"),
                $object = event.target.files,
                $cropper = $(document).find(".thumb-origin-img");

                $.each($object, function(i,file){
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function(event){
                        console.log(event.target.result);
                        $cropper.cropper("replace",event.target.result),false;
                        $inputFile.val(null);

                    }
                });
                setTimeout(function(){
                    pac.modalAlign($(".thumbnail-window"));
                },200);
                console.log("thumbnail is replaced");
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
                console.log($target);
                $target.fadeIn(200);
                $input.focus().on("keydown",pac.keyEvent);
                if($uploading.length!=0) $uploading.removeClass(".uploading");

                $this.addClass("uploading");
                pac.modalAlign($target);
            },
            embed: function(){
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
            cropped: function(event){
                var $originImg = $(".thumb-origin-img");
                if($originImg.attr("src") != "#") {
                    var $this = $(this),
                    $object = $originImg.cropper("getCroppedCanvas",{width:250,height:215}),
                    dataURL = $object.toDataURL("image/jpeg"); //export to jpeg
                    console.log($object);
                    console.log(dataURL); // for ajax

                    $.ajax({
                        type: "POST",
                        url: "ajax_upload.php", //ÀÌÆäÀÌÁö¿¡¼­ Áßº¹Ã¼Å©¸¦ ÇÑ´Ù
                        data: 'data=' + dataURL,//test.asp¿¡ id °ªÀ» º¸³½´Ù
                        cache: false,
                        success: function (data) {
                            //console.log(data);
                        }
                    })
                }
                else $.error("There is no Image");                
            },
            detectTag: function(event){
                var $this = $(this),
                $wrapper = $this.parent(".hashTag-input-wrap"),
                $tagWrap = $("<ul/>",{ "class" : "hashtag-wrapper"}),
                $tag = $("<li/>",{ "class" : "hashtag-list" }),
                inKeyCode= event.which,
                value = $this.val(),
                endCommand = inKeyCode == keyCode.enter || inKeyCode == keyCode.space,
                deleteCommand = inKeyCode == keyCode.delete,
                wrapperExist = $this.prev("ul").length == 0;
                if(endCommand){
                    if(value.indexOf("#") >= 0){
                        if(wrapperExist) $tagWrap.prependTo($wrapper);
                        $tag.html(value + "<i class='" + icons.times + "'></i>").on("click",modalTool.deleteTag).appendTo(".hashtag-wrapper");
                        $this.val(null);
                    }
                }
                else if(deleteCommand){
                    $(".hashtag-list:last-child").remove();
                }
            },
            deleteTag: function(event){
                $this = $(this);
                $this.remove();
                console.log("tag is deleted");
            },
            showCCsetting: function(event){
                var $this = $(this).find(".cc-setting-bt"),
                $ccSettingWrap = $("<div/>",{ "class" : "modal cc-setting-wrapper" }),
                $ccSettingInner = $("<div/>",{ "class" : "modal-wrapper cc-setting-inner-wrapper"}),
                $ccSection = $("<div/>",{ "class" : "cc-section" }),
                $ccTitleWrap = $("<div/>",{ "class" : "cc-title-wrapper" }),
                $ccRadio = $("<input/>",{"type" : "radio", "class" : "license-selector", "name" : "cc-info", "data-value": "" }),
                $ccTitle = $("<span/>",{ "class" : "cc-title"}),

                $cclistWrap = $("<ul/>",{ "class" : "cc-checklist-wrapper" }),
                $cclist = $("<li>",{ "class" : "cc-checklist"}),
                $ccCheckBox = $("<input/>",{ "type" : "checkbox", "class" : "cc-checkbox", "data-value" : ""}),
                $ccCheckDesc = $("<span/>",{ "class" : "cc-desc" }),
                $learnMore = $("<a/>",{ "class" : "goto-cc", "href" : "#", "target" : "_blank"});

                selected = $this.hasClass("selected"), //bool
                notExist = $(document).find(".cc-setting-wrapper").length == 0; //bool

                if(selected){
                    if(notExist) {
                        var makeCC = $ccSettingWrap.append($ccSettingInner).append($modalClose.clone(true)).appendTo($(".lubyPictoolKey")),
                        useCC = $ccSection.clone().addClass("useCC").append($ccTitleWrap.clone()
                        .append($ccRadio.clone().prop("checked",true).attr("data-value","useCC"))
                        .append($ccTitle.clone().html("Creative Commons License"))).appendTo($(".cc-setting-inner-wrapper")).hide().stop().fadeIn(400),
                        listWrap = $cclistWrap.appendTo($(".useCC")),
                        addlist = function(){
                            $ccBY = $cclist.clone()
                            .append($ccCheckBox.clone().attr({"data-value":"by","name":"cc-check"}).prop({"disabled" : true,"checked" : true}))
                            .append($ccCheckDesc.clone().html("Free to share and adapt with appropriate credit"))
                            .appendTo($(".cc-checklist-wrapper")),
                            $ccNC = $cclist.clone()
                            .append($ccCheckBox.clone().attr({"data-value":"nc","name":"cc-check"}).prop({"disabled" : false,"checked" : true}))
                            .append($ccCheckDesc.clone().html("Not allowed for commercial purpose"))
                            .appendTo($(".cc-checklist-wrapper")),
                            $ccND = $cclist.clone()
                            .append($ccCheckBox.clone().attr({"data-value":"nd","name":"cc-check"}).prop({"disabled" : false,"checked" : true}))
                            .append($ccCheckDesc.clone().html("You may not distribute the modified material"))
                            .appendTo($(".cc-checklist-wrapper")),
                            $ccShare = $cclist.clone()
                            .append($ccCheckBox.clone().attr({"data-value":"sa","name":"cc-check"}).prop({"disabled" : true,"checked" : false}))
                            .append($ccCheckDesc.clone().html("Free to share including the modified material under the same license as original"))
                            .appendTo($(".cc-checklist-wrapper"));
                        }(),
                        withoutCC = $ccSection.clone().addClass("withoutCC").append($ccTitleWrap.clone()
                        .append($ccRadio.clone().prop("checked",false).attr("data-value","withoutCC"))
                        .append($ccTitle.clone().html("NO USAGE WITHOUT OWNER’S PERMISSION"))).appendTo($(".cc-setting-inner-wrapper"));

                        $(".license-selector").on("change",modalTool.useCC);
                        $(".cc-checkbox").on("change",modalTool.displayCC).on("change",modalTool.makelinkCC);
                        pac.modalAlign($(".cc-setting-wrapper"));
                    }//create cc
                    else $(".cc-setting-wrapper").fadeIn(400);
                }
                else{
                    $(".cc-setting-wrapper").fadeOut(400);
                }
            },
            useCC: function(){
                $this = $(this),
                data = $this.data("value"),
                $target = $(document).find(".cc-checklist-wrapper");
                if(data == "useCC") {
                    $target.slideDown(400);
                    $(".cc-list-link").show();
                }
                else if(data == "withoutCC"){
                    $target.slideUp(400);
                    $(".cc-list-link").hide();
                } 
                console.log("useCC");
            },
            displayCC: function(){
                $this = $(this),
                selected = $this.prop("checked"),
                data = $this.data("value"),
                $target = $(".cc-list[data-value='" + data + "']");
                if(data == "nd" || data == "sa") modalTool.ccNDSA();
                if(!selected) $target.stop().fadeOut(400);
                else $target.stop().fadeIn(400);
            },
            ccNDSA: function(){
                $nd = $(".cc-checkbox[data-value='nd']"),
                $sa = $(".cc-checkbox[data-value='sa']");

                if($nd.prop("checked")) $sa.prop("disabled",true);
                else if($nd.prop("checked") == false) $sa.prop("disabled", false);

                if($sa.prop("checked")) $nd.prop("disabled",true);
                else if($sa.prop("checked") == false) $nd.prop("disabled", false);
            },
            makelinkCC: function(){
                var link = [],
                checked = $(".cc-checkbox[name='cc-check']:checked");
                checked.each(function(){
                    var data = $(this).data("value"),
                    addData = link.push(data),
                    checkedData = link.join("-"),
                    ccUrl = "http://creativecommons.org/licenses/" + checkedData + "/4.0";//send to DB
                    $(".cc-list-link").attr("href", ccUrl);
                });   
            },
            submit: function(event){
                var $this = $(this);
                alert("submit!");
            },
            cancel: function(){
                var $this = $(this),
                $window = $this.parents(".modal"),
                $input = $this.parent().siblings("textarea"),
                $btns = ".header-btn",
                $currentProg = $(document).find(".current-prog"),
                data = $currentProg.data("value");

                $input.val(null);
                $window.stop().fadeOut(200);
                if($window.hasClass("prog")){
                    $currentProg.prev($btns).trigger("click");
                }
                console.log("cancel");
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
                var $this = $(this), //download button
                $canvas = $(document).find(".editing-canvas");
                $("*").removeClass("focused");
                html2canvas($canvas, {
                    onrendered: function(canvas) {
                        var dataURL = canvas.toDataURL("image/jpeg"), //export to jpeg
                        $anchor = $("<a/>",{
                            "href" : dataURL,
                            "download" : "img-lubycon.jpg"
                        }).appendTo("body");
                        $anchor[0].click();
                        $anchor.remove();
                    }
                });
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
                    toolBoxes.fadeOut(200);
                    toolBox.fadeIn(200);
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
                }),

                $btWrap = $("<ul/>",{ "class" : "toolbox-btns" }),
                $btn = $("<div/>",{ "class" : "btn" }),

                $fontDeco = $("<div/>",{//////////////////// font deco
                    "class" : "toolbox-inner",
                    "id" : "fontDeco-tool",
                    "data-value" : "font-deco"
                }).appendTo($this),
                $fdLabel = $("<div/>",{
                    "class" : "toolbox-label",
                    "html" : "Font Decorations"
                }).appendTo($fontDeco),
                $decobtns = $btWrap.clone().appendTo($fontDeco),
                $boldBt = $btn.clone().addClass("boldbt").attr("data-value","bold").append($("<i/>",{"class" : icons.bold}))
                .on("click",pac.dbToggle).on("click",toolbar.textFn.fontDeco).appendTo($decobtns),
                $italicBt = $btn.clone().addClass("italicbt").attr("data-value","italic").append($("<i/>",{"class" : icons.italic}))
                .on("click",pac.dbToggle).on("click",toolbar.textFn.fontDeco).appendTo($decobtns),
                $underBt = $btn.clone().addClass("underbt").attr("data-value","underline").append($("<i/>",{"class" : icons.underline}))
                .on("click",pac.dbToggle).on("click",toolbar.textFn.fontDeco).appendTo($decobtns),
                $strikeBt = $btn.clone().addClass("strikebt").attr("data-value","strike").append($("<i/>",{"class" : icons.strike}))
                .on("click",pac.dbToggle).on("click",toolbar.textFn.fontDeco).appendTo($decobtns),

                $fontAlign = $("<div/>",{
                    "class" : "toolbox-inner",
                    "id" : "fontAlign-tool",
                    "data-value" : "font-align"
                }).appendTo($this),
                $faLabel = $("<div/>",{
                    "class" : "toolbox-label",
                    "html" : "Align"
                }).appendTo($fontAlign),
                $alignbtns = $btWrap.clone().appendTo($fontAlign),
                $alignLeft = $btn.clone().addClass("align-left-bt").attr("data-value","left").append($("<i/>",{"class" : icons.alignLeft}))
                .on("click",pac.toggle).on("click",toolbar.textFn.fontAlign).appendTo($alignbtns),
                $alignCenter = $btn.clone().addClass("align-center-bt").attr("data-value","center").append($("<i/>",{"class" : icons.alignCenter}))
                .on("click",pac.toggle).on("click",toolbar.textFn.fontAlign).appendTo($alignbtns),
                $alignRight = $btn.clone().addClass("align-right-bt").attr("data-value","right").append($("<i/>",{"class" : icons.alignRight}))
                .on("click",pac.toggle).on("click",toolbar.textFn.fontAlign).appendTo($alignbtns),
                $alignRight = $btn.clone().addClass("align-justify-bt").attr("data-value","justify").append($("<i/>",{"class" : icons.alignJustify}))
                .on("click",pac.toggle).on("click",toolbar.textFn.fontAlign).appendTo($alignbtns);
            },
            textFn: {
                focusAction: function(){
                    var $this = $(this),
                    $textInput = $(this).find(".canvas-input"),
                    fontSize = parseInt($textInput.css("font-size")),
                    fontColor = $textInput.css("color"),
                    $fontSizeTool = $("#fontSize-tool"),
                    $fontColorTool = $("#fontColor-tool"),
                    $fontDecoTool = $("#fontDeco-tool"),
                    $fontAlignTool = $("#fontAlign-tool");                    

                    if($(".focused").size() == 1) $(".focused").removeClass("focused");
                    $this.addClass("focused");

                    var //data reset
                    $changeSize = $fontSizeTool.find(".slider-text").val(fontSize).trigger("change"),
                    $changeColor = $("#fontColorKey").spectrum("set", fontColor),
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
                    	$fontDecoTool.find(".strikebt").removeClass("selected"),
                    $alignInit = $fontAlignTool.find(".btn").removeClass("selected"),
                    $fontAlign = $fontAlignTool.find(".btn[data-value='" + $textInput.css("text-align") + "']").addClass("selected");

                    $("html").on("click",toolbar.textFn.blurAction);
                    console.log("focusin text");
                },
                blurAction: function(event){
                    var $this = $(".focused"),
                    $target = $(event.target),
                    $fontDecoTool = $("#fontDeco-tool"),
                    $fontAlignTool = $("#fontAlign-tool"),
        			inputChild = $target.is("b") || $target.is("em") || $target.is("u") || $target.is("strike"),
                    input = $target.is(".canvas-input") || inputChild,
                    aside = $target.parents().is(".lubypic-aside");
                    if(aside || input) {
                        console.log("This is aside or input");
                    }
                    else {
                        $this.removeClass("focused");
                        $fontDecoTool.find(".btn").removeClass("selected");
                        $fontAlignTool.find(".btn").removeClass("selected");
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
                        switch(value){
                            case "bold" : bold.parent().html(boldText); bold.remove(); break;
                            case "italic" : italic.parent().html(italText); italic.remove(); break;
                            case "underline" : underline.parent().html(underText); underline.remove(); break;
                            case "strike" : strike.parent().html(strikeText); strike.remove(); break;
                            default : return; break;
                        }
                    }
                },
                fontAlign: function(){
                    var $this = $(this),
                    $target = $(document).find(".focused > .canvas-input"),
                    selected = $this.hasClass("selected"),
                    value = $this.data("value");
                    $target.css("text-align",value);
                }
            },
            colorTool: function(){
                var $this = $(document).find("#colorTool-toolbox"),

                $bgColor = $("<div/>",{
                    "class" : "toolbox-inner", 
                    "id" : "bgColor-tool",
                    "data-value" : "bg-color"
                }).appendTo($this),
                $colorLabel = $("<div>",{
                    "class" : "toolbox-label",
                    "html" : "Background Color"
                }).appendTo($bgColor),
                $colorInput = $("<input/>",{ //input
                    "type" : "text",
                    "id" : "bgColorKey"
                }).appendTo($bgColor).spectrum({
                    color: "#ffffff",
                    showInput: true,
                    showAlpha: true,
                    showInitial: true,
                    preferredFormat: "hex3",
                    showPalette: true,
                    palette: [],
                    showSelectionPalette: true, // true by default
                    selectionPalette: [],
                    move: toolbar.colorFn.bgColor,
                    change: toolbar.colorFn.bgColor
                });
            },
            colorFn: {
                bgColor: function(color){
                    var color = color.toHexString(),
                    $target = $(document).find(".editing-canvas");
                    $target.css("background", color);
                }
            },
            gridTool: function(){
                var $this = $(document).find("#gridTool-toolbox"),
                $gridWrap = $("<div/>",{ "class" : "grid-wrapper modal-wrapper" }).appendTo($this),
                $gridTitle = $("<div/>",{
                    "class" : "grid-title modal-title",
                    "html" : "Making a Frame"
                }).appendTo($gridWrap),
                $gridInnerWrap = $("<div/>",{ "class" : "toolbox-inner" }).appendTo($gridWrap),
                $editWindow = $("<div/>",{ "class" : "grid-edit-window"}).appendTo($gridInnerWrap),
                $btnWrap = $("<ul/>",{ "class" : "grid-btns toolbox-btns" }).appendTo($gridInnerWrap),
                $btn = $("<li/>",{ "class" : "grid-btn btn" }).on("click",pac.toggle).on("click",toolbar.gridFn.makeGrid),
                
                $btn1 = $btn.clone(true).addClass("selected").attr("data-value","n-1-1").appendTo($btnWrap),
                $btn2 = $btn.clone(true).attr("data-value","v-1-2").appendTo($btnWrap),
                $btn3 = $btn.clone(true).attr("data-value","v-2-1").appendTo($btnWrap),
                $btn4 = $btn.clone(true).attr("data-value","h-1-2").appendTo($btnWrap),
                $btn5 = $btn.clone(true).attr("data-value","h-2-1").appendTo($btnWrap),
                $btn6 = $btn.clone(true).attr("data-value","n-2-2").appendTo($btnWrap);

            },
            gridFn: {
                makeGrid: function(){
                    var $this = $(this),
                    $editWindow = $(".grid-edit-window"),
                    selected = $this.hasClass("selected"),
                    value = $this.data("value"),
                    valueArray = value.split("-"),
                    direction = valueArray[0],
                    firstArea = valueArray[1],
                    secondArea = valueArray[2],
                    $gridWrapper = $("<div/>",{ "class" : "grid-inner-wrapper" }),
                    $devider = $("<div/>",{ "class" : "grid-devider" }),
                    $imgWrapper = $("<div/>",{ "class" : "grid-img-wrapper"}),
                    $placeHolder = $("<div/>",{ "class" : "placeHolder"}),

                    n11 = $gridWrapper.clone()
                    .append($devider.clone().addClass("vertical"))
                    .append($devider.clone().addClass("vertical")),

                    v = $gridWrapper.clone()
                    .append($devider.clone().addClass("vertical"))
                    .append($devider.clone().addClass("vertical")),

                    h = $gridWrapper.clone()
                    .append($devider.clone().addClass("horizental"))
                    .append($devider.clone().addClass("horizental")),

                    n22 = $gridWrapper.clone();

                    if(selected) {
                        h.appendTo($editWindow);
                        console.log("direction : " + direction);
                        console.log("firstArea : " + firstArea);
                        console.log("secondArea : " + secondArea);
                    }  
                }
            },
            selectTool: function(){
                console.log("select tool");
            },
            selectFn: {

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