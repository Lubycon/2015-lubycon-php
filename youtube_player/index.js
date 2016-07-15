


var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";

var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var musicUrl = data,
	music = musicUrl.map(function(v){
		return {
			id: v.replace("https://www.youtube.com/watch?v=","").split("&")[0],
			url: v
		}
	});

var player;
function onYouTubeIframeAPIReady() {
	var musicIndex = 0;
	player = new YT.Player('player', {
		height: '390',
		width: '640',
		videoId: music[0].id,
		playerVars: { 'autoplay' : 1, 'controls' : 1 },
		suggestedQuality: 'small',
		events: {
			'onReady' : playVideo,
			'onError' : playError,
			'onStateChange' : stateChange
		}
	});

	var videoData = player.j.videoData;
	console.log(player);

	$.each(music,function(i,v){
		var li = $("<li/>");
		li.clone().text(v.id).attr("data-index",i).appendTo("#music-list > ul");
	});

	$("li").on("click",function(){
		player.loadVideoById($(this).text(),0,'small');
	})

	function playVideo(event){
		console.log("YOUTUBE PLAYER IS READY");
		event.target.playVideo();
	}

	function playError(event){
		alert("Youtube player error");
	}

	function stateChange(event){
		if(event.data === 1) $(".title.player").text(event.target.j.videoData.title);
		if(event.data === 0) nextSong();
	}

	function nextSong(){
		if(musicIndex < music.length-1) {
			player.loadVideoById(music[musicIndex+1].id);
			musicIndex += 1;
		}
		else {
			player.loadVideoById(music[0].id);
			musicIndex = 0;
		}
	}
}






