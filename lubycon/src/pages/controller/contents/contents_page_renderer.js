$(document).ready(function(){
    Controller({
	    url: "./service/controller/infinite_scroll/controller.php",
        data: {
            cardType: "content",
    		page: "content",
            topCate: getUrlParameter("cate"),
            sort: $(".preferFilter").lubySelector("getValueByIndex"),
    		filter: {
    			midCate: $(".categoryFilter").lubySelector("getValueByIndex") === 0 ?
                    "all" :
                    $(".categoryFilter").lubySelector("getValueByIndex"),
    			license: $(".copyrightFilter").lubySelector("getValueByIndex") === 0 ?
                    "all" :
                    $(".copyrightFilter").lubySelector("getValueByIndex"),
    			continent: null,
    			job: null,
    			search: $(".searchFilter").lubySelector("getValueByIndex")
    		},
    		searchValue: $(".search-bar-text").val() === "Enter the keyword" ? null : $(".search-bar-text").val(),
    		nowPage: getUrlParameter("page"),
            targetPage: getUrlParameter("page")
        },
	    callback: init
	});

	var detector = new InfiniteScrollDetector({
		cardType: "content",
        page: "content",
        topCate: getUrlParameter("cate"),
        sort: $(".preferFilter").lubySelector("getValueByIndex"),
        filter: {
            midCate: $(".categoryFilter").lubySelector("getValueByIndex") === 0 ?
                "all" :
                $(".categoryFilter").lubySelector("getValueByIndex"),
            license: $(".copyrightFilter").lubySelector("getValueByIndex") === 0 ?
                "all" :
                $(".copyrightFilter").lubySelector("getValueByIndex"),
            continent: null,
            job: null,
            search: $(".searchFilter").lubySelector("getValueByIndex")
        },
        searchValue: $(".search-bar-text").val() === "Enter the keyword" ? null : $(".search-bar-text").val(),
        nowPage: getUrlParameter("page"),
        targetPage: getUrlParameter("page")
	});
	detector.start(addCard);

    function init(data){
        console.log(data);

        addCard(data);
    }

    function addCard(data){
        console.log(data);
        var cardWrapper = $("#contents_box").find(".contents_wrap"),
			list = $("<li/>");

		for(var i = 0; i < data.content.length; i++){
			var card = new ContentsCard(data.content[i]).render();
			list.clone(true).append(card).appendTo(cardWrapper);
		}

        console.log("VIEW : GET DATA------------------");
		console.log(data);
    }
});
