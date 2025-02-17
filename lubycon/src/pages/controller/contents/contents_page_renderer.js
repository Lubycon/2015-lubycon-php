$(document).ready(function(){
    $("#loading_icon").show();
    $.when(
        getCategories(initCategory)
    ).then(function(){
        Request({
    	    url: "./service/controller/infinite_scroll/controller.php",
            data: new GET_CONTENTS("contents",0),
    	    callback: init
    	});
    });

    function init(response){
        if(response.status.code === "0000"){
            var data = response.result;
            console.log(data);
            var detector = new InfiniteScrollDetector(new GET_CONTENTS("contents",0));
            $("#loading_icon").hide();
            addCard(data);
            detector.start(addCard);
        }
        else {
            alert(response.status.msg);
        }
    }

    function addCard(data){
        var cardWrapper = $("#contents_box").find(".contents_wrap"),
			list = $("<li/>");

		for(var i = 0; i < data.content.length; i++){
			var card = new ContentsCard(data.content[i]);
            var cardDOM = card.render();
			list.clone(true).append(cardDOM).appendTo(cardWrapper);
		}

        console.log("VIEW : GET DATA------------------");
		console.log(data);
    }

    function initCategory(data){
        for(var i = 0; i < data.length; i++){
            var o = $("<option/>",{ "html" : data[i].name, "value" : data[i].name, "data-value" : data[i].code });
            o.appendTo($(".categoryFilter"));
        }
        $(".categoryFilter").lubySelector({
            id:"categoryFilter",
            width: 230,
            icon: "fa fa-bars",
            searchBar: true,
            optGroup: true,
            theme: "rect",
            changeEvent: change
        });
        function change(){
            var v = $(this).lubySelector("getValueByIndex");
            setUrlParameter("mid_cate", v);
        }
    }
});
