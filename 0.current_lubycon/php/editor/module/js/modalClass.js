var modalKit = {
    create: function(action,className){
        var body = $("<div/>",{ "class":"modal " + className }),
        wrapper = $("<div/>",{ "class" : "modal-wrapper " + className }).appendTo(body),
        title = $("<div/>",{ "class" : "modal-title " + className }).appendTo(wrapper),
        closeBt = $("<div/>",{ "class" : "modal-closebt " + className, "data-value" : "modal-closebt" }).on("click",modalKit.cancel).appendTo(wrapper),
        content = $("<div/>",{ "class" : "modal-content " + className }).appendTo(wrapper),
        btWrap = $("<div/>",{ "class" : "modal-bt-wrapper " + className }).appendTo(wrapper),
        btCancel = $("<div/>",{
            "class" : "modal-bt modal-cancelbt " + className,
            "html" : "Cancel",
            "data-value" : "modal-closebt"
        }).on("click",modalKit.cancel).appendTo(btWrap),
        btOk = $("<div/>",{"class" : "modal-bt modal-okbt " + className}),
        action = action || 0;

        if(typeof action === "object"){
            for(var i = 0, l = action.length; i < l; i++){
                btOk.on("click",action[i]);
            }
            btOk.appendTo(btWrap);
        }
        else if(typeof action === "function") {
            btOk.on("click",action);
            btOk.appendTo(btWrap);
        }
        else btWrap.remove();

        return body;
    },
    align: function(selector){
        $this = selector,
        width = $this.width(),
        height = $this.height(),
        windowWidth = $(window).width(),
        windowHeight = $(window).height(),
        hrAlign = (width/2)*-1,
        vtAlign = (windowHeight/2 - height/2) - 20;
        $this.css({ "top" : vtAlign+"px", "margin-left" : hrAlign+"px", "left" : "50%"});
    },
    show: function(){
        var $this = $(this),
        data = $this.data("value"),
        $uploading = $(document).find(".uploading"),
        $target = $(document).find("."+data),
        $darkOverlay = $(document).find(".dark_overlay"),
        $input = $target.find("textarea");
        $target.fadeIn(300);
        $darkOverlay.fadeIn(300);

        $input.focus().on("keydown",this.keyEvent);
        if($uploading.length !== 0) $uploading.removeClass(".uploading");

        $this.addClass("uploading");
        modalKit.align($target);
    },
    cancel: function(){
        var $this = $(this),
        $window = $this.parents(".modal"),
        $input = $window.find("textarea") || $window.find("input"),
        $grid = $window.find(".grid-edit-window"),
        $btns = ".header-btn",
        $currentProg = $(document).find(".current-prog"),
        data = $currentProg.data("value");

        $input.val(null);
        if($window.hasClass("prog")) $currentProg.prev($btns).trigger("click");
        else if($window.attr("id") == "gridTool-toolbox") $grid.empty(), $(".btn.selected").removeClass("selected"); 
        console.log("cancel");
    },
    keyEvent: function(event){
        console.log("KeyEvent");
    }
}