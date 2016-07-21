$(document).ready(function(){
	if(!isMobile()) return false;
	Request({
		callback: init
	});

	function init(data){
		if(data){
			var img = "../../../../Lubycon_Contents/user/" + data.usercode + "/profile.jpg";

			var signInWrapper = $("#mb-after-signin"),
				profile = signInWrapper.find("#mb-user-pic > img"),
				name = signInWrapper.find("#mb-user-name"),
				location = signInWrapper.find("#mb-user-location"),
				userSetting = signInWrapper.find("#mb-user-setting > a");

			profile.attr("src",img);
			name.text(data.username);
			location.html("<i class='fa fa-map-marker'></i>" + data.city + ", " + data.country);
			userSetting.attr("href","?dir=service/view/resist_password&usernum=" + data.usercode);

			var mypage = $("#mb-menu-mypage"),
				lists = mypage.find(".mb-menu-list");
			lists.each(function(){
				var d = $(this).data("value");
				$(this).find("a").attr("href","pages/view/personal_page/personal_page&cate=" + d + "&usernum=" + data.usercode);
			})
		}
		else {
			console.log("LOGOUT");
		}
	}
})
