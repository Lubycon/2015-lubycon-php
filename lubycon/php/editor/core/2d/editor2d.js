/* ===========================================================
 *
 *  Name:          editor2d.js
 *  Updated:       2016-06-06
 *  Version:       0.1.0
 *  Created by:    DART, Lubycon.co
 *
 *  Copyright (c) 2016 Lubycon.co
 *
 * =========================================================== */

(function($){
    $.fn.initEditor = function(option){
        var defaults = { 
            height: $(window).height(),
            minHeight: null,
            fileUpload: true,
            imageUpload: true,
            toolbar: {
                textTool: true,
                colorTool: true,
                gridTool: true,
                marginTool : true,
                sortTool: true
            }
        },
        icons = iconPack, //icons.json
        keyCode = keycodePac, //keycode.json
        categoryData = categoryPac, //categories.json
        ccData = ccPac, //creative_commons.json
        formData = new FormData(),
        d = {},
        attachedFiles = [], attachedImage = [], finalThumbnail,
        pac = {
            init: function (option) {
                return d = $.extend({}, defaults, option), this.each(function () {
                    if (!$(this).hasClass("initEditor")) $.error("Loading failed");
                    else {
                        console.log("editor is loaded");//function start
                        var $this = $(this);
                        var $darkOverlay = $(document).find(".dark_overlay").show();
                        //init object
                        var $wrapper = $("<div/>",{"class" : "editor-wrapper"}).appendTo($this),
                        $header = $("<div/>",{"class" : "editor-header"}).appendTo($wrapper),
                        $body = $("<div/>",{"class" : "editor-body"}).appendTo($wrapper),
                        $aside = $("<div/>",{"class" : "editor-aside"}).appendTo($body),
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
                        .append($("<p/>",{"html" : "Click here and upload your files for Preview"}))
                        .appendTo($objBody)
                        .on("click",upload.imgUpTrigger);

                        //in header bt
                        var $headerBtWrap = $("<div/>",{"class" : "header-btn-wrapper"}).appendTo($header),
                        $fileUpbtn = $("<div/>",{
                            "class" : "header-btn fileUpload",
                            "html" : "File manager",
                            "data-tip" : "Attach your files"
                        }).prepend($("<i/>",{"class":icons.upload}))
                        .appendTo($headerBtWrap).on("click",modalFunc.showFileSelector).tooltip({"top" : 55, "left" : 0}),
                        $savebtn = $("<div/>",{
                            "class" : "header-btn savepc",
                            "html" : "Save to PC",
                            "data-tip" : "Your canvas will be saved to your PC"
                        }).prepend($("<i/>",{"class":icons.download}))
                        .appendTo($headerBtWrap).on("click",headerTool.downToPc).tooltip({"top" : 55, "left" : 0}),
                        $previewbtn = $("<div/>",{
                            "class" : "header-btn preview",
                            "html" : "Preview",
                            "data-tip" : "Preview"
                        }).prepend($("<i/>",{"class":icons.grid}))
                        .appendTo($headerBtWrap).on("click",pac.showPreview).tooltip({"top" : 55, "left" : 0});

                        //in header progress
                        var $progressWrap = $("<div/>",{"class" : "header-prog-wrapper"}).appendTo($header),
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
                        .appendTo($progressWrap).on("click",pac.currentProg);

                        //in toolbar
                        var $textTool = d.toolbar.textTool ? new UImodule.createButton("textTool","icon",icons.font,true,true).appendTo($aside) : "",
                        $colorTool = d.toolbar.colorTool ? new UImodule.createButton("colorTool","icon",icons.paint,true,true).appendTo($aside) : "",
                        $gridTool = d.toolbar.gridTool ? new UImodule.createButton("gridTool","icon",icons.grid,true,true).appendTo($aside) : "",
                        $marginTool = d.toolbar.marginTool ? new UImodule.createButton("marginTool","icon",icons.margin,true,true).appendTo($aside) : "",
                        $sortTool = d.toolbar.sortTool ? new UImodule.createButton("sortTool","icon",icons.sorts,true,true).appendTo($aside) : "";

                        //input files
                        var $inputFile = $("<input/>",{
                            "class":"fileUploader editor-hidden",
                            "name":"fileUploader",
                            "type":"file",
                            "multiple" : "multiple"
                        }).insertAfter($header),
                        $inputImage = $("<input/>",{
                            "class":"imgUploader editor-hidden",
                            "name":"imgUploader",
                            "type":"file",
                        }).insertAfter($header);
                        $inputContentImage = $("<input/>",{
                            "class":"content-imgUploader editor-hidden",
                            "name":"contentImgUploader",
                            "type":"file",
                            "multiple" : "multiple"
                        }).insertAfter($header);
                        $(".btn").each(pac.toolbox);
                        
                        //initModals
                        pac.initModal.file().appendTo($this).hide();
                        pac.initModal.fileSelector().appendTo($this).hide();
                        pac.initModal.embed().appendTo($this).hide();
                        pac.initModal.thumbnail().appendTo($this).hide();
                        pac.initModal.setting().appendTo($this).hide();
                        // right : {project team}

                        pac.initTools();//data binding

                        $(window).on("load",function(){ $(".modal.file-modal").fadeIn(400); });
                    }
                })
            },
            showPreview: function(){
                var $this = $(this),
                $canvas = $(document).find(".editing-canvas");
                $previewWrap = $("#previewer"),
                $previewMain = $previewWrap.find(".con_main"),
                $previewAside = $previewWrap.find(".con_aside"),
                $loading_icon = $(document).find("#loading_icon")
                closebt = $previewWrap.find("#preview-close");

                var result = $canvas.clone();

                if($(result).find(".placeHolder").css("display") !== "none") return false;
                $previewMain.prepend(pac.clearContent(result,false));

                $previewWrap.fadeIn(200);
                closebt.off("click").on("click",pac.hidePreview);
                initPreview();

                function initPreview(){
                    var name = "Content Name",
                    job = "Student",
                    descript = "This is preview page.",
                    category1 = "Category1",
                    category2 = "Category2",
                    view = 0, download = 0, like = 0;

                    console.log($previewMain.find("#contents_title"));
                    $("#contents_title").text(name);
                    $("#contents_category").text(CATE_PARAM + ">" + category1 + "," + category2);
                    $("#viewCount").text(view);
                    $("#downloadCount").text(download);
                    $("#likeCount").text(like);

                    $("#user_info_wrap h4 a").attr("src","#");
                    $("#descript_content").html("<p>" + descript + "</p>");
                }
            },
            hidePreview: function(){
                var $previewWrap = $("#previewer");
                $previewWrap.fadeOut(200);
            },
            submit: function(){
                var formData = new FormData();
                var rootElement = $(".initEditor");

                var content = pac.clearContent(rootElement.find(".editing-canvas"),true); //data

                var contentName = rootElement.find("input[name='content-name']").val(), //data
                categories = [], //data
                tags = [], //data
                cc = { "by": true, "nc": true, "nd": true, "sa": false, "link": $(".cc-list-link").attr("href")}, //data
                category = rootElement.find(".search-choice").each(function () { 
                    var index = parseInt($(this).find(".search-choice-close").attr("data-option-array-index"));
                    categories.push(index);
                }),
                tag = rootElement.find(".hashtag-list").each(function () { tags.push($(this).text()) }),
                descript = rootElement.find(".descript-input").val(),
                ccbox = rootElement.find(".cc-checkbox").each(function () {
                    var data = $(this).data("value");
                    cc[data] = $(this).prop("checked");
                }),
                download = attachedFiles.length !== 0;

                var checkList = {
                    name : !contentName.isNullString() && !rootElement.find("input[name='content-name']").hasClass(".error"),
                    categories : categories.length !== 0
                }
                console.log(checkList);

                var settingObject = {
                    name : contentName,
                    topCategory : CATE_PARAM,
                    category : categories, // int
                    tag : tags,
                    cc : cc,
                    descript : descript,
                    download : download
                };

                submitFinal();

                function submitFinal(){
                    console.log(checkList.name,checkList.categories);
                    if(checkList.name && checkList.categories){
                        /*1*/$.each(attachedFiles,function(i,file){ formData.append("file_"+i,file); }); //attached files append to form data object.
                        /*2*/$.each(attachedImage,function(i,file){ formData.append("image_"+i,file); }); //used images append to formdata
                        /*3*/formData.append("contentHTML",content);
                        /*4*/formData.append("thumbnail",finalThumbnail); //add thumbnail
                        /*5*/formData.append("setting",objectToJSON(settingObject)); //add setting value
                        //console.log(attachedFiles,attachedImage,finalThumbnail,settingObject);

                        $.ajax({
                            url: '../../../ajax/upload_ajax.php',
                            processData: false,
                            contentType: false,
                            data: formData,
                            type: 'POST',
                            success: function (result) {
                                console.log(result);
                                alert("SUBMIT SUCCESS");
                                //location.href = "../../../../index.php";
                            }
                        });
                    }
                }

                function objectToJSON(object){
                    return JSON.stringify(object);
                }
            },
            initTools: function(){
                //toolbar data bind start
                toolbar.textTool();
                toolbar.colorTool();
                toolbar.gridTool();
                toolbar.marginTool();
                toolbar.sortTool();
                //toolbar data bind end
                $(window).on("load resize",function(){
                    $(".modal").each(function(){ ModalKit.align($(this)); });
                })
            },
            clearContent: function(object,submit){
                var result = object.clone();
                result.find(".canvas-uploader-bt").remove();
                result.find(".canvas-devider-wrap > .canvas-uploader-bt").remove();
                result.find(".canvas-input").attr("contenteditable",false);
                result.find(".placeHolder").remove();
                result.find(".obj-menu-btn").remove();
                if(submit) result.find("img").attr("src","lubycon_path");

                return result[0].outerHTML;
            },
            initModal: {
                file: function(){
                    var modal = new ModalKit.create(modalFunc.showFileSelector,"file-modal"),
                    wrapper = modal.find(".modal-wrapper"),
                    title = modal.find(".modal-title").text(" "),
                    content = modal.find(".modal-content").text("Do you want to upload attachment file?"),
                    okbt = modal.find(".modal-okbt").text("Yes"),
                    cancelbt = modal.find(".modal-cancelbt").text("No");

                    return modal;
                },
                fileSelector: function(){
                    var modal = new ModalKit.create(null,"file-selector-modal"),
                    wrapper = modal.find(".modal-wrapper"),
                    title = modal.find(".modal-title").text("File Manager"),
                    content = modal.find(".modal-content");

                    var fileInputWrap = $("<div/>",{ "class" : "modal-input-wrapper" }).appendTo(content),
                    fileViewer = $("<ul/>",{ "class" : "modal-fileViewer" }).appendTo(fileInputWrap),
                    fileViewerTotal = $("<div/>",{ "class" : "modal-fileViewer-total" }).appendTo(fileInputWrap),
                    totalFileCount = $("<span/>",{ "class" : "file-count-total", "html" : "0 Files"}).appendTo(fileViewerTotal),
                    totalFileSize = $("<span/>",{ "class" : "file-size-total", "html" : "0MB"}).appendTo(fileViewerTotal);

                    var uploadBt = $("<div/>",{ "class" : "modal-bt modal-filebt", "html" : "Find" }).on("click",upload.fileUpTrigger).appendTo(fileInputWrap),
                    fileSelectHelp = $("<i/>",{ 
                        "class" : icons.help + " file-selector-help",
                        "data-tip" : "Your file size must be 30MB. The file extension must be ZIP,JPEG,PNG, or BMP"
                    }).tooltip({"top" : 30, "left" : -200}).appendTo(fileInputWrap);

                    return modal;
                },
                embed: function(){
                    var modal = new ModalKit.create(modalFunc.embed,"embed-modal").addClass("embed-window"),
                    wrapper = modal.find(".modal-wrapper"),
                    title = modal.find(".modal-title").text("Embed Media"),
                    content = modal.find(".modal-content"),
                    okbt = modal.find(".modal-okbt").text("Embed"),
                    input = $("<textarea/>",{ "class" : "embed-input" }).appendTo(content),
                    helpText = $("<p/>",{ 
                        "class" : "embed-help",
                        "html" : "What can I embed?"
                    }).on("click",toggle.single).on("click",modalFunc.embedHelp).appendTo(content),
                    errorText = $("<p/>",{ 
                        "class" : "embed-error",
                        "html" : "Please insert iframe tag only."
                    }).appendTo(content).hide();

                    return modal;
                },
                thumbnail: function(){
                    var modal = new ModalKit.create([pac.currentProg,modalFunc.cropped],"thumbnail-modal prog").addClass("thumbnail-window"),
                    wrapper = modal.find(".modal-wrapper"),
                    title = modal.find(".modal-title").text("Edit Thumbnail Image"),
                    content = modal.find(".modal-content"),
                    okbt = modal.find(".modal-okbt").attr("data-value","setting").text("Next"),
                    cancelbt = modal.find(".modal-cancelbt").text("Prev"),
                    $innerWrap = $("<div/>",{ "class" : "thumb-inner-wrapper" }).appendTo(content),
                    $preview = $("<div/>",{ "class" : "thumb-preview-wrapper" }).appendTo($innerWrap),
                    $editWrap = $("<div/>", { "class" : "thumb-editor-wrapper" }).appendTo($innerWrap),
                    $placeholder = $("<div/>", { 
                        "class" : "thumb-placeHolder",
                        "html" : "Click and upload your thumbnail Image",
                        "data-value" : "thumbnail"
                    }).on("click",upload.imgUpTrigger).appendTo($editWrap),
                    $img = $("<img/>", { 
                        "class" : "thumb-origin-img",
                        "src" : "#"
                    }).appendTo($editWrap).hide(),
                    $changeThumb = $("<span/>",{
                        "class" : "thumb-img-change",
                        "html" : "<i class='fa " + icons.refresh + "'></i>Change Image",
                        "data-value" : "thumb-replace"
                    }).on("click",upload.imgUpTrigger).appendTo($innerWrap).hide();

                    return modal;
                },
                setting: function(){
                    var modal = new ModalKit.create([pac.currentProg,pac.submit],"setting-modal prog").addClass("setting-window"),
                    wrapper = modal.find(".modal-wrapper"),
                    closebt = modal.find(".modal-closebt").attr("data-value","modal-cancelbt"),
                    title = modal.find(".modal-title").text("Content Setting"),
                    content = modal.find(".modal-content"),
                    cancelbt = modal.find(".modal-cancelbt").attr("data-value","modal-cancelbt").text("Prev"),
                    okbt = modal.find(".modal-okbt").attr({
                        "data-value" : "submit",
                        "disabled" : "disabled"
                    }).text("Submit"),

                    $innerWrap = $("<div/>",{ "class" : "setting-inner-wrapper" }).appendTo(content),
                    $innerLeft = $("<div/>",{ "class" : "setting-inner-left" }).appendTo($innerWrap),
                    $innerRight = $("<div/>",{ "class" : "setting-inner-right" }).appendTo($innerWrap),

                    //make content
                    $inputWrap = $("<div/>", { "class" : "setting-input-wrapper"}),
                    $inputInner = $("<div/>",{ "class" : "setting-input" }),
                    $label = $("<p/>",{ "class" : "setting-input-label"}),
                    $input = $("<input>", { "class" : "setting-input", "type" : "text" }).on("keyup",errorCheck),
                    $select = $("<select>", { "class" : "setting-select" }),
                    $option = $("<option/>",{"class" : "select-option"});

                    initContentName();
                    initCategory();
                    initTag();
                    initDescript();
                    initCC();

                    function initContentName(){
                        var $contentName = $inputWrap.clone()
                        .append($label.clone().html("Content Name"))
                        .append($input.clone(true).attr("name","content-name")).appendTo($innerLeft);
                    }
                    function initCategory(){
                        var $categoryName = $inputWrap.clone()
                        .append($label.clone().html("Categories")).appendTo($innerLeft),
                        $categorySelect = $select.clone().addClass("chosen-select category").attr({
                            "data-placeholder" : "Choose your contents categories",
                            "multiple" : "multiple",
                            "tabindex" : "8",
                            "name" : "contents_category[]"
                        }).appendTo($categoryName);

                        categories = categoryData;
                        insertOption();

                        function insertOption(){
                            var categoryBox = $categorySelect;
                            for(i in categories){ //categoryData is json
                                var option = $option.clone().html(categories[i]).attr("data-index",i);
                                option.appendTo(categoryBox);
                            }
                            categoryBox.chosen({  max_selected_options: 3 });
                        };
                    }
                    function initTag(){
                        var $hashtagName = $inputWrap.clone()
                        .append($label.clone().html("Tag"))
                        .append($inputInner.clone().addClass("hashTag-input-wrap")
                            .append($("<input/>",{ "class" : "hashTag-input" }).on("keydown",modalFunc.detectTag).on("keyup",errorCheck)))
                        .appendTo($innerLeft);
                    }
                    function initDescript(){
                        var $descriptName = $inputWrap.clone()
                        .append($label.clone().html("Description"))
                        .append($("<textarea/>",{ "class" : "descript-input" ,"name" : "contenst_description" }).on("keyup",errorCheck)).appendTo($innerLeft);
                    }
                    function initCC(){
                        var $ccName = $inputWrap.clone(),
                        $ccLabel = $label.clone().html("Creative Commons"),
                        $ccInner = $inputInner.clone().addClass("cc-inner-wrapper"),
                        
                        $ccIconWrap = $("<ul/>",{ "class" : "cc-list-wrapper" }),
                        getLink = $("<a/>",{ "class" : "cc-list-link", "href" : "http://creativecommons.org/licenses/by-nc-nd/4.0", "target" : "_blank" }),
                        $changebt = $("<p/>",{
                            "class" : "cc-setting-bt",
                            "html" : "<i class='fa " + icons.refresh + "'></i>Change your license"
                        }).on("click",toggle.single);

                        insertCCicons();

                        function insertCCicons(){
                            var ccIconLi = $("<li/>",{ "class" : "cc-list"}),
                            $target = $ccIconWrap,
                            $img = $("<img/>",{ "src" : "#" });
                            for(var i = 0, l = ccData.length; i < l; i++){
                                var list = ccIconLi.clone().attr({"data-value":ccData[i].id, "data-tip":ccData[i].name})
                                .append($img.clone().attr("src",ccData[i].icon))
                                .appendTo($target).tooltip({"top":40, "left" : 0});
                                if(ccData[i].id == "sa"){
                                    list.hide();
                                }
                            }
                            $ccInner.append(getLink.append($target));
                        }

                        $ccName.append($ccLabel).append($ccInner).append($changebt)
                        .on("click",modalFunc.showCCsetting).appendTo($innerRight);
                    }
                    function errorCheck(){
                        var $this = $(this);
                        var value = $(this).val();
                        var errorCode = value.inputErrorCheck();
                        
                        if(!value.isNullString()){
                            switch(errorCode){
                                case 0 : 
                                    $this.removeClass("error"); 
                                break;
                                case 1 : 
                                    $this.addClass("error");
                                    console.log("This is special character"); 
                                break;
                                case 2 : 
                                    $this.addClass("error"); 
                                    console.log("This is abuse word"); 
                                break;
                            }
                        }
                    }

                    return modal;
                }
            },
            tabAction: function(){
                var $this = $(this),
                data = $this.data("target"),

                depthTest = $this.parent().find(".tab-target").length === 0,
                parent = depthTest ? $this.parent().parent() : $this.parent(),
                target = parent.find(".tab-target[data-value='" + data + "']"),
                elements = target.siblings(".tab-target");

                if($this.hasClass("selected")){
                    elements.hide();
                    target.show();
                }
                else target.hide();
            },
            currentProg: function(){
                var $this = $(this),
                $modals = $(document).find(".modal"),
                $btns = $(".prog"),
                data = $(this).data("value"),
                $progress = $("." + data),
                $target = $("." + data + "-window"),
                $darkOverlay = $(document).find(".dark_overlay");
                if(!$this.hasClass("selected")) {
                    $btns.removeClass("current-prog");
                    $progress.addClass("current-prog");
                }
                if(data == "edit") {
                    $modals.fadeOut(200);
                    $darkOverlay.fadeOut(200);
                }
                else {
                    $modals.hide();
                    $(".btn.selected").removeClass("selected");
                    ModalKit.align($target);
                    $target.fadeIn(200);
                    $darkOverlay.fadeIn(200);
                }
            },
            toolbox: function(){
                var $this = $(this),
                $aside = $this.parents(".editor-aside"),
                value = $this.data("target"),
                title = $this.data("tip").split(" ")[0],
                $toolboxWrap = $("<div/>",{
                    "class" : "toolbox-wrap tab-target",
                    "data-value" : value,
                    "html" : "<p class='toolbox-title'>" + title + "</p>"
                }).appendTo($aside).hide();
                if(value == "gridTool") $toolboxWrap.addClass("modal").find(".toolbox-title").remove();
            },
            objMenu: function(selector){
                var $object = selector,
                notimg = $object.is(".object-img"),
                large = $object.hasClass("large"),
                $objectMenu = $("<div/>",{"class" : "obj-menu-btn"}).appendTo($object).hide(),
                $objectMenuIcon = $("<i/>",{"class" : icons.pencil}).appendTo($objectMenu),
                $menuWrap = $("<ul/>",{"class" : "obj-menu"}).appendTo($objectMenu).hide(),
                $replace = notimg ? $("<li/>",{
                    "class" : "obj-menu-list",
                    "html" : "Replace",
                    "data-value" : "replace",
                    "data-tip" : "This Image will be replaced"
                }).on("click",upload.imgUpTrigger).appendTo($menuWrap).tooltip({"left" : -150}) : "",
                $largeImg = notimg ? $("<li/>",{
                    "class" : "obj-menu-list fullSizeOff",
                    "html" : "Full Size",
                    "data-value" : "full-size",
                    "data-tip" : "1400px"
                }).on("click",canvasTool.getFullSizeImg).appendTo($menuWrap).tooltip({"left" : -150}) : "",
                $delete = $("<li/>",{
                    "class" : "obj-menu-list",
                    "html" : "Delete",
                    "data-value" : "delete"
                }).on("click",canvasTool.deleteObj).appendTo($menuWrap);
                $object.hover(
                    function(){ $objectMenu.stop().fadeIn(200); },
                    function(){ $objectMenu.stop().fadeOut(200); }
                );
                $objectMenu.hover(
                    function(){ $menuWrap.stop().fadeIn(200); },
                    function(){ $menuWrap.stop().fadeOut(200); }
                );
            },
            keyEvent: function(event){
                $this = $(this),
                $confirm = $this.parent().find(".modal-okbt"),
                $cancel = $this.parent().find(".modal-cancel"),
                inKeyCode = event.which;
                switch(inKeyCode){
                   case keyCode.enter : $confirm.trigger("click"); break;
                   case keyCode.esc : $cancel.trigger("click"); break;
                   default : return; break;
                }
            },
            disableCamelCase: function(text){ //camelCase -> Camel Case
                var result = text.replace( /([A-Z])/g, " $1" ),
                result = result.charAt(0).toUpperCase() + result.slice(1);
                return result;
            }
        },
        upload = {
            fileCheck: function(file){
                var alertKey = $(document).find(".alertKey");
                var parameter = {
                    file : file,
                    isExist : true,
                    kind : "2d",
                    type : "file",
                    parentArray : attachedFiles,
                    alertKey : alertKey,
                    icons : icons
                };
                return editorFileChecker(parameter);
            },
            imgCheck: function(file){
                var alertKey = $(document).find(".alertKey");
                var parameter = {
                    file : file,
                    isExist : false,
                    kind : "2d",
                    type : "img",
                    parentArray : null,
                    alertKey : alertKey,
                    icons : icons
                };
                return editorFileChecker(parameter);
            },
            fileUpTrigger: function(){
                var $this = $(this),
                inputFile = $(document).find(".fileUploader");
                inputFile.click();
                inputFile.off("change").on("change",upload.fileUpload);
            },
            fileUpload: function(event){
                var $this = $(this),
                $inputModal = $(document).find(".modal.file-selector-modal"),
                $fileViewer = $inputModal.find(".modal-fileViewer"),
                object = event.target.files;

                if(object.length > 10) {
                    alert("Too many files");
                    $this.val("");
                    return false;
                }

                $.each(object,function(i,file){
                    var name = file.name,
                    indexNum = name.lastIndexOf("."),
                    fileEXT = indexNum > -1 ? name.substring(indexNum + 1) : "",
                    size = file.calcUnit();

                    if(upload.fileCheck(file)){
                        var fileList = new FileList(name,size[0],size[1],i).appendTo($fileViewer);
                        attachedFiles.push(file);
                    }
                    setIndex(".file-list");
                    console.log(attachedFiles);
                });

                initTotalFileInfo();
                ModalKit.align($inputModal);

                function FileList(name,size,unit,index){
                    var body = $("<li/>",{"class" : "file-list", "data-value" : name, "data-index" : ""}),
                    fileNameWrap = $("<span/>",{"class" : "file-list-name", "html" : name}).appendTo(body),
                    fileSizeWrap = $("<span/>",{"class" : "file-list-size", "html" : size + unit}).appendTo(body);
                    removeButton = $("<i/>",{"class" : icons.times}).appendTo(body).on("click",fileRemove);

                    return body;
                }
                function initTotalFileInfo(){
                    var totalInfoWrap = $(document).find(".modal-fileViewer-total"),
                    countWrap = totalInfoWrap.find(".file-count-total"),
                    sizeWrap = totalInfoWrap.find(".file-size-total"),

                    count = attachedFiles.length,
                    size = 0;
                    $.each(attachedFiles,function(i,file){
                        size += file.size;
                    });

                    countWrap.text(count + " Files");
                    sizeWrap.text((size/1024/1024).toFixed(2) + " MB");
                }
                function fileRemove(){
                    var body = $(this).parent(".file-list"),
                    i = body.data("index");
                    attachedFiles.splice(i,1);
                    console.log("FILE NUMBER " + i + " IS REMOVED");
                    console.log(i,attachedFiles);
                    body.remove();
                    ModalKit.align($inputModal);
                    setIndex(".file-list");
                    initTotalFileInfo();
                }

                return;
            },
            imgUpTrigger: function(){
                var $this = $(this),
                $document = $("body"),
                dataValue = $this.data("value"),
                $inputFile = dataValue === "newImgUpload" ? $(document).find(".content-imgUploader") : $(document).find(".imgUploader"),
                $uploading = $(document).find(".uploading");
                
                switch(dataValue){
                    case "replace" : 
                        $inputFile.off("change").on("change",upload.imgReplace);
                        if($uploading.length!=0) $uploading.removeClass(".uploading");
                        $this.addClass("uploading");
                    break;
                    case "thumbnail" : $inputFile.off("change").on("change",upload.thumbUpload); break;
                    case "thumb-replace" : $inputFile.off("change").on("change",upload.thumbReplace); break;
                    case "grid" : 
                        $inputFile.off("change").on("change",upload.gridUpload);
                        if($uploading.length!=0) $uploading.removeClass(".uploading");
                        $this.addClass("uploading"); 
                    break;
                    case "grid-replace" : 
                        $inputFile.off("change").on("change",upload.gridReplace);
                        if($uploading.length!=0) $uploading.removeClass(".uploading");
                        $this.addClass("uploading"); 
                    break;
                    default :
                        $inputFile.off("change").on("change",upload.imgUpload);
                        if($uploading.length!=0) $uploading.removeClass(".uploading");
                        $this.addClass("uploading");
                    break;
                }
                $inputFile.trigger("click");
                console.log("Trigger On");
            },
            imgUpload: function(event){
                var $this = $(".uploading"),
                $inputFile = $(document).find(".imgUploader"),
                $canvas = $(document).find(".editing-canvas"),
                $header = $(".obj-header"),
                $body = $(".obj-body"),
                $footer = $(".obj-footer"),
                $placeHolder = $body.find(".placeHolder"),
                $loading_icon = $(document).find("#loading_icon").show(),

                $object = event.target.files;
                
                $.each($object, function(i,file){
                    if(upload.imgCheck(file)){
                        if($placeHolder.length != 0) $placeHolder.hide();
                        var fileValue = file.name,
                        indexNum = fileValue.lastIndexOf("."),
                        fileEXT = indexNum > -1 ? fileValue.substring(indexNum + 1) : "";

                        var $objectWrap = $("<div/>",{"class" : "canvas-obj canvas-content object-img", "data-index" : "", "data-value" : fileEXT + "-image"});
                        var reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = function(event){
                            var img = $("<img/>",{ "src":event.target.result }),
                            imgWidth = img[0].width;
                            console.log(imgWidth);

                            if(imgWidth >= 1400) $objectWrap.addClass("large");
                            upload.insertPosition($this,$objectWrap,img);
                            $(".uploading").removeClass("uploading") // init target object  
                            $inputFile.val(null); // init input value
                            pac.objMenu($objectWrap);
                            $loading_icon.hide();

                            attachedImage.splice($objectWrap.data("index"),0,file);
                            console.log(attachedImage);
                        };
                    }
                    else $loading_icon.hide();
                });
            },
            gridUpload: function(event){
                var $this = $(".uploading"),
                $inputFile = $(this),
                $target = $this.parent(".grid-img-wrapper"),
                $object = event.target.files,
                cropBoxWidth = $target.width(),
                cropBoxHeight = $target.height(),
                $loading_icon = $(document).find("#loading_icon").show();

                if(upload.imgCheck($object[0])){
                    $.each($object, function(i,file){
                        var reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = function(event){
                            var img = $("<img/>").attr("src", event.target.result).appendTo($target)
                            .cropper({
                                minContainerWidth: cropBoxWidth,
                                minContainerHeight: cropBoxHeight,
                                minCanvasWidth: cropBoxWidth,
                                minCanvasHeight: cropBoxHeight,
                                autoCropArea: 1,
                                viewMode: 3,
                                modal: false,
                                center: false,
                                guides: false,
                                background: false,
                                highlight: false,
                                cropBoxMovable: false,
                                cropBoxResizable: false,
                                zoomOnTouch: false,
                                toggleDragModeOnDblclick: false,
                                dragMode: "move"
                            }); 
                            $inputFile.val(null);
                            $this.attr("data-value","grid-replace").hide();
                            $(".uploading").removeClass("uploading");
                            toolbar.sortFn.refresh();
                            $loading_icon.hide();
                        }
                    });
                }
                else $inputFile.val(null);
            },
            textUpload: function(event){
                var $this = $(this),
                $body = $(".obj-body"),
                $placeHolder = $body.find(".placeHolder"),
                $textWrap = $("<div/>",{"class" : "canvas-obj canvas-content object-text", "data-index" : "", "data-value" : "text"})
                .on("focusin",toolbar.textFn.focusAction),
                $input = $("<p/>",{"class" : "canvas-input", "contenteditable" : "true"});

                if($placeHolder.length!=0) $placeHolder.hide();
                upload.insertPosition($this,$textWrap,$input);
                pac.objMenu($textWrap);
            },
            embedUpload: function(val){
                var $this = $(".uploading"),
                $body = $(".obj-body"),
                $placeHolder = $body.find("placeHolder"),
                $mediaWrap = $("<div/>",{"class" : "canvas-obj canvas-content object-embed", "data-index" : "", "data-value" : "embed"}),
                $media = $(val),
                $loading_icon = $(document).find("#loading_icon").show();

                if($placeHolder.length!=0) $placeHolder.hide();
                upload.insertPosition($this,$mediaWrap,$media);
                $this.removeClass(".uploading");
                pac.objMenu($mediaWrap);
                $loading_icon.hide();
            }, 
            thumbUpload: function(event){
                var $this = $(".thumb-editor-wrapper"),
                $inputFile = $(this),
                $placeHolder = $this.find(".thumb-placeHolder"),
                $target = $this.find(".thumb-origin-img"),
                $previewer = $this.siblings(".thumb-preview-wrapper"),
                $object = event.target.files,
                $changeThumb = $(document).find(".thumb-img-change"),
                $loading_icon = $(document).find("#loading_icon").show();

                if(upload.imgCheck($object[0])){
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
                            $loading_icon.hide();
                        }
                    });
                    setTimeout(function(){
                        ModalKit.align($(".thumbnail-window"));
                    },200);
                }
                else $inputFile.val(null);
            },
            imgReplace: function(event){
                var $this = $(this),
                $button = $(document).find(".uploading"),
                $target = $button.parents(".obj-menu-btn").siblings("img"),
                $objectWrap = $target.parents(".object-img").removeClass("large").css("margin","0 7%"),
                $inputFile = $(document).find(".imgUploader"),
                $loading_icon = $(document).find("#loading_icon").show();

                $object = event.target.files;
                if(upload.imgCheck($object[0])){
                    $.each($object, function(i,file){
                        var reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = function(event){
                            var img = $("<img/>",{ src:event.target.result }),
                            imgWidth = img[0].width,
                            fileEXT;
                            if(imgWidth >= 1400) $objectWrap.addClass("large");
                            $target.attr("src",event.target.result);
                            $button.removeClass("uploading");
                            img.remove();

                            $inputFile.val(null);
                            toolbar.sortFn.refresh();

                            $loading_icon.hide();
                            attachedImage[$objectWrap.data("index")] = file;
                        };
                    });
                }
                else $inputFile.val(null);
            },
            gridReplace: function(event){
                var $this = $(".uploading");
                $inputFile = $(document).find(".imgUploader"),
                $object = event.target.files,
                $cropper = $this.siblings("img"),
                $loading_icon = $(document).find("#loading_icon").show();

                $.each($object, function(i,file){
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function(event){
                        console.log(event.target.result);
                        $cropper.cropper("replace",event.target.result),false;
                        $inputFile.val(null);
                        $loading_icon.hide();
                    }
                });
            },
            thumbReplace: function(event){
                var $this = $(this);
                $inputFile = $(document).find(".imgUploader"),
                $object = event.target.files,
                $cropper = $(document).find(".thumb-origin-img"),
                $loading_icon = $(document).find("#loading_icon").show();

                if(upload.imgCheck($object[0])){
                    $.each($object, function(i,file){
                        var reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = function(event){
                            console.log(event.target.result);
                            $cropper.cropper("replace",event.target.result);
                            $inputFile.val(null);
                            $loading_icon.hide();
                        }
                    });
                    setTimeout(function(){
                        ModalKit.align($(".thumbnail-window"));
                    },200);
                }
                else $inputFile.val(null);
            },
            imgCount : 0,
            setId: function (obj) {
                //console.log(obj);
                var $this = obj.parent(".canvas-content"),
                dataVal = $this.data("value");
                if (!$this.is(".placeHolder")) $this.attr("data-value", upload.imgCount + "-" + dataVal);
                upload.imgCount++;
            },
            insertPosition: function(selector,wrap,object){
                var $this = selector,
                $placeHolder = $(document).find(".placeHolder"),
                $body = $(".obj-body"),
                $deviderWrap = $("<div/>",{"class" : "canvas-obj canvas-devider-wrap"}),
                $devider = $("<div/>",{"class" : "canvas-devider"}).appendTo($deviderWrap),
                dvHeight = $("#devider-tool").find("input[type='text']").val(),
                contentSize = $(document).find(".canvas-content").size() > 1,
                $deviderSlider = $("#contentSpace-slider");

                if($this.parents().is(".obj-header")) {
                    wrap.insertAfter($placeHolder).append(object);
                    if(contentSize) $deviderWrap.clone().height(dvHeight).insertAfter(wrap);
                }
                else if($this.parents().is(".canvas-devider-wrap")) {
                    wrap.insertBefore($this.parents(".canvas-devider-wrap")).append(object);
                    if(contentSize) $deviderWrap.clone().height(dvHeight).insertBefore(wrap);
                }
                else {
                    wrap.appendTo($body).append(object);
                    if(contentSize) $deviderWrap.clone().height(dvHeight).insertBefore(wrap);
                }
                if($(".canvas-devider").length != 0) $deviderSlider.slider("enable");

                canvasTool.addObjBt();

                upload.setId(object);
                toolbar.sortFn.refresh();

                if(wrap.hasClass("object-text")) wrap.focusin(); // it is not working
            }
        },
        modalFunc = {
            showFileSelector: function(){
                $(document).find(".dark_overlay").fadeIn(200);
                $(document).find(".modal").fadeOut(200);
                $(document).find(".modal.file-selector-modal").fadeIn(200);
            },
            addGrid: function(){
                var $this = $(this),
                $loading_icon = $(document).find("#loading_icon"),
                $window = $this.parents(".modal"),
                $grid = $window.find(".grid-edit-window"),
                $gridBody = $grid.find(".grid-inner-wrapper"),
                $cropper = $gridBody.find(".cropper-container"),
                width = $grid.width(),
                height = $grid.height()
                $dummy = $grid.clone(),
                $canvas = $(document).find(".obj-body"),
                $mediaWrap = $("<div/>",{"class" : "canvas-obj canvas-content object-img", "data-index" : "", "data-value" : "jpg-image"}),
                $placeHolder = $(document).find(".canvas-content.placeHolder");

                ///////////////
                // EXCEPTION //
                ///////////////
                if($gridBody.length !== 0){
                    var currentGrid = $this.parents(".grid-wrapper.modal-wrapper").find(".btn.grid-btn.selected").data("target"),
                    calcGrid = currentGrid.split("-"),
                    totalGrid = parseInt(calcGrid[1]) + parseInt(calcGrid[2]);
                    console.log($cropper,totalGrid);
                    if($cropper.length < totalGrid){
                        alert("You must upload imgs");
                        return false;
                    }
                }
                else return false;     
                ///////////////
                // EXCEPTION //
                ///////////////

                $window.fadeOut(200);
                $dummy.appendTo("body");
                $grid.empty();
                $loading_icon.show();

                html2canvas($dummy, {
                    onrendered: function(canvas) {
                        var dataURL = canvas.toDataURL("image/jpeg"),
                        $media = $("<img/>", { "src" : dataURL }).appendTo($canvas);
                        upload.insertPosition($this,$mediaWrap,$media);
                        attachedImage.splice($mediaWrap.data("index"),0,dataURL);
                        $loading_icon.hide();
                        $dummy.remove();
                        console.log($dummy.width());
                        return false;
                    },
                    allowTaint: true
                });
                if($placeHolder.length != 0) $placeHolder.hide();
                $(".btn.selected").removeClass("selected");
                pac.objMenu($mediaWrap);
                console.log("grid is added");
            },
            embed: function(){
                var $this = $(this),
                $darkOverlay = $(document).find(".dark_overlay"),
                $window = $this.parents(".modal"),
                $input = $window.find("textarea"),
                $errorMsg = $window.find(".embed-error"),
                value = $input.val(),
                pattern = /^(<iframe.*).*(\/iframe>)/,
                valTest = pattern.test(value);

                if(valTest) {
                    upload.embedUpload(value);
                    $input.val(null); 
                    $window.stop().fadeOut(200);
                    $darkOverlay.stop().fadeOut(200);
                }
                else {
                    $input.addClass("error");
                    $errorMsg.fadeIn(200)
                    setTimeout(function(){
                        $errorMsg.fadeOut(200);
                        $input.removeClass("error");
                        $input.focus();
                    },1500);
                }
            },
            cropped: function(event){
                var $originImg = $(".thumb-origin-img");
                if($originImg.attr("src") != "#") {
                    var $this = $(this),
                    $object = $originImg.cropper("getCroppedCanvas",{width:250,height:215}), //croped image size fix
                    dataURL = $object.toDataURL("image/jpeg"); //export to jpeg
                    finalThumbnail = dataURL;
                }
                else $.error("There is no Image");                
            },
            detectTag: function(event){
                var $this = $(this),
                $wrapper = $this.parent(".hashTag-input-wrap"),
                $tagWrap = $("<ul/>",{ "class" : "hashtag-wrapper"}),
                $tag = $("<li/>",{ "class" : "hashtag-list" }),
                inKeyCode= event.which,
                value = $this.val().trim(),
                endCommand = inKeyCode == keyCode.enter || inKeyCode == keyCode.space,
                deleteCommand = inKeyCode == keyCode.delete,
                wrapperExist = $this.prev("ul").length == 0,
                errorCheck = !$this.hasClass("error");
                if(endCommand && value !== "" && errorCheck){
                    if(wrapperExist) $tagWrap.prependTo($wrapper);
                    $tag.html(value + "<i class='" + icons.times + "'></i>").on("click",modalFunc.deleteTag).appendTo(".hashtag-wrapper");
                    $this.val(null);
                }
                else if(deleteCommand && value == ""){
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
                $ccSettingWrap = new ModalKit.create(null,"cc-setting").addClass("cc-setting-wrapper"),
                $ccSettingInner = $ccSettingWrap.find(".modal-wrapper").addClass("cc-setting-inner-wrapper"),

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
                        var makeCC = $ccSettingWrap.appendTo($(".initEditor")),
                        useCC = $ccSection.clone().addClass("useCC").append($ccTitleWrap.clone()
                        .append($ccRadio.clone().prop("checked",true).attr("data-value","useCC"))
                        .append($ccTitle.clone().html("Creative Commons License"))).appendTo($(".cc-setting-inner-wrapper")).hide().stop().fadeIn(400),
                        listWrap = $cclistWrap.appendTo($(".useCC")),
                        addlist = function(){
                            for(var i = 0, l = ccData.length; i < l; i++){
                                var disabled, checked;
                                if(i == 0) continue;
                                else if(i == 1) disabled = true, checked = true;
                                else if(i == 2 || i == 3) disabled = false, checked = true;
                                else if(i == 4) disabled = true, checked = false;
                                $cclist.clone()
                                .append($ccCheckBox.clone().attr({"data-value":ccData[i].id,"name":"cc-check"}).prop({"disabled" : disabled,"checked" : checked}))
                                .append($ccCheckDesc.clone().html(ccData[i].descript))
                                .appendTo($(".cc-checklist-wrapper"))
                            }
                        }(),
                        withoutCC = $ccSection.clone().addClass("withoutCC").append($ccTitleWrap.clone()
                        .append($ccRadio.clone().prop("checked",false).attr("data-value","withoutCC"))
                        .append($ccTitle.clone().html("NO USAGE WITHOUT OWNER’S PERMISSION"))).appendTo($(".cc-setting-inner-wrapper"));

                        $(".license-selector").on("change",modalFunc.useCC).lubyCheckbox({
                            "icon" : "fa fa-circle"
                        });
                        $(".cc-checkbox").on("change",modalFunc.displayCC).on("change",modalFunc.makelinkCC).lubyCheckbox({ switchs: false });
                        $(".cc-checkbox[data-value='nd']").add(".cc-checkbox[data-value='sa']").addClass("radioStyle");
                        ModalKit.align($(".cc-setting-wrapper"));
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
            },
            displayCC: function(){
                $this = $(this),
                selected = $this.prop("checked"),
                data = $this.data("value"),
                $target = $(".cc-list[data-value='" + data + "']");
                if(data == "nd" || data == "sa") modalFunc.ccNDSA.call($this);
                if(!selected) $target.stop().fadeOut(400);
                else $target.stop().fadeIn(400);
            },
            ccNDSA: function(){ //if you select nd(sa), sa(nd) will be disabled.
                var $this = $(this),
                data = $this.data("value"),
                otherData = data === "nd" ? "sa" : "nd",
                checked = $this.prop("checked"),
                others = $(".cc-checkbox[data-value='" + otherData + "']");

                if(checked) others.parents(".checkbox-wrapper").lubyCheckbox("disable");
                else others.parents(".checkbox-wrapper").lubyCheckbox("enable");
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
            embedHelp: function(){
                var $this = $(this),
                text = "Embeds from: Vimeo, YouTube, Adobe TV, Adobe Voice, Blip.tv, Dailymotion, SoundCloud, Mixcloud, Bandcamp, Scribd, Google Maps, Wufoo, SlideShare, Giphy, Prezi, Sketchfab, Issuu, Vine, Spotify",
                selected = $this.hasClass("selected");
                if(selected) $this.text(text).hide().stop().fadeIn(300);
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
            }
        },
        canvasTool = {
            deleteObj: function(){
                var $this = $(this),
                objects = $(document).find(".canvas-content").size(),
                $target = $this.parents(".canvas-content"),
                $placeHolder = $(document).find(".placeHolder"),
                $objBts = $(document).find(".canvas-uploader-wrap"),
                $deviderSlider = $("#contentSpace-slider");

                if($target.index() == 1) {
                	$target.next(".canvas-devider-wrap").remove();
                	$target.remove();
                }
                else {
                	$target.prev(".canvas-devider-wrap").remove();
                	$target.remove();
                }
                if(objects == 2) $placeHolder.show() && $objBts.remove();
                if(objects == 3) $deviderSlider.slider("disable");

                toolbar.sortFn.refresh();
                if($target.hasClass("object-img")) attachedImage.splice($target.data("index"),1);
                console.log(attachedImage);
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
                $(".canvas-uploader-bt").find(".fa-code").off("click").on("click",ModalKit.show);
                console.log("add object button is added to canvas");
            },
            getFullSizeImg: function(){
                var $this = $(this),
                $target = $this.parents(".object-img");
                if($target.hasClass("large")){
                    if($this.hasClass("fullSizeOff")){
                        $target.css("margin","0px");
                        $this.removeClass("fullSizeOff").addClass("fullSizeOn");
                    }
                    else {
                        $target.css("margin","0 7%");
                        $this.removeClass("fulllSizeOn").addClass("fullSizeOff");
                    }
                }
                else alert("This image can not be full size(less 1400px)");  
            }
        },
        toolbar = {
            textTool: function(){
                var $this = $(document).find(".toolbox-wrap[data-value='textTool']");
                
                //font size start
                var $sizeInput = $("<input/>",{
                    "type" : "range",
                    "class" : "sliderKey",
                    "value" : 20,
                    "min" : 0,
                    "max" : 100
                }),
                $fontSize = new UImodule.createMenu($sizeInput,"Font Size",false).attr({"id" : "fontSize-tool","data-value" : "font-size"}).appendTo($this);
                $sizeInput.slider({
                    customID: "fontSize-slider",
                    disabled: true, 
                    dragEvent: toolbar.textFn.fontSize
                });

                //font color start
                var $colorInput = $("<input/>",{ "type" : "text","id" : "fontColorKey" }),
                $fontColor = new UImodule.createMenu($colorInput,"Font Color",false).attr({"id" : "fontColor-tool","data-value" : "font-color"}).appendTo($this);
                $colorInput.spectrum({
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

                //font decoration start
                var $btWrap = $("<ul/>",{ "class" : "toolbox-btns" }),
                $btn = $("<div/>",{ "class" : "btn" }),

                $decobtns = $btWrap.clone(),
                $boldBt = $btn.clone().addClass("boldbt").attr("data-value","bold").append($("<i/>",{"class" : icons.bold}))
                .on("click",toggle.single).on("click",toolbar.textFn.fontDeco).appendTo($decobtns),
                $italicBt = $btn.clone().addClass("italicbt").attr("data-value","italic").append($("<i/>",{"class" : icons.italic}))
                .on("click",toggle.single).on("click",toolbar.textFn.fontDeco).appendTo($decobtns),
                $underBt = $btn.clone().addClass("underbt").attr("data-value","underline").append($("<i/>",{"class" : icons.underline}))
                .on("click",toggle.single).on("click",toolbar.textFn.fontDeco).appendTo($decobtns),
                $strikeBt = $btn.clone().addClass("strikebt").attr("data-value","strike").append($("<i/>",{"class" : icons.strike}))
                .on("click",toggle.single).on("click",toolbar.textFn.fontDeco).appendTo($decobtns),

                $fontDeco = new UImodule.createMenu($decobtns,"Font Decorations",false).attr({"id" : "fontDeco-tool","data-value" : "font-dece"}).appendTo($this);

                //font align start
                var $alignbtns = $btWrap.clone(),
                $alignLeft = $btn.clone().addClass("align-left-bt").attr("data-value","left").append($("<i/>",{"class" : icons.alignLeft}))
                .on("click",toggle.group).on("click",toolbar.textFn.fontAlign).appendTo($alignbtns),
                $alignCenter = $btn.clone().addClass("align-center-bt").attr("data-value","center").append($("<i/>",{"class" : icons.alignCenter}))
                .on("click",toggle.group).on("click",toolbar.textFn.fontAlign).appendTo($alignbtns),
                $alignRight = $btn.clone().addClass("align-right-bt").attr("data-value","right").append($("<i/>",{"class" : icons.alignRight}))
                .on("click",toggle.group).on("click",toolbar.textFn.fontAlign).appendTo($alignbtns),
                $alignRight = $btn.clone().addClass("align-justify-bt").attr("data-value","justify").append($("<i/>",{"class" : icons.alignJustify}))
                .on("click",toggle.group).on("click",toolbar.textFn.fontAlign).appendTo($alignbtns),

                $fontAlign = new UImodule.createMenu($alignbtns,"Align",false).attr({"id" : "fontAlign-tool","data-value" : "font-align"}).appendTo($this);
            },
            textFn: {
                focusAction: function(){
                    var $this = $(this),
                    $textInput = $(this).find(".canvas-input"),
                    fontSize = parseInt($textInput.css("font-size")),
                    fontColor = $textInput.css("color"),
                    $fontSizeTool = $("#fontSize-tool"),
                    $fontSizeSlider = $("#fontSize-slider"),
                    $fontColorTool = $("#fontColor-tool"),
                    $fontDecoTool = $("#fontDeco-tool"),
                    $fontAlignTool = $("#fontAlign-tool");                    

                    if($(".focused").size() >= 1) $(".focused").removeClass("focused");
                    $this.addClass("focused");
                    $fontSizeSlider.slider("enable");
                    var //data init
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
                },
                blurAction: function(event){
                    var $this = $(".focused"),
                    $target = $(event.target),
                    $fontSizeSlider = $("#fontSize-slider"),
                    $fontDecoTool = $("#fontDeco-tool"),
                    $fontAlignTool = $("#fontAlign-tool"),
        			inputChild = $target.is("b") || $target.is("em") || $target.is("u") || $target.is("strike"),
                    input = $target.is(".canvas-input") || inputChild,
                    aside = $target.parents().is(".editor-aside");

                    if(!(aside || (input && $this))) {
                        $this.removeClass("focused");
                        $fontDecoTool.find(".btn").removeClass("selected");
                        $fontAlignTool.find(".btn").removeClass("selected");
                        $fontSizeSlider.slider("disable");
                        $("html").off("click");
                    }
                    toolbar.sortFn.refresh();
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
                    $target = $(document).find(".obj-body > .focused > .canvas-input"),
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
                    	var bold = $target.find("b") || 0,
                    	italic = $target.find("em") || 0,
                    	underline = $target.find("u") || 0,
                    	strike = $target.find("strike") || 0,
                    	boldText = $target.find("b").children()[0] || $target.find("b").text(),
                    	italText = $target.find("em").children()[0] || $target.find("em").text(),
                    	underText = $target.find("u").children()[0] || $target.find("u").text(),
                    	strikeText = $target.find("strike").children()[0] || $target.find("strike").text();
                        console.log(boldText);
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
                var $this = $(document).find(".toolbox-wrap[data-value='colorTool']");

                var $colorInput = $("<input/>",{"type" : "text","id" : "bgColorKey"}),
                $bgColor = new UImodule.createMenu($colorInput,"Background Color",false).attr({"id" : "bgColor-tool","data-value" : "bg-color"}).appendTo($this);
                $colorInput.spectrum({
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
                var $this = $(document).find(".toolbox-wrap[data-value='gridTool']");

                var $gridWrap = $("<div/>",{ "class" : "grid-wrapper modal-wrapper" }).appendTo($this),
                $gridTitle = $("<div/>",{
                    "class" : "grid-title modal-title",
                    "html" : "Making a Frame"
                }).appendTo($gridWrap),
                $gridInnerWrap = $("<div/>",{ "class" : "toolbox-inner" }).appendTo($gridWrap),
                $editWindow = $("<div/>",{ "class" : "grid-edit-window" }).appendTo($gridInnerWrap),
                $btnWrap = $("<ul/>",{ "class" : "grid-btns toolbox-btns" }).appendTo($gridInnerWrap),
                $modalClose = $("<div/>",{ "class" : "modal-closebt", "data-value" : "modal-closebt" }).on("click",ModalKit.cancel).appendTo($gridWrap),
                $gridBtWrap = $("<div/>",{ "class" : "grid-bt-wrapper modal-bt-wrapper" }).appendTo($gridWrap),
                $gridCancel = $("<div/>",{
                    "class" : "modal-bt modal-cancelbt",
                    "html" : "Cancel",
                    "data-value" : "modal-closebt"
                }).on("click",ModalKit.cancel).appendTo($gridBtWrap),
                $gridOk = $("<div/>",{
                    "class" : "modal-bt modal-okbt",
                    "id" : "grid-okbt",
                    "html" : "Insert",
                }).on("click",modalFunc.addGrid).appendTo($gridBtWrap),

                $btn1 = new UImodule.createButton("v-1-1","image",icons.grid1,false,true).addClass("grid-btn").on("click",toolbar.gridFn.makeGrid).appendTo($btnWrap),
                $btn2 = new UImodule.createButton("v-1-2","image",icons.grid2,false,true).addClass("grid-btn").on("click",toolbar.gridFn.makeGrid).appendTo($btnWrap),
                $btn3 = new UImodule.createButton("v-2-1","image",icons.grid3,false,true).addClass("grid-btn").on("click",toolbar.gridFn.makeGrid).appendTo($btnWrap),
                $btn4 = new UImodule.createButton("h-1-2","image",icons.grid4,false,true).addClass("grid-btn").on("click",toolbar.gridFn.makeGrid).appendTo($btnWrap),
                $btn5 = new UImodule.createButton("h-2-1","image",icons.grid5,false,true).addClass("grid-btn").on("click",toolbar.gridFn.makeGrid).appendTo($btnWrap),
                $btn6 = new UImodule.createButton("n-2-2","image",icons.grid6,false,true).addClass("grid-btn").on("click",toolbar.gridFn.makeGrid).appendTo($btnWrap);
                ModalKit.align($this);
            },
            gridFn: {
                makeGrid: function(){
                    var $this = $(this),
                    $editWindow = $(".grid-edit-window"),
                    selected = $this.hasClass("selected"),
                    value = $this.data("target"),
                    valueArray = value.split("-"),
                    direction = valueArray[0],
                    firstArea = parseInt(valueArray[1]),
                    secondArea = parseInt(valueArray[2]);
                   
                    if(selected) {
                        var $gridObj = toolbar.gridFn.gridType(direction,firstArea,secondArea),
                        init = $(document).find(".grid-inner-wrapper").length != 0 ? $(".grid-inner-wrapper").remove() : "";
                        $gridObj.appendTo($editWindow);
                        toolbar.gridFn.gridIndex($gridObj);
                    }
                    else if(!selected) {
                        $editWindow.find(".grid-inner-wrapper").remove();
                    }  
                },
                gridType: function(d,f,s){
                    var $gridWrapper = $("<div/>",{ "class" : "grid-inner-wrapper" }),
                    $devider = $("<div/>",{ "class" : "grid-devider" });
                    console.log(d,f,s);
                    //direction
                    $gridWrapper.clone();
                    if(d == "v" || d == "n"){
                        var $obj = $gridWrapper.append($devider.clone().addClass("vertical left"))
                        .append($devider.clone().addClass("vertical right"));
                        toolbar.gridFn.devideGrid($obj,d,f,s);
                        console.log("d : " + d);
                    }
                    else if(d == "h"){
                        var $obj = $gridWrapper.append($devider.clone().addClass("horizental top"))
                        .append($devider.clone().addClass("horizental bottom"));
                        toolbar.gridFn.devideGrid($obj,d,f,s);
                        console.log("d : " + d);
                    }
                    else $.error("There is no grid element");   

                    return $gridWrapper;
                },
                devideGrid: function($obj,d,f,s){
                    $imgWrapper = $("<div/>",{ "class" : "grid-img-wrapper"}),
                    $placeHolder = $("<div/>",{ 
                        "class" : "grid-placeHolder",
                        "html" : "<i class='" + icons.plus + "'></i>",
                        "data-value" : "grid"
                    }).on("click",upload.imgUpTrigger),
                    $devider1 = $obj.find(".grid-devider").eq(0),
                    devider1Class = $devider1.hasClass("left"),
                    $devider2 = $obj.find(".grid-devider").eq(1),
                    devider2Class = $devider2.hasClass("right");
                    if(f == 1){
                        var $imgObj = $devider1.append($imgWrapper.clone().append($placeHolder.clone(true)));
                        console.log("devider1 : " + f);
                    }
                    else if(f == 2){
                        var $imgObj = devider1Class ? 
                        $devider1.append($imgWrapper.clone().addClass("top").append($placeHolder.clone(true)))
                        .append($imgWrapper.clone().addClass("bottom").append($placeHolder.clone(true))) :
                        $devider1.append($imgWrapper.clone().addClass("left").append($placeHolder.clone(true)))
                        .append($imgWrapper.clone().addClass("right").append($placeHolder.clone(true)));
                        console.log("devider1 : " + f);
                    }
                    
                    if(s == 1){
                        var $imgObj = $devider2.append($imgWrapper.clone().append($placeHolder.clone(true)));
                        console.log("devider2 : " + s);
                    }
                    else if(s == 2){
                        var $imgObj = devider2Class ? 
                        $devider2.append($imgWrapper.clone().addClass("top").append($placeHolder.clone(true)))
                        .append($imgWrapper.clone().addClass("bottom").append($placeHolder.clone(true))) :
                        $devider2.append($imgWrapper.clone().addClass("left").append($placeHolder.clone(true)))
                        .append($imgWrapper.clone().addClass("right").append($placeHolder.clone(true)));
                        console.log("devider2 : " + s);
                    }
                },
                gridIndex: function(selector){
                    $this = selector;
                    $cell = $(document).find(".grid-img-wrapper");
                    console.log($cell);
                    $cell.each(function(){
                        var $this = $(this),
                        index = $this.index();
                        console.log(index);
                        if(!$this.is(".placeHolder")) $this.attr("data-index",index);
                    });
                }
            },
            marginTool: function(){
                var $this = $(document).find(".toolbox-wrap[data-value='marginTool']");
                
                var $headerInput = $("<input/>",{
                    "type" : "range",
                    "class" : "sliderKey",
                    "value" : 45,
                    "min" : 0,
                    "max" : 100
                }),
                $headerMargin = new UImodule.createMenu($headerInput,"Header",false).attr({"id" : "header-tool","data-value" : "header"}).appendTo($this);
                $headerInput.slider({ dragEvent: toolbar.marginFn.headerMargin });

                var $footerInput = $("<input/>",{
                    "type" : "range",
                    "class" : "sliderKey",
                    "value" : 45,
                    "min" : 0,
                    "max" : 100
                }),
                $footerMargin = new UImodule.createMenu($footerInput,"Footer",false).attr({"id" : "footer-tool","data-value" : "footer"}).appendTo($this);
                $footerInput.slider({ dragEvent: toolbar.marginFn.footerMargin });

                var $deviderInput = $("<input/>",{ //input
                    "type" : "range",
                    "class" : "sliderKey",
                    "value" : 50,
                    "min" : 0,
                    "max" : 100
                }),
                $deviderMargin = new UImodule.createMenu($deviderInput,"Contents Spacing",false).attr({"id" : "devider-tool","data-value" : "devider"}).appendTo($this);
                $deviderInput.slider({
                    customID: "contentSpace-slider",
                    disabled: true, 
                    dragEvent: toolbar.marginFn.deviderMargin
                });
            },
            marginFn: {
                headerMargin: function(val,selector){
                    $this = selector,
                    $target = $(document).find(".obj-header");
                    $target.height(val);
                },
                footerMargin: function(val,selector){
                    $this = selector,
                    $target = $(document).find(".obj-footer");
                    $target.height(val);
                },
                deviderMargin: function(val,selector){
                    $this = selector,
                    $target = $(document).find(".canvas-devider-wrap");
                    $target.height(val);
                }
            },
            sortTool: function(){
                var $this = $(document).find(".toolbox-wrap[data-value='sortTool']");

                var $sortul = $("<ul/>",{ "class" : "sort-ul"}),
                $sortbt = $("<div/>",{ "class" : "sort-btn", "html" : "Sort"}).on("click",toolbar.sortFn.sortable),
                $sortWrap = new UImodule.createMenu([$sortul,$sortbt],"Sort",false).attr({"id" : "sort-tool","data-value" : "sort"}).appendTo($this);
                toolbar.sortFn.refresh();
                $sortul.sortable();
                $this.disableSelection();
            },
            sortFn: {
                refresh: function(){
                    $sortul = $(".sort-ul"),
                    $sortli = $("<li>",{ "class" : "sort-li" }),
                    objs = $(document).find(".canvas-content");
                    $sortul.empty();
                    objs.each(function(){
                        var $this = $(this);
                        if(!$this.hasClass("placeHolder")){
                            var $dummy = $this.clone().removeClass("canvas-obj canvas-content").addClass("sort-obj"),
                            objType = $this.data("value"),
                            $wrapper = $sortli.clone().append($dummy);
                            $wrapper.appendTo($sortul);
                            $dummy.find(".obj-menu-btn").remove();
                            toolbar.sortFn.objType(objType,$dummy);
                        }
                    });
                    setIndex(".sort-obj");
                    setIndex(".canvas-content");
                },
                objType: function(val, selector){
                    var icon = $("<i/>");
                    if(val.indexOf("image") != -1) icon.clone().addClass(icons.picture).appendTo(selector);
                    else if(val == "text") icon.clone().addClass(icons.font).appendTo(selector);
                    else if(val == "embed") icon.clone().addClass(icons.code).appendTo(selector);
                    else return false;
                },
                sortable: function(event){
                    console.log("SORTABLE");
                    sortedObj = $(".sort-obj"),
                    sortedArray = [],
                    $originObj = $(document).find(".canvas-content"),
                    originArray = [],
                    $menu = $originObj.find(".obj-menu-btn"),
                    $menulist = $menu.find(".obj-menu"),
                    sortedAttachedImage = [];

                    for(var i = 0; i < $originObj.length; i++) originArray.push($originObj[i]);
                    originArray.shift();//deleted placeholder
                    
                    for(var i = 0; i < sortedObj.length; i++){
                        var $obj = $(sortedObj[i]),
                        index = $obj.data("index"),
                        $target = $(".canvas-content[data-index='" + index + "']");
                        sortedArray.push($target.clone(true)[0]); 
                        
                        sortedAttachedImage[i] = attachedImage[index];
                    }

                    for(var i = 0; i<  originArray.length; i++){
                        var $original = $(originArray[i]),
                        $sorted = $(sortedArray[i]);
                        $original.replaceWith($sorted);
                        $sorted.hover(function(){
                            $(this).find(".obj-menu-btn").show();
                        },function(){
                            $(this).find(".obj-menu-btn").hide();
                        });
                        $(".obj-menu-btn").hover(function(){
                            $(this).find(".obj-menu").show();
                        },function(){
                            $(this).find(".obj-menu").hide();
                        });
                    }
                    console.log("SORTABLE IS END");

                    attachedImage = sortedAttachedImage;
                    console.log(attachedImage);
                    
                    toolbar.sortFn.refresh();
                }
            }
        },
        method = {
            destroy: function () {
                return this.each(function () {
                    console.log("tested");
                })
            }
        }
        return method[option] ? 
        method[option].apply(this, Array.prototype.slice.call(arguments, 1)) : 
        "object" != typeof option && option ? 
            ($.error('No such method "' + option + '" for the Editor instance'), void 0) : 
            pac.init.apply(this, arguments);
};
})(jQuery);