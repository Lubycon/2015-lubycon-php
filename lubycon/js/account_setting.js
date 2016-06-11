/////////////////////////////////////////////////////////////////////////////
function luby_selcetor_val_change(selector_name , origin_selcet){
    $(selector_name).find('select:eq(0)').val(origin_selcet);
    $(selector_name).find('.ls_Label:eq(0)').text(origin_selcet);
}
/////////////////////////////////////////////////////////////////////////////
//please remove this daniel




$(function (){ //account setting script
    $(document).ready(function(){
        initAccountSetting();
        initLubySelectors();
        languageControl();
        historyControl();
        initProfileCropper();
        $("#submit_bt").on("click",finalSubmit);
    });

    var passwordChangeEnable = false;
    var currentPasswordCheck = false;
    var newPasswordCheck = false;
    var newPasswordCheck2 = false;

    var inputAction = {
        blankAction: function(element){
            var $this = element;
            var $checkIcon = $this.siblings(".check-icon");
            var $checkMessage = $this.siblings(".check-message");

            $this.css({ "border-left" : "1px solid #aaaaaa" });
            $checkIcon.attr("class","check-icon");
            $checkMessage.text("").show();
            console.log("blank");
        },
        trueAction: function(element){
            var $this = element;
            var $checkIcon = $this.siblings(".check-icon");

            $this.css({ 'border-left': '5px solid #48cfad' });
            $checkIcon.attr("class","check-icon");
            $checkIcon.addClass('fa fa-check');
            console.log("true input");
        },
        falseAction: function(element){
            var $this = element;
            var $checkIcon = $this.siblings(".check-icon");

            $this.css({ 'border-left': '5px solid #ec6446' });
            $checkIcon.attr("class","check-icon");
            $checkIcon.addClass('fa fa-times');
            console.log("false input");
        }
    }

    function initAccountSetting(){
        var changeBt = $("#change_pass"),
        passwordWindows = $("#account_setting_section").find("input[type='password']");

        changeBt.on("click",function (){ //change pass remove attr
            var $this = $(this);
            console.log(passwordWindows);
            if(!$this.hasClass("enabled")){
                $this.addClass("enabled");
                passwordWindows.prop("disabled",false);
                $this.text("Cancel");
                passwordChangeEnable = true;
            }
            else{
                $this.removeClass("enabled");
                passwordWindows.prop("disabled",true);
                $this.text("Change Password");
                passwordWindows.each(function(){
                    $(this).val("");
                    $(this).siblings(".check-icon").attr("class","check-icon");
                    $(this).siblings(".check-message").text("").show();
                });
                passwordChangeEnable = false;
            }
        });

        passwordWindows.on("blur",function(){
            var $this = $(this),
            data = $this.data("value");
            switch(data){
                case "current-password" : checkCurrentPassword.call($this); break;
                case "password" : checkPassword.call($this); break;
                case "re-password" : checkPasswordAgain.call($this); break;
                default : return false; break;
            }
        });

        function checkCurrentPassword(){
            var $this = $(this),
            value = $this.val(); //USER WROTE PASSWARD

            $.ajax({
                type: "POST",
                url: "php/account/overlap_check.php",
                data: 'data=' + value + '&' + 'id=nick',
                cache: false,
                success: function (data) {
                    if (data == ""){
                        inputAction.blankAction($this);
                        console.log("RETURN VALUE IS EMPTY FROM DATABASE");
                    }
                    else if (data == 1){
                        checkMessage.text(value + ' is exist already').show();
                        inputAction.falseAction($this);
                        console.log("THIS IS EXIST IN DATABASE");
                    }
                    else if (data == 0){
                        checkMessage.text('').show();
                        inputAction.trueAction($this);
                        nicknameCheck = true;
                        console.log("THIS IS USABLE");
                    }
                    else{
                        checkMessage.text("Database is not response. Please do again").show();
                        inputAction.falseAction($this);
                        console.log("QUERY ERROR");
                    }
                }
            });
        }

        function checkPassword() {
            var $this = $(this);
            var $repeatPassword = $(this).parents(".account_input_wrap.userinfo").next().find("input");
            var checkMessage = $this.siblings(".check-message");
            var value = $this.val();

            newPasswordCheck = false;

            var checking = value.isPassword();

            switch(checking){
                case 0 : 
                    newPasswordCheck = true;
                    checkMessage.text("").show();
                    inputAction.trueAction($this);
                    inputAction.blankAction($repeatPassword);
                break;
                case 1 : 
                    inputAction.blankAction($this);
                    inputAction.blankAction($repeatPassword);
                break;
                case 2 : 
                    checkMessage.text("You must write 10words at least").show();
                    inputAction.falseAction($this);
                    inputAction.blankAction($repeatPassword);
                break;
                case 3 : 
                    checkMessage.text('You must write the Alpabet at least one').show();
                    inputAction.falseAction($this);
                    inputAction.blankAction($repeatPassword);
                break;
                case 4 : 
                    checkMessage.text('You can not write special characters').show();
                    inputAction.falseAction($this);
                    inputAction.blankAction($repeatPassword);
                break;
                case 5 : 
                    checkMessage.text('Repeat 3 words').show();
                    inputAction.falseAction($this);
                    inputAction.blankAction($repeatPassword);
                break;
                case 6 :
                    checkMessage.text('You can not write "null"').show();
                    inputAction.falseAction($this);
                    inputAction.blankAction($repeatPassword);
                break;
                default: return false; break;
            }
        };

        function checkPasswordAgain() { // repeat pass check
            var $this = $(this);
            var $password = $(this).parents(".account_input_wrap.userinfo").prev().find("input");
            var checkMessage = $this.siblings(".check-message");
            var originalCheckMessage = $password.siblings(".check-message");
            var value = $this.val();

            newPasswordCheck2 = false;

            if(value.isNullString()) inputAction.blankAction($this); 
                
            else if(value !== $password.val()) { //not same
                checkMessage.text("This is not same").show();
                inputAction.falseAction($this);
            } 
            else if(value === $password.val()) { //complite
                checkMessage.text('').show();
                inputAction.trueAction($this);
                newPasswordCheck2 = true;
            }
        };
    }
    
    function initLubySelectors(){
        $("#lang_minus_id").hide();
        $(".privacyFilter").lubySelector({
            width: 100,
            theme: "white",
            icon: "fa fa-lock",
            float: "none"
        })
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

    function languageControl(){
        var index;
        var cloneWrapper = $(document).find("#clone_div"),
        addBt = $(document).find("#lang_plus"),
        removeBt = $(document).find("#lang_minus");

        addBt.on("click touchend", addLangauge);
        removeBt.on("click touchend", removeLanguage);

        function addLangauge(event){
            eventHandler(event, $(this));
            var language;
            index = $(document).find(".langWrap").length;
            if(index < 4){
                language = new LanguageContainer(index);
                language.appendTo(cloneWrapper);
                language.find("select").lubySelector({
                    theme:"white",
                    "float":"none"
                });
                removeBt.show();
                if(index === 3) $(this).hide();
            }
            else return false;
        }
        function removeLanguage(event){
            eventHandler(event, $(this));
            index = $(document).find(".langWrap").length;

            if(index > 1){
                addBt.show();
                $("#clone_div > div:last-child").remove();
                if(index === 2) $(this).hide();
            }
            else return false;
        }

        function LanguageContainer(index){
            var body = $("<div/>",{ "class" : "langWrap" }),
            wrapper = $("<div/>",{ "class" : "lang_section", "id" : "lang_clone" + index}).appendTo(body),
            input = $("<input/>",{ 
                "type" : "text", 
                "class" : "language_text",
                "id" : "lang_input_" + index, 
                "name" : "language[]"
            }).appendTo(wrapper),
            optionWrapper = $("<div/>",{ 
                "class" : "lang_option", 
                "id" : "lang_option_1" + index 
            }).appendTo(wrapper),
            selector = $("<select>",{ 
                "class" : "langFilter" + index, 
                "name" : "lang_ability[]" 
            }).appendTo(optionWrapper),
            option = $("<option>",{ "class" : "lang_level" });
            
            $.each(["Beginner","Advanced","Fluent"],function(i,value){
                console.log(value);
                option.clone().text(value).appendTo(selector);
            });

            return body;
        }
    }

    function historyControl(){
        var index;
        var cloneWrapper = $(document).find(".history_cell");

        var addBt = $(document).find("#history_plus"),
        removeBt = $(document).find("#history_minus"),
        refreshBt = $(document).find(".refresh");

        addBt.on("click touchend", addHistory);
        removeBt.on("click touchend", removeHistory);
        refreshBt.on("click touchend", sortHistory);

        function addHistory(event){
            eventHandler(event, $(this));
            var oldHistory = $(document).find(".history_data");
            index = oldHistory.length;

            var newHistory = oldHistory.first().clone(true);
            newHistory.find(".history_text").val("");
            newHistory.appendTo(cloneWrapper);
            removeBt.show();

            newHistory.find(".lubySelector").lubySelector("setValue",0);
        }
        function removeHistory(event){
            eventHandler(event, $(this));
            index = $(document).find(".history_data");

            if(index > 1){
                $(".history_cell").find(".history_data").last().remove();
                if(index === 2) removeBt.hide();
            }

        }
        function sortHistory(event){
            eventHandler(event, $(this));
            var history_array = [];
            $('.history_cell .history_data').each(function (index) {
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
            $('.history_data').each(function (index) {
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
    }

    function initProfileCropper(){
        $("#profile-upload-bt").click(function () {
            $("#profile_uploader").click();
        });

        $(document).on("change","#profile_uploader",function () {
            showImage(this);
            $(this).val(null);
        });

        $(document).on("click", "#crop-bt", function () {
            var $object = $("#cropper_img").cropper("getCroppedCanvas", { width: 100, height: 100 });

            $("#croped").html('');
            $("#croped").append($object);
            $("#cropper-preview").hide();
            $("#cropper-wrapper").hide();
            $(".cropper-container").remove();

            dataURL = $object.toDataURL("image/jpeg");
            var dataArray = new Array;
            dataArray[0] = { 'type': 'profile', 'base64': dataURL  , 'index':''};

            $.ajax({
                type: "POST",
                url: "../ajax/account_setting_profile_upload.php", //path
                data:
                {
                    'ajax_data': dataArray
                },
                cache: false,
                success: function (data) {
                    console.log(data);
                }
            })
        })

        function showImage(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
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
                    $("#cropper-window-wrapper > i").show().css("display","inline-block");
                    $("#cropper-wrapper").show();
                    $("#cropper_img").cropper("replace", e.target.result);
                }
                reader.readAsDataURL(input.files[0]);
            }
        }
    }

    function finalSubmit(){
        if(passwordChangeEnable){
            console.log('PASSWORD IS CHANGED');
            if(currentPasswordCheck && newPasswordCheck && newPasswordCheck2){
                console.log(true)
            }
            else{
                console.log(false);
            }
        }
        else{
            console.log("PASSWORD IS NOT CHANGED");
        }
    }
});
