$(function(){
    var href = getUrlParameter('dir');
    var session = Request({
        callback: init
    });

    function init(response){
        console.log(response);
        var header = $("#main-header");
        var wrapper = $("#app-wrapper");
        var footer = $("#footer");


        header.load("./component/view/index/header.html",function(){
            console.log("header is loaded");
        });
        if(href) wrapper.load(href + ".php");
        else wrapper.load("./pages/view/index/index_body.php",function(){
            console.log("PAGE IS LOADED");
        });
        footer.load("./component/view/index/footer.html",function(){
            console.log("footer is loaded");
        });
    }

});
