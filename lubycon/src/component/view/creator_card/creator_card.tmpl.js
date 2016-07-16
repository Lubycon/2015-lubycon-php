var CreatorCard = function(data){
	this.bestCreator = data.bestCreator || false;
	this.code = data.code;
	this.profile = data.profile;
	this.name = data.name;
	this.job = data.job;
	this.personalPage = "?dir=pages/view/personal_page/personal_page&cate=dashboard&usernum=" + data.code,

	this.countryCode = data.countryCode;
	this.countryImg = "../asset/img/flag_icons/" + data.countryCode + ".png";
	this.country = data.country;
	this.city = data.city;

	this.contentsLength = parseInt(data.contentsCount) || 0;

	this.contents = data.contents ? [
		{ id : data.contents[0].id, img : data.contents[0].img },
		{ id : data.contents[1].id, img : data.contents[1].img },
		{ id : data.contents[2].id, img : data.contents[2].img }
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
					a = anchor.clone().attr("href","?dir=pages/view/contents/viewer&cate=artwork&conno=" + v.id);
				var box = content.clone();
				a.append(i);
				box.append(a);
				box.appendTo(contentsWrap);
			});
		}

		var menuParams = [
			{
				name : "View Dashboard",
				icon : "fa-tachometer",
				uri : "?dir=pages/view/personal_page/personal_page&cate=dashboard&usernum="+this.code
			},
			{
				name : "View Contents",
				icon : "fa-eye",
				uri : "?dir=pages/view/personal_page/personal_page&cate=dashboard&usernum="+this.code
			},
			{
				name : "View Insight",
				icon : "fa-bar-chart",
				uri : "?dir=pages/view/personal_page/personal_page&cate=dashboard&usernum="+this.code
			},
			{
				name : "View Forum",
				icon : "fa-table",
				uri : "?dir=pages/view/personal_page/personal_page&cate=dashboard&usernum="+this.code
			}
		];
		
		CardMenu.call(body,menuParams,"");

	body.append(picWrap);
	body.append(infoWrap);

	card.append(header);
	card.append(body);
	card.append(medaler);
	if(this.contents) card.append(footer);

	this._$DOM = card;
	console.log(this);

	return card;
}
CreatorCard.prototype.getDOM = function(){
	return this._$DOM;
}
CreatorCard.prototype.getCode = function(){
	return this.code;
}
CreatorCard.prototype.getName = function(){
	return this.name;
}
CreatorCard.prototype.getJob = function(){
	return this.name;
}
CreatorCard.prototype.isBestCreator = function(){
	return this.bestCreator;
}
