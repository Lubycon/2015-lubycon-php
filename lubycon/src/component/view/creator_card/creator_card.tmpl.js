var CreatorCard = function(data){
	this.code = data.usercode;
	this.userImg = "../../../../Lubycon_Contents/user" + this.code + "/profile.jpg";
	this.username = data.username;
	this.job = data.job;

	this.countryCode = data.countryCode;
	this.countryImg = "../asset/img/flag_icons/" + this.countryCode + ".png";
	this.country = data.country;
	this.city = data.city;

	this.contents = data.contentsCount;

	this.userDir = data.userDir;

	this.userContents = [
		{
			id : data.contents[0].id,
			img : userDir + '/thumbnail/thumbnail.jpg'
		},
		{
			id : data.contents[1].id,
			img : userDir + '/thumbnail/thumbnail.jpg'
		},
		{
			id : data.contents[2].id,
			img : userDir + '/thumbnail/thumbnail.jpg'
		}
	]
}
CreatorCard.prototype.render = function(){
	
}