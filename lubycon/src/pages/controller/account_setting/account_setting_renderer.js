$(document).ready(function(){
    Request({
        url: "./pages/controller/account_setting/viewer_controller.php",
        data: {
            usernum: USER_PARAM
        },
        callback: init
    });

    var vm;

    function init(response){
        console.log(response);
        vm = response.result;
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

        $("#history_setting_section").find(".fa-refresh").on("click",sortHistory);
        $("#delete_account_bt").on("click",deleteAccountEvent);

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
            userData.position = company.val();
            userData.description = descript.val();
            userData.mobile = mobile.val();
            userData.fax = fax.val();
            userData.website = website.val();
            userData.profile = profile.attr("src");
            userData.country = {
                code: $(".locationFilter").lubySelector("getValueByIndex"),
                name: $(".locationFilter").lubySelector("getValue")
            };
            userData.job = $(".jobFilter").lubySelector("getValue");

            userLanguage = [];
            $(".language").each(function(){
                var d = {
                    name: $(this).find(".language_text").val(),
                    level: $(this).find(".langFilter").lubySelector("getValue")
                };
                if(d.name !== "") userLanguage.push(d);
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

                if(d.contents !== "") userHistory.push(d);
            });
            vm.userHistory = userHistory;

            console.log("SUBMIT DATA");
            console.log(vm);

            Request({
                url: "./pages/controller/account_setting/update_controller.php",
                data: {
                    result: vm
                },
                callback: result
            });
        }
    }
    function result(res){
        if(res.status.code === "0000"){
            location.href = "?dir=service/view/successUploadAccount";
        }
        else {
            console.log("UPLOAD ERROR :::::");
            console.log(res);
        }
    }

    function initJSONdata(){
        getJobs(bindJob);
        getCountries(bindCountry);

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
            if(status !== "success") console.log("LOAD COUNTRY ERROR");
            var selector = $(".locationFilter");
            for(var i = 0; i < d.length; i++){
                var o = $("<option/>",{ "html" : d[i].name, "data-value" : d[i].jobCode });
                o.appendTo(selector);
            }
            selector.val(vm.userData.country.name);
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
            var c = component.clone(true);
            c.find(".language_text").val(data[i].name);
            c.find(".langFilter").val(data[i].level);
            c.appendTo(wrapper);
        }
        if(data.length !== 0) component.first().remove();

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
            var c = component.clone(true);
            c.find(".accountFilter[data-value='year']").val(data[i].year);
            c.find(".accountFilter[data-value='month']").val(data[i].month);
            c.find(".accountFilter[data-value='kind']").val(data[i].category);
            c.find(".history_text").val(data[i].contents);
            c.appendTo(wrapper);
        }
        if(data.length !== 0) wrapper.find(".history").first().remove();

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
        var limit = $this.data('target') === 'history' ? 20 : 4;
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

    function sortHistory(event){
        eventHandler(event, $(this));
        var wrapper = $(".history-wrapper"),
            histories = [];
        $('.history').each(function (i) {
            histories.push({
                id: i,
                element: $(this).clone(true),
                year: parseInt($(this).find(".accountFilter[data-value='year']").lubySelector("getValue")),
                month: ($(this).find(".accountFilter[data-value='month']").lubySelector("getValueByIndex")) + 1
            });
        });
        histories.sort(function(a,b){
            var d1 = parseInt(a.year.toString() + a.month.toString()),
                d2 = parseInt(b.year.toString() + b.month.toString());
            if(d1 < d2) return -1;
            else if(d1 > d2) return 1;
            else return 0;
        });
        wrapper.empty();
        $.each(histories,function(i,v){
            wrapper.append(v.element);
        });
    }

    function deleteAccountEvent(){
        $(this).lubyAlert({
            type: "message",
            icon: "fa-trash-o",
            text: "Are you sure?<br/><p style='font-size: 14px; font-weight: 200;'>Your contents and information is will be removed</p>",
            autoDestroy: false,
            okAction: function(){
                Requset({
                    url: "./pages/controller/account_setting/delete_controller.php",
                    data: {
                        userCode: USER_PARAM
                    },
                    callback: action
                });
            }
        });
    }
    function action(res){
        $(".alertKey").lubyAlert({
            type: "alert",
            cancelButton: false,
            fontSize: 14,
            icon: "fa-inbox",
            text: "Thank you for using Lubycon !",
            autoDestroy: true
        });
        location.href = "./index.php";
        consle.log(res);
    }
});
