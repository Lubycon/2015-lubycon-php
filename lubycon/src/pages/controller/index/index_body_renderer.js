$(document).ready(function(){
	Controller({
        url: "./pages/controller/index/index_body_controller.php",
        data: "isMobile=" + isMobile(),
        callback: init
    });

    function init(data){
    	console.log("INDEX BODY");
    	console.log(data);

    	initMainSlider(data.contentData);

    	function initMainSlider(data){
    		var wrapper = $(".main-slider-wrapper");

			var artwork = MainSlider(data[0],0).show(),
				vector = MainSlider(data[1],1).hide(),
				threed = MainSlider(data[2],2).hide();
			
			wrapper.append(artwork);
			wrapper.append(vector);
			wrapper.append(threed);

			function MainSlider(data,cate){
				var category = cate === 0 ? "artwork" : cate === 1 ? "vector" : "threed";

				var slider = $("<div/>", { "class" : "lubyImageSlider", "id" : "slider" + (cate + 1) }),
	    			ul = $("<ul/>"),
	    			li = $("<li/>"),
	    			anchor = $("<a/>"),
	    			img = $("<img/>"),
	    			link = "?dir=pages/view/contents/viewer&cate=" + category + "connum=";

    			var group1 = addList(data.splice(0,10)),
    				group2 = addList(data.splice(0,10)),
    				group3 = addList(data.splice(0,10));

				slider.append(group1);
				slider.append(group2);
				slider.append(group3);
    			
    			function addList(data){
    				var u = ul.clone();
    				for(var i = 0; i < data.length; i++){
    					var l = li.clone(),
    						a = anchor.clone().attr("href", link + data[i].boardCode).appendTo(l),
    						p = img.clone().attr("src", data[i].thumbnail).appendTo(a);
						l.appendTo(u);
    				}
    				return u;
    			}
    			return slider.lubyImageSlider();
			}
    	}
    }
})