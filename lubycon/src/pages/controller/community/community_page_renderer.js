$(document).ready(function(){
    var category = CATE_PARAM;
    var mainboard = new Mainboard(category);

    $("#loading_icon").show();
    Request({
        url: "./service/controller/infinite_scroll/controller.php",
        data: new GET_CONTENTS("community",0),
        callback: init
    });

    function init(response){
        console.log(response);
        var data = response.result.content,
            detector = new InfiniteScrollDetector(new GET_CONTENTS("community",0));

        var mainboardDOM = mainboard.render();

        mainboardDOM.appendTo($(".con_wrap"));
        addList(data);
        detector.start(addList);

        $("#loading_icon").hide();
        $("#write_bt").attr("href",function(){
            console.log($(this));
            return $(this).attr("href") + getUrlParameter("cate");
        });
    }

    function addList(data){
        mainboard.add(data);
        mainboard.renderList();
    }
});
