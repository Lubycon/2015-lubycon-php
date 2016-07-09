$(document).ready(function(){
	initViewer();

	function initViewer(){
		initCC();
	}

	function initCC(){
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
});