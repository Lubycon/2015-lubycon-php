$(document).ready(function(){
	
	function callController(){
		$.ajax({
            type: "POST",
            url: "./pages/controller/contents/contents_view_controller.php",
            data: 'cate_param=' + CATE_PARAM + '&conno=' + CONNUM_PARAM,
            cache: false,
            success: function (data){
                
            }
        })
	}
	initViewer();

	function initViewer(){
		bind();
		bindCC();
		bindComment();
	}

	function bind(){
		var title = $("#contents_title"),
			category = $("#contents_category"),

			viewCount = $("#viewCount"),
			downCount = $("#downloadCount"),
			likeCount = $("#likeCount"),

			body = $("#contents_main"),
			ccWrapper = $(".cc-list"),
				ccLinker = ccWrapper.children("a"),
			creatorCard = $(".creators_card"),
				creatorCardImg = $(".creator_pic"),
				creatorCardName = $(".creator_name"),
				creatorCardJob = $(".creator_job"),
				creaetorCardLocation = $(".creator_location");
	}

	function bindCC(){
		var listWrap = $(".cc-list"),
			target = listWrap.children("a"),
			list = $("<li/>",{ "class" : "cc-icon" });
		var data = listWrap.data("value").toString().split(""),
			dataSet = { "by" : parseInt(data[0]), "nc" : parseInt(data[1]), "nd" : parseInt(data[2]), "share" : parseInt(data[3]) };


		if(dataSet.by || dataSet.nc || dataSet.nd || dataSet.share) addList("cc",1,true);
		$.each(dataSet,function(k,v){ 
			addList(k,v,true);
		});

		function addList(key,value,isBlack){ //TRUE -> BLACK ICON, FALSE -> WHITE ICON
			if(!value) return false;

			var iconColor = isBlack ? "" : "_w";
			var icon = $("<img/>",{ "src" : "../../ch/img/creative_commons/png/" + key + iconColor + ".png" });
			list.clone().append(icon).appendTo(target);
		}
	}

	function bindComment(){ //test
		console.log(true);
		var comment = new CommentCard({
			profile : 1,
			username : "Evan",
			content : "What is this?",
			time : "2015-11-11"
		});
		console.log(comment.render());
	}
});