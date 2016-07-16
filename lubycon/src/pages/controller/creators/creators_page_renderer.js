$(document).ready(function(){
	Controller({
	    url: "./pages/controller/creators/controller.php",
	    callback: init
	});

	function init(data){
		console.log(data);
		var cardWrapper = $("#creator_card_wrap"),
			list = $("<li/>",{ "class" : "creator_card_in" });

		data.bestCreator.bestCreator = true;
		var bestCreator = new CreatorCard(data.bestCreator).render();

		list.clone(true).append(bestCreator).appendTo(cardWrapper);

		for(var i = 0; i < data.creators.length; i++){
			var card = new CreatorCard(data.creators[i]).render();
			list.clone(true).append(card).appendTo(cardWrapper);
		}
	}
});