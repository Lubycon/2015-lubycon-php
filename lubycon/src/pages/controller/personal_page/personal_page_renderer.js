$(document).ready(function(){
	Controller({
        url: "./pages/controller/personal_page/personal_page_controller.php",
        data: "usernum=" + USER_PARAM,
        callback: init
    });
    Controller({
    	url: "./"
    })

    function init(data){
    	console.log(data);
    	var userdata = data.userData;
    	console.log(userdata);

    	var wrapper = $("#user_information"),
    			profile = wrapper.find("#user_pic > img"),
    		body = wrapper.find("#user-info"),
    			name = body.find("#user-name"),
				location = body.find("#user-location"),
			introduce = wrapper.find("#user-intro > p"),
			accountSetting = wrapper.find("#user-setting > a");

		console.log(data);
		profile.attr("src",userdata.profile);
		name.text(userdata.name);
		location.text(userdata.city + ", " + userdata.country);
		introduce.text(userdata.intro);
		accountSetting.attr("href","?dir=service/view/resist_password");

		function settingButton(){

		}
    }
})