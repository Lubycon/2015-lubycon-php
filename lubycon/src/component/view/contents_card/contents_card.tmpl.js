var ContentsCard = function(data){
    this.code = data.code;
    this.title = data.title;
    this.category = data.category;
    this.image = data.thumbnail;
    this.license = data.license;
    this.bookmark = data.bookmark === "true";
    this.dir = data.dir;

    this.user = {
        code: data.userData.code,
        name: data.userData.name,
        profile: data.userData.profile
    };

    this.count = {
        view: data.contentCount.view,
        comment: data.contentCount.comment,
        like: data.contentCount.like
    };
};

ContentsCard.prototype.render = function(){
    var _this = this;
    var card = $("<div/>",{ "class" : "contents-card", "data-value" : "", "data-index" : "" }),
        thumbWrapper = $("<div/>",{ "class" : "contents-pic" }),
            img = $("<img/>",{ "src" : this.image, "class" : "load-view" }).appendTo(thumbWrapper),
        contentDesc = $("<div/>",{ "class" : "contents-desc"}),
            contentSub = $("<div/>",{ "class" : "contents-sub" }).appendTo(contentDesc),
                anchor = $("<a/>",{
                    "class" : "contents-link",
                    "href" : "?dir=pages/view/contents/viewer&cate=" + this.category + "&conno=" + this.code
                }).appendTo(contentSub),
                    title = $("<h4/>",{ "class" : "contents-title load-view", "html" : this.title }).appendTo(anchor),
                    license = $("<h5/>",{ "html" : this.license }).appendTo(anchor),
            creatorDesc = $("<span/>",{ "class" : "creator-desc" }).appendTo(contentDesc),
                userAnchor = $("<a/>",{ "href" : "?dir=pages/view/personal_page/personal_page&cate=0&usernum=" + this.user.code }).appendTo(creatorDesc),
                    userImg = $("<img/>",{ "src" : this.user.profile }).appendTo(userAnchor),
                    by = $("<span/>", { "class" : "by", "html" : "by" }).appendTo(userAnchor),
                    username = $("<span/>", { "class" : "name", "html" : this.user.name }).appendTo(userAnchor),
            bookmarkButton = $("<i/>",{
                "class" : "userAction-bt alertKey fa fa-star" + (this.bookmark === "true" ? "selected" : ""),
                "data-value" : "bookmark",
                "data-kind" : "contents"
            }).on("click",bookmarkController).appendTo(contentDesc),

        overlay = $("<div/>",{ "class" : "contents-overlay load_view"}),
            anchor2 = $("<a/>",{
                "class" : "contents-link",
                "href" : "?dir=pages/view/contents/viewer&cate=" + this.category + "&conno=" + this.code
            }).appendTo(overlay),
            icon = $("<i/>",{ "class" : "fa fa-search-plus" }).appendTo(anchor2),
            ul = $("<ul/>").appendTo(anchor2),
            li = $("<li/>"),
        view = li.clone().html("<i class='fa fa-eye'></i><span>" + this.count.view + "</span>").appendTo(ul),
        comment = li.clone().html("<i class='fa fa-comment-o'></i><span>" + this.count.comment + "</span>").appendTo(ul),
        like = li.clone().html("<i class='fa fa-heart'></i><span>" + this.count.like + "</span>").appendTo(ul);

    thumbWrapper.on("mouseenter",function(){
        overlay.stop().fadeIn(200);
    });
    overlay.on("mouseleave",function(){
        overlay.stop().fadeOut(200);
    });

    function bookmarkController(){
        if(!$(this).hasClass("selected")) _this.bookmark = true;
        else _this.bookmark = false;
        Request({
            url: "./service/controller/count_handler/count_controller.php",
            data: {
                type: 0,
                contentKind: 0,
                conno: _this.code,
                topCate: _this.category,
                takeUser: _this.user.code
            },
            callback: success
        });
        function success(response){
            console.log("BOOKMARK IS ------------------");
            console.log(response);
        }
    }

    card.append(thumbWrapper);
    card.append(contentDesc);
    card.append(overlay);

    this._$DOM = card;
    return card;
};
ContentsCard.prototype.getDOM = function(){
	return this._$DOM;
};
ContentsCard.prototype.getCode = function(){
	return this.code;
};
ContentsCard.prototype.getCreator = function(){
	return this.user;
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
