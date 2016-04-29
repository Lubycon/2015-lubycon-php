/* ===========================================================
 *
 *  Name:          lubyEditor3d.min.js
 *  Updated:       2016-04-22
 *  Version:       0.1.0
 *  Created by:    DART, Lubycon.co
 *
 *  Copyright (c) 2016 Lubycon.co
 *
 * =========================================================== */

(function($){
    $.fn.lubyEditor3d = function(option){
        var defaults = { 
            height: $(window).height(),
            minHeight: null,
            fileUpload: true,
            imageUpload: true,
            submit: $.noop()
        },
        icons = $.getJSON("../data/icons.json",function(data){
            console.log(data);
        }),
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
        scene, camera, dirLight, ambLight, renderer, controls, stats,
        group, object, mtl, geometry, material, mesh,
        pac = {
            init: function (option) {
                return d = $.extend({}, defaults, option), this.each(function () {
                    if (!$(this).hasClass("lubyEditor")) $.error("The key for lubyPictool is not exist");
                    else {
                        console.log("lubyEditor3d is loaded");//function start
                        var $this = $(this),
                        //init object
                        $wrapper = $("<div/>",{"class" : "lubypic-wrapper"}).appendTo($this),
                        $header = $("<div/>",{"class" : "lubypic-header"}).appendTo($wrapper),
                        $body = $("<div/>",{"class" : "lubypic-body"}).appendTo($wrapper),
                        $aside = $("<div/>",{"class" : "lubypic-aside"}).appendTo($body),
                        $editingBack = $("<div/>",{"class" : "editing-background"}).appendTo($body),
                        //canvas
                        $editingArea = $("<div/>",{"class" : "editing-area"}).appendTo($body),
                        $canvas = $("<div/>",{"id" : "web-gl"}).appendTo($editingArea),

                        //in header bt
                        $headerBtWrap = $("<div/>",{"class" : "header-btn-wrapper"}).appendTo($header),
                        $fileUpbtn = $("<div/>",{
                            "class" : "header-btn fileUpload",
                            "html" : "File",
                            "data-value" : "newOBJUpload"
                        }).prepend($("<i/>",{"class":icons.upload}))
                        .appendTo($headerBtWrap).on("click",upload.fileUpTrigger),
                        
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
                        $lightTool = $("<div/>",{
                            "class" : "btn",
                            "data-value" : "lightTool"
                        }).append($("<i/>",{"class":icons.bulb}))
                        .appendTo($aside).on("click",pac.toggle).on("click",toolbar.toolbarToggle),
                        $objectTool = $("<div/>",{
                            "class" : "btn",
                            "data-value" : "objectTool"
                        }).append($("<i/>",{"class":icons.cube}))
                        .appendTo($aside).on("click",pac.toggle).on("click",toolbar.toolbarToggle),
                        $backgroundTool = $("<div/>",{
                            "class" : "btn",
                            "data-value" : "backgroundTool"
                        }).append($("<i/>",{"class":icons.image}))
                        .appendTo($aside).on("click",pac.toggle).on("click",toolbar.toolbarToggle),

                        //input files
                        $inputFile = $("<input/>",{
                            "class":"fileUploader lubypic-hidden",
                            "name":"fileUploader",
                            "type":"file"
                        }).insertAfter($header);
                        $(".btn").each(pac.toolbox),

                        //modal windows
                        $modal = $("<div/>",{ "class" : "modal" }),
                        $modalClose = $("<div/>",{ "class" : "modal-closebt" }).on("click",modalTool.cancel),
                        //.modal-wrapper > .modal-title, .modal-bt.modal-cancelbt, .modal-bt.modal-okbt

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
                        .append($settingInput.clone().attr("name","content-name")).appendTo($settingInnerLeft),

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
                        }).on("click",pac.currentProg).on("click",pac.submit).appendTo($settingBtWrap);

                        pac.databind();//data binding  
                        pac.initGL();
                    }
                })
            },
            initGL: function(){
                'use strict';
                var windowWidth = window.innerWidth,
                    windowHeight = window.innerHeight;

                var gl = document.getElementById("web-gl");

                scene = new THREE.Scene();
                camera = new THREE.PerspectiveCamera(45, windowWidth/windowHeight, 0.1, 10000);
                    camera.position.z = 10;
                dirLight = new THREE.DirectionalLight(0xffffff);
                    dirLight.position.y = 100;
                    dirLight.position.x = -100;
                ambLight = new THREE.AmbientLight(0xffffff);

                scene.add(camera, dirLight, ambLight);
                scene.add(new THREE.AxisHelper(50));
                scene.add(new THREE.GridHelper(3, 0.5));

                renderer = new THREE.WebGLRenderer();
                    renderer.setSize(windowWidth, windowHeight);
                    renderer.setPixelRatio(window.devicePixelRatio);
                    renderer.setClearColor(0x222222, 1);
                gl.addEventListener("webglcontextlost", function(event){
                    event.preventDefault();
                    alert("context is losted");
                    cancelAnimationFrame(animationID);
                }, false);
                gl.appendChild(renderer.domElement);

                controls = new THREE.OrbitControls(camera, renderer.domElement);
                    controls.enableDamping = true;
                    controls.dampingFactor = 0.15;
                    controls.rotateSpeed = 0.5;
                    controls.zoomSpeed = 0.5;

                window.addEventListener("resize", pac.windowResizeGl, false);
                pac.animateGL();
            },
            animateGL: function(){
                controls.update();
                requestAnimationFrame(pac.animateGL);
                pac.renderGL();
            },
            renderGL: function(){
                renderer.render(scene, camera);
            },
            submit: function(){
                var rootElement = $(".lubyEditor"),
                $form = $("<form/>", {
                    "id": "finalForm",
                    "enctype": "multipart/form-data",
                    "method": "post",
                    "action": "./test.php"
                }),
                wrap = rootElement.wrapInner($form),
                $dummy = $("<input/>", { "type": "hidden", "id": "submitDummy" ,"name" : "content_html"}).appendTo($("#finalForm")).val(JSON.stringify(content)),
                $dummy = $("<input/>", { "type": "hidden", "id": "submitDummyImg" , "name" : "content_img" }).appendTo($("#finalForm")).val(JSON.param(imgData));
                
                $("#finalForm").submit();
            },
            databind: function(){
                //toolbar data bind start
                toolbar.lightTool();
                toolbar.materialTool();
                toolbar.backgroundTool();
                //toolbar data bind end
                $(window).on("load resize",function(){
                    $(".modal").each(function(){ pac.modalAlign($(this)); });
                })
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
                    $(".btn.selected").removeClass("selected");
                    pac.modalAlign($target);
                    $target.fadeIn(200);
                }
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
            },
            modalAlign: function(selector){
                $this = selector,
                width = $this.width(),
                height = $this.height(),
                windowWidth = $(window).width(),
                windowHeight = $(window).height(),
                hrAlign = (width/2)*-1,
                vtAlign = (windowHeight/2 - height/2) - 20;
                $this.css({ "top" : vtAlign+"px", "margin-left" : hrAlign+"px", "left" : "50%"});
            },
            keyEvent: function(event){
                $this = $(this),
                $confirm = $this.parent().find(".modal-okbt"),
                inKeyCode = event.which;
                switch(inKeyCode){
                   case keyCode.enter : $confirm.trigger("click"); break;
                }
            },
            windowResizeGl: function(){
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }
        },
        upload = {
            fileUpTrigger: function(){
                var data = $(this).data("value"),
                inputFile = $(document).find(".fileUploader");
                inputFile.click();
                switch(data){
                    case "newOBJUpload" : inputFile.change(upload.objectUpload); break;
                    case "newTexUpload" : inputFile.change(upload.textureUpload); break;
                    default : $.error("This is not upload button"); break;
                }
            },
            textureUpload: function(event){
                console.log("Texture is uploaded");
            },
            objectUpload: function(event){
                var $objects = event.target.files;
                upload.loaders($objects[0]);
            },
            loaders: function(file){
                var reader = new FileReader();
                var filename = file.name;
                var ext = filename.split(".").pop().toLowerCase();
                switch(ext){
                    case "obj" :
                        reader.addEventListener("load", function(event){
                            var contents = event.target.result;
                            group = new THREE.Group();
                            object = new THREE.OBJLoader().parse(contents);
                            
                            for(var i = 0, l = object.length; i < l; i++){
                                geometry = object[i].geometry;
                                    geometry.center();
                                    geometry.dispose();

                                material = object[i].material;
                                if(material.type == "MeshPhongMaterial"){
                                    material.specular = new THREE.Color(0xffffff);
                                    material.specularColor = new THREE.Color(0xffffff);
                                    material.side = THREE.DoubleSide;
                                    material.transparent = true;
                                    material.needsUpdate = true;
                                    material.dispose();
                                }
                                else if(material.type = "MultiMaterial"){
                                    var materials = material.materials;
                                    for(var j = 0, ml = materials.length; j < ml; j++){
                                        materials[j].specular = new THREE.Color(0xffffff);
                                        materials[j].specularColor = new THREE.Color(0xffffff);
                                        materials[j].side = THREE.DoubleSide;
                                        materials[j].transparent = true;
                                        materials[j].needsUpdate = true;
                                        materials[j].dispose();
                                    }
                                }
                                else $.error("WebGL failed loading to material");

                                mesh = new THREE.Mesh(geometry,material);
                                    mesh.castShadow = true;
                                    mesh.receiveShadow = true;
                                group.add(mesh);
                            }
                            toolbar.materialFn.materialRefresh();
                            scene.add(group);
                        },false);
                        reader.readAsText(file);
                    break;
                    default: $.error("This file is not supported");
                }
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
                console.log($target);
                $input.focus().on("keydown",pac.keyEvent);
                if($uploading.length!=0) $uploading.removeClass(".uploading");

                $this.addClass("uploading");
                pac.modalAlign($target);

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
                    if(wrapperExist) $tagWrap.prependTo($wrapper);
                    $tag.html(value + "<i class='" + icons.times + "'></i>").on("click",modalTool.deleteTag).appendTo(".hashtag-wrapper");
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
                        var makeCC = $ccSettingWrap.append($ccSettingInner).append($modalClose.clone(true)).appendTo($(".lubyEditor")),
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
            cancel: function(){
                var $this = $(this),
                $window = $this.parents(".modal"),
                $input = $this.parent().siblings("textarea"),
                $grid = $window.find(".grid-edit-window"),
                $btns = ".header-btn",
                $currentProg = $(document).find(".current-prog"),
                data = $currentProg.data("value");

                $input.val(null);
                $window.stop().fadeOut(200);
                if($window.hasClass("prog")) $currentProg.prev($btns).trigger("click");
                else if($window.attr("id") == "gridTool-toolbox") $grid.empty(), $(".btn.selected").removeClass("selected"); 
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
            
        },
        canvasTool = {
            
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
                else toolBox.fadeOut(200);
            },
            lightTool: function(){
                var $this = $(document).find("#lightTool-toolbox");
                
                
            },
            lightFn: {
                
            },
            materialTool: function(){
                var $this = $(document).find("#objectTool-toolbox"),

                $materialSelector = $("<div/>",{
                    "class" : "toolbox-inner", 
                    "id" : "materialSelect-tool",
                    "data-value" : "material-select"
                }).appendTo($this),
                $materialLabel = $("<div>",{
                    "class" : "toolbox-label",
                    "html" : "Meterials"
                }).appendTo($materialSelector),
                $selectBox = $("<select/>",{
                    "id" : "material-selector"
                }).appendTo($materialSelector).hide(),

                $materialDiffuse = $("<div/>",{
                    "class" : "toolbox-inner",
                    "id" : "materialDiffuse-tool",
                    "data-value" : "material-diffuse"
                }).appendTo($this),
                $diffuseLabel = $("<div/>",{
                    "class" : "toolbox-label",
                    "html" : "Diffuse"
                }).appendTo($materialDiffuse),

                $materialSpecular = $("<div/>",{
                    "class" : "toolbox-inner",
                    "id" : "materialSpecular-tool",
                    "data-value" : "material-specular"
                }).appendTo($this),
                $specularLabel = $("<div/>",{
                    "class" : "toolbox-label",
                    "html" : "Specualr"
                }).appendTo($materialSpecular),

                $materialNormal = $("<div/>",{
                    "class" : "toolbox-inner",
                    "id" : "materialNormal-tool",
                    "data-value" : "material-normal"
                }).appendTo($this),
                $normalLabel = $("<div/>",{
                    "class" : "toolbox-label",
                    "html" : "Normal"
                }).appendTo($materialNormal),

                $tabWrap = $("<div/>",{ "class" : "material-controller" }),
                $tabBtWrap = $("<div/>",{ "class" : "material-tab-bt-wrapper" }).appendTo($tabWrap),
                $tabLeftBt = $("<div/>",{ 
                    "class" : "material-tab btn",
                    "html" : "Texture",
                    "data-value" : "texture-control"
                }).on("click",pac.toggle).on("click",toolbar.materialFn.materialTab).appendTo($tabBtWrap),
                $tabRightBt = $tabLeftBt.clone(true).html("Color").attr("data-value","color-control").appendTo($tabBtWrap),

                $tabTextureBody = $("<div/>",{ 
                    "class" : "material-control-inner texture-control",
                    "data-value" : "texture" 
                }).appendTo($tabWrap).hide(),
                $tabColorBody = $("<div/>",{ 
                    "class" : "material-control-inner color-control",
                    "data-value" : "color"
                }).appendTo($tabWrap).hide();
                
                $tabWrap.clone(true).attr("data-value","diffuse").appendTo($materialDiffuse);//diffuse
                $tabWrap.clone(true).attr("data-value","sepecular").appendTo($materialSpecular);//specular
                $tabWrap.clone(true).attr("data-value","normal").appendTo($materialNormal);

                toolbar.materialFn.addController();
            },
            materialFn: {
                addController: function(){
                    var $targets = $(document).find(".material-control-inner"),
                    $wrapper = $("<div/>",{ "class" : "material-control-panel"}),
                    $viewer = $("<div/>", { "class" : "material-control-viewer" }).appendTo($wrapper),
                    $slider = $("<input/>",{
                        "class" : "material-control-slider sliderKey",
                        "type" : "range",
                        "value" : 100,
                        "max" : 100,
                        "min" : 0
                    }).appendTo($wrapper);
                    $targets.each(function(){
                        $wrapper.clone().appendTo($(this));
                    });
                    toolbar.materialFn.initController();
                },
                initController: function(){
                    var $targets = $(document).find(".material-control-inner");
                    $targets.each(function(){
                        var $this = $(this),
                        $viewer = $this.find(".material-control-viewer"),
                        $viewerInner
                        $slider = $this.find(".material-control-slider"),
                        data = $this.data("value");
                        if(data == "texture"){
                            $viewerInner = $("<img/>",{ "src" : "#", "data-value" : "texture-modal"})
                            .on("click",modalTool.modalShow).appendTo($viewer); //event to .texture-modal .modal
                            $slider.slider({
                                callback: toolbar.materialFn.changeOpacity
                            })
                        }
                        else if(data == "color"){
                            $viewerInner = $("<input/>",{ "type" : "text" }).appendTo($viewer);
                            $viewerInner.spectrum({
                                color: "#ffffff",
                                showInput: true,
                                showAlpha: true,
                                showInitial: true,
                                preferredFormat: "hex3",
                                showPalette: true,
                                palette: [],
                                showSelectionPalette: true,
                                selectionPalette: [],
                                move: toolbar.materialFn.materialColor,
                                change: toolbar.materialFn.materialColor
                            });
                            $slider.slider({
                                callback: toolbar.materialFn.changeOpacity
                            });
                        }
                        else{
                            console.log("this is not material controller");
                        }
                        console.log(data);
                    });
                },
                materialRefresh: function(){
                    var $target = $(document).find("#materialSelector"),
                    options = $("<option/>",{"class" : "material-option"}),

                    addOption = function(){
                        if(group.children[0].material.type == "MultiMaterial"){
                            var materials = group.children[0].material.materials;
                            for(var i = 0, l = materials.length; i < l; i++){
                                var material = materials[i],
                                option = options.clone();
                                option.text(material.name);
                                option.attr("data-value",i);
                                option.appendTo("#material-selector");
                                if(i == 0) option.prop("selected",true);
                            }
                        }
                    }();

                    $("#material-selector").lubySelector({
                        id : "materialSelector",
                        width: "100%",
                        float: "none",
                        icon: "",
                        callback: toolbar.materialFn.materialSelect
                    });
                },
                materialSelect: function(){
                    var selected = $("#material-selector").find("option:selected"),
                    id = selected.data("value"),
                    materials = group.children[0].material;
                    material = materials.type == "MultiMaterial" ? materials.materials[id] : materials,
                    color = material.color;

                    material.color = new THREE.Color(0xffffff);
                    setTimeout(function(){
                        material.color = color;
                    },200);
                },
                materialTab: function(){
                    $this = $(this),
                    $target = $this.parent().siblings("." + $(this).data("value")),
                    $tabs = $this.parent().siblings(".material-control-inner"),
                    selected = $this.hasClass("selected");
                    if(selected){
                        $tabs.hide();
                        $target.show();
                    }
                    else $tabs.hide();
                },
                materialTexture: function(){
                    upload.textureUpload();
                },
                materialColor: function(color){
                    var $this = $(this),
                    $materials = group.children[0].material,
                    color = color.toRgbString();

                    if($materials.type == "MeshPhongMaterial"){}
                    else if($materials.type == "MultiMaterial"){
                        var id = $("#material-selector").find("option:selected").data("value"),
                        $material = $materials.materials[id],
                        kind = $this.parents(".material-controller").data("value");

                        switch(kind){
                            case "diffuse" : $material.color = new THREE.Color(color); break;
                            case "specular" : $material.specularColor = new THREE.Color(color); break;
                            default : $.error("color Error"); break;
                        }
                    }   
                },
                changeOpacity: function(val,selector){
                    var $this = selector,
                    val = val*0.01,
                    $materials = group.children[0].material;

                    if($materials.type == "MeshPhongMaterial"){}
                    else if($materials.type == "MultiMaterial"){
                        var id = $("#material-selector").find("option:selected").data("value"),
                        $material = $materials.materials[id],
                        kind = $this.parents(".material-controller").data("value");
                        console.log(kind);
                        switch(kind){
                            case "diffuse" : $material.opacity = val; break;
                            default : $.error("opacity Error"); break;
                        }
                    }
                }
            },
            backgroundTool: function(){
                var $this = $(document).find("#backgroundTool-toolbox"),

                $sortWrap = $("<div/>",{
                    "class" : "toolbox-inner", 
                    "id" : "sort-tool", 
                    "data-value" : "sort"
                }).appendTo($this),
                $sortLabel = $("<div>",{
                    "class" : "toolbox-label",
                    "html" : "Sort"
                }).appendTo($sortWrap)
            },
            backgroundFn: {
                sortable: function(event){
                    
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