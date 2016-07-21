function Request(param){
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
                    success: function (data){
                        console.log(data);
                        console.timeEnd("DATA LOADED");
                        param.callback({
                            result: $.parseJSON(data),
                            access: session,
                            status: "0000"
                        });
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
}

function loadJobList(callback){
    $.getJSON('../data/job.json', function(json, textStatus) {
        callback(json.job,textStatus);
    });
}

function loadCountryList(callback){
    $.getJSON('../data/country.json', function(json, textStatus) {
            callback(json,textStatus);
    });
}

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
