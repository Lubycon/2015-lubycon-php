$(function(){
    var href = getUrlParameter('dir');
    var session = Request({
        callback: init
    });

    function init(response){
        console.log(response);
        var wrapper = $("#app-wrapper");

        if(href) wrapper.load(href + ".php");
        else wrapper.load("./pages/view/index/index_body.php",function(){
            console.log("PAGE IS LOADED");
        });
    }

});
