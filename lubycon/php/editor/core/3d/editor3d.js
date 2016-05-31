/* ===========================================================
 *
 *  Name:          editor3d.js
 *  Updated:       2016-05-06
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
            submit: $.noop()
        },
        icons = iconPack, //icons.json
        keyCode = keycodePac, //keycode.json
        categoryData = categoryPac, //categories.json
        ccData = ccPac, //creative_commons.json
        bgPreset3d = backgroundPreset3d,
        bgPreset2d = backgroundPreset2d,
        d = {},
        scene, camera, dirLight, spotLight, hemiLight, renderer, controls, stats,
        group, object, mtl, geometry, material, mesh, skybox
        loadedMaterials = [],
        pac = {
            init: function (option) {
                return d = $.extend({}, defaults, option), this.each(function () {
                    if (!$(this).hasClass("initEditor")) $.error("Loading failed");
                    else {
                        console.log("editor is loaded");//function start
                        var $this = $(this);
                        var $darkOverlay = $(document).find(".dark_overlay").show();
                        var $loading_icon = $(document).find("#loading_icon").show();
                        //init object
                        var $wrapper = $("<div/>",{"class" : "editor-wrapper"}).appendTo($this),
                        $header = $("<div/>",{"class" : "editor-header"}).appendTo($wrapper),
                        $body = $("<div/>",{"class" : "editor-body"}).appendTo($wrapper),
                        $aside = $("<div/>",{"class" : "editor-aside"}).appendTo($body),
                        $editingBack = $("<div/>",{"class" : "editing-background"}).appendTo($body),
                        //canvas
                        $editingArea = $("<div/>",{"class" : "editing-area"}).appendTo($body),
                        $canvas = $("<div/>",{"id" : "web-gl"}).appendTo($editingArea),
                        $canvasBackground = $("<div/>",{"id" : "canvas-background"}).appendTo($editingArea),
                        $canvasLogo = $("<div/>",{"id" : "canvas-background-logo"}).appendTo($canvasBackground);

                        //in header bt
                        var $headerBtWrap = $("<div/>",{"class" : "header-btn-wrapper"}).appendTo($header),
                        $fileUpbtn = $("<div/>",{
                            "class" : "header-btn fileUpload",
                            "html" : "File",
                            "data-tip" : "Upload your OBJ files"
                        }).prepend($("<i/>",{"class":icons.upload})).hide()
                        .appendTo($headerBtWrap).on("click",modalFunc.showFileSelector).tooltip({"top" : 55, "left" : 0});

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
                        var $lightTool = new toolbar.createButton("lightTool","icon",icons.bulb,true).appendTo($aside).on("click",toolbar.disableTools),
                        $geometryTool = new toolbar.createButton("geometryTool","icon",icons.circle,true).appendTo($aside).on("click",toolbar.disableTools),
                        $materialTool = new toolbar.createButton("materialTool","icon",icons.football,true).appendTo($aside).on("click",toolbar.disableTools),
                        $backgroundTool = new toolbar.createButton("backgroundTool","icon",icons.image,true).appendTo($aside).on("click",toolbar.disableTools);
                        //input files
                        var $inputFile = $("<input/>",{
                            "class":"fileUploader editor-hidden",
                            "name":"fileUploader",
                            "type":"file"
                        }).insertAfter($header),
                        $inputImage = $("<input/>",{
                            "class":"imgUploader editor-hidden",
                            "name":"imgUploader",
                            "type":"file"
                        }).insertAfter($header);
                        $(".btn").each(pac.toolbox);
                        //initModals
                        pac.initModal.fileSelector().appendTo($this).hide();
                        pac.initModal.textureWindow().appendTo($this).hide();
                        pac.initModal.thumbnail().appendTo($this).hide();
                        pac.initModal.setting().appendTo($this).hide();
                        
                        var captureBt = $("<div/>",{ "class" : "capture-btn" }).appendTo($canvas).on("click",canvasTool.capture),
                        captureIcon = $("<i/>",{ "class" : icons.camera }).appendTo(captureBt);

                        pac.initTools();//data binding
                        pac.initGL();
                        //setInterval(pac.autoSave, 5 * 60000); // 5min to auto save temp all images

                        $(window).on("load",function(){ 
                            $(".modal.file-selector-modal").fadeIn(400);
                            $loading_icon.hide(); 
                        });
                        $(document).on("keydown",pac.initCamera);
                    }
                })
            },
            initGL: function(){
                'use strict';
                var windowWidth = window.innerWidth,
                    windowHeight = window.innerHeight - 100;

                var gl = document.getElementById("web-gl");

                scene = new THREE.Scene();
                camera = new THREE.PerspectiveCamera(45, windowWidth/windowHeight, 0.1, 10000);
                    camera.position.x = -2;
                    camera.position.y = 0.7;
                    camera.position.z = 2.5;
                spotLight = new THREE.SpotLight(0xffffff,0.1); //spot light color (lightColor,brightness)
                    spotLight.castShadow = true;
                    spotLight.receiveShadow = true;
                dirLight = new THREE.DirectionalLight(0xffffff,0.3); //direction light color (lightColor,brightness)
                   dirLight.position.set(100,100,100) //direction light position (x,y,z)

                hemiLight = new THREE.HemisphereLight(0xffffff,0xffbe54,1); //hemisphere light color(skyColor,groundColor,brightness)

                scene.add(camera, spotLight, hemiLight, dirLight);

                spotLight.target.position.set( 0, 1, -1 );
                spotLight.position.copy( camera.position );

                var skyGeometry = new THREE.SphereGeometry(500, 60, 40);
                var skyMaterial = new THREE.MeshBasicMaterial({
                    map: new THREE.TextureLoader().load(bgPreset3d[0].image)
                });
                    skyMaterial.side = THREE.BackSide;
                skybox = new THREE.Mesh(skyGeometry,skyMaterial);
                skybox.material.dispose();

                scene.add(skybox);

                renderer = new THREE.WebGLRenderer({ alpha: true, preserveDrawingBuffer: true });
                    renderer.setSize(windowWidth, windowHeight);
                    renderer.setPixelRatio(window.devicePixelRatio*1.5);
                    renderer.setClearColor(0x222222, 1);
                    renderer.shadowMap.enabled = true;
                    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
                    renderer.gammaInput = true;
                    renderer.gammaOutput = true;
                gl.addEventListener("webglcontextlost", function(event){
                    event.preventDefault();
                    alert("context is lost");
                    cancelAnimationFrame(animationID);
                }, false);
                gl.appendChild(renderer.domElement);

                controls = new THREE.OrbitControls(camera, renderer.domElement);
                    controls.enableDamping = true;
                    controls.dampingFactor = 0.1;
                    controls.rotateSpeed = 0.5;
                    controls.zoomSpeed = 0.5;
                    controls.maxDistance = 100;

                window.addEventListener("resize", pac.windowResizeGL, false);
                pac.animateGL();
            },
            animateGL: function(){
                controls.update();
                requestAnimationFrame(pac.animateGL);
                pac.renderGL();
            },
            renderGL: function(){
                renderer.render(scene, camera);
                spotLight.position.copy( camera.position );
            },
            windowResizeGL: function(){
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            },
            initCamera: function(event){
                var existSetting = $(".modal.setting-modal.prog.setting-window").css("display") === "none";
                if((event.which == keyCode.space) && existSetting){
                    camera.position.x = -2;
                    camera.position.y = 0.7;
                    camera.position.z = 2.5;
                    console.log("init Camera");
                };
            },
            submit: function(){
                var rootElement = $(".initEditor"),
                content = rootElement.find(".editing-canvas").html(), //data
                contentName = rootElement.find("input[name='content-name']").val(), //data
                imgData = [],
                contentData = scene.children.map(threeToJson),
                categories = [], //data
                tags = [], //data
                cc = { "by": true, "nc": true, "nd": true, "sa": false }, //data
                category = rootElement.find(".search-choice > span").each(function () { categories.push($(this).text()) }),
                tag = rootElement.find(".hashtag-list").each(function () { tags.push($(this).text()) }),
                descript = rootElement.find(".descript-input").text(),
                ccbox = rootElement.find(".cc-checkbox").each(function () {
                    var data = $(this).data("value");
                    cc[data] = $(this).prop("checked");
                });

                console.log(contentData);

                function threeToJson(obj,index){
                    var result = obj.toJSON();
                    return result;
                }
                /*
                $form = $("<form/>", {
                    "id": "finalForm",
                    "enctype": "multipart/form-data",
                    "method": "post",
                    "action": "./test.php"
                }),
                wrap = rootElement.wrapInner($form),

                geturl = function (key) {
                    var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
                    return result && result[1] || "";
                };

                $dummy = $("<input/>", { "type": "hidden", "id": "userid", "name": "userid" }).appendTo($("#finalForm")).val($("user_id").text()),
                $dummy = $("<input/>", { "type": "hidden", "id": "contents_cate", "name": "contents_cate" }).appendTo($("#finalForm")).val(geturl('cate')),
                $dummy = $("<input/>", { "type": "hidden", "id": "submitDummy" ,"name" : "content_html"}).appendTo($("#finalForm")).val(JSON.stringify(content)),
                $dummy = $("<input/>", { "type": "hidden", "id": "submitDummyImg", "name": "content_img" }).appendTo($("#finalForm")).val(JSON.stringify(imgData));
                */
                //$("#finalForm").submit();
            },
            autoSave: function () {
                var imgData = [],
                    contentData = $(".obj-body .object-img").each(function () {
                    var $this = $(this),
                        url = $this.find('img').attr("src"),
                        val = $this.attr("data-value").split("-"),
                        innerVal = { 'type': 'editor_content', 'data64': url, "index": val[0] };
                    imgData.push(innerVal)
                    }),
                    html_Data = $('.editing-canvas').html();
                $.ajax({
                    type: "POST",
                    url: "../../../ajax/editor_ajax_upload_test.php", // temp image file ajax post
                    data:
                    {
                        'ajax_data': imgData
                    },
                    cache: false,
                    success: function (data) {
                        console.log('auto save succece');
                    }
                })
            },
            initTools: function(){
                //toolbar data bind start
                toolbar.lightTool();
                toolbar.geometryTool();
                toolbar.materialTool();
                toolbar.backgroundTool();
                //toolbar data bind end
                $(window).on("load resize",function(){
                    $(".modal").each(function(){ ModalKit.align($(this)); });
                })
            },
            initModal: {
                fileSelector: function(){
                    var modal = new ModalKit.create(null,"file-selector-modal"),
                    wrapper = modal.find(".modal-wrapper"),
                    closebt = modal.find(".modal-closebt").remove(),
                    title = modal.find(".modal-title").text("File Select"),
                    content = modal.find(".modal-content"),
                    okbt = modal.find(".modal-okbt").text("Upload").attr("data-value","modal-closebt"),
                    cancelbt = modal.find(".modal-cancelbt").on("click",initInput);

                    var fileInputWrap = $("<div/>",{ "class" : "modal-input-wrapper" }).appendTo(content);
                    fileViewer = $("<input/>",{ "type" : "text", "class" : "modal-fileViewer", "readonly": "true" }).appendTo(fileInputWrap);
                    uploadBt = $("<div/>",{ "class" : "modal-bt modal-filebt", "html" : "Find", "data-value" : "newOBJUpload" }).on("click",upload.fileUpTrigger).appendTo(fileInputWrap);
                    fileSelectHelp = $("<i/>",{ 
                        "class" : icons.help + " file-selector-help",
                        "data-tip" : "Your file size must be under 30MB. The file extension must be OBJ"
                    }).tooltip({"top" : 30, "left" : -200}).appendTo(fileInputWrap);

                    function initInput(){ fileViewer.val(""); };

                    return modal;
                },
                textureWindow: function(){
                    //texture limit is 20 objects

                    var modal = new ModalKit.create(upload.textureApply,"texture-modal").addClass("texture-window"),
                    wrapper = modal.find(".modal-wrapper"),
                    title = modal.find(".modal-title").text("Texture"),
                    content = modal.find(".modal-content"),
                    okbt = modal.find(".modal-okbt").text("Apply").attr("data-value","modal-closebt");

                    var textureList = $("<ul/>",{"class" : "texture-list-wrapper" });

                    var texture = new toolbar.materialFn.addTextureObject(icons.transparent,"None").removeClass("custom").attr("data-index","-1").addClass("selected default").appendTo(content);

                    var uploadBt = $("<li/>",{"class" : "upload-bt btn", "data-value" : "newTexUpload"}).on("click",upload.fileUpTrigger),
                    uploadIcon = $("<i/>",{"class" : icons.plus}).appendTo(uploadBt)

                    textureList.append(texture).append(uploadBt).appendTo(content);

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
                    $input = $("<input>", { "class" : "setting-input", "type" : "text" }).on("keyup",defendQueryInjection),
                    $select = $("<select>", { "class" : "setting-select" }),
                    $option = $("<option/>",{"class" : "select-option"}),

                    $contentName = $inputWrap.clone()
                    .append($label.clone().html("Content Name"))
                    .append($input.clone(true).attr("name","content-name")).appendTo($innerLeft),

                    $categoryName = $inputWrap.clone()
                    .append($label.clone().html("Categories")).appendTo($innerLeft),
                    $categorySelect = $select.clone().addClass("chosen-select category").attr({
                        "data-placeholder" : "Choose your contents categories",
                        "multiple" : "",
                        "tabindex" : "8",
                        "name" : "contents_category[]"
                    }).appendTo($categoryName);

                    var categories = categoryData,
                    insertOption = function(){
                        var categoryBox = $categorySelect;
                        for(i in categories){ //categoryData is json
                            var option = $option.clone().html(categories[i]).attr("data-index",i);
                            option.appendTo(categoryBox);
                        }
                        categoryBox.chosen({  max_selected_options: 3 });
                    }();

                    var $hashtagName = $inputWrap.clone()
                    .append($label.clone().html("Tag"))
                    .append($inputInner.clone().addClass("hashTag-input-wrap")
                        .append($("<input/>",{ "class" : "hashTag-input" }).on("keydown",modalFunc.detectTag)))
                    .appendTo($innerLeft);
                    $hashtagName.find(".hashTag-input").on("keyup",defendQueryInjection);

                    var $descriptName = $inputWrap.clone()
                    .append($label.clone().html("Description"))
                    .append($("<textarea/>",{ "class" : "descript-input" ,"name" : "contenst_description" })).appendTo($innerLeft);
                    $descriptName.find(".descript-input").on("keyup",defendQueryInjection);

                    //creative commons
                    var $ccName = $inputWrap.clone(),
                    $ccLabel = $label.clone().html("Creative Commons"),
                    $ccInner = $inputInner.clone().addClass("cc-inner-wrapper"),
                    
                    $ccIconWrap = $("<ul/>",{ "class" : "cc-list-wrapper" }),
                    getLink = $("<a/>",{ "class" : "cc-list-link", "href" : "http://creativecommons.org/licenses/by-nc-nd/4.0", "target" : "_blank" }),
                    $changebt = $("<p/>",{
                        "class" : "cc-setting-bt",
                        "html" : "<i class='fa " + icons.refresh + "'></i>Change your license"
                    }).on("click",toggle.single),
                    
                    insertCCicons = function(){
                        var ccIconLi = $("<li/>",{ "class" : "cc-list"}),
                        $target = $ccIconWrap,
                        $img = $("<img/>",{ "src" : "#" });
                        for(var i = 0, l = ccData.length; i < l; i++){
                            var list = ccIconLi.clone().attr({"data-value":ccData[i].id, "data-tip":ccData[i].name})
                            .append($img.clone().attr("src",ccData[i].icon))
                            .appendTo($target).tooltip({"top":40, "left": 0});
                            if(ccData[i].id == "sa"){
                                list.hide();
                            }
                        }
                        $ccInner.append(getLink.append($target));
                    }();

                    $ccName.append($ccLabel).append($ccInner).append($changebt)
                    .on("click",modalFunc.showCCsetting).appendTo($innerRight);

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
            setIndex: function(element){
                var elements = $(document).find(element);
                elements.each(function(){
                    var $this = $(this),
                    index = $this.index(element) - 1;
                    if(!$this.is(".default")) $this.attr("data-index",index);
                });
            },
            disableCamelCase: function(text){ //camelCase -> Camel Case
                var result = text.replace( /([A-Z])/g, " $1" ),
                result = result.charAt(0).toUpperCase() + result.slice(1);
                return result;
            }
        },
        upload = {
            fileCheck: function(file){
                var size = file.size, // 30MB
                name = file.name,
                typeCheck = /.*\.obj/i.test(name),
                alertKey = $(document).find(".alertKey").off("click");
                if(size < 31457280){
                    if(typeCheck) return true;
                    else {
                        alertKey.lubyAlert({
                            kind: "confirm",
                            okAlert: false,
                            cancelButton: false,
                            cancelAlert: false,
                            width: 300,
                            height: 170,
                            textSize: 14,
                            customIcon: icons.box,
                            customText: "This file does not have the right extension.<br/>Please make sure it has the right extension.",
                            inSpeed: 600,
                            stoptime: 1000,
                            outSpeed: 600
                        });
                        alertKey.trigger("click");
                    }
                } 
                else {
                    alertKey.lubyAlert({
                        kind: "confirm",
                        okAlert: false,
                        cancelButton: false,
                        cancelAlert: false,
                        width: 450,
                        height: 180,
                        textSize: 14,
                        customIcon: icons.box,
                        customText: "This file exceeds the recommended size.</br>The file currently sits at " + parseInt(size/1024/1024) + "MB.<br/>Please make sure your file size is under 30MB.",
                        inSpeed: 600,
                        stoptime: 1000,
                        outSpeed: 600
                    });
                    alertKey.trigger("click");
                    return false;
                }
            },
            imgCheck: function(file){
                var size = file.size, // 10MB
                type = file.type, //jpg||jpeg, png, bmg, gif, zip
                name = file.name,
                typeCheck = /(^image)\/(jpeg|png|gif|bmp|targa)/i.test(type) && /.*\.(jpg|jpeg|png|gif|bmp|tga)/i.test(name),
                alertKey = $(document).find(".alertKey").off("click");
                if(size < 20971520){
                    if(typeCheck) return true;
                    else {
                        alertKey.lubyAlert({
                            kind: "confirm",
                            okAlert: false,
                            cancelButton: false,
                            cancelAlert: false,
                            width: 300,
                            height: 170,
                            textSize: 14,
                            customIcon: icons.box,
                            customText: "This file does not have the right extension.<br/>Please make sure it has the right extension.",
                            inSpeed: 600,
                            stoptime: 1000,
                            outSpeed: 600
                        });
                        alertKey.trigger("click");
                        return false;
                    }
                } 
                else {
                    alertKey.lubyAlert({
                        kind: "confirm",
                        okAlert: false,
                        cancelButton: false,
                        cancelAlert: false,
                        width: 450,
                        height: 180,
                        textSize: 14,
                        customIcon: icons.box,
                        customText: "This file exceeds the recommended size.</br>The file currently sits at " + parseInt(size/1024/1024) + "MB.<br/>Please make sure your file size is under 20MB.",
                        inSpeed: 600,
                        stoptime: 800,
                        outSpeed: 1000
                    });
                    alertKey.trigger("click");
                    return false;
                }
            },
            fileUpTrigger: function(){
                var data = $(this).data("value"),
                inputFile = data === "newOBJUpload" ? $(document).find(".fileUploader") : $(document).find(".imgUploader");
                inputFile.trigger("click");
                switch(data){
                    case "newOBJUpload" : inputFile.off("change").on("change",upload.objectUpload); break;
                    case "newTexUpload" : inputFile.off("change").on("change",upload.textureUpload); break;
                    default : $.error("This is not upload button"); break;
                }  
            },
            objectUpload: function(event){
                var $this = $(this),
                object = event.target.files,
                $inputModal = $(document).find(".modal.file-selector-modal"),
                $fileViewer = $inputModal.find(".modal-fileViewer"),
                $darkOverlay = $(document).find(".dark_overlay");

                if(upload.fileCheck(object[0])) {
                    upload.loaders(object[0]);
                    $inputModal.remove();
                    $darkOverlay.fadeOut(400);
                }
                else {
                    $this.val(null);
                    $fileViewer.val("");
                }

                return;
            },
            textureUpload: function(event){
                var $inputFile = $(this), 
                object = event.target.files,
                target = $(document).find(".texture-list-wrapper").children(".upload-bt.btn"),
                tgaCheck = /(^image)\/(targa)/i.test(object[0].type) && /.*\.(tga)/i.test(object[0].name);
                $loading_icon = $(document).find("#loading_icon");
                if(upload.imgCheck(object[0])){
                    $loading_icon.show();
                    $.each(object, function(i,file){
                        var reader = new FileReader();
                        var textureLoader;

                        if(tgaCheck) textureLoader = new THREE.TGALoader();
                        else textureLoader = new THREE.TextureLoader();
           
                        reader.readAsDataURL(file);
                        reader.onload = function(event){
                            var newTexture = new toolbar.materialFn.addTextureObject(event.target.result,file.name);
                            textureLoader.load(event.target.result,function(texture){
                                loadedMaterials.push(texture);
                                $loading_icon.hide();
                            });
                            newTexture.insertBefore(target);
                            pac.setIndex(".texture-list");
                            $inputFile.val(null); // init input value
                        };
                    });
                }
                else {
                    $inputFile.val(null);
                }
            },
            textureApply: function(){
                var targetID = $("#material-selector").find("option:selected").data("value"),
                kind = $(".texture-viewer.uploading").parents(".toolbox-controller").data("value"),

                selected = $(".texture-list-wrapper").find(".selected"),
                selectSRC = selected.find(".texture-img").attr("src"),
                selectID = selected.data("index"),

                selectMaterial = loadedMaterials[selectID],
                materials = mesh.material.materials;
                material = materials[targetID];
                
                switch(kind){
                    case "diffuse" : 
                        idCheck(selectID,"map");
                        material.textureIndex = selectID;
                    break;
                    case "specular" : 
                        idCheck(selectID,"specularMap");
                    break;
                    case "normal" : 
                        idCheck(selectID,"normalMap");
                    break;
                    default: break;
                }
                console.log(materials);
                $(".uploading").attr({"src" : selectSRC, "data-index" : selectID }).removeClass("uploading");

                function idCheck(id,kind){
                    if(id == -1){
                        material[kind] = null;
                        material.needsUpdate = true;
                    }
                    else{
                        material[kind] = selectMaterial;
                        material.needsUpdate = true;
                    }
                }
            },
            loaders: function(file){
                var reader = new FileReader();
                var filename = file.name;
                var ext = filename.split(".").pop().toLowerCase();
                var alertKey = $(document).find(".alertKey").off("click");
                var loading_icon = $(document).find("#loading_icon");
                switch(ext){
                    case "obj" :
                        loading_icon.show();
                        reader.addEventListener("load", function(event){
                            var contents = event.target.result;
                            group = new THREE.Group();
                            object = new THREE.OBJLoader().parse(contents);
                            
                            for(var i = 0, l = object.length; i < l; i++){
                                geometry = object[i].geometry;
                                    geometry.center();

                                material = object[i].material;
                                if(material.type == "MeshPhongMaterial"){
                                    material.specular = new THREE.Color(0xffffff);
                                    material.shininess = 0.06;
                                    material.side = THREE.DoubleSide;
                                    material.transparent = true;
                                    material.needsUpdate = true;
                                }
                                else if(material.type = "MultiMaterial"){
                                    var materials = material.materials;
                                    for(var j = 0, ml = materials.length; j < ml; j++){
                                        materials[j].specular = new THREE.Color(0xffffff);
                                        materials[j].shininess = 0.06;
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
                                    mesh.scale.set(1,1,1);   
                                group.add(mesh);
                            }
                            toolbar.materialFn.materialRefresh();
                            scene.add(group);
                            loading_icon.hide();
                            modalFunc.showFileInfo();
                        },false);
                        reader.readAsText(file);
                    break;
                    default: 
                        return false;
                    break;
                }
            }
        },
        modalFunc = {
            showFileSelector: function(){
                $(document).find(".dark_overlay").fadeIn(200);
                $(document).find(".modal").fadeOut(200);
                $(document).find(".modal.file-selector-modal").fadeIn(200);
            },
            showFileInfo: function(){
                if($(".fileinfo").length === 0){
                    var fileInfo = new modalFunc.fileInfo().appendTo("#web-gl").stop().fadeIn(300);
                }
                else {
                    $(".fileinfo").remove();
                    var fileInfo = new modalFunc.fileInfo().appendTo("#web-gl").stop().fadeIn(300);
                }
            },
            fileInfo: function(){
                console.log(mesh);
                var body = $("<div/>",{"class" : "tooltip tip-body fileinfo"}),
                wrapper = $("<div/>",{"class" : "tooltip tip-wraper fileinfo"}).appendTo(body),
                content = $("<p/>",{"class" : "tooltip tip-content fileinfo"}),
                title = $("<p/>",{"class" : "tooltip tip-title fileinfo"}).text("Model Info").appendTo(wrapper);

                var modelInfo = mesh.geometry.modelInfo,
                vertices = modelInfo.vertices

                var text = 
                    "Vertices : " + convertToKM(modelInfo.vertices) + "<br/>" +
                    "Faces : " + convertToKM(modelInfo.triFaces+modelInfo.quadFaces);
                    
                content.html(text).appendTo(wrapper);

                function convertToKM(number){
                    var result = number;
                    if(number >= 1000) {
                        if(number >= 100000) result = (number*0.00001).toFixed(2) + "M";
                        else result = (number*0.001).toFixed(2) + "K";
                    }
                    return result;
                }
                return body;
            },
            cropped: function(event){
                var $originImg = $(".thumb-origin-img");
                if($originImg.attr("src") != "#") {
                    var $this = $(this),
                    $object = $originImg.cropper("getCroppedCanvas",{width:250,height:215}), //croped image size fix
                    dataURL = $object.toDataURL("image/jpeg"); //export to jpeg
                    //console.log($object);
                    //console.log(dataURL); // for ajax

                    var dataArray = new Array;
                    dataArray[0] = { 'type': 'editor_thumb', 'data64': dataURL ,'index': null};

                    $.ajax({
                        type: "POST",
                        url: "../../../ajax/editor_ajax_upload_test.php", //ÀÌÆäÀÌÁö¿¡¼­ Áßº¹Ã¼Å©¸¦ ÇÑ´Ù
                        data: {
                            'ajax_data': dataArray
                        },
                        cache: false,
                        success: function (data) {
                            console.log(data);
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
                value = $this.val().trim(),
                endCommand = inKeyCode == keyCode.enter || inKeyCode == keyCode.space,
                deleteCommand = inKeyCode == keyCode.delete,
                wrapperExist = $this.prev("ul").length == 0;
                if(endCommand && value != ""){
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
                                else if(i === 1) disabled = true, checked = true;
                                else if(i === 2 || i === 3) disabled = false, checked = true;
                                else if(i === 4) disabled = true, checked = false;
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
            }
        },
        headerTool = {

        },
        canvasTool = {
            capture: function(){
                console.time("capture");
                canvasTool.shutter();
                var dataURL = renderer.domElement.toDataURL(),
                icon = $(this).find("i");
                icon.attr("class",icons.loading);
                $(".thumb-origin-img").attr("src",dataURL)
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
                $(".thumb-placeHolder").hide();
                setTimeout(function(){ icon.attr("class", icons.camera); },3000);
                console.timeEnd("capture");
            },
            shutter: function(){
                var shutter = $("<div/>").css({
                    "position" : "absolute",
                    "top" : "0",
                    "left" : "0",
                    "width": "100%",
                    "height": "100%",
                    "background" : "#ffffff",
                    "z-index" : "30000"
                }).appendTo("#web-gl").fadeOut(4000,function(){
                    $(this).remove();
                });
            }  
        },
        toolbar = {
            createButton: function(data,type,iconData,tooltip){
                var tipData = data !== null ? pac.disableCamelCase(data) : null;
                var button = $("<div/>",{"class" : "btn", "data-target" : data, "data-tip" : tipData }),
                icon = type === "icon" ? $("<i/>",{"class" : iconData}) : $("<img/>",{"src" : iconData});

                icon.appendTo(button);

                button.on("click").on("click",toggle.group).on("click",pac.tabAction)
                if(tooltip) button.tooltip({"top":5,"left" : 50});

                return button;
            },
            createRadioButton: function(data,type,iconData,tooltip){
                var button = new toolbar.createButton(data,type,iconData,tooltip);
                button.addClass("radioType");

                return button;
            },
            createMenu: function(content,name,switchs){
                var body = $("<div>",{ "class" : "toolbox-inner" }),
                labelWrap = $("<div/>",{"class" : "toolbox-label-wrapper"}).appendTo(body)
                label = $("<div/>",{ "class" : "toolbox-label", "html" : name }).appendTo(labelWrap),
                labelSwitch = switchs ? $("<input/>",{ "type" : "checkbox", "class" : "toolbox-label-checkbox" }).appendTo(labelWrap) : null;

                if(content !== null && typeof content === "object"){
                    if(content.length === 1){
                        content.appendTo(body);
                    }
                    else{
                        for(var i = 0, l = content.length; i < l; i++){
                            content[i].appendTo(body);
                        }
                    }
                    return body;
                }
                else {
                    return body
                }
            },
            disableTools: function(){
                var lightToolboxWrap = $(document).find(".toolbox-wrap[data-value='lightTool']"),
                onLights = lightToolboxWrap.find(".toolbox-inner.btn.radioType"),
                lightControls = scene.getObjectByName("lightControls"),
                lastAttachedLight = lightControls !== undefined ? lightControls.object : null;
                
                onLights.each(function(){
                    var helper = scene.getObjectByName("newLightHelper" + $(this).data("value"));

                    console.log("init");
                    helper.visible = false;
                    lightControls.visible = false; 
                });
                //lighttool init
                var geometryToolboxWrap = $(document).find(".toolbox-wrap[data-value='geometryTool']"),
                onRotateTool = geometryToolboxWrap.find(".checkbox-label.switch"),
                switchOn = onRotateTool.hasClass("selected");
            
                if(switchOn) onRotateTool.trigger("click");
            },
            lightTool: function(){
                var $this = $(document).find(".toolbox-wrap[data-value='lightTool']"),
                $triggerButton = $(".editor-aside").children(".btn[data-target='lightTool']").on("click",toolbar.lightFn.initLightTool);

                var light1 = new toolbar.createMenu(null,"Light1",true).attr({"data-value" : 0}).appendTo($this),
                lightCheckbox1 = light1.find(".toolbox-label-checkbox").on("change",toolbar.lightFn.onOff).lubyCheckbox();

                var light2 = new toolbar.createMenu(null,"Light2",true).attr({"data-value" : 1}).appendTo($this),
                lightCheckbox2 = light2.find(".toolbox-label-checkbox").on("change",toolbar.lightFn.onOff).lubyCheckbox();

                var light3 = new toolbar.createMenu(null,"Light3",true).attr({"data-value" : 2}).appendTo($this),
                lightCheckbox3 = light3.find(".toolbox-label-checkbox").on("change",toolbar.lightFn.onOff).lubyCheckbox();

                /*--------light setting---------*/
                var settingWrapper = $("<div/>",{"class" : "toolbox-tab-wrapper"});

                var $tabBtWrap = $("<div/>",{ "class" : "toolbox-tab-bt-wrapper" }).appendTo(settingWrapper),
                $tabBt = $("<div/>",{ "class" : "toolbox-tab btn radioType" })
                    .on("click",toggle.group)
                    .on("click",pac.tabAction)
                    .on("click",toolbar.lightFn.changeLight);

                var $directionBtn = $tabBt.clone(true).html("Directional").attr("data-target","directional").addClass("selected").appendTo($tabBtWrap),
                $spotLightBtn = $tabBt.clone(true).html("Spot").attr("data-target","spot").appendTo($tabBtWrap),
                $pointBtn = $tabBt.clone(true).html("Point").attr("data-target","point").appendTo($tabBtWrap);

                var $directionSetting = new toolbar.lightFn.LightSetting("directional").appendTo(settingWrapper),
                $spotSetting = new toolbar.lightFn.LightSetting("spot").appendTo(settingWrapper).hide(),
                $pointSetting = new toolbar.lightFn.LightSetting("point").appendTo(settingWrapper).hide();

                var settingWindow = new toolbar.createMenu(settingWrapper,"Setting",false).appendTo($this);

                settingWrapper.find(".colorKey").spectrum({
                    replacerClassName: "color-viewer light-viewer",
                    color: "#ffffff",
                    showInput: true,
                    showInitial: true,
                    preferredFormat: "hex3",
                    showPalette: true,
                    palette: [],
                    showSelectionPalette: true,
                    selectionPalette: [],
                    move: toolbar.lightFn.lightColor,
                    change: toolbar.lightFn.lightColor
                });

                settingWrapper.find(".sliderKey[data-value='color']").slider({
                    callback: toolbar.lightFn.intensity
                });
                settingWrapper.find(".sliderKey[data-value='falloff']").slider({
                    callback: toolbar.lightFn.falloff
                });
                settingWrapper.find(".sliderKey[data-value='angle']").slider({
                    callback: toolbar.lightFn.angle
                });
                settingWrapper.find(".sliderKey[data-value='softness']").slider({
                    callback: toolbar.lightFn.softness
                });
                /*--------light setting---------*/

            },
            lightFn: {
                LightSetting: function(light){
                    var body = $("<div/>",{"class" : "light-setting-wrapper toolbox-controller tab-target", "data-value" : light});

                    assembleList("Color",true,true).appendTo(body);

                    switch(light){
                        case "spot" : 
                            assembleList("Fall Off",false,true).appendTo(body);
                            assembleList("Angle",false,true).appendTo(body);
                            assembleList("Softness",false,true).appendTo(body);
                        break;
                        case "point" : 
                            assembleList("Fall Off",false,true).appendTo(body);
                        break;
                    }

                    function assembleList(title,colorBool,sliderBool){
                        var listWrap = $("<div/>",{"class" : "light-setting-list-wrapper"}),
                        listLabel = $("<div/>",{"class" : "light-setting-list-label"}),
                        list = $("<div/>",{ "class" : "light-setting-list" }),
                        sliderData = title.replace(/\s+/g,"").toLowerCase();

                        color = $("<input/>",{ "class" : "colorKey" }),
                        slider = $("<input/>",{ "type" : "range", "value" : 50, "max" : 100, "min" : 0, "data-value" : sliderData, "class" : "lightSlider sliderKey" });

                        listLabel.text(title).appendTo(listWrap);

                        if(colorBool) color.appendTo(list);
                        if(sliderBool) slider.appendTo(list);

                        list.appendTo(listWrap);

                        return listWrap;
                    }
                    return body;
                },
                onOff: function(event){
                    var $this = $(this),
                    toolboxInner = $this.parents(".toolbox-inner"),
                    data = toolboxInner.data("value"),
                    kind = $this.parents(".toolbox-wrap").find(".toolbox-tab.btn.selected").data("target"),
                    checked = $this.prop("checked"),
                    name = "newLight" + data,
                    helperName = "newLightHelper" + data,
                    exist = scene.getObjectByName(name) !== undefined;

                    if(checked){ //On
                        newLight = toolbar.lightFn.createLight(kind);
                        newLight[0].name = name;
                        newLight[0].position.y = 1;
                        newLight[1].name = helperName;
                        
                        scene.add(newLight[0],newLight[1]);

                        toolboxInner
                            .on("click",toolbar.lightFn.lightControls)
                            .addClass("btn radioType")
                            .on("click",toggle.group)
                            .on("click",toolbar.lightFn.refreshLightSetting);
                        toolboxInner.attr("data-type", kind);
                        $(document).on("keydown",toolbar.lightFn.lightControlKeyAction);
                    }
                    else{ //Off
                        if(exist) {
                            scene.remove(scene.getObjectByName(name));
                            scene.remove(scene.getObjectByName(helperName));

                            scene.getObjectByName("lightControls").detach();
                            scene.getObjectByName("lightControls").dispose();
                            scene.remove(scene.getObjectByName("lightControls"));
                        }
                        else $(document).off("keydown",toolbar.lightFn.lightControlKeyAction);
                        //This function is test function
                        setTimeout(function(){
                            $this.parents(".toolbox-inner")
                                .removeClass("btn radioType selected")
                                .off("click",toggle.group)
                                .off("click",toolbar.lightFn.lightControls)
                                .off("click",toolbar.lightFn.refreshLightSetting);
                            if($(document).find(".toolbox-inner.btn.radioType").length !== 0){
                                $(".toolbox-inner.btn.radioType").first().trigger("click");
                            }
                        },1);
                        //This function is test function
                    }
                },
                initLightTool: function(){
                    var $this = $(this), //toolbox-btn
                    selected = $this.hasClass("selected"),
                    toolboxWrap = $(document).find(".toolbox-wrap[data-value='lightTool']"),
                    onLights = toolboxWrap.find(".toolbox-inner.btn.radioType"),
                    lightControls = scene.getObjectByName("lightControls"),
                    lastAttachedLight = lightControls !== undefined ? lightControls.object : null;
                    
                    onLights.each(function(){
                        var helper = scene.getObjectByName("newLightHelper" + $(this).data("value"));
                        if(selected){
                            console.log("on");
                            helper.visible = true;
                            lightControls.visible = true;
                        }
                        else{
                            console.log("off");
                            helper.visible = false;
                            lightControls.visible = false;
                        }
                    });
                },
                lightControlKeyAction: function(event){
                    //this shortcut is same is 3dmax
                    var input = event.which,
                    _mode = null,
                    lightControls = scene.getObjectByName("lightControls");

                    if(lightControls === undefined) return;

                    switch(input){
                        case keyCode.w : _mode = "translate"; break;
                        case keyCode.e : _mode = "rotate"; break;
                        default: return; break;
                    }
                    console.log(input,_mode);
                    lightControls.setMode(_mode);
                },
                changeLight: function(){ //direction <-> spot <-> point
                    $this = $(this),
                    selector = $this.parents(".toolbox-inner").siblings(".toolbox-inner.selected"),
                    lightIndex = selector.data("value"),
                    kind = $this.data("target"),
                    name = "newLight" + lightIndex,
                    helperName = "newLightHelper" + lightIndex,
                    lightControls = scene.getObjectByName("lightControls"),
                    exist = scene.getObjectByName("newLight" + lightIndex) !== undefined;

                    if(exist){
                        scene.remove(scene.getObjectByName(name));
                        scene.remove(scene.getObjectByName(helperName));

                        var newLight = toolbar.lightFn.createLight(kind);

                        newLight[0].name = name;
                        newLight[0].position.y = 1;
                        newLight[1].name = helperName;

                        scene.add(newLight[0],newLight[1]);

                        lightControls.detach();
                        lightControls.attach(newLight[0]);

                        selector.attr("data-type",kind);
                        console.log("changeLight to " + kind);
                    }
                    else return false;
                },
                refreshLightSetting: function(){
                    var $this = $(this),
                    kind = $this.attr("data-type"),
                    light = scene.getObjectByName("newLight" + $this.data("value")),
                    tabs = $this.parents(".toolbox-wrap").find(".toolbox-tab.btn"),
                    currentTab = $this.parents(".toolbox-wrap").find(".toolbox-tab.btn[data-target='" + kind + "']"),

                    settingWindows = $(".light-setting-wrapper"),
                    currentSettingWindow = $(".light-setting-wrapper[data-value='" + kind + "']"),

                    colorViewer = currentSettingWindow.find(".colorKey"),
                    colorSlider = currentSettingWindow.find(".lightSlider[data-value='color']").siblings(".slider-text"),
                    fallOffSlider = currentSettingWindow.find(".lightSlider[data-value='falloff']").siblings(".slider-text"),
                    angleSlider = currentSettingWindow.find(".lightSlider[data-value='angle']").siblings(".slider-text"),
                    softnessSlider = currentSettingWindow.find(".lightSlider[data-value='softness']").siblings(".slider-text");

                    colorViewer.spectrum("set", "#" + light.color.getHexString());
                    colorSlider.val(light.intensity*100).trigger("change");
                    if(fallOffSlider.length !== 0) fallOffSlider.val((light.decay-1)*100).trigger("change");
                    if(angleSlider.length !== 0) angleSlider.val(light.angle*100).trigger("change");
                    if(softnessSlider.length !== 0) softnessSlider.val(light.penumbra*100).trigger("change");

                    //test code
                    tabs.removeClass("selected");
                    currentTab.addClass("selected");
                    settingWindows.hide();
                    currentSettingWindow.show();
                    //test code
                },
                createLight: function(kind){
                    var result = [];
                    switch(kind){
                        case "directional" : 
                            result[0] = new THREE.DirectionalLight(0xffffff,0.5);
                            result[1] = new THREE.DirectionalLightHelper(result[0],1);
                            result[0].helper = result[1];
                        break;
                        case "spot" : 
                            result[0] = new THREE.SpotLight(0xffffff,0.5);
                            result[0].angle = Math.PI/6;
                            result[0].decay = 1.5;
                            result[0].penumbra = 0.5;
                            result[1] = new THREE.SpotLightHelper(result[0]);
                            result[0].helper = result[1];
                        break;
                        case "point" : 
                            result[0] = new THREE.PointLight(0xffffff,0.5,100);
                            result[0].decay = 1.5;
                            result[1] = new THREE.PointLightHelper(result[0],1);
                            result[0].helper = result[1];
                        break;
                        default : return false;
                    }

                    return result;
                },
                lightControls: function(event){
                    event.stopPropagation();
                    var $this = $(this),
                    lightIndex = $this.data("value"),
                    light = scene.getObjectByName("newLight" + lightIndex),
                    helper = scene.getObjectByName("newLightHelper" + lightIndex),
                    exist = scene.getObjectByName("lightControls") === undefined,
                    lightControls = exist ? new THREE.TransformControls(camera,renderer.domElement) : scene.getObjectByName("lightControls");

                    if($this.hasClass("selected")) return false;
                    else {
                        if(exist){
                            lightControls.name = "lightControls";
                            lightControls.addEventListener("change",pac.renderGL);

                            scene.add(lightControls);
                            lightControls.setMode("translate");
                            lightControls.space = "world";
                            lightControls.setSize(1);
                            lightControls.attach(light);
                        }
                        else{
                            lightControls.detach();
                            lightControls.attach(light);
                        }     
                    }
                },
                lightColor: function(color){
                    var $this = $(this),
                    color = color.toRgbString();
                    lightIndex = $this.parents(".toolbox-inner").siblings(".toolbox-inner.selected").data("value"),
                    light = scene.getObjectByName("newLight" + lightIndex),
                    helper = scene.getObjectByName("newLightHelper" + lightIndex);

                    light.color = new THREE.Color(color);
                    helper.update();
                    console.log(light,helper);
                },
                intensity: function(val,selector){
                    console.log("intensity");
                    var $this = selector,
                    lightIndex = $this.parents(".toolbox-inner").siblings(".toolbox-inner.selected").data("value"),
                    light = scene.getObjectByName("newLight" + lightIndex),
                    helper = scene.getObjectByName("newLightHelper" + lightIndex);

                    light.intensity = val*0.01;
                    helper.update();
                },
                falloff: function(val,selector){
                    console.log("falloff");
                    var $this = selector;
                    lightIndex = $this.parents(".toolbox-inner").siblings(".toolbox-inner.selected").data("value"),
                    light = scene.getObjectByName("newLight" + lightIndex),
                    helper = scene.getObjectByName("newLightHelper" + lightIndex);

                    light.distance = val;
                    helper.update();
                    console.log(light.decay);
                    //0~1.0(float)
                    //spot,point
                },
                angle: function(val,selector){
                    console.log("angle");
                    var $this = selector;
                    lightIndex = $this.parents(".toolbox-inner").siblings(".toolbox-inner.selected").data("value"),
                    light = scene.getObjectByName("newLight" + lightIndex),
                    helper = scene.getObjectByName("newLightHelper" + lightIndex);

                    light.angle = val*0.01;
                    helper.update();
                    //0~90 dgree(float)
                    //spot
                },
                softness: function(val,selector){
                    console.log("softness");
                    var $this = selector;
                    lightIndex = $this.parents(".toolbox-inner").siblings(".toolbox-inner.selected").data("value"),
                    light = scene.getObjectByName("newLight" + lightIndex),
                    helper = scene.getObjectByName("newLightHelper" + lightIndex);

                    light.penumbra = val*0.01;
                    helper.update();
                    //0~1.0(float)
                    //spot
                }
            },
            geometryTool: function(){
                var $this = $(document).find(".toolbox-wrap[data-value='geometryTool']"),
                $triggerButton = $(".editor-aside").children(".btn[data-target='geometryTool']").on("click",toolbar.geometryFn.initRotateTool);

                var rotateTool = new toolbar.createMenu(null,"Rotate",true).appendTo($this);
                $rotateCheckbox = rotateTool.find(".toolbox-label-checkbox").attr("id","rotate-check").on("change",toolbar.geometryFn.transform);
                $rotateCheckbox.lubyCheckbox();

                var $viewmodeWrapper = $("<div/>",{ "class" : "viewmode-wrapper toolbox-btns" }),
                realisticMode = new toolbar.createRadioButton("realistic","img",icons.realistic,true).addClass("selected").attr("data-value","realistic").appendTo($viewmodeWrapper),
                cleanMode = new toolbar.createRadioButton("cleanSurface","img",icons.clean,true).attr("data-value","clean").appendTo($viewmodeWrapper),
                transparentMode = new toolbar.createRadioButton("transparency","img",icons.transparency,true).attr("data-value","transparent").appendTo($viewmodeWrapper),
                wireMode = new toolbar.createRadioButton("wireframe","img",icons.wireframe,true).attr("data-value","wireframe").appendTo($viewmodeWrapper),
                wireCleanMode = new toolbar.createRadioButton("wireframeAndClean","img",icons.wireclean,true).attr("data-value","wireclean").appendTo($viewmodeWrapper),

                viewmodeTool = new toolbar.createMenu($viewmodeWrapper,"View mode",false).appendTo($this)
                .find(".btn.radioType").on("click",toolbar.geometryFn.viewModeChecker);
            },
            geometryFn: {
                initRotateTool: function(){
                    var $this = $(this), //toolbox-btn
                    selected = $this.hasClass("selected"),
                    toolboxWrap = $(document).find(".toolbox-wrap[data-value='geometryTool']"),
                    onRotateTool = toolboxWrap.find(".checkbox-label.switch"),
                    switchOn = onRotateTool.hasClass("selected");

                    if(selected) return;
                    else {
                        if(switchOn) onRotateTool.trigger("click");
                    }
                },
                transform: function(){
                    var $this = $(this),
                    checked = $this.prop("checked"),
                    objectControls,gridHelper,axisHelper;
                    
                    if(checked){
                        objectControls = new THREE.TransformControls(camera,renderer.domElement);
                        gridHelper = new THREE.GridHelper(3,0.5);
                        axisHelper = new THREE.AxisHelper(50);

                        objectControls.name = "objectControls";
                        objectControls.addEventListener( 'change', pac.renderGL );
                        objectControls.attach(group);
                        gridHelper.name = "gridHelper";
                        axisHelper.name = "axisHelper";

                        scene.add(objectControls,gridHelper,axisHelper);
                        objectControls.setMode("rotate");
                        objectControls.space = "world";
                        objectControls.update();
                    }
                    else{ 
                        objectControls = scene.getObjectByName("objectControls");
                        gridHelper = scene.getObjectByName("gridHelper");
                        axisHelper = scene.getObjectByName("axisHelper");

                        objectControls.detach(group);
                        objectControls.dispose();

                        scene.remove(objectControls);
                        scene.remove(gridHelper);
                        scene.remove(axisHelper);
                    }
                },
                viewModeChecker: function(result){
                    var $this = $(this),
                    data = $this.data("value");

                    switch(data){
                        case "realistic" : 
                            toolbar.geometryFn.materialViewControl(true);
                            toolbar.geometryFn.xrayViewControl(false);
                            toolbar.geometryFn.wireframeControl(false);
                        break;
                        case "clean" : 
                            toolbar.geometryFn.materialViewControl(false);
                            toolbar.geometryFn.xrayViewControl(false);
                            toolbar.geometryFn.wireframeControl(false); 
                        break;
                        case "transparent" : 
                            toolbar.geometryFn.materialViewControl(false);
                            toolbar.geometryFn.xrayViewControl(true);
                            toolbar.geometryFn.wireframeControl(false);
                        break;
                        case "wireframe" : 
                            toolbar.geometryFn.materialViewControl(false);
                            toolbar.geometryFn.xrayViewControl(false);
                            toolbar.geometryFn.wireframeControl(true,false);
                        break;
                        case "wireclean" : 
                            toolbar.geometryFn.materialViewControl(false);
                            toolbar.geometryFn.xrayViewControl(false);
                            toolbar.geometryFn.wireframeControl(true,true);
                        break;
                        default: return false; break;
                    }
                },
                materialViewControl: function(bool){
                    var materials = mesh.material.materials;

                    if(bool){
                        for(var i = 0, l = materials.length; i < l; i++){
                            var textureIndex = materials[i].textureIndex;

                            if(textureIndex !== -1){
                                materials[i].map = loadedMaterials[textureIndex];
                                materials[i].needsUpdate = true;
                            }
                        }
                    }
                    else{
                        for(var i = 0, l = materials.length; i < l; i++){
                            materials[i].map = null;
                            materials[i].needsUpdate = true;
                        }
                    }
                },
                xrayViewControl: function(bool){
                    var materials = mesh.material.materials;

                    if(bool){
                        for(var i = 0, ml = materials.length; i < ml; i++){
                            materials[i].opacity = 0.5;
                        }
                    }
                    else{
                        for(var i = 0, ml = materials.length; i < ml; i++){
                            materials[i].opacity = 1;
                        }
                    }
                },
                wireframeControl: function(bool,helper){
                    if(bool){
                        var exist = scene.getObjectByName("wireframeHelper");
                        if(exist === undefined){
                            var wireframeHelper = new THREE.WireframeHelper(mesh,0x48cfad);
                            wireframeHelper.name = "wireframeHelper";
                            scene.add(wireframeHelper);  
                        }
                        if(!helper) mesh.material.visible = false;
                        else mesh.material.visible = true;
                    }
                    else{
                        mesh.material.visible = true;
                        scene.remove(scene.getObjectByName("wireframeHelper"));
                    }
                }
            },
            materialTool: function(){
                var $this = $(document).find(".toolbox-wrap[data-value='materialTool']");

                var $selectBox = $("<select/>",{ "id" : "material-selector" }).hide(),
                $materialSelector = new toolbar.createMenu($selectBox,"Materials").attr({"id" : "materialSelect-tool","data-value" : "material-select"}).appendTo($this);
                
                var $materialDiffuse = new toolbar.createMenu(null,"Diffuse",false).attr({"id" : "materialDiffuse-tool","data-value" : "material-diffuse"}).appendTo($this);
                var $materialSpecular = new toolbar.createMenu(null,"Specular",false).attr({"id" : "materialSpecular-tool","data-value" : "material-specular"}).appendTo($this);
                var $materialNormal = new toolbar.createMenu(null,"Normal",false).attr({"id" : "materialNormal-tool","data-value" : "material-normal"}).appendTo($this);

                var $controllerBody = $("<div/>",{ "class" : "toolbox-controller" }),
                $tabBtWrap = $("<div/>",{ "class" : "toolbox-tab-bt-wrapper" }).appendTo($controllerBody),
                $tabLeftBt = $("<div/>",{ 
                    "class" : "toolbox-tab btn",
                    "html" : "Texture",
                    "data-target" : "texture-window"
                }).on("click",toggle.group).on("click",pac.tabAction).on("click",showSlider).appendTo($tabBtWrap),
                $tabRightBt = $tabLeftBt.clone(true).html("Color").attr("data-target","color-window").removeClass("selected").appendTo($tabBtWrap);
                $tabLeftBt.on("click",firstMaterialCheck);

                var $tabBody = $("<div/>",{ "class" : "material-control-inner" }).appendTo($controllerBody);
                
                $controllerBody.clone(true).attr("data-value","diffuse").appendTo($materialDiffuse);//diffuse
                $controllerBody.clone(true).attr("data-value","specular").appendTo($materialSpecular);//specular
                $controllerBody.clone(true).attr("data-value","normal").appendTo($materialNormal);

                toolbar.materialFn.addController();

                function showSlider(){
                    var $this = $(this),
                    $slider = $this.parents(".toolbox-controller").find(".slider-wrapper");
                    if($this.hasClass("selected")) $slider.css("display","inline-block").show();
                    else $slider.hide();
                }
                function firstMaterialCheck(){
                    var $this = $(this); 
                    trigger1 = $this.parent().siblings(".material-control-inner").find(".texture-viewer.material-viewer.tab-target"),
                    trigger2 = $(".modal.texture-window").find(".texture-list.btn.default") 
                    material = $(".modal.texture-window").find(".texture-list.btn.custom");
                    if(material.length === 0){
                        trigger1.trigger("click");
                        trigger2.trigger("click");
                    }
                }
            },
            materialFn: {
                addController: function(){
                    var $targets = $(document).find(".material-control-inner"),
                    $wrapper = $("<div/>",{ "class" : "material-control-panel"}),
                    $viewer = $("<div/>", { "class" : "material-control-viewer" }).appendTo($wrapper),
                    $textureViewer = $("<img/>",{
                        "class" : "texture-viewer material-viewer tab-target",
                        "src" : icons.transparent,
                        "data-value" : "texture-window",
                        "data-index" : "-1"
                    }).on("click",ModalKit.show).appendTo($viewer).on("click",toolbar.materialFn.textureWindowSync).hide(),
                    $colorViewer = $("<input/>",{ "type" : "text", "class" : "colorKey" }).appendTo($viewer),
                    $slider = $("<input/>",{
                        "class" : "material-control-slider sliderKey",
                        "type" : "range",
                        "value" : 100,
                        "max" : 100,
                        "min" : 0
                    }).appendTo($wrapper);

                    $targets.each(function(){
                        $wrapper.clone(true).appendTo($(this));
                        $(this).find(".colorKey").spectrum({
                            replacerClassName: "color-viewer material-viewer tab-target",
                            color: "#ffffff",
                            showInput: true,
                            showInitial: true,
                            preferredFormat: "hex3",
                            showPalette: true,
                            palette: [],
                            showSelectionPalette: true,
                            selectionPalette: [],
                            move: toolbar.materialFn.materialColor,
                            change: toolbar.materialFn.materialColor
                        });
                        $(".color-viewer.material-viewer.tab-target").attr("data-value","color-window")
                        $(this).find(".sliderKey").slider({
                            callback: toolbar.materialFn.sliderAction
                        });
                    });
                },
                textureWindowSync: function(){
                    $textureWindow = $(document).find(".modal.texture-window"),
                    selectedTexture = $textureWindow.find(".texture-list.btn.selected"),
                    index = $(document).find(".uploading").attr("data-index"),
                    targetTexture = $textureWindow.find(".texture-list.btn[data-index='" + index + "']");
                    
                    selectedTexture.removeClass("selected");
                    targetTexture.addClass("selected");
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
                    id = selected.data("value");

                    var $diffuseTool = $("#materialDiffuse-tool"),
                    $specularTool = $("#materialSpecular-tool"),
                    $normalTool = $("#materialNormal-tool"),
                    textureViewer = ".texture-viewer.material-viewer",
                    colorViewer = ".colorKey",
                    opacitySlider = ".slider-text";

                    var materials = group.children[0].material;
                    material = materials.type == "MultiMaterial" ? materials.materials[id] : materials,
                    color = material.color;

                    var diffuseColor = "#" + color.getHexString(),
                    specularColor = "#" + material.specular.getHexString();

                    //synchronize  material controller start
                    if(material.map !== null){
                        var diffuseTexture = material.map.image.currentSrc;
                        $diffuseTool.find(textureViewer).attr({"src" : diffuseTexture});
                    }
                    else $diffuseTool.find(textureViewer).attr({"src" : icons.transparent, "data-index" : "-1"});

                    if(material.specularMap !== null){
                        var specularTexture = material.specularMap.image.currentSrc;
                        $specularTool.find(textureViewer).attr("src",specularTexture);
                    }
                    else $specularTool.find(textureViewer).attr({"src" : icons.transparent, "data-index" : "-1"});

                    if(material.normalMap !== null){
                        var normalTexture = material.normalMap.image.currentSrc;
                        $normalTool.find(textureViewer).attr("src",normalTexture);
                    }
                    else $normalTool.find(textureViewer).attr({"src" : icons.transparent, "data-index" : "-1"});

                    $diffuseTool.find(colorViewer).spectrum("set", diffuseColor); //diffuse color sync
                    $specularTool.find(colorViewer).spectrum("set", specularColor); //specular color sync
                    
                    $diffuseTool.find(opacitySlider).val(parseInt(material.opacity*100)).trigger("change"); //opacity sync
                    //synchronize material controller end

                    material.color = new THREE.Color(0xffffff);
                    setTimeout(function(){
                        material.color = color; //select blink action
                    },200);
                },
                materialTab: function(){
                    $this = $(this),
                    $materialController = $this.parents(".toolbox-controller"),
                    $target = $materialController.find("." + $(this).data("value") + "-viewer"),
                    $viewers = $materialController.find(".material-viewer"),
                    $slider = $materialController.find(".slider-wrapper"),
                    loadedTexture = $(document).find(".texture-list.btn.custom"),
                    selected = $this.hasClass("selected");
                    if(selected){
                        $viewers.hide();
                        $target.show();
                        $slider.show().css("display","inline-block");
                        if(loadedTexture.length === 0 && $target.is(".texture-viewer")){
                            $target.trigger("click"); //texture modal is open
                            $("."+$target.data("value")).find(".upload-bt.btn").trigger("click"); //file upload window is open
                        }
                    }
                    else {
                        $viewers.hide();
                        $slider.hide();
                    }
                },
                addTextureObject: function(src,name){
                    var wrapper = $("<li/>",{"class" : "texture-list btn custom", "data-tip" : name }).tooltip({"top" : 45, "left" : 0}).on("click",toggle.group),
                    textureImg = $("<img/>",{"class" : "texture-img", "src" : src}).appendTo(wrapper),
                    selectedTexture = $(".modal.texture-modal").find(".texture-list.btn.selected");

                    selectedTexture.removeClass("selected");
                    wrapper.addClass("selected");

                    return wrapper;
                },
                materialColor: function(color){
                    var $this = $(this),
                    $materials = group.children[0].material,
                    color = color.toRgbString();

                    if($materials.type == "MeshPhongMaterial"){}
                    else if($materials.type == "MultiMaterial"){
                        var id = $("#material-selector").find("option:selected").data("value"),
                        $material = $materials.materials[id],
                        kind = $this.parents(".toolbox-controller").data("value");
                        console.log(kind);
                        switch(kind){
                            case "diffuse" : $material.color = new THREE.Color(color); break;
                            case "specular" : $material.specular = new THREE.Color(color); break;
                            default : console.log("color Error"); break;
                        }
                    }   
                },
                sliderAction: function(val,selector){
                    var $this = selector,
                    $materials = group.children[0].material;

                    if($materials.type == "MeshPhongMaterial"){}
                    else if($materials.type == "MultiMaterial"){
                        var id = $("#material-selector").find("option:selected").data("value"),
                        $material = $materials.materials[id],
                        kind = $this.parents(".toolbox-controller").data("value");
                        switch(kind){
                            case "diffuse" : $material.opacity = val*0.01; break;
                            case "specular" : $material.shininess = val; break;
                            default : $.error("opacity Error"); break;
                        }
                        console.log(val);
                    }
                }
            },
            backgroundTool: function(){
                var $this = $(document).find(".toolbox-wrap[data-value='backgroundTool']");

                var $tabBtWrap = $("<div/>",{ "class" : "toolbox-tab-bt-wrapper" }),
                $tabBt = $("<div/>",{ "class" : "toolbox-tab btn" }).on("click",toggle.group).on("click",pac.tabAction);

                var $3dBt = $tabBt.clone(true).html("3D").attr("data-target","3d").addClass("selected").appendTo($tabBtWrap),
                $2dBt = $tabBt.clone(true).html("Image").attr("data-target","2d").appendTo($tabBtWrap),
                $colorBt = $tabBt.clone(true).html("Color").attr("data-target","color").appendTo($tabBtWrap);

                var $backgroundSelect = new toolbar.createMenu($tabBtWrap,"Background",false).appendTo($this);

                var $controllerBody = $("<div/>",{ "class" : "toolbox-controller tab-target" });
                var $3DSelector = $("<select/>",{"id" : "bg-3d-selector","class" : "backgroundSelector","data-value" : "3d"}),
                $2DSelector = $("<select/>",{"id" : "bg-2d-selector","class" : "backgroundSelector", "data-value" : "2d"}),
                $colorSelector = $("<input/>",{"id" : "bg-color-selector","class" : "backgroundSelector", "data-value" : "color"});

                $controllerBody.clone().attr("data-value","3d").append($3DSelector).appendTo($backgroundSelect);
                $controllerBody.clone().attr("data-value","2d").append($2DSelector).appendTo($backgroundSelect).hide();
                $controllerBody.clone().attr("data-value","color").append($colorSelector).appendTo($backgroundSelect).hide();

                toolbar.backgroundFn.addPresets($this);
            },
            backgroundFn: {
                addPresets: function(target){
                    var preset3d = bgPreset3d,
                    preset2d = bgPreset2d,
                    selector = target.find(".backgroundSelector");

                    selector.each(function(){
                        var $this = $(this),
                        data = $(this).data("value");

                        switch(data){
                            case "3d": 
                                addOption(preset3d,$this);
                                $this.lubySelector({
                                    id : "bg-3dSelector",
                                    width: "100%",
                                    float: "none",
                                    icon: "",
                                    callback: toolbar.backgroundFn.background3d,
                                    tooltip: true
                                });
                                $("#bg-3dSelector").find(".ls_option").tooltip({left: 270,appendTo: $this.parents(".toolbox-controller") });
                            break;
                            case "2d": 
                                addOption(preset2d,$this);
                                $this.lubySelector({
                                    id : "bg-2dSelector",
                                    width: "100%",
                                    float: "none",
                                    icon: "",
                                    callback: toolbar.backgroundFn.background2d,
                                    tooltip: true
                                });
                                $("#bg-2dSelector").find(".ls_option").tooltip({left: 270, appendTo: $this.parents(".toolbox-controller") });
                            break;
                            case "color": 
                                $this.spectrum({
                                    replacerClassName: "color-viewer background-viewer",
                                    color: "#222222",
                                    showInput: true,
                                    showAlpha: true,
                                    showInitial: true,
                                    preferredFormat: "hex3",
                                    showPalette: true,
                                    palette: [],
                                    showSelectionPalette: true,
                                    selectionPalette: [],
                                    move: toolbar.backgroundFn.backgroundColor,
                                    change: toolbar.backgroundFn.backgroundColor
                                });
                            break;
                            default: return false; break;
                        }
                    });

                    function addOption(preset,element){
                        var options = $("<option/>");

                        for(var i = 0, l = preset.length; i < l; i++){
                            var option = options.clone().attr({
                                "data-value" : preset[i].id,
                                "data-tip" : "<img src='" + preset[i].preview + "' />"
                            }).text(preset[i].name).appendTo(element);
                        }
                    }
                },
                background3d: function(){
                    var selected = $("#bg-3d-selector").find("option:selected"),
                    id = selected.data("value"),
                    $loading_icon = $(document).find("#loading_icon").show(),
                    background2d = $(document).find("#cavnas-background"),
                    loader = new THREE.TextureLoader();

                    background2d.css("background-image","none");

                    loader.load(bgPreset3d[id].image,function(texture){
                        skybox.material.map = texture;
                        skybox.material.opacity = 1.0;
                        skybox.material.transparent = false;
                        skybox.material.needsUpdate = true;
                        skybox.material.dispose();
                        $loading_icon.hide();
                    });
                    //light
                    switch(id){
                        case 0 : 
                            //dirLight.color = new THREE.Color(0xffd689);
                            hemiLight.groundColor = new THREE.Color(0xffbe54);
                        break;//desert
                        case 1 : 
                            //dirLight.color = new THREE.Color(0xffffff); 
                            hemiLight.groundColor = new THREE.Color(0xffffff);
                        break;//room
                        case 2 : 
                            //dirLight.color = new THREE.Color(0xb9ffff); 
                            hemiLight.groundColor = new THREE.Color(0xd9edff);
                        break;//snow mountain
                    }
                },
                background2d: function(){
                    var selected = $("#bg-2d-selector").find("option:selected"),
                    id = selected.data("value"),
                    $loading_icon = $(document).find("#loading_icon").show(),
                    $background = $(document).find("#canvas-background"),
                    $img = $background.find("#canvas-background-logo");
                    
                    $img.css("background-image","url(" + bgPreset2d[id].image + ")");
                    toolbar.backgroundFn.clearRendererColor();
                    $loading_icon.hide();
                },
                backgroundColor: function(color){
                    var background = $(document).find("#canvas-background"),
                    logo = background.find("#canvas-background-logo");

                    background.css("background-color",color.toHexString());
                    toolbar.backgroundFn.clearRendererColor();
                },
                clearRendererColor: function(){
                    skybox.material.map = null;
                    skybox.material.transparent = true;
                    skybox.material.opacity = 0.0;
                    skybox.material.needsUpdate = true;
                    skybox.material.dispose();

                    dirLight.color = new THREE.Color(0xffffff);
                    hemiLight.groundColor = new THREE.Color(0xffffff);

                    renderer.setClearColor(0x222222, 0);
                }
            }
        },
        method = {
            destroy: function () {
                return this.each(function(){
                    console.log("tested");
                })
            },
            getFileValue: function(){
                return this.each(function(){
                    console.log($(".fileUploader").val());
                });
            }
        }
        return method[option] ? 
        method[option].apply(this, Array.prototype.slice.call(arguments, 1)) : 
        "object" != typeof option && option ? 
            ($.error('No such method "' + option + '" for the Editor instance'), void 0) : 
            pac.init.apply(this, arguments);
};
})(jQuery);

