$(document).ready(function(){
    Controller({
        url: "./pages/controller/account_setting/viewer_controller.php",
        data: {
            usernum: USER_PARAM
        },
        callback: init
    });

    var vm;

    function init(data){
        vm = data;
        console.log(vm);
        var publicOption = vm.publicOption,
            userData = vm.userData,
            history = vm.userHistory,
            language = vm.userLanguage;

        //DOM ELEMENTS....
        var emailWrap = $(".userinfo").find("input[data-value='email']"),
            emailOption = $(".userinfo").find("select[name='email_public']"),
            nameWrap = $(".userinfo").find("input[data-value='name']");
        emailWrap.val(userData.email);
        emailOption.val(publicOption.email);
        nameWrap.val(userData.name);

        var profile = $("#croped").find("img");
        if(vm.userData.profile) profile.attr("src",userData.profile);

        var company = $("input[name='company']"),
            city = $("input[name='location_text']");
        company.val(userData.position);
        city.val(userData.city);

        var descript = $("#basic_desc");
        descript.val(userData.description);

        var contact = $("#contact_info_section"),
            mobile = contact.find("input[data-value='mobile']"),
            mobileOption = contact.find("select[data-value='mobile']"),
            fax = contact.find("input[data-value='fax']"),
            faxOption = contact.find("select[data-value='fax']"),
            website = contact.find("input[data-value='web']"),
            webOption = contact.find("select[data-value='web']");
        mobile.val(userData.mobile);
        mobileOption.val(publicOption.mobile);
        fax.val(userData.fax);
        faxOption.val(publicOption.fax);
        website.val(userData.website);
        webOption.val(publicOption.website);

        //JOB, COUNTRY, LANGUAGE, HISTORY BINDING...
        initJSONdata();
        initLanguage(language);
        initHistory(history);
        initCropper();

        $(".privacyFilter").lubySelector({
            width: 100,
            theme: 'white',
            icon: 'fa fa-lock',
            float: 'none'
        });
        $(".optControl").on("click",componentControl);
        $("#submit_bt").on("click",submit);

        function submit(){
            publicOption.email = emailOption.val();
            publicOption.fax = faxOption.val();
            publicOption.mobile = mobileOption.val();
            publicOption.website = webOption.val();

            userData.city = city.val();
            userData.name = nameWrap.val();
            userData.company = company.val();
            userData.description = descript.val();
            userData.mobile = mobile.val();
            userData.fax = fax.val();
            userData.website = website.val();
            userData.profile = profile.attr("src");
            userData.location = $(".locationFilter").lubySelector("getValue");
            userData.job = $(".jobFilter").lubySelector("getValue");

            userLanguage = [];
            $(".language").each(function(){
                var d = {
                    name: $(this).find(".language_text").val(),
                    level: $(this).find(".langFilter").lubySelector("getValue")
                };
                userLanguage.push(d);
            });
            vm.userLanguage = userLanguage;

            userHistory = [];
            $(".history").each(function(){
                var d = {
                    category: $(this).find(".accountFilter[data-value='kind']").lubySelector("getValue"),
                    contents: $(this).find(".history_text").val(),
                    month: $(this).find(".accountFilter[data-value='month']").lubySelector("getValue"),
                    year: $(this).find(".accountFilter[data-value='year']").lubySelector("getValue")
                };
                userHistory.push(d);
            });
            vm.userHistory = userHistory;

            console.log(vm);
        }
    }
    function initJSONdata(){
        loadJobList(bindJob);
        loadCountryList(bindCountry);

        function bindJob(data,status){
            var d = data;
            if(status !== "success") console.log("LOAD JOB ERROR");
            var selector = $(".jobFilter");
            for(var i = 0; i < d.length; i++){
                var o = $("<option/>",{ "html" : d[i].name, "data-value" : d[i].jobCode });
                o.appendTo(selector);
            }
            selector.val(vm.userData.job);
            selector.lubySelector({
                theme: "white",
                icon: "fa fa-suitcase",
                float: "none"
            });
        }
        function bindCountry(data,status){
            var d = data.country;
            console.log(d);
            if(status !== "success") console.log("LOAD COUNTRY ERROR");
            var selector = $(".locationFilter");
            for(var i = 0; i < d.length; i++){
                var o = $("<option/>",{ "html" : d[i].name, "data-value" : d[i].jobCode });
                o.appendTo(selector);
            }
            selector.val(vm.userData.location);
            selector.lubySelector({
                width: 300,
                theme: "white",
                icon: "fa fa-globe",
                float: "none",
                searchBar: true
            });
        }
    }
    function initLanguage(data){
        var wrapper = $(".language-wrapper"),
            component = wrapper.find(".language");
        for(var i = 0; i < data.length; i++){
            var c = component.clone();
            c.find(".language_text").val(data[i].name);
            c.find(".langFilter").val(data[i].level);
            c.appendTo(wrapper);
        }
        component.first().remove();

        wrapper.find("select").lubySelector({
            theme: 'white',
            float: 'none'
        });
    }
    function initHistory(data){
        console.log(data);
        var month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

        var wrapper = $(".history-wrapper"),
            component = wrapper.find(".history"),
            yearWrap = component.find(".accountFilter[data-value='year']");
        var today = new Date().getFullYear();
        for(var i = today; i >= today-50; i--){
            var o = $("<option/>",{ "html" : i, "value" : i });
            o.appendTo(yearWrap);
        }

        for(var i = 0; i < data.length; i++){
            var c = component.clone();
            c.find(".accountFilter[data-value='year']").val(data[i].year);
            c.find(".accountFilter[data-value='month']").val(data[i].month);
            c.find(".accountFilter[data-value='kind']").val(data[i].category);
            c.find(".history_text").val(data[i].contents);
            c.appendTo(wrapper);
        }
        wrapper.find(".history").first().remove();

        wrapper.find("select").lubySelector({
            theme: 'white',
            float: 'none',
            icon: ""
        });
    }

    function initCropper(){
        $("#profile-upload-bt").click(function () {
            $("#profile_uploader").trigger("click");
        });

        $(document).on("change","#profile_uploader",function (event) {
            var object = event.target.files;

            $.each(object,function(i,file){
                var calcSize = file.calcUnit();
                if(file.checkSize(10485760)){
                    if(file.checkExt(["jpg","jpeg","png","gif","bmp"])){
                        cropReady(file);
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

            var $object = $("#cropper_img").cropper("getCroppedCanvas", { width: 100, height: 100 }),
                base64 = $object.toDataURL("image/jpeg");

            $("#croped img").attr('src',base64);
            $("#croped").next("i").hide();
            $("#cropper-preview").hide();
            $("#cropper-wrapper").hide();
            $(".cropper-container").remove();
        });

        function cropReady(file) {
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
    function componentControl(){
        var $this = $(this);
        var limit = $this.data('target') === 'history' ? 25 : 4;
        var value = $this.data("value"),
            target = $("." + $this.data("target")),
            wrapper = target.parent(),
            component = target.first().clone(true),
            ls = component.find("select"),
            input = component.find("input[type='text']");

        if(ls) ls.lubySelector("setValueByIndex",0);
        if(input) input.val(null);

        if(value === 'add' && target.length < limit) component.appendTo(wrapper);
        else if(value === 'remove' && target.length > 1) target.last().remove();
    }
});

/*$(function (){ //account setting script
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
});*/
