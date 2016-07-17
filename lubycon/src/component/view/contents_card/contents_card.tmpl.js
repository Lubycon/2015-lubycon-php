var ContentsCard = function(data){
    this.code = data.code;
    this.title = data.title;
    this.category = data.category;
    this.image = data.image;
    this.license = data.license;
    this.bookmakr = data.bookmark;
    this.dir = data.dir;

    this.user = {
        code: data.userData.code,
        name: data.userData.name,
        profile: data.userData.profile
    };

    this.count = {
        view: data.contentCount.view,
        comment: data.contentCount.comment,
        like: data.contentsCount.like
    };
};

ContentsCard.prototype.render = function(){
    var card = $("<div/>",{ "class" : "contents-card", "data-value" : "", "data-index" : "" }),
        thumbWrapper = $("<div/>",{ "class" : "contents-pic" }),
            img = $("<img/>",{ "src" : this.img, "class" : "load-view" }).appendTo(thumbWrapper),
        contentDesc = $("<div/>",{ "class" : "contents-desc"}),
            contentSub = $("<div/>",{ "class" : "contents-sub" }),
                anchor = $("<a/>",{
                    "class" : "contents-link",
                    "href" : "?dir=pages/view/contents/viewer&cate=" + this.category + "&conno=" + this.code
                }),
                    title = $("<h4/>",{ "class" : "contents-title load-view", "html" : this.title });

};





/*function CardMenu(params){
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
}*/
