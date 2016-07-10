
$(document).ready(function(){
	var cards = $(document).find(".creators_card");
	var menuParams = "";
	cards.each(function(){
		menuParams = [
			{
				name : "View Dashboard",
				icon : "fa-tachometer",
				uri : "../personal_page/personal_page.php?cate=dashboard&usernum="
			},
			{
				name : "View Contents",
				icon : "fa-eye",
				uri : "../personal_page/personal_page.php?cate=my_contents&usernum="
			},
			{
				name : "View Insight",
				icon : "fa-bar-chart",
				uri : "../personal_page/personal_page.php?cate=insight&usernum="
			},
			{
				name : "View Forum",
				icon : "fa-table",
				uri : "../personal_page/personal_page.php?cate=my_forums&usernum="
			}
		];
		var code = $(this).data("index");
		$.each(menuParams,function(i,v){ 
			v.uri += code;
		});
		
		CardMenu.call($(this),menuParams,"");
	});
});