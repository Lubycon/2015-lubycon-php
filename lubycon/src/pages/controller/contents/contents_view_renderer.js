$(document).ready(function(){
	Request({
		url: "./pages/controller/contents/view_controller.php",
		data: {
			cate: CATE_PARAM,
			conno: CONNUM_PARAM
		},
		callback: init
	});

	function init(response){
		var data = response.result;
		console.log(data);
		var content = data.contents,
			creator = data.creator,
			comment = data.comment;

		var title = $("#contents_title"),
			category = $("#contents_category"),

			viewCount = $("#viewCount"),
			downCount = $("#downloadCount"),
			likeCount = $("#likeCount"),

			body = $("#contents_main"),
			creatorCardWrapper = $(".infoCard.creator"),
			creatorCard = new CreatorCard(creator).render(),

			profile = $("#user_img > img"),
			userInfo = $("#user_info_wrap"),
			creatorName =  userInfo.children("h4").children("a"),
			creatorJob = userInfo.children("h5[data-value='job']"),
			creatorLocation = userInfo.children("h5[data-value='location']"),

			tagWrapper = $("#tagbox_wrap_inner"),
				tag = $("<li/>",{ "class" : "tagbox" }),
			descript = $("#descript_content > p"),

			commentProfile = $(".comment-write-wrap");

		title.text(content.title);
		category.text(content.category.clean("").join(" / "));

		viewCount.text(content.counter.view);
		downCount.text(content.counter.download);
		likeCount.text(content.counter.like);

		if(CATE_PARAM !== "3") body.prepend(content.content.toDOMelement());
		else if(CATE_PARAM === "3") $.getScript("./pages/view/contents/webGL.js", function(){
			console.log("webgl is loaded");
			loadWebGLViewer(data.threedData);
		});

		creatorCardWrapper.append(creatorCard);

		profile.attr("src", creator.profile);
		creatorName.attr("href","?dir=pages/view/personal_page/personal_page&cate=0d&usernum=" + creator.code);
		creatorName.text(creator.name);
		creatorJob.text(creator.job);
		creatorLocation.text(creator.city + ", " + creator.country);

		for(var i = 0; i < content.tag.length; i++){
			tagWrapper.append( tag.clone(true).text(content.tag[i]) );
		}
		descript.text(content.descript);

		if(response.session){
			commentProfile.find("img")
				.attr("src", "../../../../Lubycon_Contents/user/" + response.session.usercode + "/profile.jpg");
		}
		else{
			commentProfile.remove();
		}

		bindCC(content.cc);
		bindComment(comment);
		bindUserAction([content.bookmark,content.like],creator.code);
	}

	function bindCC(cc){
		var listWrap = $(".cc-list"),
			target = listWrap.children("a"),
			list = $("<li/>",{ "class" : "cc-icon" });
		var data = cc[0].toString().split(""),
			dataSet = { "by" : parseInt(data[0]), "nc" : parseInt(data[1]), "nd" : parseInt(data[2]), "share" : parseInt(data[3]) };


		if(dataSet.by || dataSet.nc || dataSet.nd || dataSet.share) addList("cc",1,true);
		$.each(dataSet,function(k,v){
			addList(k,v,true);
		});

		target.attr("href",cc[1]);

		function addList(key,value,isBlack){ //TRUE -> BLACK ICON, FALSE -> WHITE ICON
			if(!value) return false;

			var iconColor = isBlack ? "" : "_w";
			var icon = $("<img/>",{ "src" : "../asset/img/creative_commons/png/" + key + iconColor + ".png" });
			list.clone().append(icon).appendTo(target);
		}
	}

	function bindComment(data){ //test
		for(var i = 0; i< data.length; i++){
			console.log(data[i]);
			var comment = new CommentCard(data[i]);
			console.log(comment.render());
		}
	}

	function bindUserAction(data,user){
		var buttons = $(".userAction-bt");
		var bookmarkButton = $(".userAction-bt[data-value='bookmark']"),
			likeButton = $(".userAction-bt[data-value='like']");
		console.log(likeButton,data[1]);

		if(data[0]) bookmarkButton.addClass("selected");
		if(data[1]) likeButton.addClass("selected");

		buttons.on("click",function(){
			Request({
	            url: "./service/controller/count_handler/count_controller.php",
	            data: {
	                type: $(this).data("value") === "bookmark" ? 0 : 1,
	                contentKind: 0,
	                conno: CONNUM_PARAM,
	                topCate: CATE_PARAM,
	                takeUser: user
	            },
	            callback: success
	        });
	        function success(res){
	            if(res.status.code === "0000") console.log("SUCCESS ACTION");
	            else if(res.status.code === "0101") location.href = "./index.php?dir=pages/view/sign_in/login_page";
	        }
		});
	}
});
