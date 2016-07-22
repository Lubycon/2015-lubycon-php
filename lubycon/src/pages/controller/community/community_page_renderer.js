$(document).ready(function(){
    $("#loading_icon").show();
    Request({
	    url: "./service/controller/infinite_scroll/controller.php",
        data: {
            cardType: "community",
    		page: "community",
            topCate: getUrlParameter("cate"),
            sort: $(".preferFilter").lubySelector("getValueByIndex"),
    		filter: {
    			midCate: null,
    			license: null,
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
        var data = response.result;
        console.log(response);
    }
});
