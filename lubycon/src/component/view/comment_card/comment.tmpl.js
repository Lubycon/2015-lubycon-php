var CommentCard = function(data){
	this.picture = data.profile;
	this.username = data.username;
	this.content = data.content;
	this.time = data.time;
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
			"html" : this.time 
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

CommentCard.prototype.getUser = function(){
	return this.username;
}
CommentCard.prototype.getContent = function(){
	return this.content;
}
CommentCard.prototype.getTime = function(){
	return this.time;
}