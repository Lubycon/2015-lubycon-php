$(document).ready(function(){
	Controller({
        url: "./pages/controller/personal_page/personal_page_controller.php",
        data: {
			cate: CATE_PARAM,
			usernum: USER_PARAM
		},
        callback: init
    });

    function init(data,session){
    	var pageTitle = data.pageTitle,
    		userdata = data.userData;

    	var wrapper = $("#user_information"),
    			profile = wrapper.find("#user_pic > img"),
    		body = wrapper.find("#user-info"),
    			name = body.find("#user-name"),
				location = body.find("#user-location"),
			introduce = wrapper.find("#user-intro > p"),
			accountSetting = wrapper.find("#user-setting > a");

		profile.attr("src",userdata.profile);
		name.text(userdata.name);
		location.text(userdata.city + ", " + userdata.country);
		introduce.text(userdata.intro);
		accountSetting.attr("href","?dir=service/view/resist_password");

		setSettingButton();
		setSubnav();

		function setSettingButton(){
			if(userdata.code === session.usercode){
				var target = $("#user-setting"),
					anchor = $("<a/>"),
					icon = $("<i/>",{ "class" : "fa fa-gear fa-1x" });
				anchor.attr("href","?dir=service/view/resist_password").append(icon);
				anchor.appendTo(target);
			}
		}

		function setSubnav(){
			var subnav = $(".subnav_li");

			subnav.each(function(){

				var v = $(this).data("value"),
					anchor = $(this).find("a");
					link = "?dir=pages/view/personal_page/personal_page&cate=" + v + "&usernum=" + userdata.code;
				if(v === "bookmark" || v === "my_contents") link += "&page=1";
				anchor.attr("href",link);

				if(v === pageTitle) $(this).addClass("selected");
			});

		}
    }
});
