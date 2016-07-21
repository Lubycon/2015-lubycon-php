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
    function init(response){
        var data = response.data;
        console.log(response);
    }
});
