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