$(document).ready(function(){
	Controller({
	    url: "./pages/controller/creators/controller.php",
	    callback: init
	});

	var detector = new InfiniteScrollDetector({
		cardType: "creator",
		page: "creator",
		sort: $(".userFilter").lubySelector("getValueByIndex"),
		filter: {
			midCate: null,
			license: null,
			continent: $(".locationFilter").lubySelector("getValueByIndex") == 0 ?
				"all" :
				$(".locationFilter").lubySelector("getValueByindex"),
			job: $(".jobFilter").lubySelector("getValueByIndex") === 0 ?
				"all" :
				$(".jobFilter").lubySelector("getValueByIndex"),
			search: $(".searchFilter").lubySelector("getValueByIndex")
		},
		searchValue: $(".search-bar-text").val() === "Enter the keyword" ? null : $(".search-bar-text").val(),
		nowpage: getUrlParameter("page")
	});
	detector.start(addCard);

	function init(data){
		var cardWrapper = $("#creator_card_wrap"),
			list = $("<li/>",{ "class" : "creator_card_in" });

		data.bestCreator.bestCreator = true;
		var bestCreator = new CreatorCard(data.bestCreator).render();
		list.clone(true).append(bestCreator).appendTo(cardWrapper);

		addCard(data);
	}

	function addCard(data){
		var cardWrapper = $("#creator_card_wrap"),
			list = $("<li/>",{ "class" : "creator_card_in" });

		for(var i = 0; i < data.creators.length; i++){
			var card = new CreatorCard(data.creators[i]).render();
			list.clone(true).append(card).appendTo(cardWrapper);
		}
		console.log("VIEW : GET DATA------------------");
		console.log(data);
	}
});
