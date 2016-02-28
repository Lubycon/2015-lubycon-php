/* ===========================================================
 *
 *  Name:          lubySelector.min.js
 *  Updated:       2016-02-23
 *  Version:       0.1.0
 *  Created by:    DART, Lubycon.co
 *
 *  Copyright (c) 2016 Lubycon.co
 *
 * =========================================================== */

(function($){
	$.fn.lubySelector = function(option){
        var defaults = { 
            id: "",
            width: 150,
            maxHeight: 250,
            float: "right",
            icon: "fa fa-filter",
            theme: "black",//white, ghost
            optGroup: false,//알파벳 헤더 기능
            searchBar: false,//true시 셀렉박스리스트 맨 위에 서치바 생성
            callback: $.nothing
        },
        d = {},
        pac = {
            init: function (option) {
                return d = $.extend({}, defaults, option), this.each(function () {
                    if ($(this).hasClass("selectorKey")) $.error("lubySelector is already exists");
                    else {
                        var $this = $(this), $label, $options,
                        id = $this.data("id") ? $this.data("id") : d.id,
                        width = $this.data("width") ? $this.data("width") : d.width,
                        maxHeight = $this.data("max-height") ? $this.data("max-height") : d.maxHeight,
                        float = $this.data("float") ? $this.data("float") : d.float,
                        theme = $this.data("theme") ? $this.data("theme") : d.theme,
                        optGroup = $this.data("optGroup") ? $this.data("optGroup") : d.optGroup,
                        searchBar = $this.data("searchBar") ? $this.data("searchBar") : d.searchBar,
                        label = $this.val(),

                        $wrapper = $("<span/>", {
                            "id": d.id,
                            "class": "lubySelector",
                            optGroup: optGroup,
                            theme: theme
                        }).insertAfter($this).append($this).css({"width":d.width,"float":d.float})
                        .on("click", pac.boxClick).on("focusin", pac.boxFocus)
                        .on("click", ".ls_option", pac.optionClick)
                        .on("change","select",pac.changeOption),

                        $icon = $("<i/>",{"class": "global_icon " + d.icon}).insertBefore($this),
                        $label = $("<span/>",{"class": "ls_Label"}).insertBefore($this).text(label),
                        $arrow = $("<i/>",{"class": "ls_arrow fa fa-caret-down"}).insertBefore($this),
                        $optionWrap = $("<span/>",{"class": "ls_optionWrap"}).insertBefore($this).css({"max-height":d.maxHeight}).hide(),

                        $searchBar = d.searchBar ? 
                        $("<span/>", {"class":"ls_search"}).appendTo($optionWrap) : "",
                        $inSearchBar = d.searchBar ?
                        $("<input/>",{"class":"ls_input","type":"text"}).appendTo($searchBar).on("keyup",pac.searchEvent) && $("<i/>",{"class":"fa fa-search"}).appendTo($searchBar) : "";

                        $options = $("<span/>",{"class": "guide ls_option"}).appendTo($optionWrap).hide();
                        $this.find("option").each(function(option,selector){
                            var $this = $(this);
                            pac.dataUpdate(option,d,$this,$options);
                        });
                        $(".guide").remove();
                        pac.optionGroup($this);
                    }
                })
            },
            dataUpdate: function(option,d,selector,list) {
                var $this = selector,//options in selectbox
                $selectbox = $this.parent,
                $options = list,
                $optionWrap = $options.parent(),
                optionVal = $this.val(),
                optionName = $this.val().trim(),
                optionText = $this.text(),
                optionTitle = $this.text().toLowerCase(),
                selected = $this.is(":selected") ? "selected" : "",
                disabled = $this.is(":disabled") ? " disabled " : "",
                
                icon = $this.data("icon") ? $this.data("icon") : d.icon,
                selected = $this.is(":selected") ? "selected" : "";
                
                $this.is("option") ? 
                ($("<span/>", {
                    "class": "ls_option " + disabled + selected,
                    title: optionTitle,
                    html: optionText,
                    "data-value": optionVal
                }).appendTo($optionWrap)) : "";
            },
            boxClick: function(selector) {
                selector.stopPropagation();
                var $this = $(this),
                $options = $this.find(".ls_optionWrap"),
                $searchBar = $this.find(".ls_input"),
                $selectbox = $this.find("select");
                !$this.hasClass("open")?
                    $options.fadeIn(300) && $this.addClass("open") && $selectbox.show().trigger("focus") :
                    $options.fadeOut(300) && $this.removeClass("open") && $selectbox.hide().trigger("blur");
                $this.focusin(); $searchBar.focus();
                //console.log("boxClick");
            },
            boxFocus: function() {
                var $this = $(this),
                $searchBar = $this.find(".ls_input");
                $this.hasClass("disabled") ? pac.boxBlur($this) : 
                (pac.boxBlur($(".lubySelector.focused").not($this)), 
                    $this.addClass("focused"), $searchBar.addClass("focused"),
                    $("html").on("click.boxBlur", function () {
                        pac.boxBlur($this);
                        //console.log("boxFocus_inner");
                    })
                );
                //console.log("boxFocus");
            },
            boxBlur: function(selector) {
                if ($("body").find(selector).length!=0) { 
                    var $this = selector,
                    $searchBar = $this.find(".ls_search"),        
                    $optionWrap = $this.find(".ls_optionWrap");
                    $this.hasClass("focused") ? 
                    ($this.removeClass("open focused"),$searchBar.removeClass("focused"))&&($optionWrap.fadeOut(300)) : "";
                    //console.log("boxBlur");
                }
            },
            optionGroup: function(selector){
                if(d.optGroup){
                    var $this = selector.prev(".ls_optionWrap"),
                    $list = $this.find(".ls_option"),
                    $optGroup = "<span class='optGroup'></span>";
                    $list.each(function(){
                        var optionTitle = $(this).attr("data-value").substring(0,1),
                        preTitle = $(this).prev().attr("data-value") == null ? "" :
                        $(this).prev().attr("data-value").substring(0,1);
                        if(optionTitle !== preTitle){
                            $(this).before($optGroup).prev(".optGroup").text(optionTitle);
                            //console.log("optionTitle : "+ optionTitle); console.log("preTitle : "+preTitle);
                        } 
                        else{return;}
                    })
                }
                else{ return; };
                
            },
            optionClick: function(selector) {
                var $this = $(this),
                $optionWrap = $this.parent(),
                $selectbox = $this.parent().next("select"),
                $label = $this.parents(".lubySelector").find(".ls_Label"),
                $wrap = $optionWrap.parent(),
                selectedText = $this.attr("title"),
                selectedValue = $this.data("value");

                selector.stopPropagation();
                !$this.hasClass("selected")?
                    $this.addClass("selected").siblings().removeClass("selected") 
                    && $label.text(selectedValue) 
                    && $selectbox.val(selectedValue)
                    && $wrap.removeClass("open")
                    && $optionWrap.fadeOut(300) :
                    "";
                //console.log("optionClick"); console.log("select value is '" + $selectbox.val() + "'"); 
            },
            changeOption: function(selector) {
                var $this = $(this),
                text = $this.val(),
                option = $this.find("option").val(),
                list = $this.prev(".ls_optionWrap").find(".ls_option"),
                listValue = list.data("value");
                list.each(function(){
                    var $this = $(this);
                    (listValue == option) ? $this.addClass("selected") : $this.removeClass("selected");//어제 여기까지 짬(문제점 : 전부다 false로 감)
                });
                //console.log("changeOption");
            },
            searchEvent: function(selector) {
                var $this = $(this),
                $textValue = $this.val(),
                $options = $this.parent().siblings(".ls_option"),
                $optgroups = $this.parent().siblings(".optGroup"),
                $filter = $this.parent().siblings(".ls_option[title*='"+$textValue+"']"),
                $test = $textValue!="" ? ($options.hide() && $filter.show() && $optgroups.hide()) : ($options.show() && $optgroups.show());
                //console.log("searchEvent");     
            }
        },
        start = {
            test: function () {
                return this.each(function () {
                    console.log("tested");
                })
            }
        }

        return start[option] ? 
        start[option].apply(this, Array.prototype.slice.call(arguments, 1)) : 
        "object" != typeof option && option ? 
            ($.error('No such method "' + option + '" for the lubySelector instance'), void 0) : 
            pac.init.apply(this, arguments);
    };
})(jQuery);
