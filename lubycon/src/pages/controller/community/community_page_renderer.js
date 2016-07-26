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
        var category = CATE_PARAM;
        var mainboard = new Mainboard(category);
        var mainboardDOM = mainboard.render();

        mainboardDOM.appendTo($(".con_wrap"));
        mainboard.add(data);
        mainboard.renderList();

        $("#loading_icon").hide();
        $("#write_bt").attr("href",function(){
            console.log($(this));
            return $(this).attr("href") + getUrlParameter("cate");
        });
    }
});
