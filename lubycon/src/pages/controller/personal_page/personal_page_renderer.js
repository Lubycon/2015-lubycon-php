$(document).ready(function(){
	callController({
        url: "./pages/controller/personal_page/personal_page_controller.php",
        data: "usernum=" + USER_PARAM,
        callback: init
    });

    function init(data){
    	data = data.user_data;
    	console.log(data.location);

    	var wrapper = $("#user_information"),
    			profile = wrapper.find("#user_pic > img"),
    		body = wrapper.find("#user-info"),
    			name = body.find("#user-name"),
				location = body.find("#user-location"),
			introduce = wrapper.find("#user-intro > p"),
			accountSetting = wrapper.find("#user-setting > a");

		console.log(data);
		profile.attr("src",data.profile);
		name.text(data.name);
		location.text(data.city + ", " + data.country);
		introduce.text(data.intro);
		accountSetting.attr("src","?dir=pages/");
    }
})