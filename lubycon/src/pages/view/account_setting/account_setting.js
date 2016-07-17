$(function (){ //account setting script
    $(document).ready(function(){
        initAccountSetting();
        initLubySelectors();
        initProfileCropper();
        optionButtonControl($(".langWrap"),4);
        optionButtonControl($(".historyWrap"),20);
        $("#delete_account_bt").on("click",deleteAccountEvent);
        $("#submit_bt").on("click",finalSubmit);
    });

    var unloadChecker = true;
    var inputAction = {
        blank: function(){
            var $this = $(this);
        },
        true: function(){
            var $this = $(this);
            $this.removeClass("error");
        },
        false: function(){
            var $this = $(this);
            $this.addClass("error");
        }
    };


    function initAccountSetting(){
        var optControlBt = $(".optControl"),
            historySortBt = $(".fa.fa-refresh.refresh"),
            inputs = $("#account_setting_form").find("input[type='text']").add("textarea");
            inputs.on("keyup",valueCheck);

        optControlBt.each(function(){
            $(this).width($(this).prev().width());
        });

        optControlBt.on("click",optionController);
        historySortBt.on("click",sortHistory);
        window.onbeforeunload = function(){
            console.log(unloadChecker);
            if(unloadChecker) return "a";
        };

        function valueCheck(){
            value = $(this).val();
            if(value.isSpecialChar()) inputAction.false.call($(this));
            else inputAction.true.call($(this));
        }
    }

    function initLubySelectors(){
        $("#lang_minus_id").hide();
        $(".privacyFilter").lubySelector({
            width: 120,
            theme: "white",
            icon: "fa fa-lock",
            float: "none"
        });
        $(".jobFilter").lubySelector({
            width: 300,
            theme: "white",
            "float": "none",
            "icon": "fa fa-suitcase"
        });
        $(".locationFilter").lubySelector({
            width: 300,
            theme: "white",
            "float": "none",
            searchBar: true,
            "icon": "fa fa-globe"
        });
        $(".langFilter0").lubySelector({
            width: 150,
            theme: "white",
            "float":"none"
        });
        $(".accountFilter").lubySelector({
            maxHeight:200,
            float: "none",
            theme: "white"
        });
    }

    function LanguageContainer(){
        var index = $(document).find(".langWrap").length;
        var body = $("<div/>",{ "class" : "langWrap clone-wrapper" }),
        input = $("<input/>",{
            "type" : "text",
            "class" : "language_text",
            "name" : "language[]"
        }).appendTo(body),
        optionWrapper = $("<div/>",{
            "class" : "lang_option"
        }).appendTo(body),
        selector = $("<select>",{
            "class" : "langFilter",
            "name" : "lang_ability[]"
        }).appendTo(optionWrapper),
        option = $("<option>",{ "class" : "lang_level" });

        $.each(["Beginner","Advanced","Fluent"],function(i,value){
            console.log(value);
            option.clone().text(value).appendTo(selector);
        });

        return body;
    }

    function HistoryContainer(){
        var original = $(document).find(".historyWrap").first(),
        clone = original.clone(true);
        var index = original.length;
        clone.find(".history_text").val("");
        clone.find(".lubySelector").lubySelector("setValue",0);

        return clone;
    }

    function optionController(event){
        eventHandler(event, $(this));
        var $this = $(this),
        type = $this.data("value"),
        wrapper = $this.siblings(".clone-list"),
        target = wrapper.find(".clone-wrapper"),
        limit, object;

        if(target.hasClass("langWrap")){
            limit = 4;
            object = new LanguageContainer();
        }
        else if(target.hasClass("historyWrap")){
            limit = 20;
            object = new HistoryContainer();
        }

        if(type === "add"){
            var lubySelector = object.find(".lubySelector");
            object.appendTo(wrapper);
            if(lubySelector.length === 0) object.find("select").lubySelector({"theme" : "white"});
        }
        else if(type === "remove"){
            target.last().remove();
        }
        else {
            console.log("optionController ERROR : account_setting:245");
            return false;
        }

        target = wrapper.find(".clone-wrapper");
        optionButtonControl(target,limit);
    }

    function optionButtonControl(element,limit){
        var addBt = element.parent().siblings(".optControl[data-value='add']"),
        removeBt = element.parent().siblings(".optControl[data-value='remove']");

        if(element.length <= limit && element.length === 1){
            removeBt.hide();
        }
        else removeBt.show();

        if(element.length >= limit) addBt.hide();
        else addBt.show();
    }

    function sortHistory(event){
        console.log("sortHistory");
        eventHandler(event, $(this));
        var history_array = [];
        $('.historyWrap').each(function (index) {
            history_array.push({
                'index':  index,
                'year': $(this).find('.accountFilter[data-value="year"]').val(),
                'month': $(this).find('.accountFilter[data-value="month"]').val(),
                'kind': $(this).find('.accountFilter[data-value="kind"]').val(),
                'text': $(this).find('.history_text').val()
            });
            console.log(history_array[index]);
        });
        aftersort = history_array.sort(CompareForSort);
        function CompareForSort(first, second) {
            if (first.year == second.year) // sort by year
                if (first.month < second.month) { // if same value year, sort by month
                    return -1; //bigger than second month
                } else{
                    return 1; //bigger than first month
                }
            if (first.year < second.year)
                return -1; // bigger than second year
            else {
                return 1; // bigger than first year
            }
        }
        $('.historyWrap').each(function (index) {
            var selectors = $(this).find(".accountFilter");
            var inputText = $(this).find(".history_text");
            var i = index;
            selectors.each(function(index){
                var $this = $(this),
                data = $this.data("value");

                $this.val(aftersort[i][data]);
                $this.siblings(".ls_Label").text(aftersort[i][data]);
            });
            inputText.val(aftersort[index].text);
        });
    }

    function initProfileCropper(){
        $("#profile-upload-bt").click(function () {
            $("#profile_uploader").trigger("click");
        });

        $(document).on("change","#profile_uploader",function (event) {
            var object = event.target.files;

            $.each(object,function(i,file){
                var calcSize = file.calcUnit();
                if(file.checkSize(10485760)){
                    if(file.checkExt(["jpg","jpeg","png","gif","bmp"])){
                        showImage(file);
                    }
                    else {
                        $(".alertKey").lubyAlert({
                            type: "message",
                            cancelButton: false,
                            fontSize: 14,
                            icon: "fa-inbox",
                            text: "This file does not have the right extension.<br/>Please make sure it has the right extension.",
                            autoDestroy: false
                        });
                    }
                }
                else {
                    $(".alertKey").lubyAlert({
                        type: "message",
                        cancelButton: false,
                        fontSize: 14,
                        icon: "fa-inbox",
                        text: "This file exceeds the recommended size.</br>The file currently sits at " +
                        calcSize[0] + calcSize[1] + ".<br/>Please make sure your file size is under 10MB.",
                        autoDestroy: false
                    });
                }
            });

            $(this).val(null);
        });

        $(document).on("click", "#crop-bt", function () {
            var isNotExist = $("#cropper_img").attr("src") === undefined;
            if(isNotExist) return false;

            var $object = $("#cropper_img").cropper("getCroppedCanvas", { width: 100, height: 100 });

            dataURL = $object.toDataURL("image/jpeg");
            var dataArray = [];
            dataArray = dataURL;

            $.ajax({
                type: "POST",
                url: "../ajax/profile_upload_ajax.php", //path
                data:{
                    'profile': dataArray
                },
                cache: false,
                success: function (data) {
                    $("#croped").empty();
                    $("#croped").append($object);
                    $("#croped").next("i").hide();
                    $("#cropper-preview").hide();
                    $("#cropper-wrapper").hide();
                    $(".cropper-container").remove();
                }
            });
        });
        $.ajax(function(){

        });

        function showImage(file) {
            var $loading_icon = $(document).find("#loading_icon").show();
            if (file) {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function (e) {
                    $('#cropper_img').attr('src', e.target.result);

                    $(".cropper-container").remove();
                    $("#cropper_img").cropper({
                        minCanvasWidth: 150,
                        minCanvasHeight: 150,
                        minContainerWidth: 200,
                        minContainerHeight: 200,
                        aspectRatio: 1 / 1,
                        autoCropArea: 0.6,
                        viewMode: 3,
                        responsive: true,
                        moveable: true,
                        preview: "#cropper-preview",
                        dragMode: "crop"
                    }).show();
                    $("#cropper-preview").show().css("display","inline-block");
                    if($("#croped").width() !== 0) $("#cropper-window-wrapper > i").show().css("display","inline-block");
                    $("#cropper-wrapper").show();
                    $("#cropper_img").cropper("replace", e.target.result);
                    $loading_icon.hide();
                };
            }
        }
    }

    function deleteAccountEvent(){
        $(this).lubyAlert({
            type: "message",
            icon: "fa-trash-o",
            text: "Are you sure?<br/><p style='font-size: 14px; font-weight: 200;'>Your contents and information is will be removed</p>",
            autoDestroy: false,
            okAction: deleteAccount
        });

        function deleteAccount(){
            alert("DELETE ACCOUNT");
        }
    }

    function finalSubmit(){
        var errorCheck = true;
        unloadChecker = false;
        inputs = $("#account_setting_form").find("input[type='text']").add("textarea");
        inputs.each(function(){
            if($(this).hasClass("error")) errorCheck = false;
        });

        if(errorCheck) alert("SUCCESS");
        else alert("PLEASE MAKE SURE YOUR VALUES");
    }
});
