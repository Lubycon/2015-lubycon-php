$(document).ready(function(){
	callController();

	function callController(){
		console.time("DATA LOADED");
		$.ajax({
            type: "POST",
            url: "./pages/controller/contents/contents_view_controller.php",
            data: 'cate=' + CATE_PARAM + '&conno=' + CONNUM_PARAM,
            cache: false,
            success: function (data){
            	console.timeEnd("DATA LOADED");
                initViewer($.parseJSON(data));
            }
        })
	}

	function initViewer(data){
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

			commentProfile = $(".comment-write-wrap img");

		title.text(content.title);
		category.text(content.category.clean("").join(" / "));

		viewCount.text(content.counter.view);
		downCount.text(content.counter.download);
		likeCount.text(content.counter.like);

		body.prepend(content.content.toDOMelement());

		creatorCardWrapper.append(creatorCard);

		profile.attr("src", creator.profile);
		creatorName.attr("href","?dir=pages/view/personal_page/personal_page&cate=dashboard&usernum=" + creator.code);
		creatorName.text(creator.name);;
		creatorJob.text(creator.job);
		creatorLocation.text(creator.city + ", " + creator.country);

		for(var i = 0; i < content.tag.length; i++){
			tagWrapper.append( tag.clone(true).text(content.tag[i]) );
		}
		descript.text(content.descript);
		commentProfile.attr("src", creator.profile);

		bindCC(content.cc);
		bindComment(comment);
		bindUserAction([content.bookmark,content.like]);
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
		console.log(data);
		var comment = new CommentCard(data);
		console.log(comment.render());
	}

	function bindUserAction(data){
		if(data[0]) $(".userAction-bt[data-value='bookmark']").addClass("selected");
		if(data[1]) $(".userAction-bt[data-value='like']").addClass("selected");
	}
});