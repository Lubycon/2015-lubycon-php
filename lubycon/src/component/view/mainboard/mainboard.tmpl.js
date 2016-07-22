var Mainboard = function(){
    this.data = [];
    this.lastData = [];
};

Mainboard.prototype.add = function(data){
    this.lastData = [];
    for(var i = 0; i < data.length; i++){
        this.data.push(data[i]);
        this.lastData.push(data[i]);
    }
};

Mainboard.prototype.renderList = function(){
    var d = this.lastData;
    var target = this.getDOM().find(".table-list-wrap");

    var body = $("<li/>",{ "class" : "table-list" }),
        inner = $("<div/>",{ "class" : "table-list-inner" }),
            numberWrap = $("<span/>",{ "class" : "table-number-wrap hidden-mb-ib" }).appendTo(inner),
                blank = $("<span/>",{
                    "class" : "table-blank",
                    "html" : "<i class='fa fa-circle'>"
                }).appendTo(numberWrap),
                number = $("<span/>",{
                    "class" : "table-number",
                    "html" : ""
                }).appendTo(numberWrap),
            profile = $("<span/>",{ "class" : "table-user-img" }).appendTo(inner),
                img = $("<img/>",{ "src" : "" }).appendTo(profile),
            info = $("<span/>",{ "class" : "table-info" }).appendTo(inner),
                anchor = $("<a/>",{
                    "href" : "?dir=pages/view/community/community_view&cate=" + "" + "&bno="
                }).appendTo(info),
                    subject = $("<span/>",{
                        "class" : "table-subject",
                        "html" : ""
                    }).appendTo(anchor),
                    comment = $("<span/>",{
                        "class" : "table-comments",
                        "html" : "[" + "" +"]"
                    }).appendTo(anchor),
                creator = $("<span/>",{
                    "class" : "table-writer",
                    "html" : ""
                }).appendTo(info),
            counter =  $("<div/>",{ "class" : "table-counts" }).appendTo(inner),
                date = $("<span/>",{
                    "class" : "table-date",
                    "html" : ""
                }).appendTo(counter),
                view = $("<span/>",{
                    "class" : "table-view",
                    "html" : "<i class='fa fa-eye mobile_i visible-mb'></i>" + ""
                }).appendTo(counter),
                like = $("<span/>",{
                    "class" : "table-view",
                    "html" : "<i class='fa fa-heart mobile_i visible-mb'></i>" + ""
                }).appendTo(counter);

    body.append(inner);
    body.appendTo(target);
};

Mainboard.prototype.getDOM = function(){
    return this._$DOM;
};

Mainboard.prototype.render = function(){
    var table = $("<div/>",{ "class" : "table-wrap" });

    var header = $("<div/>",{ "class" : "table-head"}),
        title = $("<div/>",{ "class" : "board-name"}).appendTo(header),

        headerWrap = $("<div/>",{ "class" : "table-head-wrap"}).appendTo(header),
        date = $("<span/>",{
            "class" : "table-date hidden-mb-ib",
            "html" : "Date"
        }).appendTo(headerWrap),
        view = $("<span/>",{
            "class" : "table-view hidden-mb-ib",
            "html" : "<i class='fa fa-eye'></i>"
        }).appendto(headerWrap),
        like = $("<span/>",{
            "class" : "table-like hidden-mb-ib",
            "html" : "<i class='fa fa-heart'>"
        }).appendTo(headerWrap);
    var body = $("<div/>",{ "class" : "table-body" }),
        listWrapper = $("<ul/>",{ "class" : "table-list-wrap"}).appendTo(body);

    table.append(header);
    table.append(body);

    this._$DOM = table;
    return table;
};
