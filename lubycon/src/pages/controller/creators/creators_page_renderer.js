$(document).ready(function(){
	/*callController({
	    url: "./pages/controller/creators/creators_page_controller.php",
	    data: 'cate=' + true + '&conno=' + CONNUM_PARAM,
	    callback: init
	});*/
	var d = [
	    {
	        bestCreator: true,
	        code: 3,
	        profile: "../../../../Lubycon_Contents/user/3/profile.jpg",
	        name: "Evan",
	        job: "Frontend Engineer",
	        countryCode: 200,
	        country: "South Korea",
	        city: "Seoul",
	        contentsCount: 1208890,
	        userDir: "../../../../Lubycon_Contents/contents/artwork/Corey_Even20160414050808",
	        contents:[12,35,25]
	    },
	    {
	        code: 16,
	        profile: "../../../../Lubycon_Contents/user/16/profile.jpg",
	        name: "Daniel",
	        job: "Full Stack Slave",
	        countryCode: 1,
	        country: "Albania",
	        city: "Capital",
	        contentsCount: 88,
	        userDir: "../../../../Lubycon_Contents/contents/artwork/Corey_Even20160414050808",
	        contents:[12,35,25]
	    },
	    {
	        code: 32,
	        profile: "../../../../Lubycon_Contents/user/32/profile.jpg",
	        name: "Martin",
	        job: "Database Human",
	        countryCode: 51,
	        country: "Albania",
	        city: "Capital",
	        contentsCount: 1056,
	        userDir: "../../../../Lubycon_Contents/contents/artwork/Corey_Even20160414050808",
	        contents:[12,35,25]
	    },
	    {
	        code: 11,
	        profile: "../../../../Lubycon_Contents/user/11/profile.jpg",
	        name: "Simon",
	        job: "Design Market",
	        countryCode: 121,
	        country: "Albania",
	        city: "Capital",
	        contentsCount: 3010,
	        userDir: "../../../../Lubycon_Contents/contents/artwork/Corey_Even20160414050808",
	        contents:[12,35,25]
	    },
	    {
	        code: 45,
	        profile: "../../../../Lubycon_Contents/user/45/profile.jpg",
	        name: "Paul",
	        job: "Overwatch Gamer",
	        countryCode: 99,
	        country: "Albania",
	        city: "Capital",
	        contentsCount: 2111,
	        userDir: "../../../../Lubycon_Contents/contents/artwork/Corey_Even20160414050808",
	        contents:[12,35,25]
	    },
	    {
	        code: 88,
	        profile: "../../../../Lubycon_Contents/user/88/profile.jpg",
	        name: "Haruhi",
	        job: "The Idol of Japan",
	        countryCode: 105,
	        country: "Japan",
	        city: "Tokyo",
	        contentsCount: 12301,
	        userDir: "../../../../Lubycon_Contents/contents/artwork/Corey_Even20160414050808",
	        contents:[12,35,25]
	    }
	]

	init(d);

	function init(data){
		var cardWrapper = $("#creator_card_wrap"),
			list = $("<li/>",{ "class" : "creator_card_in" });

		for(var i = 0; i < data.length; i++){
			var card = new CreatorCard(data[i]).render();
			list.clone().append(card).appendTo(cardWrapper);
		}
	}
});