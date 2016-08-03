
var Request = function(param){
    var session;
    var url = param.url;

    var getSession = $.ajax({
        type: 'POST',
        dataType: 'json',
        url: './common/Module/get_session.php',
        cache: false
    });

    getSession
    .success(function(res){
        session = res;
        console.log(session);
        if(url) getData(); // NEXT DATA IS EXIST
        else param.callback(session); // RETURN ONLY SESSION
    })
    .error(function(res){
        errorLog(res);
    });

    function getData(){
        console.log(param);
        return $.ajax({
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(param.data),
            url: param.url,
            cache: false
        })
        .success(function(res){
            console.log(res);
            res.session = session;
            console.log(res);
            param.callback(res);
        })
        .error(function(res){
            errorLog(res);
        });
    }

    function errorLog(res){
        return console.log("AJAX GET ERROR!!! ::::::::::\n",{
            readyState: res.readyState,
            responseText: res.responseText,
            status: res.status,
            msg : res.statusText
        });
    }
};

var GET_CONTENTS = function(type,target){
    var page = getUrlParameter("page") < 1 ? 1 : getUrlParameter("page");
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
		nowPage: page,
        targetPage: page*1 + target
    };
};

var getJobs = function(callback){
    return $.getJSON('../data/job.json', function(json, textStatus) {
        callback(json.job,textStatus);
    });
};

var getCountries = function(callback){
    return $.getJSON('../data/country.json', function(json, textStatus) {
            callback(json,textStatus);
    });
};

var getCategories = function(callback,category){
    var v;
    switch(category){
        case 1 : v = "artwork"; break;
        case 2 : v = "vector"; break;
        case 3 : v = "threed"; break;
        default: v = "all"; break;
    }
    return $.getJSON('../data/middle_category.json', function(json, testStatus){
        callback(json[v]);
    });
}
