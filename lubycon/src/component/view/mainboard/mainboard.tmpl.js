var Mainboard = function(category){
    this.data = [];
    this.lastData = [];
    this.category = category;
};

Mainboard.prototype.add = function(data){
    this.lastData = [];
    for(var i = 0; i < data.length; i++){
        this.data.push(data[i]);
        this.lastData.push(data[i]);
    }
    console.log(this.data);
    console.log(this.lastData);
};

Mainboard.prototype.renderList = function(){
    var cate = this.category;
    var d = this.lastData;
    var target = this.getDOM().find(".table-list-wrap");

    for(var i = 0; i < d.length; i++){
        addList(d[i]);
    }

    function addList(d){
        var date = d.content.date.split(" ")[0];
        var body = $("<li/>",{ "class" : "table-list", "data-index" : d.content.code}),
            inner = $("<div/>",{ "class" : "table-list-inner" }),
                numberWrap = $("<span/>",{ "class" : "table-number-wrap hidden-mb-ib" }).appendTo(inner),
                    blank = $("<span/>",{
                        "class" : "table-blank",
                        "data-type" : cate,
                        "html" : "<i class='fa fa-circle'>"
                    }).appendTo(numberWrap),
                    number = $("<span/>",{
                        "class" : "table-number",
                        "html" : d.content.code
                    }).appendTo(numberWrap),
                profile = $("<span/>",{ "class" : "table-user-img" }).appendTo(inner),
                    img = $("<img/>",{ "src" : d.user.profile }).appendTo(profile),
                info = $("<span/>",{ "class" : "table-info" }).appendTo(inner),
                    anchor = $("<a/>",{
                        "href" : "?dir=pages/view/community/community_view&cate=" + cate + "&bno=" + d.content.code
                    }).appendTo(info),
                        subject = $("<span/>",{
                            "class" : "table-subject",
                            "html" : d.content.title
                        }).appendTo(anchor),
                        comment = $("<span/>",{
                            "class" : "table-comments",
                            "html" : "[" + d.content.comment +"]"
                        }).appendTo(anchor),
                    creator = $("<span/>",{
                        "class" : "table-writer",
                        "html" : d.user.name
                    }).appendTo(info),
                counter =  $("<div/>",{ "class" : "table-counts" }).appendTo(inner),
                    date = $("<span/>",{
                        "class" : "table-date",
                        "html" : date
                    }).appendTo(counter),
                    view = $("<span/>",{
                        "class" : "table-view table-counter",
                        "html" : "<i class='fa fa-eye mobile_i visible-mb'></i>" + d.content.view
                    }).appendTo(counter),
                    like = $("<span/>",{
                        "class" : "table-view table-counter",
                        "html" : "<i class='fa fa-heart mobile_i visible-mb'></i>" + d.content.like
                    }).appendTo(counter);

        body.append(inner);
        body.appendTo(target);
    }
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
        }).appendTo(headerWrap),
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
