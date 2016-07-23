
var Request = function(param){
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
                    success: function (res){
                        console.timeEnd("DATA LOADED");
                        console.log(res);
                        if(typeof $.parseJSON(res) === "object"){
                            param.callback({
                                result: $.parseJSON(res),
                                session: session,
                                status: "0000"
                            });
                        }
                    },
                    error: function(request,status,error){
                        console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                        param.callback({
                            request: request,
                            message: request.responseText,
                            status: status,
                            error: error
                        });
                        $.error("AJAX ERROR");
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
};

var GET_CONTENTS = function(type,target){
    return {
        url: getUrlParameter("dir"),
        type: type,
        topCate: getUrlParameter("cate"),
        sort: $(".preferFilter").lubySelector("getValueByIndex"),
		filter: {
			midCate: $(".categoryFilter").lubySelector("getValueByIndex"),
			license: $(".copyrightFilter").lubySelector("getValueByIndex"),
			continent: $(".locationFilter").lubySelector("getValueByIndex"),
			job: $(".jobFilter").lubySelector("getValueByIndex"),
			search: $(".searchFilter").lubySelector("getValueByIndex")
		},
		searchValue: $(".search-bar-text").val() === "Enter the keyword" ? null : $(".search-bar-text").val(),
		nowPage: getUrlParameter("page"),
        targetPage: getUrlParameter("page")*1 + target
    };
};

var loadJobList = function(callback){
    $.getJSON('../data/job.json', function(json, textStatus) {
        callback(json.job,textStatus);
    });
};

var loadCountryList = function(callback){
    $.getJSON('../data/country.json', function(json, textStatus) {
            callback(json,textStatus);
    });
};

function loadCategoryList(callback,category){
    var v;
    switch(category){
        case 1 : v = "artwork"; break;
        case 2 : v = "vector"; break;
        case 3 : v = "threed"; break;
        default: v = "all"; break;
    }
    $.getJSON('../data/middle_category.json', function(json, testStatus){
        callback(json[v]);
    });
}
