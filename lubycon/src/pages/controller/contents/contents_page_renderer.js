$(document).ready(function(){
    $("#loading_icon").show();
    Request({
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

    loadCategoryList(initCategory, CATE_PARAM);

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


    function init(response){
        var data = response.data;
        $("#loading_icon").hide();
        console.log(data);

        addCard(data);
        detector.start(addCard);
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
