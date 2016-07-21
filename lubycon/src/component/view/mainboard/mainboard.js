var Mainboard = function(data){
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

    return table;
};

Mainboard
