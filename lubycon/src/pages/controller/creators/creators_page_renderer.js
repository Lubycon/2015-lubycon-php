$(document).ready(function(){
	$("#loading_icon").show();
	$.when(
        getJobs(initJob)
    ).then(function(){
        Request({
		    url: "./service/controller/infinite_scroll/controller.php",
	        data: new GET_CONTENTS("creator",0),
		    callback: init
		});
    });

	var detector = new InfiniteScrollDetector(new GET_CONTENTS("creator",0));

	function init(response){
		var data = response.result;
		console.log(data);
		$("#loading_icon").hide();
		var cardWrapper = $("#creator_card_wrap"),
			list = $("<li/>",{ "class" : "creator_card_in" });

		addCard(data);
		detector.start(addCard);
	}

	function addCard(data){
		var cardWrapper = $("#creator_card_wrap"),
			list = $("<li/>",{ "class" : "creator_card_in" });

		for(var i = 0; i < data.content.length; i++){
			var card = new CreatorCard(data.content[i]).render();
			list.clone(true).append(card).appendTo(cardWrapper);
		}
		console.log("VIEW : GET DATA------------------");
		console.log(data);
	}
	function initJob(data){
		console.log(data);
		for(var i = 0; i < data.length; i++){
			var o = $("<option/>", { "html" : data[i].name });
			o.appendTo($(".jobFilter"));
		}
		$(".jobFilter").lubySelector({
			id: "jobFilter",
			width: 200,
			icon: "fa fa-suitcase",
			theme: "rect",
			changeEvent: change
		});

		function change(){
			var v = $(this).lubySelector("getValueByIndex");
            setUrlParameter("job", v);
		}
	}
});
