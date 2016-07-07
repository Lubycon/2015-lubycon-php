// TITLE : ui.js
// For UI init

$(document).ready(function(){
    initUIComponents();

    function initUIComponents(){
        /////////// COMMON //////////////

        pageReadyAction();

        mainNavigationAction();
        initSubNavInContentPage();
        initPageLanguageAction();
        initPersonalMenu();
        initLubySelectors();
        initLubyAlerts();
        initModalCloseAction();

        editorSelectorAction();

        initSearchBar();
        initCommentBox();

        mainSliderRadioAction();

        initMainBoardTableSize();

        myInfoAction();

        ///////////////////////////////////
        ///////// MOBILE / DESKTOP ////////
        if(isMobile()){
            initGoTopBt();
        }
        else{
            if($(".lubyImageSlider").length) initMainSlider();
            contentCardHoverAction();
            contentsNameStickyAction();
        }
        ///////////////////////////////////

    }

    function pageReadyAction(){
        /////////////////////////////////////////////////////////
        //  PAGE WILL BE SHOW AFTER LOADED ALL HTML,CSS and JS //
        /////////////////////////////////////////////////////////
        $(document).ready(function(){
            $("body").show();
        });
    }
    function mainNavigationAction(){
        $(".bigsub").hover(function(){
            $(this).children("ul").stop().fadeIn(300);
        },function(){
            $(this).children("ul").stop().fadeOut(300);
        })
    }
    function initSubNavInContentPage(){
        $('.lnb_nav ul').children('#' + CATE_PARAM).addClass('selected');
        $('#subnav ul').children('#' + CATE_PARAM).addClass('selected');
        $(".selected").children("a").on("click",function(){ return false; });
    }
    function initPageLanguageAction(){
        var button = $("#lang_select_bt"),
            target = $(".lang_selected"),
            listWrap = $(".lang_list"),
            list = listWrap.find("li");

        button.hover(function(){
            $(this).find(".lang_list").stop().slideDown(300);
        },function(){
            $(this).find(".lang_list").stop().slideUp(300);
        });
        list.on("click",function(event){
            var text = $(this).text();
            target.text(text);
            listWrap.stop().slideUp(300);
            list.removeClass("selected");
            $(this).addClass("selected");

            setLanguageAction(text);
        });

        function setLanguageAction(language){
            switch(language){
                case "CHI" : console.log("Chinese"); break;
                case "ENG" : console.log("English"); break;
                case "FRA" : console.log("French"); break;
                case "GER" : console.log("German"); break;
                case "JPN" : console.log("Japanese"); break;
                case "KOR" : console.log("Korean"); break;
                case "RUS" : console.log("Russian"); break;
                case "SPA" : console.log("Spanish"); break;
                default : return false; break;
            }
        }
    }
    function initPersonalMenu(){
        var menu = $("#after_signin"),
            list = menu.find("ul");
        menu.on("click",toggle.single).on("click",toggleAction);

        function toggleAction(){
            var $this = $(this);
            if($this.hasClass("selected")){
                list.stop().fadeIn(200);
                list.hideAnywhere($this);
            }
            else {
                list.stop().fadeOut(200);
                list.off("hideAnywhere");
            }
        }
    }
    function editorSelectorAction(){
        var modal = $(".editor_popup.modal"),
            darkOverlay = $(".dark_overlay"),
            button = $("#addcontent_bt");
        button.on("click",function(){
            darkOverlay.stop().fadeIn(100);
            modal.css("display","block")
                 .attr("class","editor_popup modal fadeInDown animated");
        })
    }
    function initSearchBar(){
        // #WORK PROGRESS              //
        //-----------------------------//
        // 0. USER WRITE SOME WORDS    //
        // 1. errorCheck(keyup)        //
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
    }
    function initCommentBox(){
        initWrite();

        function initWrite(){
            var target = "#comment_text";

            window.app = new InputExpander(target);
            window.app.start();
            $(target).on("keyup",function(){
                var $this = $(this),
                value = $this.val();

                if(value.isSpecialChar()) $this.val(value.slice(0,-1));
            })
        }
    }
    function initLubySelectors(){    
        if($(".nav_guide").length !== 0){
            var navGuide = $(".nav_guide"),
                searchFilter = navGuide.find(".searchFilter");
                preferFilter = navGuide.find(".preferFilter"),
                copyrightFilter = navGuide.find(".copyrightFilter"),
                languageFilter = navGuide.find(".languageFilter")
                locationFilter = navGuide.find(".locationFilter"),
                jobFilter = navGuide.find(".jobFilter"),
                userFilter = navGuide.find(".userFilter"),
                categoryFilter = navGuide.find(".categoryFilter");

            init();
            dataBinding();
        }
        else{
            return false;
        }
        function init(){
            searchFilter.lubySelector({
                width: 100,
                theme: "transparent",
                icon: ""
            });
            preferFilter.lubySelector({
                id: "preferFilter",
                width: 200,
                customClass: "hidden-mb-ib",
                theme: "rect",
                changeEvent: changeLocation
            });
            copyrightFilter.lubySelector({
                id: "copyrightFilter",
                width: 200,
                icon: "fa fa-copyright",
                customClass: "hidden-mb-ib",
                theme: "rect",
                changeEvent: changeLocation
            });
            locationFilter.lubySelector({
                id: "locationFilter",
                width: 200,
                icon: "fa fa-globe",
                customClass: "hidden-mb-ib",
                theme: "rect",
                changeEvent: changeLocation
            });
            jobFilter.lubySelector({
                id: "jobFilter",
                width: 200,
                icon: "fa fa-suitcase",
                theme: "rect",
                changeEvent: changeLocation
            });
            userFilter.lubySelector({
                id: "userFilter",
                width: 200,
                icon: "fa fa-user",
                customClass: "hidden-mb-ib",
                theme: "rect",
                changeEvent: changeLocation
            });
            categoryFilter.lubySelector({
                id:"categoryFilter",
                width: 230,
                icon: "fa fa-bars",
                searchBar: true,
                optGroup: true,
                theme: "rect",
                changeEvent: changeLocation
            });
        }
        function dataBinding(){
            var selectors = $(document).find(".lubySelector select");
            selectors.each(function(){
                var data = $(this).data("param"),
                    value = getUrlParameter(data);
                if(value !== undefined) $(this).lubySelector("setValue",value);
                else $(this).lubySelector("setValue",0);
            });
        }
        function changeLocation(){
            var value = $(this).find("option").index($(this).find("option:selected"));
            setUrlParameter($(this).data("param"), value);

            down_call_contents(0, 1);
        }
    }
    function initLubyAlerts(){
        $(document).on("click touchend",".userAction-bt",toggle.single);
        console.log($(".userAction-bt").length);

        $(document).on("click touchend",".userAction-bt[data-value='bookmark']",function(event){
            eventHandler(event,$(this));
            if($(this).hasClass("selected")){
                $(this).lubyAlert({
                    icon: "fa-star",
                    iconColor: "#ffbe54",
                    iconAnimation: "bounce",
                    text: "SAVE!",
                    fontSize: 18
                });
            }
        });
        
        $(document).on("click",".userAction-bt[data-value='like']",function(){
            if($(this).hasClass("selected")){
                $(this).lubyAlert({
                    icon: "fa-heart",
                    iconColor: "#48cfad",
                    iconAnimation: "bounceIn",
                    text: "LIKE!",
                    fontSize: 18
                });
            }
        });
        $("#delete_bt").on("click",function(){
            $(this).lubyAlert({
                autoDestroy: false
            });
        });
    }
    function initGoTopBt(){
        $(window).on("load resize", function(){
            var host = hostURL = location.host,
            page = document.location.href == ("http://"+host+"/Lubycon_Website/0.current_lubycon/index.php");
            if($("#gotop_bt").length != 0 && page){
                var goTopBt = $(document).find("#gotop_bt");
                $(document).on("touchmove scroll", function (event){
                    if($(document).scrollTop() > 500) goTopBt.stop().show();
                    else goTopBt.stop().hide();
                });
                
                $("#gotop_bt").on("click touchend", function(event){
                    eventHandler(event,$(this));
                    $('html, body').animate({scrollTop : 0},500);
                });
            }
            else{
                return false;
            }
        });
    }
    function initModalCloseAction(){
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
    }

    function initMainSlider(){
        $("#slider1").lubyImageSlider({
            autoPlay: false
        });
        $("#slider2").lubyImageSlider();
        $("#slider3").lubyImageSlider();

        $("#slider2").hide();
        $("#slider3").hide();
        $("#slider1").show();
    }

    function mainSliderRadioAction(){
        $('.la_bt').on("click", toggle.group);
        $(".slide-radio").on("change",slideChecker);

        function slideChecker(){
            var $this = $("." + $(this).attr("class") + ":checked"),
            data = $this.data("value"),
            $sliders = $("#slide_section .lubyImageSlider");
            $target = $("#slider" + data);

            $sliders.hide();
            $target.stop().show();
            console.log($("#slider1").width());
        }
    }
    function contentCardHoverAction(){
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
    function contentsNameStickyAction(){
        var $this = $(document).find("#contents_info_wrap");

        $(document).on("scroll",function(event){
            var scrollTop = $(document).scrollTop();
            if(scrollTop >= 50) $this.fadeOut(400);
            else $this.stop().fadeIn(400);
        })
    }
    function initMainBoardTableSize(){
        $(window).on("load resize",function(){
            var mainBoard = $(document).find("#main_board");
                wholeList = $(".table_list"),
                list = $(".table_list_inner"),
                userimg = $(".table_user_img"),
                number = $(".table_number_wrap"),            
                count = $(".table_counts"),
                subject = $(".table_subject");
                var list_padding = list.innerWidth() - list.width();
                var resWidth;
            if(isMobile()){
                resWidth = (wholeList.width() - list_padding - userimg.width() - 50).toString() + "px";
            }
            else{
                resWidth = (wholeList.width() - list_padding - userimg.width() - number.outerWidth(true) - count.width() - 100).toString() + "px";
            }
            subject.css({ "max-width" : resWidth });
        }) 
    }
    function myInfoAction(){
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
    }
})
