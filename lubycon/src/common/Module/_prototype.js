//////////////////////////
// javaScript Prototype //
//////////////////////////
File.prototype.checkSize = function(size){
    return this.size < size;
};

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
};


File.prototype.checkExt = function(array){ //this method will be check to file name only
    var reg = new RegExp(".*\.(" + array.join("|") + ")","i");
    return reg.test(this.name);
};
File.prototype.isExistInArray = function(array){
    var names = array.map(function(v){ return v.name; });
    return names.indexOf(this.name);
};

Array.prototype.clean = function(deleteValue) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == deleteValue) {
            this.splice(i, 1);
            i--;
        }
    }
    return this;
};

Number.prototype.setUnit = function(digits) {
    var n = this.valueOf();
    var si = [
        { value: 1E18, symbol: "E" },
        { value: 1E15, symbol: "P" },
        { value: 1E12, symbol: "T" },
        { value: 1E9,  symbol: "G" },
        { value: 1E6,  symbol: "M" },
        { value: 1E3,  symbol: "k" }
    ], rx = /\.0+$|(\.[0-9]*[1-9])0+$/, i;
    for (i = 0; i < si.length; i++) {
        if (n >= si[i].value) {
            return (n / si[i].value).toFixed(digits).replace(rx, "$1") + " " +si[i].symbol;
        }
    }
    return n.toFixed(digits).replace(rx, "$1");
};

Number.prototype.setComma = function(){
    return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
};

String.prototype.isEmail = function(){
    //if It is email => true Or false
    var reg = /^[0-9a-zA-Z]([\-.\w]*[0-9a-zA-Z\-_+])*@([0-9a-zA-Z][\-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9}$/;
    return reg.test(this);
};
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
};
String.prototype.isNullString = function(){
    //Null => true Or false
    return this.valueOf() === "" || this.valueOf() === null || this.valueOf() === undefined || this.valueOf() === " ";
};
String.prototype.isAbuseWord = function(){
    //if It is abuse word => true Or false
    var abuseWords = [
        "sex", "fuck", "bitch",
        "cunt", "dick", "fucker", "null"
    ];
    return abuseWords.indexOf(this.valueOf()) !== -1;
};
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
    }

    return false;
};
String.prototype.isSpecialChar = function(){
    //if Is is specialChar => true Or false
    var reg = /[`;\\\/~\#$%<>^&\|*\(\)<>\-=\+\’\"\']/gi;

    return reg.test(this);
};
String.prototype.isAlphabetNumber = function(){
    var reg = /^[A-Za-z0-9+]*$/;
    return reg.test(this);
};
String.prototype.isNumber = function(){
    var reg = /^[0-9]*$/;
    return reg.test(this);
};

String.prototype.inputErrorCheck = function(){
    // 1. isSpecialChar()
    // 2. isAbuseWord()
    // 0. TRUE
    if(this.isSpecialChar()) return 1;
    else if(this.isAbuseWord() || this.match(/ null /gi)) return 2;
    else return 0;
};

String.prototype.getByteLength = function(b,i,c){
    for(b = i = 0; c = this.charCodeAt(i++); b += c >> 11 ? 3 :c >> 7 ? 2 : 1);
    return b;
};

String.prototype.disableCamelCase = function(text){ //camelCase -> Camel Case
    var result = this.replace( /([A-Z])/g, " $1" ),
        result = result.charAt(0).toUpperCase() + result.slice(1);
    return result;
};

String.prototype.toDOMelement = function(){
    return $($("<p/>").html(this).text());
};

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

        if(d.left === null && d.right === null) alert("Tooltip Error(ui.js) : Please insert value about X coordinate(left or right)");

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
};

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

$.cachedScript = function(url, options){
    options = $.extend( options || {}, {
        dataType: "script",
        cache: true,
        url: url
    });

    return jQuery.ajax( options );
};

$.getMultiScripts = function(arr) {
    var _arr = $.map(arr, function(scr) {
        return $.cachedScript( scr );
    });

    _arr.push($.Deferred(function( deferred ){
        $( deferred.resolve );
    }));

    return $.when.apply($, _arr);
}
