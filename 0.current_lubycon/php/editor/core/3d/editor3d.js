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
        d = {},
        scene, camera, dirLight, ambLight, renderer, controls, stats,
        group, object, mtl, geometry, material, mesh,
        loadedMaterials = [],
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
                        $canvas = $("<div/>",{"id" : "web-gl"}).appendTo($editingArea);

                        //in header bt
                        var $headerBtWrap = $("<div/>",{"class" : "header-btn-wrapper"}).appendTo($header),
                        $fileUpbtn = $("<div/>",{
                            "class" : "header-btn fileUpload",
                            "html" : "File",
                            "data-tip" : "Upload your OBJ files"
                        }).prepend($("<i/>",{"class":icons.upload}))
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
                        var $lightTool = new toolbar.createButton("lightTool",icons.bulb).appendTo($aside),
                        $materialTool = new toolbar.createButton("materialTool",icons.cube).appendTo($aside),
                        $backgroundTool = new toolbar.createButton("backgroundTool",icons.image).appendTo($aside);
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

                        var alertKey = $("<div/>",{"class" : "alertKey"}).appendTo($header).hide();
                        //initModals
                        pac.initModal.fileSelector().appendTo($this).hide();
                        pac.initModal.textureWindow().appendTo($this).hide();
                        pac.initModal.thumbnail().appendTo($this).hide();
                        pac.initModal.setting().appendTo($this).hide();
                        // right : {project team}

                        pac.initTools();//data binding
                        pac.initGL();
                        //setInterval(pac.autoSave, 5 * 60000); // 5min to auto save temp all images

                        $(window).on("load",function(){ $(".modal.file-selector-modal").fadeIn(400); });
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
                    controls.dampingFactor = 0.1;
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
            windowResizeGl: function(){
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            },
            submit: function(){
                var rootElement = $(".initEditor"),
                content = rootElement.find(".editing-canvas").html(), //data
                contentName = rootElement.find("input[name='content-name']").val(), //data
                imgData = [],
                contentData = $(".obj-body .object-img").each(function () {
                    var $this = $(this),
                        val = $this.attr("data-value").split("-"),
                        innerVal = { "contentID": 'content' + val[0], "ext": val[1] };
                    imgData.push(innerVal)
                }),
                categories = [], //data
                tags = [], //data
                cc = { "by": true, "nc": true, "nd": true, "sa": false }, //data
                category = rootElement.find(".search-choice > span").each(function () { categories.push($(this).text()) }),
                tag = rootElement.find(".hashtag-list").each(function () { tags.push($(this).text()) }),
                descript = rootElement.find(".descript-input").text(),
                ccbox = rootElement.find(".cc-checkbox").each(function () {
                    var data = $(this).data("value");
                    cc[data] = $(this).prop("checked");
                }),
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

                $("#finalForm").submit();
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
                });
            },
            initTools: function(){
                //toolbar data bind start
                toolbar.lightTool();
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
                    $input = $("<input>", { "class" : "setting-input", "type" : "text" }),
                    $select = $("<select>", { "class" : "setting-select" }),
                    $option = $("<option/>",{"class" : "select-option"}),

                    $contentName = $inputWrap.clone()
                    .append($label.clone().html("Content Name"))
                    .append($input.clone().attr("name","content-name")).appendTo($innerLeft),

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
                    }(),

                    $hashtagName = $inputWrap.clone()
                    .append($label.clone().html("Hash Tag"))
                    .append($inputInner.clone().addClass("hashTag-input-wrap")
                        .append($("<input/>",{ "class" : "hashTag-input" }).on("keydown",modalFunc.detectTag)))
                    .appendTo($innerLeft),

                    $descriptName = $inputWrap.clone()
                    .append($label.clone().html("Description"))
                    .append($("<textarea/>",{ "class" : "descript-input" ,"name" : "contenst_description" })).appendTo($innerLeft),

                    //creative commons
                    $ccName = $inputWrap.clone(),
                    $ccLabel = $label.clone().html("Creative Commons"),
                    $ccInner = $inputInner.clone().addClass("cc-inner-wrapper"),
                    
                    $ccIconWrap = $("<ul/>",{ "class" : "cc-list-wrapper" }),
                    getLink = $("<a/>",{ "class" : "cc-list-link", "href" : "http://creativecommons.org/licenses/by-nc-nd/4.0", "target" : "_blank" }),
                    $changebt = $("<p/>",{
                        "class" : "cc-setting-bt",
                        "html" : "<i class='fa " + icons.refresh + "'></i>Change your license"
                    }).on("click",pac.dbToggle),
                    
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
                value = $this.data("value"),
                $toolboxWrap = $("<div/>",{
                    "class" : "toolbox-wrap",
                    "data-value" : value,
                    "id" : value + "-toolbox"
                }).appendTo($aside).hide();
                if(value == "gridTool") $toolboxWrap.addClass("modal");
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
            }
        },
        upload = {
            fileCheck: function(file){
                var size = file.size, // 30MB
                alertKey = $(document).find(".alertKey").off("click");
                if(size < 31457280){
                    return true;
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
                typeCheck = /(^image)\/(jpeg|png|gif|bmp)/i.test(type),
                alertKey = $(document).find(".alertKey").off("click");

                if(size < 10485760){
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
                        customText: "This file exceeds the recommended size.</br>The file currently sits at " + parseInt(size/1024/1024) + "MB.<br/>Please make sure your file size is under 10MB.",
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
                inputFile = $(document).find(".fileUploader");
                inputFile.click();
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
                target = $(document).find(".texture-list-wrapper").children(".upload-bt.btn")
                
                if(upload.imgCheck(object[0])){
                    $.each(object, function(i,file){
                        var reader = new FileReader(),
                        textureLoader = new THREE.TextureLoader();

                        reader.readAsDataURL(file);
                        reader.onload = function(event){
                            var newTexture = new toolbar.materialFn.addTextureObject(event.target.result,file.name);
                            textureLoader.load(event.target.result,function(texture){
                                loadedMaterials.push(texture);
                            });
                            newTexture.insertBefore(target);
                            pac.setIndex(".texture-list");
                            $inputFile.val(null); // init input value
                        };
                    });
                }
                else $inputFile.val(null);
            },
            textureApply: function(){
                var targetID = $("#material-selector").find("option:selected").data("value"),
                kind = $(".texture-viewer.uploading").parents(".material-controller").data("value"),

                selected = $(".texture-list-wrapper").find(".selected"),
                selectSRC = selected.find(".texture-img").attr("src"),
                selectID = selected.data("index"),

                selectMaterial = loadedMaterials[selectID],
                materials = mesh.material.materials;
                material = materials[targetID];
                
                switch(kind){
                    case "diffuse" : 
                        idCheck(selectID,"map");
                    break;
                    case "specular" : 
                        idCheck(selectID,"specularMap");
                    break;
                    case "normal" : 
                        idCheck(selectID,"normalMap");
                    break;
                    default: break;
                }
                console.log(group.children[0]);
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
                switch(ext){
                    case "obj" :
                        reader.addEventListener("load", function(event){
                            var contents = event.target.result;
                            group = new THREE.Group();
                            object = new THREE.OBJLoader().parse(contents);
                            console.log(object);
                            
                            for(var i = 0, l = object.length; i < l; i++){
                                geometry = object[i].geometry;
                                    geometry.center();
                                    geometry.dispose();

                                material = object[i].material;
                                if(material.type == "MeshPhongMaterial"){
                                    material.specular = new THREE.Color(0x000000);
                                    material.side = THREE.DoubleSide;
                                    material.transparent = true;
                                    material.needsUpdate = true;
                                    material.dispose();
                                }
                                else if(material.type = "MultiMaterial"){
                                    var materials = material.materials;
                                    for(var j = 0, ml = materials.length; j < ml; j++){
                                        materials[j].specular = new THREE.Color(0x000000);
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
                            console.log(group);
                        },false);
                        reader.readAsText(file);
                    break;
                    default: 
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

                        $(".license-selector").on("change",modalFunc.useCC);
                        $(".cc-checkbox").on("change",modalFunc.displayCC).on("change",modalFunc.makelinkCC);
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
                if(data == "nd" || data == "sa") modalFunc.ccNDSA();
                if(!selected) $target.stop().fadeOut(400);
                else $target.stop().fadeIn(400);
            },
            ccNDSA: function(){ //if you select nd(sa), sa(nd) will be disabled.
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
            }
        },
        headerTool = {

        },
        canvasTool = {
            
        },
        toolbar = {
            createButton: function(data,iconData){
                var tipData = disableCamelCase(data);
                var button = $("<div/>",{"class" : "btn", "data-value" : data, "data-tip" : tipData }),
                icon = $("<i/>",{"class" : iconData}).appendTo(button);

                button.on("click").on("click",pac.toggle).on("click",toolbar.toolbarToggle).tooltip({"top":5,"left" : 50});

                function disableCamelCase(text){ //camelCase -> Camel Case
                    var result = text.replace( /([A-Z])/g, " $1" ),
                    result = result.charAt(0).toUpperCase() + result.slice(1);
                    return result;
                }
                return button;
            },
            toolbarToggle: function(){
                var $this = $(this),
                value = $this.data("value"),
                toolBoxes = $(document).find(".toolbox-wrap"),
                toolBox = $(".toolbox-wrap[data-value=" + value + "]"),
                $darkOverlay = $(document).find(".dark_overlay");
                if($this.hasClass("selected")) {
                    toolBoxes.fadeOut(200);
                    toolBox.fadeIn(200);
                    //if(toolBox.hasClass("modal")) $darkOverlay.fadeIn(200);
                }
                else toolBox.fadeOut(200);
            },
            createMenu: function(content,name){
                var body = $("<div>",{ "class" : "toolbox-inner" }),
                label = $("<div/>",{ "class" : "toolbox-label", "html" : name }).appendTo(body);
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
            lightTool: function(){
                var $this = $(document).find("#textTool-toolbox");
                
            },
            lightFn: {
                
            },
            materialTool: function(){
                var $this = $(document).find("#materialTool-toolbox");

                var $selectBox = $("<select/>",{ "id" : "material-selector" }).hide(),
                $materialSelector = new toolbar.createMenu($selectBox,"Materials").attr({"id" : "materialSelect-tool","data-value" : "material-select"}).appendTo($this);
                
                var $materialDiffuse = new toolbar.createMenu(null,"Diffuse").attr({"id" : "materialDiffuse-tool","data-value" : "material-diffuse"}).appendTo($this);
                var $materialSpecular = new toolbar.createMenu(null,"Specular").attr({"id" : "materialSpecular-tool","data-value" : "material-specular"}).appendTo($this);
                var $materialNormal = new toolbar.createMenu(null,"Normal").attr({"id" : "materialNormal-tool","data-value" : "material-normal"}).appendTo($this);

                var $controllerBody = $("<div/>",{ "class" : "material-controller" }),
                $tabBtWrap = $("<div/>",{ "class" : "material-tab-bt-wrapper" }).appendTo($controllerBody),
                $tabLeftBt = $("<div/>",{ 
                    "class" : "material-tab btn",
                    "html" : "Texture",
                    "data-value" : "texture"
                }).on("click",pac.toggle).on("click",toolbar.materialFn.materialTab).appendTo($tabBtWrap),
                $tabRightBt = $tabLeftBt.clone(true).html("Color").attr("data-value","color").removeClass("selected").appendTo($tabBtWrap),

                $tabBody = $("<div/>",{ "class" : "material-control-inner" }).appendTo($controllerBody);
                
                $controllerBody.clone(true).attr("data-value","diffuse").appendTo($materialDiffuse);//diffuse
                $controllerBody.clone(true).attr("data-value","specular").appendTo($materialSpecular);//specular
                $controllerBody.clone(true).attr("data-value","normal").appendTo($materialNormal);

                toolbar.materialFn.addController();
            },
            materialFn: {
                addController: function(){
                    var $targets = $(document).find(".material-control-inner"),
                    $wrapper = $("<div/>",{ "class" : "material-control-panel"}),
                    $viewer = $("<div/>", { "class" : "material-control-viewer" }).appendTo($wrapper),
                    $textureViewer = $("<img/>",{
                        "class" : "texture-viewer material-viewer",
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
                            replacerClassName: "color-viewer material-viewer",
                            color: "#000000",
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
                        }).hide();
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

                    console.log(material.map);
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
                    $materialController = $this.parents(".material-controller"),
                    $target = $materialController.find("." + $(this).data("value") + "-viewer"),
                    $viewers = $materialController.find(".material-viewer"),
                    $slider = $materialController.find(".slider-wrapper"),
                    loadedMaterials = $(document).find(".texture-list.btn.custom"),
                    selected = $this.hasClass("selected");
                    if(selected){
                        $viewers.hide();
                        $target.show();
                        $slider.show().css("display","inline-block");
                        if(loadedMaterials.length === 0 && $target.is(".texture-viewer")){
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
                    var wrapper = $("<li/>",{"class" : "texture-list btn custom", "data-tip" : name }).tooltip({"top" : 45, "left" : 0}).on("click",pac.toggle),
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
                        kind = $this.parents(".material-controller").data("value");
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
                        kind = $this.parents(".material-controller").data("value");
                        console.log(val);
                        switch(kind){
                            case "diffuse" : $material.opacity = val*0.01; break;
                            case "specular" : $material.shininess = val; break;
                            default : $.error("opacity Error"); break;
                        }
                    }
                }
            },
            backgroundTool: function(){
                var $this = $(document).find("#gridTool-toolbox");
                
            },
            gridFn: {
                
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