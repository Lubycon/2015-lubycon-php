// TITLE : common.js
// File for global functions or classes or variables


///////////////////////////////////
// GLOBAL FUNCTION AND VARIABLES //
///////////////////////////////////

var CATE_PARAM = getUrlParameter('cate'); // GLOBAL
var MID_CATE_PARAM = getUrlParameter('mid_cate'); // GLOBAL
var CONNUM_PARAM = getUrlParameter('conno'); // GLOBAL
var BNO_PARAM = getUrlParameter('bno'); //GLOBAL
var PAGE_PARAM = getUrlParameter('page'); //GLOBAL
var USER_PARAM = getUrlParameter('usernum'); //GLOBAL

var TOUCHMOVING = false;
$(document).ready(function(){
    $(document).on("touchmove",function(){ TOUCHMOVING = true; });
    $(document).on("touchend touchstart",function(){ TOUCHMOVING = false; });
});

function isMobile(){
    if($(window).width() <= 800) return true;
    else return false;
}

function removeUrlParameter(sParam){
    var uri = window.location.search.substring(1);
    var uriObject = uri.split("&");
        uriObject = uriObject.map(function(v,i,a){ //Value, Index, Array
            return v.split("=");
        });
    for(var i = 0; i < uriObject.length; i++){
        if(sParam === uriObject[i][0]){
            history.pushState(null, "", location.pathname + '?' + uri.replace(uriObject[i][0] + '=' + uriObject[i][1], ""));
        }
    }
}

function getUrlParameter(sParam){
    var uri = window.location.search.substring(1).split("&");
    uri = uri.map(function(v,i,a){ //Value, Index, Array
        return v.split("=");
    });
    for (var i = 0; i < uri.length; i++){
        if (uri[i][0] === sParam) return uri[i][1];
    }
}

function setUrlParameter(sParam,value){
    var uri = window.location.search.substring(1);
    var uriObject = uri.split("&");
        uriObject = uriObject.map(function(v,i,a){ //Value, Index, Array
            return v.split("=");
        });
    for(var i = 0; i < uriObject.length; i++){
        if(sParam === uriObject[i][0]){
            history.pushState(null, "", location.pathname + '?' + uri.replace(uriObject[i][0] + '=' + uriObject[i][1], uriObject[i][0] + '=' + value));
            return 1;
        }
    }

    var newURI = document.location.href + "&" + sParam + "=" + value;
    history.pushState(null,"",newURI);
    return 0;
}

function Controller(param){
    $.ajax({
        type: "POST",
        url: "./common/Module/get_session.php",
        cache: false,
        async: true,
        success: function(data){
            var session = $.parseJSON(data);
            if(param.url){
                console.log(param.data);
                $.ajax({
                    type: "POST",
                    url: param.url,
                    data: JSON.stringify(param.data),
                    cache: false,
                    success: function (data){
                        console.timeEnd("DATA LOADED");
                        //console.log(data);
                        param.callback($.parseJSON(data),session);
                    },
                    error: function(request,status,error){
                        console.log("------------CONTROLLER AJAX ERROR--------------");
                        console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                        console.log("-----------------------------------------------");
                    }
                });
            }
            else {
                console.log("SESSION LOAD SUCCESS");
                console.log(session);
                param.callback(session);
            }
        }
    });
}

function loadJobList(callback){
    $.getJSON('../data/job.json', function(json, textStatus) {
        callback(json,textStatus);
    });
}

function loadCountryList(callback){
    $.getJSON('../data/country.json', function(json, textStatus) {
            callback(json,textStatus);
    });
}

//This function will be canceled the click event when users touch in mobile devices
//So if you want use any function in mobile, This eventHandler must be called to your function//
function eventHandler(event, selector) {
    event.stopPropagation();
    event.preventDefault();
    if (event.type === 'touchend'){
        selector.off('click');
    }
}

function InputExpander(selector) {
    this.start = function () {
        var object = $(selector);
        object.keydown(function(event) {
            this.style.height = 0;
            var newHeight = this.scrollHeight + 5;

            if( this.scrollHeight >= this.clientHeight ){
                newHeight += 5;
                this.style.height= newHeight + 'px';
            }
        });
    };
}

var toggle = {
    group: function(event){
        eventHandler(event,$(this));
        var $this = $(this),
        radioType = $this.hasClass("radioType"),
        $btns = $this.siblings(".btn").length !== 0 ? $this.siblings(".btn") : $(document).find(".card_menu");

        ////////////////////////////
        // IT WILL BE FIXED LATER //
        ////////////////////////////

        if($this.hasClass("selected")){
            if(!radioType) $this.removeClass("selected");
            else return false;
        }
        else {
            $btns.removeClass("selected");
            $this.addClass("selected");
        }
    },
    single: function(event){
        //eventHandler(event,$(this));
        var $this = $(this);
        if($this.hasClass("selected")) $this.removeClass("selected");
        else $this.addClass("selected");
    }
};

function CardMenu(params){
    var $this = $(this); // CARD //
    var body = $("<div/>",{ "class" : "card_menu" }),
    icon = $("<i/>",{ "class" : "card_menu_icon" + " fa fa-bars" }).appendTo(body),
    listWrap = $("<div/>",{ "class" : "card_menu_list" }).appendTo(body),
    ul = $("<ul/>").appendTo(listWrap);

    $.each(params,function(i,v){
        createList(v.name,v.icon,v.uri).appendTo(ul);
    });

    body.on("click",toggle.group).on("click",menuToggle);
    $this.append(body);

    function createList(text,icon,link){
        var list = $("<li/>",{ "data-value" : text.toLowerCase() }),
        anchor = $("<a/>", { "href" : link, "html" : text }).appendTo(list),
        icon = $("<i/>", { "class" : "fa " + icon}).appendTo(anchor);

        if(text === "Delete" || text ==="Remove") {
            anchor.css({"color":"#ec6446"});
            icon.css({"color":"#ec6446"});
        }

        return list;
    }
    function menuToggle(event){
        var $this = $(this);
        var listWraps = $(document).find(".card_menu_list");
        var listWrap = $this.find(".card_menu_list");
        if($this.hasClass("selected")){
            listWraps.fadeOut(200);
            listWrap.stop().fadeIn(200);
            listWrap.hideAnywhere($this);
        }
        else{
            listWrap.stop().fadeOut(200);
            listWrap.off("hideAnywhere");
        }
    }
}

/*********************   contents after load and find, with move scroll    ************************************/
function scroll_from_cookie(contents_number) {
    var contents_offsetTop = $('.' + contents_number).offset().top;

    var window_center = ($(window).height() / 2) - ($("." + contents_number).height() / 2);
    console.log(contents_offsetTop);

    $("html,body").scrollTop(contents_offsetTop - window_center);
    //$("html,body").animate({ scrollTop: contents_offsetTop - 200 }, 0);
    $('.' + contents_number).css({
        "border": "1px solid #48cfad",
        "box-shadow": "0px 0px 20px 0px rgb(72,207,173)"
    });
    deleteCookie('contents_history');
}
function scroll_from_param(now_page) {
    var prev_page = now_page - 1;

    //console.log($(".page_bottom_" + prev_page));
    //$("html,body").animate({ scrollTop: 0 }, 0);
    if (now_page <= 1) {
        $("html,body").scrollTop(0);
        //$("html,body").animate({ scrollTop: 0 }, "fast");
    } else {
        $("html,body").scrollTop($(".page_bottom_" + prev_page).offset().top - 200);
        //$("html,body").animate({ scrollTop: $(".page_bottom_" + prev_page).offset().top - 200 }, "slow");
    }
    deleteCookie('contents_history');
}
function deleteCookie(cookieName) {
    var expireDate = new Date();

    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString() + "; path=/";
}
/*********************   contents after load and find, with move scroll    ************************************/
