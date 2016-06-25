// TITLE : ui.js
// For UI init

$(function (){ //gnb hover event
    $('.bigsub').hover(function () {
        $(this).children("ul").stop().fadeIn(300);
    }, function () {
        $(this).children("ul").stop().fadeOut(300);
    });
});

$(function (){
    $('.lnb_nav ul').children('#' + CATE_PARAM).addClass('selected');
    $('#subnav ul').children('#' + CATE_PARAM).addClass('selected');
    $(".selected").children("a").click(function(){
        return false;
    });
}); 

$(function (){
    $("#lang_select_bt").hover(function(){
        $(this).find(".lang_list").stop().slideDown(300);
    },function(){
        $(this).find(".lang_list").stop().slideUp(300);
    });
    $('.lang_list li').click(function(event){
        var selectedLangText = $(this).text();
        $('.lang_selected').text(selectedLangText);
        $('.lang_list').stop().slideUp(300);
        $('.lang_list li').removeClass();
        $(event.target).addClass("selected_language");
        LanguageValue(selectedLangText);
    });
});
function LanguageValue(lang){
    switch(lang){
        case "CHI" : console.log("Chinese"); break;
        case "ENG" : console.log("English"); break;
        case "FRA" : console.log("French"); break;
        case "GER" : console.log("German"); break;
        case "JPN" : console.log("Japanese"); break;
        case "KOR" : console.log("Korean"); break;
        case "RUS" : console.log("Russian"); break;
        case "SPA" : console.log("Spanish"); break;
        default : return; break;
    }
}

$(function(){
    var $personalMenu = $("#after_signin"),
    $menuList = $personalMenu.find("ul");
    $personalMenu.on("click",toggle.single).on("click",personalMenuToggle);
    var a = 0;
    function personalMenuToggle(){
        var $this = $(this);
        if($this.hasClass("selected")){
            $menuList.stop().fadeIn(200);
            $menuList.hideAnywhere($this);
        }
        else{
            $menuList.stop().fadeOut(200);
            $menuList.off("hideAnywhere");
        }
    }
});

$(function () { //add contents button start
    var $editorModal = $(".editor_popup.modal"),
    $darkOverlay = $(".dark_overlay");
    $('#addcontent_bt').click(function () {
        $darkOverlay.stop().fadeIn(100);
        $editorModal.css("display","block").attr("class","editor_popup modal fadeInDown animated");
    });
});

$(function () { //search box click value reset start

    // #WORK PROGRESS              //
    //-----------------------------//
    // 0. USER WRITE SOME WORDS    //
    // 1. errorCheck               //
    // 2. USER CLICK SUBMIT BT     //
    // 3. enterPressed             //
    // 4. checking value           //
    // 5. if true, call queryStart //
    
    var searchBar = $(document).find(".search-bar"),
    searchBarInput = searchBar.find(".search-bar-text"),
    submitBt = searchBar.find(".search-btn");

    searchBar.on("keyup",enterPressed);
    searchBarInput.on("focus",onFocus).on("blur",onBlur).on("keyup",errorCheck);
    submitBt.on("click",queryStart);

    var errorCheck = false;
    
    function queryStart(){ //SUBMIT
        alert("SUBMIT");
        submitBt.off("click",queryStart);
    }
    function enterPressed(event){
        if(event.which === 13 && errorCheck) {
            submitBt.trigger("click"); 
        }
    }
    function errorCheck(){
        errorCheck = false;
        var value = $(this).val();
        var errorCode = value.inputErrorCheck();
        
        if(!value.isNullString()){
            switch(errorCode){
                case 0 : errorCheck = true; break;
                case 1 : console.log("This is special character"); break;
                case 2 : console.log("This is abuse word"); break;
            }
        }
        console.log(errorCheck);
    }
    function onFocus(){
        if($(this).val() == "Enter the keyword") $(this).val("");
    }
    function onBlur(){
        if($(this).val() === "") $(this).val("Enter the keyword");
    }
});

$(function(){ //for main slider
    $('.la_bt').on("click", toggle.group);
    $(".slide-radio").on("change",slideChecker);

    function slideChecker(){
        var $this = $("." + $(this).attr("class") + ":checked"),
        data = $this.data("value"),
        $sliders = $("#slide_section > .slider-wrapper");
        $target = $("#slider" + data);

        $sliders.hide();
        $target.stop().fadeIn(150);
    }
});

$(function (){ //content card link action
    if($(window).width() >= 1025){
        $(document).on({
            mouseenter: function() {
                $(this).children('.contents_overlay').stop().fadeIn(300);
                $(this).find(".contents_title").css({
                    "text-decoration":"underline",
                    "color":"#48cfad"
                });
            },
            mouseleave: function() {
                $(this).children('.contents_overlay').stop().fadeOut(300);
                $(this).find(".contents_title").css({
                    "text-decoration":"none",
                    "color":"#444444"
                });
            }
        }, '.contents_card');
    }
    else{
        return;
    }
});

$(function() { //comment input box
    window.app = new InputExpander("#comment_text");
    window.app.start();
});

$(function (){
    var $this = $(document).find("#contents_info_wrap"),
    notMobile = $(window).width() >= 1024;
    $(document).scroll(function(event){
        var scrollTop = $(document).scrollTop();
        if(notMobile && scrollTop >= 50){
            $this.fadeOut(400);
        }
        else if(notMobile && scrollTop < 50){
            $this.stop().fadeIn(400);
        }
    })
});

$(window).on("load resize",function(){ //for main board
    if($("#main_board").length != 0){
        var wholeList = $(".table_list"),
        list = $(".table_list_inner"),
        userimg = $(".table_user_img"),
        number = $(".table_number_wrap"),            
        count = $(".table_counts"),
        subject = $(".table_subject");
        var list_padding = list.innerWidth() - list.width();
        var resWidth;
        if($(window).width() >= 1025){
            resWidth = (wholeList.width() - list_padding - userimg.width() - number.outerWidth(true) - count.width() - 100).toString() + "px";
        }
        else if($(window).width() < 1025){
            resWidth = (wholeList.width() - list_padding - userimg.width() - 50).toString() + "px";
        }
        subject.css({ "max-width" : resWidth });
        return;
    }
    else{
        return;
    }
});

$(function(){
    if($("#myinfo_setting").length != 0){
        var $button = $("#myinfo_setting"),
        $menu = $button.next("#myinfo_menu_list");
        $button.on("click",toggle.single).on("click",myinfoToggle);

        function myinfoToggle(){
            var $this = $(this);
            if($this.hasClass("selected")){
                $menu.stop().fadeIn(200);
                $menu.hideAnywhere($this);
            }else{
                $menu.stop().fadeOut(200);
                $menu.off("hideAnywhere");
            }
        }
    };
});
/////////////////////////////////////////////////////////
//      lubySelector enable
/////////////////////////////////////////////////////////
$(document).ready(function(){
    if($(".nav_guide").length!=0){
        var navGuide = $(".nav_guide"),
        preferFilter = navGuide.find(".preferFilter"),
        copyrightFilter = navGuide.find(".copyrightFilter"),
        languageFilter = navGuide.find(".languageFilter")
        locationFilter = navGuide.find(".locationFilter"),
        jobFilter = navGuide.find(".jobFilter"),
        userFilter = navGuide.find(".userFilter"),
        categoryFilter = navGuide.find(".categoryFilter"),

        preferFilter.lubySelector({
            id: "preferFilter",
            width: 200,
            customClass: "hidden-mb-ib",
            theme: "rect"
        });
        copyrightFilter.lubySelector({
            id: "copyrightFilter",
            width: 200,
            icon: "fa fa-copyright",
            customClass: "hidden-mb-ib",
            theme: "rect"
        });
        languageFilter.lubySelector({
            id: "languageFilter",
            width: 200,
            icon: "fa fa-globe",
            customClass: "hidden-mb-ib",
            theme: "rect"
        });
        locationFilter.lubySelector({
            id: "locationFilter",
            width: 200,
            icon: "fa fa-globe",
            customClass: "hidden-mb-ib",
            theme: "rect"
        });
        jobFilter.lubySelector({
            id: "jobFilter",
            width: 200,
            icon: "fa fa-suitcase",
            theme: "rect"
        });
        userFilter.lubySelector({
            id: "userFilter",
            width: 200,
            icon: "fa fa-user",
            customClass: "hidden-mb-ib",
            theme: "rect"
        });
        categoryFilter.lubySelector({
            id:"categoryFilter",
            width: 230,
            icon: "fa fa-bars",
            searchBar: true,
            optGroup: true,
            theme: "rect"
        });
    }
    else{
        return;
    }
    var searchFilter = $("body").find(".searchFilter");
    searchFilter.lubySelector({
        width: 100,
        theme: "transparent",
        icon: ""
    });
});
/////////////////////////////////////////////////////////
//      lubySelector enable
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//      lubyAlert enable
///////////////////////////////////////////////////////// 
$(document).ready(function(){
    $(".userAction-bt[data-value='bookmark']").lubyAlert({
        kind: "bookmark",
        toggle: true,
        okButton: false,
        cancelButton: false
    });
    $(".userAction-bt[data-value='like']").lubyAlert({
        kind: "like",
        toggle: true,
        okButton: false,
        cancelButton: false
    });
    $("#delete_bt").lubyAlert({
        width: 430,
        height: 180,
        kind: "confirm",
        customText: "Are you sure?"
    });
});
/////////////////////////////////////////////////////////
//      lubyAlert enable
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//      visible goToTheTop button start
/////////////////////////////////////////////////////////
$(window).on("load resize", function(){
    var host = hostURL = location.host,
    page = document.location.href == ("http://"+host+"/Lubycon_Website/0.current_lubycon/index.php");
    if($("#gotop_bt").length != 0 && page){
        var goTopBt = $(document).find("#gotop_bt");
        $(document).on("touchmove scroll", function (event){
            if($(document).scrollTop() > 500){
                goTopBt.stop().show();
                return;
            }
            else{
                goTopBt.stop().hide();
                return;
            }
        });
        $("#gotop_bt").on("click touchend", function(event){
            eventHandler(event,$(this));
            $('html, body').animate({scrollTop : 0},500);
            return;
        });
    }
    else{
        return;
    }
});
/////////////////////////////////////////////////////////
//      visible goToTheTop button end
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//      modalClose start
/////////////////////////////////////////////////////////
$(function(){
    $(document).ready(function(){
        var $modal = $(document).find(".modal"),
        $darkOverlay = $(document).find(".dark_overlay");

        $darkOverlay.on("click",modalHide);
        $("body").on("click",".modal-closebt",modalHide);
        $("body").on("click",".modal-bt",modalHide);

        function modalHide(){
            var $this = $(this),
            data = $this.data("value");

            if(data === "dark_overlay"){
                if($modal.length !== 0){
                    $modal.find(".modal-closebt").trigger("click");
                    $this.stop().fadeOut(200);
                }
                else{
                    $this.stop().fadeOut(200);
                }
            }
            else if(data === "modal-closebt"){
                $this.parents(".modal").stop().fadeOut(200);
                if(!$this.hasClass("cc-setting")){
                    $darkOverlay.stop().fadeOut(200);
                }
            }
            else if(data === "modal-cancelbt"){
                $this.parent(".modal").stop().fadeOut(200);
            }
        }
    })
})
/////////////////////////////////////////////////////////
//      modalClose end
/////////////////////////////////////////////////////////
