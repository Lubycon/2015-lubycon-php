var CreatorCard = function(data){
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

	this.userContents = this.userContents ? [
		{ id : data.contents[0].id, img : data.userDir + '/thumbnail/thumbnail.jpg' },
		{ id : data.contents[1].id, img : data.userDirr + '/thumbnail/thumbnail.jpg' },
		{ id : data.contents[2].id, img : data.userDir + '/thumbnail/thumbnail.jpg' }
	] : null;
}
CreatorCard.prototype.render = function(){
	var card = $("<div/>",{
			"class" : "creators-card",
			"data-index" : this.code
		}),
		header = $("<div/>", { "class" : "creators-card-header" }),
			label = $("<span/>",{ "class" : "card-label" })
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
					"html" : "<i class='fa fa-map-marker'>"+ this.city+", "+ this.country +"</i>"
				})
				.appendTo(infoWrap),
				counter = $("<article/>", { 
					"class" : "contents-count hidden-mb-b",
					"html" : "<p class='contents-num'>" + this.contentsLength + "</p> Contents"
				})
				.appendTo(infoWrap),

		// MEDAL SYSTEM IS TESTING
		medal = $("<div/>",{ "class" : "creator-card-medal" }),
			medals = $("<ul/>").appendTo(medal),
				medal = $("<li/>").appendTo(medals),

		footer = $("<div/>",{ "class" : "creator-card-footer" }),
			contentsWrap = $("<ul>"),
			content = $("<li/>",{ "class" : "usercontent"}),
				anchor = $("<a/>", { "class" : "contents-link" });

		$.each(this.userContents,function(){
			console.log($(this));
			//CONTENTS BIND. 2016-07-13 EVAN
		});

	body.append(picWrap);
	body.append(infoWrap);

	card.append(header);
	card.append(body);
	card.append(medal);
	if(this.userContents) card.append(footer);

	return card;
}