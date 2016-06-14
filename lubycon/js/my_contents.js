
$(document).ready(function(){
	var cards = $(document).find(".contents_card");
	var menuParams = "";

	cards.each(function(){
		menuParams = [
			{
				name : "Modify",
				icon : "fa-recycle",
				uri : "../personal_page/personal_page.php?cate=dashboard&usernum="
			},
			{
				name : "Delete",
				icon : "fa-trash",
				uri : "../personal_page/personal_page.php?cate=dashboard&usernum="
			}
		];
		var code = $(this).data("index");
		$.each(menuParams,function(i,v){ 
			v.uri += code;
		});
		CardMenu.call($(this),menuParams,"");
	});
});


