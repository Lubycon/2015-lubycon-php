var CreatorCard = function(data){
	this.bestCreator = data.bestCreator;
	this.code = data.code;
	this.profile = data.profile;
	this.name = data.name;
	this.job = data.job;
	this.personalPage = "?dir=pages/view/personal_page/personal_page&cate=dashboard&usernum=" + data.usercode,

	this.countryCode = data.countryCode;
	this.countryImg = "../asset/img/flag_icons/" + data.countryCode + ".png";
	this.country = data.country;
	this.city = data.city;

	this.contentsLength = data.contentsCount || 0;

	this.userDir = data.userDir;

	this.contents = data.contents ? [
		{ id : data.contents[0], img : data.userDir + '/thumbnail/thumbnail.jpg' },
		{ id : data.contents[1], img : data.userDir + '/thumbnail/thumbnail.jpg' },
		{ id : data.contents[2], img : data.userDir + '/thumbnail/thumbnail.jpg' }
	] : null;
}
CreatorCard.prototype.render = function(){
	var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	var card = $("<div/>",{
			"class" : "creator-card",
			"data-index" : this.code
		}),
		header = $("<div/>", { "class" : "creator-card-header" }),
			label = $("<span/>",{ 
				"class" : "card-label",
				"html" : this.bestCreator ? "Creator of <span class='this-month'>"+ month[new Date().getMonth()+1] +"</span>" : ""
			})
			.appendTo(header),
		body = $("<div/>", { "class" : "creator-card-body" }),
			picWrap = $("<div/>", { "class" : "creator-pic-wrap" }),
				pic = $("<div/>", { "class" : "creator-pic" })
					.append($("<img/>",{ "src" : this.profile }))
					.appendTo(picWrap),
				locationPic = this.countryCode ? $("<div/>",{ "class" : "creator-location-pic" })
					.append($("<img/>",{ "src" : this.countryImg }))
					.appendTo(picWrap) : null,
			infoWrap = $("<div/>", { "class" : "creator-info-wrap" }),
				name = $("<p/>",{ 
					"class" : "creator-name",
					"html" : "<a href=" + this.personalPage + ">" + this.name + "</a>"
				})
				.appendTo(infoWrap),
				job = $("<p/>", { "class" : "creator-job", "html" : this.job })
					.appendTo(infoWrap),
				location = $("<p/>", {
					"class" : "creator-location hidden-mb-b",
					"html" : "<i class='fa fa-map-marker'></i>" + this.city+ ", " + this.country
				})
				.appendTo(infoWrap),
				counter = $("<article/>", { 
					"class" : "contents-count hidden-mb-b",
					"html" : "<p class='contents-num'>" + this.contentsLength.setUnit(1) + "</p> Contents"
				})
				.appendTo(infoWrap),

		// MEDAL SYSTEM IS TESTING
		medaler = $("<div/>",{ "class" : "creator-card-medal" }),
			medals = $("<ul/>").appendTo(medal),
				medal = $("<li/>").appendTo(medal),

		footer = $("<div/>",{ "class" : "creator-card-footer" }),
			contentsWrap = $("<ul>").appendTo(footer),
			content = $("<li/>",{ "class" : "usercontent"}),
				anchor = $("<a/>", { "class" : "contents-link" }),
				img = $("<img/>");

		if(this.contents){
			$.each(this.contents,function(i,v){
				var i = img.clone().attr("src",v.img),
					a = anchor.clone().attr("href","?dir=pages/controller/contents/contents_view&cate=artwork&conno=" + v.id);
				var box = content.clone();
				a.append(i);
				box.append(a);
				box.appendTo(contentsWrap);
			});
		}

	body.append(picWrap);
	body.append(infoWrap);

	card.append(header);
	card.append(body);
	card.append(medaler);
	if(this.contents) card.append(footer);

	return card;
}
CreatorCard.prototype.setMenu = function(){
	/*var cards = $(document).find(".creators_card");
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
	});*/
}