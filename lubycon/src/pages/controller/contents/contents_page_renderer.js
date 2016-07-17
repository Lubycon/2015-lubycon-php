$(document).ready(function(){
    Controller({
	    url: "./pages/controller/infinite_scroll/controller.php",
        data: {
            cardType: "content",
    		page: "content",
            topCate: getUrlParameter("cate"),
    		filter: {
    			midCate: $(".categoryFilter").lubySelector("getValueByIndex") === 0 ?
                    "all" :
                    $(".categoryFilter").lubySelector("getValueByIndex"),
    			sort: $(".preferFilter").lubySelector("getValueByIndex"),
    			license: $(".copyrightFilter").lubySelector("getValueByIndex") === 0 ?
                    "all" :
                    $(".copyrightFilter").lubySelecotr("getValueByIndex"),
    			continent: null,
    			job: null,
    			search: $(".searchFilter").lubySelector("getValueByIndex")
    		},
    		searchValue: $(".search-bar-text").val() === "Enter the keyword" ? null : $(".search-bar-text").val(),
    		nowpage: getUrlParameter("page")
        },
	    callback: init
	});

	var detector = new InfiniteScrollDetector({
		cardType: "content",
		page: "content",
        topCate: getUrlParameter("cate"),
		filter: {
			midCate: $(".categoryFilter").lubySelector("getValueByIndex") === 0 ?
                "all" :
                $(".categoryFilter").lubySelector("getValueByIndex"),
			sort: $(".preferFilter").lubySelector("getValueByIndex"),
			license: $(".copyrightFilter").lubySelector("getValueByIndex") === 0 ?
                "all" :
                $(".copyrightFilter").lubySelecotr("getValueByIndex"),
			continent: null,
			job: null,
			search: $(".searchFilter").lubySelector("getValueByIndex")
		},
		searchValue: $(".search-bar-text").val() === "Enter the keyword" ? null : $(".search-bar-text").val(),
		nowpage: getUrlParameter("page")
	});
	detector.start(addCard);



    function init(data){


        addCard(data);
    }

    function addCard(data){
        var wrapper = $("#contents_box").find(".contents_wrap"),
			list = $("<li/>");

		/*for(var i = 0; i < data.creators.length; i++){
			var card = new ContentsCard(data.creators[i]).render();
			list.clone(true).append(card).appendTo(cardWrapper);
		}*/

        console.log("VIEW : GET DATA------------------");
		console.log(data);
    }
});
