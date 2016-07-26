$(document).ready(function(){
	Request({
		url: "./pages/controller/community/viewer_controller.php",
		data: {
			cate: CATE_PARAM,
			bno: BNO_PARAM
		},
		callback: init
	});

    function init(response){
        console.log(response);
    }
});
