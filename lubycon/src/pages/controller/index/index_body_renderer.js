$(document).ready(function(){
	Controller({
        url: "./pages/controller/index/index_body_controller.php",
        data: "isMobile=" + isMobile(),
        callback: init
    });

    function init(data){
    	console.log("INDEX BODY");
    	console.log(data);
    }
})