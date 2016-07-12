var CommentCard = function(data){
	this.profile = data.profile;
	this.usercode = data.usercode;
	this.username = data.username;
	this.content = data.content;
	this.date = data.date;
}

CommentCard.prototype.render = function(){
	var body = $("<div/>",{ 
			"class" : "comment-div" 
		}),
		picWrap = $("<figure/>",{ 
			"class" : "comment-pic" 
		}),
		img = $("<img/>",{ 
			"src" : this.profile 
		}),
		name = $("<h4/>", { 
			"html" : this.username 
		}),
		timeWrap = $("<p/>",{ 
			"class" : "comment-time" 
		}),
		counter = $("<span/>", { 
			"class" : "comment-time-counter",
			"html" : this.date 
		}),
		content = $("<p/>",{ 
			"class" : "comment-contents",
			"html" : this.content 
		});

	picWrap.append(img).appendTo(body);
	name.appendTo(body);
	timeWrap.append(counter).appendTo(body);
	content.appendTo(body);

	return body;
}

CommentCard.prototype.getUserName = function(){
	return this.username;
}
CommentCard.prototype.getUserCode = function(){
	return this.usercode;
}
CommentCard.prototype.getContent = function(){
	return this.content;
}
CommentCard.prototype.getDate = function(){
	return this.date;
}