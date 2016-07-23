var UIBuilder = function(func,param){
    var data = [];
    $.when(
        $.getJSON(graphicDataUrl, function(data) {
            graphicData = data;
        }),
        $.getJSON(webDataUrl, function(data) {
            webData = data;
        })
    ).then(function() {
        if (graphicData) {
            // Worked, put graphicData in #view-graphic
        }
        else {
            // Request for graphic data didn't work, handle it
        }
        if (webData) {
            // Worked, put webData in #view-web
        }
        else {
            // Request for web data didn't work, handle it
        }
    });
};
