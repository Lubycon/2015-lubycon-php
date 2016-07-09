﻿// TITLE : core.js
// File for global functions or classes or variables


///////////////////////////////////
// GLOBAL FUNCTION AND VARIABLES //
///////////////////////////////////

var CATE_PARAM = getUrlParameter('cate'); // GLOBAL
var MID_CATE_PARAM = getUrlParameter('mid_cate'); // GLOBAL
var CONNUM_PARAM = getUrlParameter('conno'); // GLOBAL
var BNO_PARAM = getUrlParameter('bno'); //GLOBAL
var PAGE_PARAM = getUrlParameter('page'); //GLOBAL

var TOUCHMOVING = false;
$(document).ready(function(){
    $(document).on("touchmove",function(){ TOUCHMOVING = true; console.log(TOUCHMOVING); });
    $(document).on("touchend touchstart",function(){ TOUCHMOVING = false; console.log(TOUCHMOVING); });
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

//This function will be canceled the click event when users touch in mobile devices
//So if you want use any function in mobile, This eventHandler must be called to your function//
function eventHandler(event, selector) {
    event.stopPropagation();
    event.preventDefault();
    if (event.type === 'touchend'){
        selector.off('click');
    }
};

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
    }
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
}

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


//////////////////////////
// javaScript Prototype //
//////////////////////////
File.prototype.checkSize = function(size){
    return this.size < size;
}

File.prototype.calcUnit = function(){
    //////////////////////////////
    // This method will return  //
    // 0. converted size(String)//
    // 1. unit                  //
    // 2. original size         //
    //////////////////////////////
    var unit = " byte", size = this.size;

    if(this.size > 1024){ // 1024 1pow
        size /= 1024; unit = " KB";
        if(this.size > 1048576){ // 1024 2pow
            size /= 1024; unit = " MB";
            if(this.size > 1073741824){ // 1024 3pow
                size /= 1024; unit = " GB";
                if(this.size > 1099511627776){ // 1024 4pow
                    size /= 1024; unit = " TB";
                }
            }
        }
    }
    return [size.toFixed(2),unit,this.size];
}


File.prototype.checkExt = function(array){ //this method will be check to file name only
    var reg = new RegExp(".*\.(" + array.join("|") + ")","i");
    return reg.test(this.name);
}
File.prototype.isExistInArray = function(array){
    var names = array.map(function(v){ return v.name });
    return names.indexOf(this.name);
}

Array.prototype.clean = function(deleteValue) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == deleteValue) {         
            this.splice(i, 1);
            i--;
        }
    }
    return this;
};

Date.prototype.get12HourTime = function(iso8601){ //iso8601 = boolean
    var result = {
        "ampm" : null,
        "hour" : null,
        "minute" : null,
        "second" : null
    };

    var h = this.getHours();
    var m = this.getMinutes();
    var s = this.getSeconds();

    if(h <= 12){
        result.ampm = "am";
    }
    else if(h > 12){
        h -= 12;
        result.ampm = "pm";
    }
    else console.log("Time error in get12HourTime");

    if(iso8601){
        h = getISO8601(h);
        m = getISO8601(m);
        s = getISO8601(s);
    }
    else{
        h = h; m = m; s = s;
    }

    function getISO8601(num){
        if(num < 10) num = "0" + num;
        else num = num.toString();
        return num;
    }

    result.hour = h;
    result.minute = m;
    result.second = s;

    return result;
}

String.prototype.isEmail = function(){
    //if It is email => true Or false
    var reg = /^[0-9a-zA-Z]([\-.\w]*[0-9a-zA-Z\-_+])*@([0-9a-zA-Z][\-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9}$/;
    return reg.test(this);
}
String.prototype.isPassword = function(){
    // <Error Code>
    //
    // Empty or Null                      //error code : 1
    // length < 10                        //error code : 2
    // Hasn't Alphabet                    //error code : 3
    // Has specialchar                    //error code : 4
    // Repeat 3 word                      //error code : 5
    // used "Null" string                 //error code : 6
    //
    //
    // True                               // return 0
    var lengthTest = this.length < 10;
    var notUseAlphabet = this.match(/[^0-9]/g) === null;
    var useSpecialChar = this.isSpecialChar();
    var emptyWord = this.isNullString();
    var nullString = this.match(/ null /gi);
    var repeat3Word = this.isRepeatWord(3);

    if(emptyWord) return 1;
    else if(lengthTest) return 2;
    else if(notUseAlphabet) return 3;
    else if(useSpecialChar) return 4;  
    else if(repeat3Word) return 5;
    else if(nullString) return 6;
    else return 0;
}
String.prototype.isNullString = function(){
    //Null => true Or false
    return this.valueOf() === "" || this.valueOf() === null || this.valueOf() === undefined || this.valueOf() === " ";
}
String.prototype.isAbuseWord = function(){
    //if It is abuse word => true Or false
    var abuseWords = [
        "sex", "fuck", "bitch",
        "cunt", "dick", "fucker", "null"
    ];
    return abuseWords.indexOf(this.valueOf()) !== -1;
}
String.prototype.isRepeatWord = function(limit){
    //limit = int
    var ch = '';
    var cnt = 0;
    for (var i = 0 ; i < this.length; i++){
        if(ch === this.charAt(i)){
            cnt++;
            if (cnt >= limit){
                return true;
            }
        }
        else{
            ch = this.charAt(i);
            cnt = 1;
        }
    };

    return false;
}
String.prototype.isSpecialChar = function(){
    //if Is is specialChar => true Or false
    var reg = /[`;\\\/~\#$%<>^&\|*\(\)<>\-=\+\’\"\']/gi;

    return reg.test(this);
}
String.prototype.isAlphabetNumber = function(){
    var reg = /^[A-Za-z0-9+]*$/;
    return reg.test(this);
}
String.prototype.isNumber = function(){
    var reg = /^[0-9]*$/;
    return reg.test(this);
}

String.prototype.inputErrorCheck = function(){
    // 1. isSpecialChar()
    // 2. isAbuseWord()
    // 0. TRUE
    if(this.isSpecialChar()) return 1;
    else if(this.isAbuseWord() || this.match(/ null /gi)) return 2;
    else return 0;
}

String.prototype.getByteLength = function(b,i,c){
    for(b = i = 0; c = this.charCodeAt(i++); b += c >> 11 ? 3 :c >> 7 ? 2 : 1);
    return b;
}

String.prototype.disableCamelCase = function(text){ //camelCase -> Camel Case
    var result = this.replace( /([A-Z])/g, " $1" ),
    result = result.charAt(0).toUpperCase() + result.slice(1);
    return result;
}


//////////////////////
// jQuery Prototype //
//////////////////////

$.fn.tooltip = function(option){ //parent obejct must has "data-tip" attribute!!!!
    var defaults = { top: 0, left: null, right: null, appendTo: null },
    d = $.extend({}, defaults, option);

    this.each(function(){
        var $this = $(this),
        data = $this.data("tip");

        var tooltipBody = $("<div/>",{"class" : "tooltip tip-body"}),
        tooltipWrap = $("<div/>",{"class" : "tooltip tip-wrapper"}).appendTo(tooltipBody),
        tooltipContent = $("<p/>",{"class" : "tooltip tip-content", "html" : data}).appendTo(tooltipWrap);
        
        tooltipBody.css("top",d.top);
        d.left !== null ? tooltipBody.css("left",d.left) : "";
        d.right !== null ? tooltipBody.css("right",d.right) : "";

        if(d.left == null && d.right == null) alert("Tooltip Error(ui.js) : Please insert value about X coordinate(left or right)");

        $this.on("mouseenter",showTooltip).on("mouseleave",hideTooltip);

        function showTooltip(){
            var $this = $(this);
            data = $this.attr("data-tip");
            tooltipContent.html(data);
            if(d.appendTo === null ) tooltipBody.appendTo($this).stop().fadeIn(300);
            else tooltipBody.appendTo(d.appendTo).stop().fadeIn(300);
        }
        function hideTooltip(){
            var $this = $(this);
            tooltipBody.hide().remove();
        }
    });
    return this;
}

$.fn.hideAnywhere = function(){
    this.each(function(){
        var $menu = $(this),
        $button = $menu.parents(".selected").length === 0 ? $menu.siblings(".selected") : $menu.parents(".selected");

        $("html").off("click").on("click",hideMenu);

        function hideMenu(event){
            event.stopPropagation();
            var $this = $(event.target),
            checkElement = !$this.is($menu) && !$this.is($button) && $button.has($this).length === 0;

            if(checkElement) {
                $menu.fadeOut(200);
                $button.removeClass("selected");
            }
        }
    });
    return this;
};









