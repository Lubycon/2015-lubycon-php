$(document).ready(function(){
    $("#loading_icon").show();
    Request({
        url: "./service/controller/infinite_scroll/controller.php",
        data: new GET_CONTENTS("community",0),
        callback: init
    });

    function init(response){
        console.log(response);
        var data = response.result.content;
        var category = response.category; //TESTING...
        var mainboard = new Mainboard(category);
        var mainboardDOM = mainboard.render();
        mainboardDOM.appendTo($(".con_wrap"));
        mainboard.add(data);
        mainboard.renderList();
        $("#loading_icon").hide();
    }
});
