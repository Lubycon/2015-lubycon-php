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