/////////////////////////////////////////////////////
// This is function is must be used in editor only //
/////////////////////////////////////////////////////
var setIndex = function(element){
    console.log("SET INDEX",element);
    $(element).each(function(i,object){
        i = $(object).is(".canvas-obj") ? i-1 : i;
        if(!$(object).is(".placeHolder"))$(object).attr("data-index",i);
    });
};

var UImodule = {
    createButton: function(data,type,iconData,tooltip,isToggle){
        var tipData = data !== null ? data.disableCamelCase() : null;
        var button = $("<div/>",{"class" : "btn", "data-target" : data, "data-tip" : tipData }),
        icon = null;
        switch(type){
            case "icon" : icon = $("<i/>",{"class" : iconData}); break;
            case "image" : icon = $("<img/>",{"src" : iconData}); break;
            case "text" : icon = $("<p/>",{ "html" : iconData }); break;
            default : icon = $("<i/>",{"class" : "fa fa-filter"}); break;
        }

        icon.appendTo(button);

        if(isToggle) button.on("click",toggle.group).on("click",UImodule.tabAction);
        if(tooltip) button.tooltip({"top":5,"left" : 50});

        return button;
    },
    createRadioButton: function(data,type,iconData,tooltip,isToggle){
        var button = new UImodule.createButton(data,type,iconData,tooltip,isToggle);
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
            label.css({"display" : "inline-block"});
            return body;
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
    }
}

var editorFileChecker = function(params){
    //file,kind,type,parentArray,alertKey
    var size = params.file.size,
    calcSize = params.file.calcUnit(),
    name = params.file.name,
    limitSize, extensions, message;
    
    params.alertKey.off("click");
    detectType();
    
    var isNotExist = params.isExistTest ? params.file.isExistInArray(params.parentArray) === -1 : true,
    sizeCheck = params.file.checkSize(limitSize),
    typeCheck = params.file.checkExt(extensions);

    if(isNotExist){
        if(sizeCheck){
            if(typeCheck) return true;
            else message = "This file does not have the right extension.<br/>Please make sure it has the right extension.";
        }
        else message = "This file exceeds the recommended size.</br>The file currently sits at " + 
                        calcSize[0] + calcSize[1] + ".<br/>Please make sure your file size is under " + (limitSize/1024/1024).toFixed(2) + "MB.";
    }
    else message = "This file is already uploaded";

    params.alertKey.lubyAlert({
        kind: "confirm",
        okAlert: false,
        cancelButton: false,
        cancelAlert: false,
        width: 300,
        height: 210,
        textSize: 14,
        customIcon: params.icons.box,
        customText: message
    });
    params.alertKey.trigger("click");

    return false;

    function detectType(){
        if(params.kind === "2d"){
            if(params.type === "file"){
                limitSize = 31457280;
                extensions = ["zip","jpg","jpeg","png","gif","bmp"];
            }
            else {
                limitSize = 10485760;
                extensions = ["jpg","jpeg","png","gif","bmp"];
            }
        }
        else if(params.kind === "3d"){
            if(params.type === "object"){
                limitSize = 31457280;
                extensions = ["obj"];
            }
            else if(params.kind === "file"){
                limitSize = 31457280;
                extensions = ["obj","zip","mtl","jpg","jpeg","png","gif","bmp","tga"];
            }
            else{
                limitSize = 20971520;
                extensions = ["jpg","jpeg","png","gif","bmp","tga"];
            }
        }
        else {
            return false;
        }
    }
}
